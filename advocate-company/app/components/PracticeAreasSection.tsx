import Link from 'next/link';

const practiceAreas = [
  {
    id: 1,
    title: 'Antimonopoli dan Perdagangan Internasional',
    description:
      'Bagus Law memberikan nasihat hukum di sektor persaingan usaha dan anti-monopoli.',
  },
  {
    id: 2,
    title: 'Ketenagakerjaan',
    description:
      'Di bidang keimigrasian dan hukum perburuhan, kami memberikan saran tentang: permohonan izin tinggal dan izin kerja bagi tenaga kerja asing, penyusunan kontrak kerja, kebijakan dan praktik personel',
  },
  {
    id: 3,
    title: 'Kejahatan Penipuan dan Investigasi Forensik',
    description:
      'Rezim penegakan yang ketat saat ini menuntut klien untuk tidak hanya untuk mematuhi peraturan, tetapi juga untuk berinvestasi dalam program pencegahan.',
  },
  {
    id: 4,
    title: 'Perbankan dan Keuangan',
    description:
      'Bagus Law kerap memberikan nasihat kepada lembaga keuangan dan perusahaan besar.',
  },
  {
    id: 5,
    title: 'Pasar Modal',
    description:
      'Bagus Law sering memberikan saran terkait dengan penawaran asing oleh emiten yang memiliki kepentingan signifikan di Indonesia.',
  },
  {
    id: 6,
    title: 'Kesehatan',
    description:
      'Bagus Law menyediakan jasa dalam menyarankan investor tentang pendirian, akuisisi, operasi rumah sakit dan klinik swasta.',
  },
  {
    id: 7,
    title: 'Minyak & Gas',
    description:
      'Firma Hukum pada Bidang Minyak dan Gas. Memberikan Saran Hukum yang efektif.',
  },
  {
    id: 8,
    title: 'Merger dan Akuisisi',
    description:
      'Bagus Law memberikan nasihat hukum komprehensif untuk transaksi merger dan akuisisi.',
  },
  {
    id: 9,
    title: 'Litigasi and Alternative Dispute Resolution',
    description:
      'Tim terbaik dari kantor kami memberikan analisa, nasehat serta tindakan hukum secara profesional.',
  },
  {
    id: 10,
    title: 'PKPU dan Kepailitan',
    description:
      'Bagus Law menyediakan layanan hukum untuk Penundaan Kewajiban Pembayaran Utang dan Kepailitan.',
  },
  {
    id: 11,
    title: 'Perumahan dan Aset',
    description:
      'Kami memberikan nasihat hukum terkait perumahan dan pengelolaan aset.',
  },
  {
    id: 12,
    title: 'Pembiayaan Keuangan',
    description:
      'Bagus Law memberikan nasihat hukum untuk berbagai skema pembiayaan keuangan.',
  },
];

export default function PracticeAreasSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Wilayah Praktek
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Tim terbaik dari kantor kami memberikan analisa, nasehat serta
            tindakan hukum secara profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {area.title}
              </h3>
              <p className="text-gray-700 mb-4">{area.description}</p>
              <Link
                href="/practice-areas"
                className="text-blue-900 font-semibold hover:underline"
              >
                Detail →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

