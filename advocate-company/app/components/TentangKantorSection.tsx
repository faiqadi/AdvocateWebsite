'use client';

import ScrollAnimation from './ScrollAnimation';

export default function TentangKantorSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tentang Kantor
            </h2>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimation direction="left" delay={100}>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Bagus Law Firm yang sekarang kami menyebut dengan penamaan
                <span className="font-semibold text-blue-900 dark:text-blue-400"> BAGUS LAW</span> merupakan salah satu firma hukum yang berbentuk badan hukum
                yang telah dikenal oleh masyarakat luas.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Kami telah memiliki pengalaman lebih dari satu dekade baik pada
                pengalaman domestik maupun internasional yang berfokus pada pelayanan
                dan pengembangan segala transaksi hukum perusahaan diberbagai sektor
                industri.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Lawfirm kami memiliki para konsultan hukum dan para lawyer yang ahli
                di bidangnya untuk menjawab tantangan global terutama pada sektor
                industri.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={200}>
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Visi & Misi</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Visi</h4>
                  <p className="text-blue-100">
                    Menjadi firma hukum terpercaya dan profesional yang memberikan solusi hukum terbaik untuk klien di berbagai sektor industri.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Misi</h4>
                  <p className="text-blue-100">
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

