/**
 * Koleksi gambar gedung untuk background
 * Semua gambar dari Unsplash (gratis digunakan)
 */
export const buildingImages = [
  // Modern office buildings
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80',
  // Modern skyscraper
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&q=80',
  // Glass office building
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=1080&fit=crop&q=80',
  // Corporate building
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop&q=80',
  // Business district
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&q=80',
  // Modern architecture
  'https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=1920&h=1080&fit=crop&q=80',
  // Cityscape with buildings
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop&q=80',
  // Office building facade
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop&q=80',
];

/**
 * Mendapatkan gambar gedung berdasarkan index
 * @param index Index gambar (akan di-loop jika melebihi jumlah gambar)
 */
export function getBuildingImage(index: number = 0): string {
  return buildingImages[index % buildingImages.length];
}

/**
 * Mendapatkan gambar gedung secara random
 */
export function getRandomBuildingImage(): string {
  const randomIndex = Math.floor(Math.random() * buildingImages.length);
  return buildingImages[randomIndex];
}





