'use client';

import ScrollAnimation from './ScrollAnimation';
import Link from 'next/link';

const benefits = [
  {
    id: 1,
    icon: '⚖️',
    title: 'Konsultasi Hukum Profesional',
    description: 'Dapatkan nasihat hukum dari tim ahli yang berpengalaman lebih dari satu dekade.',
  },
  {
    id: 2,
    icon: '🤝',
    title: 'Layanan Terpercaya',
    description: 'Komitmen terhadap integritas dan profesionalisme dalam setiap layanan yang kami berikan.',
  },
  {
    id: 3,
    icon: '🌐',
    title: 'Pengalaman Global',
    description: 'Pengalaman luas dalam transaksi hukum domestik maupun internasional.',
  },
  {
    id: 4,
    icon: '💼',
    title: 'Spesialisasi Beragam',
    description: 'Layanan hukum yang mencakup berbagai sektor industri dan bidang praktik.',
  },
  {
    id: 5,
    icon: '🔒',
    title: 'Kerahasiaan Terjamin',
    description: 'Setiap pembicaraan dan informasi klien dijaga dengan ketat dan profesional.',
  },
  {
    id: 6,
    icon: '📈',
    title: 'Solusi Efektif',
    description: 'Pendekatan strategis untuk menyelesaikan masalah hukum dengan efisien.',
  },
];

export default function ManfaatKerjaSamaSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Manfaat Kerja Sama dengan Kami
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Pilih Bagus Law Firm sebagai partner hukum Anda dan dapatkan berbagai 
              keuntungan yang akan membantu bisnis Anda berkembang.
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <ScrollAnimation key={benefit.id} direction="up" delay={index * 100}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="text-5xl mb-4 text-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation direction="up" delay={600}>
          <div className="text-center">
            <div className="bg-blue-900 rounded-lg p-8 md:p-12 text-white shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Siap Memulai Kerja Sama?
              </h3>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi hukum 
                terbaik untuk kebutuhan bisnis Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
                >
                  Hubungi Kami
                </Link>
                <Link
                  href="/practice-areas"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
                >
                  Lihat Layanan Kami
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

