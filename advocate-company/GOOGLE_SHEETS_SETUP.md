# Google Sheets CMS Setup Guide

This guide will help you set up Google Sheets as your CMS backend.

## Prerequisites

1. **Google Account** - You need a Google account
2. **Google Cloud Project** - Create a project in Google Cloud Console

## Setup Steps

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - **Name**: `bagus-law-cms` (or any name you prefer)
   - **Description**: `Service account for Bagus Law Firm CMS`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 3. Create Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file (keep it secure!)

### 4. Get Credentials from JSON File

Open the downloaded JSON file and copy:
- `client_email` → This is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → This is your `GOOGLE_PRIVATE_KEY`

### 5. Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it: "Bagus Law Firm CMS" (or any name)
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```
   The `SPREADSHEET_ID` is the long string between `/d/` and `/edit`

### 6. Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click "Share" button
2. Add the service account email (from step 4)
3. Give it "Editor" permissions
4. Click "Send" (you can uncheck "Notify people")

### 7. Create Sheet Tabs

In your Google Spreadsheet, create the following sheets (tabs):

#### **Articles** Sheet
Headers (Row 1):
```
id | title | slug | content | excerpt | category | publishedDate | featuredImage | status
```

#### **Profiles** Sheet
Headers (Row 1):
```
id | name | title | category | email | phone | education | specialization | experience | photo | order
```

#### **PracticeAreas** Sheet
Headers (Row 1):
```
id | title | slug | description | icon | order
```

#### **Specialists** Sheet
Headers (Row 1):
```
id | title | slug | description | icon | order
```

#### **HeroSlides** Sheet
Headers (Row 1):
```
id | title | subtitle | description | cta | ctaLink | order | active
```

### 8. Configure Environment Variables

Update your `.env.local` file with the credentials:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
```

**Important Notes:**
- For `GOOGLE_PRIVATE_KEY`, you can either:
  - Paste the full key with `\n` (they will be converted to newlines)
  - Or paste the key directly with actual newlines
- Make sure the private key is wrapped in quotes if it contains special characters

### 9. Test the Setup

1. Add some test data to your Google Sheets
2. Restart your dev server: `bun dev`
3. Test the API endpoints:
   - `http://localhost:3000/api/cms/articles`
   - `http://localhost:3000/api/cms/profiles`

## Example Data

### Articles Sheet Example:
```
id | title | slug | category | publishedDate | status
1 | Sample Article | sample-article | articles | 2025-01-01 | published
```

### Profiles Sheet Example:
```
id | name | title | category | email | order
1 | John Doe | Senior Partner | partners | john@example.com | 1
```

## API Endpoints

Once set up, you can access:

- `GET /api/cms/articles` - Get all articles
- `GET /api/cms/profiles` - Get all profiles
- `GET /api/cms/articles?category=news` - Filter by category
- `GET /api/cms/articles?status=published` - Filter by status
- `GET /api/cms/articles?limit=10` - Limit results

## Using in Your Pages

The helper functions in `lib/cms.ts` work the same way as before:

```typescript
import { getArticles, getProfiles } from '@/lib/cms';

// In a server component
const articles = await getArticles({ status: 'published' });
const profiles = await getProfiles({ category: 'partners' });
```

## Troubleshooting

### "Error: Invalid credentials"
- Check that `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` are correct
- Make sure the private key includes the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### "Error: The caller does not have permission"
- Make sure you've shared the spreadsheet with the service account email
- Give the service account "Editor" permissions

### "Error: Unable to parse range"
- Check that your sheet names match exactly: `Articles`, `Profiles`, `PracticeAreas`, `Specialists`, `HeroSlides`
- Make sure the headers are in the first row

### "Empty data returned"
- Check that you have data in your sheets (beyond just headers)
- Verify the `GOOGLE_SPREADSHEET_ID` is correct
- Check the browser console for detailed error messages

## Security Notes

- **Never commit** `.env.local` to git (it's already in `.gitignore`)
- Keep your service account JSON key file secure
- In production, use environment variables from your hosting platform
- Consider using Google Cloud Secret Manager for production

## Next Steps

1. ✅ Set up Google Cloud project and service account
2. ✅ Create Google Spreadsheet with required sheets
3. ✅ Configure environment variables
4. ✅ Add some test data
5. ✅ Test the API endpoints
6. ✅ Update your pages to use CMS data (they should already work!)

