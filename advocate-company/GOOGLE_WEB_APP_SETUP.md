# Google Apps Script Web App Setup Guide

Panduan ini akan membantu Anda mengatur Google Sheets sebagai CMS menggunakan metode **Apps Script Web App** (sama seperti wedding project).

## Keuntungan Metode Ini

✅ **Lebih sederhana** - Tidak perlu Service Account  
✅ **Setup cepat** - Hanya perlu deploy Apps Script  
✅ **Tidak perlu npm package** - Menggunakan fetch API standar  
✅ **Cocok untuk development** - Mudah diuji dan di-debug  

## Prerequisites

1. **Google Account** - Akun Google yang memiliki akses ke Google Sheets
2. **Google Spreadsheet** - Spreadsheet yang sudah dibuat

## Setup Steps

### 1. Buat Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com/)
2. Buat spreadsheet baru
3. Beri nama: "Bagus Law Firm CMS" (atau nama lain)

### 2. Buat Sheet Tabs

Di spreadsheet Anda, buat sheet (tab) berikut:

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

#### **AboutUs** Sheet
Headers (Row 1):
```
id | title | content | order | active
```

### 3. Install Google Apps Script

1. Di Google Spreadsheet, klik **Extensions** > **Apps Script**
2. Hapus semua kode yang ada (jika ada)
3. Copy seluruh isi file `google-apps-script-webapp.js`
4. Paste ke editor Apps Script
5. Klik **Save** (Ctrl+S atau Cmd+S)
6. Beri nama project: "Bagus Law CMS Web App"

### 4. Deploy sebagai Web App

1. Di editor Apps Script, klik **Deploy** > **New deployment**
2. Klik ikon **⚙️** (gear) di sebelah "Select type"
3. Pilih **Web app**
4. Isi pengaturan:
   - **Description**: "Bagus Law Firm CMS API"
   - **Execute as**: **Me** (your-email@gmail.com)
   - **Who has access**: **Anyone** ⚠️ **PENTING**: Harus "Anyone" untuk menghindari error authentication
5. Klik **Deploy**
6. **PENTING**: Copy **Web App URL** yang muncul
   - URL akan terlihat seperti: `https://script.google.com/macros/s/AKfycby.../exec`
   - Simpan URL ini, Anda akan membutuhkannya
7. **PENTING**: Setelah deploy pertama kali, Anda akan diminta untuk memberikan izin. Klik **Review Permissions** dan **Allow**

### 5. Berikan Izin

1. Setelah deploy, akan muncul popup "Authorization required"
2. Klik **Review Permissions**
3. Pilih akun Google Anda
4. Klik **Advanced** > **Go to [project name] (unsafe)**
5. Klik **Allow**
6. Kembali ke Apps Script editor
7. Klik **Deploy** > **Manage deployments**
8. Pastikan status "Active"

### 6. Konfigurasi Environment Variables

Buat atau update file `.env.local` Anda:

```bash
# Google Web App URL (dari step 4)
GOOGLE_WEB_APP_URL=https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec
```

**Catatan**: Hanya perlu `GOOGLE_WEB_APP_URL`, tidak perlu variabel lain.

### 8. Test Setup

1. Tambahkan beberapa data test di Google Sheets
2. Restart dev server: `bun dev`
3. Test API endpoints:
   - `http://localhost:3000/api/cms/articles`
   - `http://localhost:3000/api/cms/profiles`

## Cara Menggunakan

### Membaca Data

Website akan otomatis membaca data dari Google Sheets melalui Web App URL.

### Menulis Data (Opsional)

Jika Anda ingin menulis data dari website, gunakan fungsi `appendRow`, `updateRow`, atau `deleteRow` dari `lib/google-sheets.ts`.

## API Endpoints yang Tersedia

Setelah setup, Anda bisa mengakses:

- `GET /api/cms/articles` - Get all articles
- `GET /api/cms/profiles` - Get all profiles
- `GET /api/cms/articles?category=news` - Filter by category
- `GET /api/cms/articles?status=published` - Filter by status
- `GET /api/cms/articles?limit=10` - Limit results

## Query Parameters yang Didukung

### GET Requests

- `sheet` - Nama sheet (required)
- `action` - Action type (default: 'get')
- `category` - Filter by category
- `status` - Filter by status
- `active` - Filter by active (true/false)
- `sort` - Sort order ('order', '-publishedDate')
- `limit` - Limit results

### POST Requests

```json
{
  "sheet": "Articles",
  "action": "append", // atau "update", "delete"
  "id": "article-1", // untuk update/delete
  "data": {
    "id": "article-1",
    "title": "Sample Article",
    "slug": "sample-article",
    "content": "...",
    "category": "articles",
    "status": "published"
  }
}
```

## Troubleshooting

### "Error: Sheet not found"
- Pastikan nama sheet sesuai persis (case-sensitive)
- Pastikan sheet sudah dibuat di spreadsheet

### "Error: Authorization required"
- Pastikan Anda sudah memberikan izin saat deploy
- Coba deploy ulang dan berikan izin lagi

### "CORS error" atau "Network error"
- Pastikan Web App URL benar
- Pastikan "Who has access" di-set ke **"Anyone"** (bukan "Anyone with Google account")
- Coba deploy ulang (kadang perlu beberapa kali)
- Pastikan sudah memberikan izin saat deploy pertama kali

### "Unexpected token '<', "<!doctype "... is not valid JSON"
- **Ini berarti Web App mengembalikan HTML (halaman login) bukan JSON**
- Pastikan "Who has access" di-set ke **"Anyone"** (bukan "Anyone with Google account")
- Deploy ulang Web App dengan pengaturan yang benar
- Pastikan sudah memberikan izin saat deploy
- Cek Execution log di Apps Script editor untuk melihat error detail

### "Empty data returned"
- Pastikan ada data di sheet (selain header)
- Cek Execution log di Apps Script editor untuk error detail
- Pastikan format data sesuai dengan header

### Web App URL tidak bekerja
- Pastikan deployment status "Active"
- Coba deploy ulang dan dapatkan URL baru
- Pastikan script sudah di-save sebelum deploy

## Security Notes

⚠️ **Penting untuk Production:**

1. **Ganti "Who has access"** ke **"Anyone with Google account"** untuk lebih aman
2. **Jangan commit** `.env.local` ke git (sudah ada di `.gitignore`)
3. **Gunakan environment variables** di hosting platform (Vercel, dll)
4. Pertimbangkan menambahkan **API key** atau **authentication** untuk production

## Update Script

Jika Anda mengubah script di Apps Script editor:

1. Klik **Deploy** > **Manage deployments**
2. Klik ikon **✏️** (edit) di deployment
3. Pilih **New version**
4. Klik **Deploy**
5. URL akan tetap sama (tidak perlu update `.env.local`)

## Perbandingan dengan Service Account Method

| Aspek | Web App Method | Service Account Method |
|-------|---------------|----------------------|
| Setup | ✅ Lebih mudah | ❌ Lebih kompleks |
| Security | ⚠️ URL publik | ✅ Credentials di server |
| Flexibility | ⚠️ Terbatas | ✅ Full API access |
| Best for | Development, Simple apps | Production, Complex apps |

## Next Steps

1. ✅ Setup Google Spreadsheet dengan sheet tabs
2. ✅ Deploy Apps Script sebagai Web App
3. ✅ Copy Web App URL
4. ✅ Update `.env.local` dengan `GOOGLE_WEB_APP_URL`
5. ✅ Test API endpoints
6. ✅ Mulai isi data di Google Sheets

Selamat! CMS Anda sekarang menggunakan metode yang lebih sederhana! 🎉

