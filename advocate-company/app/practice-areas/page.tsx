import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            Telusuri bidang praktik unggulan kami untuk mengetahui bagaimana kami
            dapat mendampingi Anda dalam menghadapi berbagai tantangan hukum dengan
            kepercayaan diri dan solusi yang tepat.
          </p>
        </div>
      </div>

      {/* Practice Areas Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Bidang praktik utama kami meliputi:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{area}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-200">
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
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors"
          >
            Click Here
          </Link>
        </div>
      </div>

      {/* Practice Areas Footer Section */}
      <div className="bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
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
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href="/practice-areas"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors text-sm block"
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
  );
}

