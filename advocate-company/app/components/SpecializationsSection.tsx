'use client';

import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

const specializations = [
  {
    id: 1,
    title: 'Akuntan Publik',
      description: 'Spesialisasi Bagus Law Firm di bidang Akuntan Publik.',
    icon: '📊',
  },
  {
    id: 2,
    title: 'Kurator',
      description: 'Spesialisasi Bagus Law Firm di bidang Kurator.',
    icon: '⚖️',
  },
  {
    id: 3,
    title: 'Konsultan Pajak',
      description: 'Spesialisasi Bagus Law Firm di bidang Konsultan Pajak.',
    icon: '💰',
  },
  {
    id: 4,
    title: 'Konsultan Perizinan',
      description: 'Spesialisasi Bagus Law Firm di bidang Konsultan Perizinan.',
    icon: '📋',
  },
  {
    id: 5,
    title: 'Penerjemah Tersumpah',
      description: 'Spesialisasi Bagus Law Firm di bidang Penerjemah Tersumpah.',
    icon: '🌐',
  },
];

export default function SpecializationsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Spesialisasi kami
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto italic">
              Dengan dedikasi terhadap keunggulan dan integritas dalam penegakan
              keadilan, kami menghadirkan beragam layanan hukum yang terfokus dan
              disesuaikan secara tepat dengan kebutuhan spesifik Anda.
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.map((spec, index) => (
            <ScrollAnimation key={spec.id} direction="up" delay={index * 100}>
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{spec.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {spec.title}
                </h3>
                <p className="text-gray-700">{spec.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

