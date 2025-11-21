import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Bagus Academy - Bagus Law Firm',
  description: 'Membuka akses bagi generasi muda hukum untuk belajar langsung dari dinamika kerja di firma hukum secara profesional.',
};

export default function LSAcademyPage() {
  const programs = [
    {
      id: 'lip',
      title: 'Legal Internship Program',
      subtitle: 'Satu Bulan Pelatihan Intensif, Selangkah Menuju Karier Hukum Profesional.',
      duration: '1 Bulan',
      description: 'Program magang singkat untuk memberikan pengalaman praktis di dunia hukum profesional.',
    },
    {
      id: 'fgp',
      title: 'Fresh Graduates Program',
      subtitle: 'Enam Bulan Pembelajaran Terpadu, Awal Karier Profesional Hukum.',
      duration: '6 Bulan',
      description: 'Program pembelajaran terpadu untuk lulusan baru yang ingin memulai karier di bidang hukum.',
    },
    {
      id: 'lat',
      title: 'Legal Associates Trainee',
      subtitle: 'Setahun Trainee Intensif, Gerbang Utama Menjadi Advokat Profesional.',
      duration: '1 Tahun',
      description: 'Program trainee intensif selama setahun sebagai gerbang utama menjadi advokat profesional.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Membuka akses bagi generasi muda hukum untuk belajar langsung dari
            dinamika kerja di firma hukum secara profesional.
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Bagus Law Firm berencana membuka tiga program rekrutmen dan
            pengembangan SDM berjenjang bagi lulusan berlatar belakang ilmu hukum,
            yaitu Legal Internship Program (LIP), Fresh Graduates Program (FGP),
            dan Legal Associates Trainee (LAT). Program berjenjang ini dirancang
            sebagai inisiatif jangka panjang untuk mengembangkan pengetahuan serta
            keterampilan peserta agar kelak dapat menjadi bagian permanen dari firma
            kami.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Melalui rangkaian LIP–FGP–LAT tersebut, firma dapat menyeleksi
            kandidat-kandidat terbaik sebagai talent pool masa depan, sekaligus
            memfasilitasi transisi mereka dari status trainee menjadi karyawan tetap
            yang memahami budaya kerja firma.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="mb-4">
                <span className="inline-block bg-blue-900 text-white px-4 py-1 rounded-md text-sm font-semibold mb-3">
                  {program.duration}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h3>
              </div>
              <p className="text-gray-700 font-semibold mb-4">
                {program.subtitle}
              </p>
              <p className="text-gray-600 text-sm">{program.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

