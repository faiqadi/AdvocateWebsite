'use client';

import ScrollAnimation from './ScrollAnimation';
import Link from 'next/link';

const benefits = [
  {
    id: 1,
    icon: '01',
    title: 'Konsultasi Hukum Profesional',
    description: 'Dapatkan nasihat hukum dari tim ahli yang berpengalaman lebih dari satu dekade.',
  },
  {
    id: 2,
    icon: '02',
    title: 'Layanan Terpercaya',
    description: 'Komitmen terhadap integritas dan profesionalisme dalam setiap layanan yang kami berikan.',
  },
  {
    id: 3,
    icon: '03',
    title: 'Pengalaman Global',
    description: 'Pengalaman luas dalam transaksi hukum domestik maupun internasional.',
  },
  {
    id: 4,
    icon: '04',
    title: 'Spesialisasi Beragam',
    description: 'Layanan hukum yang mencakup berbagai sektor industri dan bidang praktik.',
  },
  {
    id: 5,
    icon: '05',
    title: 'Kerahasiaan Terjamin',
    description: 'Setiap pembicaraan dan informasi klien dijaga dengan ketat dan profesional.',
  },
  {
    id: 6,
    icon: '06',
    title: 'Solusi Efektif',
    description: 'Pendekatan strategis untuk menyelesaikan masalah hukum dengan efisien.',
  },
];

export default function ManfaatKerjaSamaSection() {
  return (
    <section className="py-24 relative bg-slate-950 border-t border-slate-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="mb-16">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">
              Manfaat <span className="text-slate-600">Kerja Sama</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl border-l-2 border-accent pl-6">
              Pilih Bagus Law Firm sebagai partner hukum Anda dan dapatkan berbagai
              keuntungan yang akan membantu bisnis Anda berkembang.
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <ScrollAnimation key={benefit.id} direction="up" delay={index * 100}>
              <div className="group bg-slate-900 p-8 border border-slate-800 hover:border-accent transition-all duration-300 relative overflow-hidden">
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

                <div className="relative z-10">
                  <div className="text-5xl font-bold text-slate-800 mb-6 font-mono group-hover:text-accent/20 transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-accent transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation direction="up" delay={600}>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-12 text-center relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white uppercase tracking-wider">
                Siap Memulai Kerja Sama?
              </h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi hukum
                terbaik untuk kebutuhan bisnis Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-accent text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-slate-900 transition-colors"
                >
                  Hubungi Kami
                </Link>
                <Link
                  href="/practice-areas"
                  className="px-8 py-4 border border-slate-600 text-white font-bold text-sm tracking-[0.2em] uppercase hover:border-white hover:bg-white/5 transition-colors"
                >
                  Lihat Layanan
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
