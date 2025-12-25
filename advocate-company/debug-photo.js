// Debug script untuk memeriksa URL foto founder
// Jalankan di browser console untuk melihat logging

// Contoh URL Google Drive yang valid:
// https://drive.google.com/file/d/1ABC123/view?usp=sharing
// https://drive.google.com/open?id=1ABC123
// https://drive.google.com/uc?export=view&id=1ABC123

function testGoogleDriveUrl(url) {
  console.log('Testing URL:', url);

  if (!url) {
    console.log('❌ URL kosong');
    return;
  }

  if (!url.includes('drive.google.com')) {
    console.log('❌ Bukan URL Google Drive');
    return;
  }

  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
                     url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    console.log('✅ File ID ditemukan:', fileId);
    console.log('✅ Direct URL:', directUrl);

    // Test if image loads
    const img = new Image();
    img.onload = () => console.log('✅ Gambar berhasil dimuat');
    img.onerror = () => console.log('❌ Gambar gagal dimuat - periksa permission file');
    img.src = directUrl;

    return directUrl;
  } else {
    console.log('❌ Tidak dapat mengekstrak File ID dari URL');
    console.log('Format yang didukung:');
    console.log('  - https://drive.google.com/file/d/FILE_ID/view?usp=sharing');
    console.log('  - https://drive.google.com/open?id=FILE_ID');
  }
}

// Export untuk digunakan di browser console
if (typeof window !== 'undefined') {
  window.testGoogleDriveUrl = testGoogleDriveUrl;
  console.log('🔍 Debug function tersedia: testGoogleDriveUrl(url)');
  console.log('Contoh: testGoogleDriveUrl("https://drive.google.com/file/d/1ABC123/view?usp=sharing")');
}

