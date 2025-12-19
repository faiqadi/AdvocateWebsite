'use client';

import ScrollAnimation from './ScrollAnimation';
import { getBuildingImage } from '@/lib/building-images';

export default function TentangKantorSection() {
  return (
    <section 
      className="py-16 relative transition-colors duration-200"
      style={{
        backgroundImage: `url(${getBuildingImage(1)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-950/90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <div className="inline-block bg-white/90 dark:bg-transparent backdrop-blur-sm rounded-lg px-8 py-4 shadow-lg border border-gray-200/50 dark:border-transparent">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-0">
                Tentang Kantor
              </h2>
            </div>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimation direction="left" delay={100}>
            <div className="bg-white/90 dark:bg-transparent backdrop-blur-sm rounded-lg p-8 shadow-xl border border-gray-200/50 dark:border-transparent">
              <div className="space-y-6">
                <p className="text-lg text-gray-900 dark:text-gray-200 leading-relaxed">
                  Bagus Law Firm yang sekarang kami menyebut dengan penamaan
                  <span className="font-semibold text-blue-700 dark:text-blue-400"> BAGUS LAW</span> merupakan salah satu firma hukum yang berbentuk badan hukum
                  yang telah dikenal oleh masyarakat luas.
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200 leading-relaxed">
                  Kami telah memiliki pengalaman lebih dari satu dekade baik pada
                  pengalaman domestik maupun internasional yang berfokus pada pelayanan
                  dan pengembangan segala transaksi hukum perusahaan diberbagai sektor
                  industri.
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200 leading-relaxed">
                  Lawfirm kami memiliki para konsultan hukum dan para lawyer yang ahli
                  di bidangnya untuk menjawab tantangan global terutama pada sektor
                  industri.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={200}>
            <div className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-lg p-8 text-gray-900 dark:text-white shadow-2xl border border-gray-300/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Visi & Misi</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">Visi</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Menjadi firma hukum terpercaya dan profesional yang memberikan solusi hukum terbaik untuk klien di berbagai sektor industri.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">Misi</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Memberikan layanan hukum berkualitas tinggi dengan integritas, profesionalisme, dan komitmen terhadap keadilan serta kepuasan klien.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

