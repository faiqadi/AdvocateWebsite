/**
 * Google Sheets CMS Service
 * Handles reading and writing data to Google Sheets
 */

import { google } from 'googleapis';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Spreadsheet ID from environment variable
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '';

/**
 * Get all rows from a specific sheet
 */
export async function getSheetData(sheetName: string): Promise<any[]> {
  try {
    if (!SPREADSHEET_ID) {
      console.warn('GOOGLE_SPREADSHEET_ID not set, returning empty array');
      return [];
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // First row is headers
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });

    return data;
  } catch (error) {
    console.error(`Error fetching data from sheet ${sheetName}:`, error);
    return [];
  }
}

/**
 * Append a row to a specific sheet
 */
export async function appendRow(sheetName: string, rowData: any[]): Promise<boolean> {
  try {
    if (!SPREADSHEET_ID) {
      console.error('GOOGLE_SPREADSHEET_ID not set');
      return false;
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return true;
  } catch (error) {
    console.error(`Error appending row to sheet ${sheetName}:`, error);
    return false;
  }
}

/**
 * Update a row in a specific sheet
 */
export async function updateRow(
  sheetName: string,
  rowIndex: number,
  rowData: any[]
): Promise<boolean> {
  try {
    if (!SPREADSHEET_ID) {
      console.error('GOOGLE_SPREADSHEET_ID not set');
      return false;
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A${rowIndex + 2}:Z${rowIndex + 2}`, // +2 because row 1 is header, and rowIndex is 0-based
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return true;
  } catch (error) {
    console.error(`Error updating row in sheet ${sheetName}:`, error);
    return false;
  }
}

/**
 * Delete a row from a specific sheet
 */
export async function deleteRow(sheetName: string, rowIndex: number): Promise<boolean> {
  try {
    if (!SPREADSHEET_ID) {
      console.error('GOOGLE_SPREADSHEET_ID not set');
      return false;
    }

    // Get sheet metadata to find the sheet ID
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheet = spreadsheet.data.sheets?.find((s) => s.properties?.title === sheetName);
    if (!sheet?.properties?.sheetId) {
      console.error(`Sheet ${sheetName} not found`);
      return false;
    }

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheet.properties.sheetId,
                dimension: 'ROWS',
                startIndex: rowIndex + 1, // +1 because row 0 is header
                endIndex: rowIndex + 2,
              },
            },
          },
        ],
      },
    });

    return true;
  } catch (error) {
    console.error(`Error deleting row from sheet ${sheetName}:`, error);
    return false;
  }
}

