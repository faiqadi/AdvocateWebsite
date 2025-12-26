/**
 * Google Sheets CMS Service
 * Handles reading and writing data to Google Sheets via Apps Script Web App
 */

// Web App URL from environment variable
// Fallback to GOOGLE_WEB_APP_URL for build time if NEXT_PUBLIC_ is not set
const WEB_APP_URL = process.env.NEXT_PUBLIC_GOOGLE_WEB_APP_URL || process.env.GOOGLE_WEB_APP_URL || '';

console.log('GOOGLE_WEB_APP_URL status:', WEB_APP_URL ? 'SET' : 'NOT SET');

/**
 * Get all rows from a specific sheet
 */
export async function getSheetData(sheetName: string, params?: Record<string, string>): Promise<any[]> {
  try {
    if (!WEB_APP_URL) {
      console.error('NEXT_PUBLIC_GOOGLE_WEB_APP_URL not set in environment variables');
      // Return empty array instead of throwing error to allow build to continue
      // This is critical for static export if env var is missing in some environments
      return [];
    }

    // Build query parameters
    const queryParams = new URLSearchParams({
      sheet: sheetName,
      action: 'get',
      ...params,
    });

    const url = `${WEB_APP_URL}?${queryParams.toString()}`;

    // Use caching for GET requests if running in browser
    if (typeof window !== 'undefined') {
      const { fetchWithCache } = await import('./cache-client');
      const response = await fetchWithCache<any>(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      // cache-client returns the parsed JSON directly, but our code below expects to handle the response object structure logic
      // However, fetchWithCache returns the data directly.
      // Let's adjust to match the structure expected by the rest of this function or return directly.

      // The fetchWithCache implementation returns the response.json(). 
      // The current implementation below expects to check response.ok and then parse json
      // So 'response' here is actually the 'result' object from below (success, data, etc)

      if (!response.success) {
        console.error(`Error from Web App: ${response.message}`);
        return [];
      }
      return response.data || [];
    }

    // Server-side fallback (build time)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`[getSheetData] Fetch failed: ${response.status} ${response.statusText}`);
      return [];
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
      return [];
    }

    const result = await response.json();

    if (!result.success) {
      console.error(`Error from Web App: ${result.message}`);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error(`Error fetching data from sheet ${sheetName}:`, error);
    return [];
  }
}

/**
 * Append a row to a specific sheet
 */
export async function appendRow(sheetName: string, rowData: Record<string, any>): Promise<boolean> {
  try {
    if (!WEB_APP_URL) {
      console.error('GOOGLE_WEB_APP_URL not set');
      return false;
    }

    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sheet: sheetName,
        action: 'append',
        data: rowData,
      }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error(`Error appending row to sheet ${sheetName}:`, error);
    return false;
  }
}

/**
 * Update a row in a specific sheet by ID
 */
export async function updateRow(
  sheetName: string,
  id: string,
  rowData: Record<string, any>
): Promise<boolean> {
  try {
    if (!WEB_APP_URL) {
      console.error('GOOGLE_WEB_APP_URL not set');
      return false;
    }

    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sheet: sheetName,
        action: 'update',
        id: id,
        data: rowData,
      }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error(`Error updating row in sheet ${sheetName}:`, error);
    return false;
  }
}

/**
 * Delete a row from a specific sheet by ID
 */
export async function deleteRow(sheetName: string, id: string): Promise<boolean> {
  try {
    if (!WEB_APP_URL) {
      console.error('GOOGLE_WEB_APP_URL not set');
      return false;
    }

    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sheet: sheetName,
        action: 'delete',
        id: id,
      }),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error(`Error deleting row from sheet ${sheetName}:`, error);
    return false;
  }
}

