import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { getBuildingImage } from '@/lib/building-images';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Practice Areas - Bagus Law Firm',
  description: 'Telusuri bidang praktik unggulan kami untuk mengetahui bagaimana kami dapat mendampingi Anda dalam menghadapi berbagai tantangan hukum dengan kepercayaan diri dan solusi yang tepat.',
};

export default function PracticeAreasPage() {
  const practiceAreas = [
    'Antimonopoli dan Perdagangan Internasional',
    'Litigasi and Alternative Dispute Resolution',
    'PKPU dan Kepailitan',
    'Perumahan dan Aset',
    'Pembiayaan Keuangan',
    'Minyak & Gas',
    'Merger dan Akuisisi',
    'Keuangan Syariah',
    'Investasi',
    'Teknologi Informasi, E-commerce, Media and Telekomunikasi',
    'Kesehatan',
    'Perkebunan dan Kehutanan',
    'Kejahatan Penipuan dan Investigasi Forensik',
    'Lingkungan',
    'Energi, Infrastruktur dan Sumber Daya Mineral',
    'Korporasi dan Komersial',
    'Pariwisata dan Perhotelan',
    'Penerbangan',
    'Pelayaran',
    'Imigrasi dan Ketenagakerjaan',
  ];

  const footerPracticeAreas = [
    'Antimonopoli dan Perdagangan Internasional',
    'Litigasi and Alternative Dispute Resolution',
    'PKPU dan Kepailitan',
    'Perumahan dan Aset',
    'Pembiayaan Keuangan',
    'Minyak & Gas',
    'Merger dan Akuisisi',
    'Keuangan Syariah',
    'Investasi',
    'Teknologi Informasi, E-commerce, Media and Telekomunikasi',
    'Kesehatan',
    'Perkebunan',
    'Kejahatan Penipuan dan Investigasi Forensik',
    'Lingkungan',
    'Energi, Infrastruktur dan Sumber Daya Mineral',
    'Korporasi dan Komersial',
  ];

  return (
    <div 
      className="min-h-screen relative transition-colors duration-200"
      style={{
        backgroundImage: `url(${getBuildingImage(3)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/90"></div>
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white py-16 border-b border-gray-300/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            Telusuri bidang praktik unggulan kami untuk mengetahui bagaimana kami
            dapat mendampingi Anda dalam menghadapi berbagai tantangan hukum dengan
            kepercayaan diri dan solusi yang tepat.
          </p>
        </div>
      </div>

      {/* Practice Areas Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/90 dark:bg-transparent backdrop-blur-sm rounded-lg px-8 py-4 shadow-lg border border-gray-200/50 dark:border-transparent">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-0">
              Bidang praktik utama kami meliputi:
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, index) => {
            // Create slug from area name
            const slug = area
              .toLowerCase()
              .replace(/[&]/g, 'dan')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
            
            return (
              <Link
                key={index}
                href={`/practice-areas/${slug}`}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-300/50 dark:border-gray-700/50 hover:border-blue-500 group"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {area}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Klik untuk detail →
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Consultation Section */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-16 border-y border-gray-300/50 dark:border-gray-700/50 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Jadwalkan Konsultasi dengan Pengacara Profesional
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Tim kami akan memberikan respons secara profesional dan segera membantu
            Anda dalam mengatur waktu konsultasi yang sesuai dengan kebutuhan Anda,
            serta memastikan seluruh proses berlangsung dengan efisien dan terkoordinasi.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Click Here
          </Link>
        </div>
      </div>

      {/* Practice Areas Footer Section */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-8">
              Lawfirm kami telah bekerja dengan banyak perusahaan domestik dan
              internasional di berbagai sektor sehingga menciptakan dan memberikan
              solusi yang efektif serta berfokus pada pengembangan segala transaksi
              bisnis dan investasi bagi para klien.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Practice Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {footerPracticeAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-300/50 dark:border-gray-700/50"
              >
                <Link
                  href="/practice-areas"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm block"
                >
                  {area}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
}

