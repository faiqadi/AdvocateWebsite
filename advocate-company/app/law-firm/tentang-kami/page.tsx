import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Tentang Kami - Bagus Law Firm',
  description: 'Bagus Law Firm (BAGUS LAW) - Firma hukum profesional dengan pengalaman lebih dari satu dekade dalam pelayanan konsultasi hukum dan penanganan perkara hukum.',
};

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-base md:text-lg">
            Bagus Law Firm merupakan perusahaan yang bergerak dalam bidang
            jasa pelayanan konsultasi hukum serta penanganan perkara hukum,
            khususnya terkait kegiatan ekonomi dan bisnis. Bagus Law Firm
            memiliki dua kantor yakni di Kota Jakarta dan Semarang. Pengelolaan
            kedua kantor tersebut dilakukan secara profesional dan independen dan
            memiliki standar operasional yang berkualitas. Transparansi antara
            klien dengan pengacara merupakan nilai lebih dalam pelaksanaan
            penanganan perkara dalam firma hukum ini.
          </p>

          <p className="text-base md:text-lg">
            Bagus Law Firm yang sekarang kami menyebut dengan penamaan{' '}
            <strong>BAGUS LAW</strong> merupakan salah satu firma hukum yang berbentuk
            badan hukum yang telah dikenal oleh masyarakat luas. Kami telah memiliki
            pengalaman lebih dari satu dekade baik pada pengalaman domestik maupun
            internasional yang berfokus pada pelayan dan pengembangan segala
            transaksi hukum perusahaan diberbagai sektor industri. Lawfirm kami
            memilik para konsultan hukum dan para <em>lawyer</em> yang ahli di
            bidangnya untuk menjawab tantangan global terutama pada sektor industri.
          </p>

          <p className="text-base md:text-lg">
            Lawfirm kami telah bekerja dengan banyak perusahaan domestik dan
            internasional di berbagai sektor sehingga menciptakan dan memberikan
            solusi yang efektif serta berfokus pada pengembangan segala transaksi
            bisnis dan investasi bagi para klien. Sumber daya manusia yang telah
            kami miliki telah terlatih secara professional dan memiliki kemampuan
            untuk menganalisa aspek hukum serta menerapkannya yang diharapkan dapat
            meningkatkan produktifitas bisnis dan industri. Oleh karena itu lawfirm
            kami adalah salah satu solusi yang anda butuhkan dalam pembangunan dan
            pengembangan bisnis saudara.
          </p>
        </div>

        {/* Play Firm Profile Button */}
        <div className="mt-10 text-center">
          <Link
            href="/profiles"
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors"
          >
            Putar Profil Firma
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
