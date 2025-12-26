/**
 * Bagus Law Firm - Google Apps Script Web App
 * 
 * Deploy this script as a Web App to use as API endpoint
 * 
 * Instructions:
 * 1. Open your Google Spreadsheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire code
 * 4. Save the project
 * 5. Click Deploy > New Deployment
 * 6. Select "Web app" as type
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone" (or "Anyone with Google account" for more security)
 * 9. Click Deploy
 * 10. Copy the Web App URL
 * 11. Add it to your .env.local as GOOGLE_WEB_APP_URL
 */

// Configuration
const SHEET_NAMES = {
  ARTICLES: 'Articles',
  PROFILES: 'Profiles',
  PRACTICE_AREAS: 'PracticeAreas',
  SPECIALISTS: 'Specialists',
  HERO_SLIDES: 'HeroSlides',
  ABOUT_US: 'AboutUs',
  TENTANG_KANTOR: 'TentangKantor',
  FOUNDERS: 'Founders',
  PROFILES_CATEGORY: 'ProfilesCategory'
};

/**
 * Handle GET requests - Read data from sheets
 */
function doGet(e) {
  try {
    const sheetName = e.parameter.sheet || e.parameter.sheetName;
    const action = e.parameter.action || 'get';

    if (!sheetName) {
      return createErrorResponse(400, 'Sheet name is required');
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      return createErrorResponse(404, `Sheet "${sheetName}" not found`);
    }

    switch (action) {
      case 'get':
        return getSheetData(sheet, sheetName, e.parameter);
      case 'getById':
        return getSheetDataById(sheet, e.parameter.id);
      default:
        return getSheetData(sheet, sheetName, e.parameter);
    }
  } catch (error) {
    return createErrorResponse(500, `Error: ${error.toString()}`);
  }
}

/**
 * Handle POST requests - Write data to sheets
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    const { sheet, action, data } = requestData;

    if (!sheet) {
      return createErrorResponse(400, 'Sheet name is required');
    }

    const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
    if (!targetSheet) {
      return createErrorResponse(404, `Sheet "${sheet}" not found`);
    }

    switch (action) {
      case 'append':
        return appendRow(targetSheet, data);
      case 'update':
        return updateRow(targetSheet, requestData.id, data);
      case 'delete':
        return deleteRow(targetSheet, requestData.id);
      default:
        return createErrorResponse(400, 'Invalid action');
    }
  } catch (error) {
    return createErrorResponse(500, `Error: ${error.toString()}`);
  }
}

/**
 * Get all data from a sheet with optional filtering
 */
function getSheetData(sheet, sheetName, params) {
  const [, ...rows] = sheet.getDataRange().getValues();
  const headers = sheet.getDataRange().getValues()[0];

  // Convert rows to objects
  let data = rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });

  // Apply filters
  if (params.category) {
    data = data.filter(item => item.category === params.category);
  }

  if (params.status) {
    data = data.filter(item => item.status === params.status);
  }

  if (params.active !== undefined) {
    const activeValue = params.active === 'true' || params.active === true;
    data = data.filter(item => {
      const itemActive = item.active === true || item.active === 'true' || item.active === '';
      return itemActive === activeValue;
    });
  }

  // Sort
  if (params.sort) {
    if (params.sort === 'order') {
      data.sort((a, b) => (parseInt(a.order) || 0) - (parseInt(b.order) || 0));
    } else if (params.sort === '-publishedDate') {
      data.sort((a, b) => new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0));
    }
  }

  // Limit
  if (params.limit) {
    data = data.slice(0, parseInt(params.limit));
  }

  return createSuccessResponse({
    sheet: sheetName,
    count: data.length,
    data: data
  });
}

/**
 * Get data by ID
 */
function getSheetDataById(sheet, id) {
  const [, ...rows] = sheet.getDataRange().getValues();
  const headers = sheet.getDataRange().getValues()[0];

  const row = rows.find(row => row[headers.indexOf('id')] === id);

  if (!row) {
    return createErrorResponse(404, 'Item not found');
  }

  const obj = {};
  headers.forEach((header, index) => {
    obj[header] = row[index] || '';
  });

  return createSuccessResponse({ data: obj });
}

/**
 * Append a new row to sheet
 */
function appendRow(sheet, rowData) {
  const headers = sheet.getDataRange().getValues()[0];
  const newRow = headers.map(header => rowData[header] || '');

  sheet.appendRow(newRow);

  return createSuccessResponse({
    message: 'Row added successfully',
    data: rowData
  });
}

/**
 * Update a row by ID
 */
function updateRow(sheet, id, rowData) {
  const [, ...rows] = sheet.getDataRange().getValues();
  const headers = sheet.getDataRange().getValues()[0];
  const idIndex = headers.indexOf('id');

  const rowIndex = rows.findIndex(row => row[idIndex] === id);

  if (rowIndex === -1) {
    return createErrorResponse(404, 'Item not found');
  }

  const updatedRow = headers.map(header => rowData[header] !== undefined ? rowData[header] : rows[rowIndex][headers.indexOf(header)]);
  sheet.getRange(rowIndex + 2, 1, 1, headers.length).setValues([updatedRow]);

  return createSuccessResponse({
    message: 'Row updated successfully',
    data: rowData
  });
}

/**
 * Delete a row by ID
 */
function deleteRow(sheet, id) {
  const [, ...rows] = sheet.getDataRange().getValues();
  const headers = sheet.getDataRange().getValues()[0];
  const idIndex = headers.indexOf('id');

  const rowIndex = rows.findIndex(row => row[idIndex] === id);

  if (rowIndex === -1) {
    return createErrorResponse(404, 'Item not found');
  }

  sheet.deleteRow(rowIndex + 2);

  return createSuccessResponse({
    message: 'Row deleted successfully'
  });
}

/**
 * Create success response
 */
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 200,
      success: true,
      ...data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create error response
 */
function createErrorResponse(code, message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: code,
      success: false,
      message: message
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

