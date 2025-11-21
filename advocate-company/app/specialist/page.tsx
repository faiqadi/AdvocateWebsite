import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Specialist - Bagus Law Firm',
  description: 'Dengan dedikasi terhadap keunggulan dan integritas dalam penegakan keadilan, kami menghadirkan beragam layanan hukum yang terfokus dan disesuaikan secara tepat dengan kebutuhan spesifik Anda.',
};

export default function SpecialistPage() {
  const specialists = [
    {
      id: 'akuntan-publik',
      title: 'Akuntan Publik',
      description: 'Spesialisasi Bagus Law Firm di bidang Akuntan Publik.',
      icon: '📊',
    },
    {
      id: 'kurator',
      title: 'Kurator',
      description: 'Spesialisasi Bagus Law Firm di bidang Kurator.',
      icon: '⚖️',
    },
    {
      id: 'konsultan-pajak',
      title: 'Konsultan Pajak',
      description: 'Spesialisasi Bagus Law Firm di bidang Konsultan Pajak.',
      icon: '💰',
    },
    {
      id: 'konsultan-perizinan',
      title: 'Konsultan Perizinan',
      description: 'Spesialisasi Bagus Law Firm di bidang Konsultan Perizinan.',
      icon: '📋',
    },
    {
      id: 'penerjemah-tersumpah',
      title: 'Penerjemah Tersumpah',
      description: 'Spesialisasi Bagus Law Firm di bidang Penerjemah Tersumpah.',
      icon: '🌐',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            Dengan dedikasi terhadap keunggulan dan integritas dalam penegakan
            keadilan, kami menghadirkan beragam layanan hukum yang terfokus dan
            disesuaikan secara tepat dengan kebutuhan spesifik Anda.
          </p>
        </div>
      </div>

      {/* Specialists Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialists.map((specialist) => (
            <div
              key={specialist.id}
              id={specialist.id}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow scroll-mt-20"
            >
              <div className="text-6xl mb-6 text-center">{specialist.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {specialist.title}
              </h3>
              <p className="text-gray-700 text-center">{specialist.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Jadwalkan Konsultasi dengan Pengacara Profesional
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Untuk menjadwalkan pertemuan dengan salah satu pengacara kami yang
            berpengalaman di bidang hukum korporasi dan bisnis, silakan isi formulir
            di bawah ini atau hubungi kantor kami secara langsung melalui informasi
            kontak yang tersedia.
          </p>
          <p className="text-base text-gray-600 mb-8 max-w-3xl mx-auto">
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

      <Footer />
    </div>
  );
}

