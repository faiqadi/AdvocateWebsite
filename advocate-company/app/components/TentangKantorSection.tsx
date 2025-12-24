'use client';

import ScrollAnimation from './ScrollAnimation';
import { getBuildingImage } from '@/lib/building-images';

export default function TentangKantorSection() {
  return (
    <section
      className="py-24 relative bg-white dark:bg-slate-950 transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(5)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/80 backdrop-blur-[2px] transition-colors duration-300"></div>

      {/* Abstract Industrial Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full border-l border-slate-200 dark:border-slate-800"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-left mb-16 border-b border-slate-200 dark:border-slate-800 pb-8">
          <ScrollAnimation direction="up">
            <div className="flex items-center gap-4 mb-2">
              <span className="w-12 h-[2px] bg-accent"></span>
              <span className="text-accent font-mono text-sm tracking-widest uppercase">About The Firm</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              <span className="inline-block border-l-4 border-accent pl-4">Tentang Kantor</span>
            </h2>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollAnimation direction="left" delay={100}>
            <div className="relative">
              {/* Technical Corner Markers */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-slate-700"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-slate-700"></div>

              <div className="bg-white/90 dark:bg-slate-900/50 backdrop-blur-sm p-8 border border-slate-200 dark:border-slate-800">
                <div className="space-y-6 text-slate-600 dark:text-slate-300">
                  <p className="text-lg leading-relaxed">
                    Bagus Law Firm yang sekarang kami menyebut dengan penamaan
                    <span className="font-bold text-slate-900 dark:text-white"> BAGUS LAW</span> merupakan salah satu firma hukum yang berbentuk badan hukum
                    yang telah dikenal oleh masyarakat luas.
                  </p>
                  <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800"></div>
                  <p className="text-lg leading-relaxed">
                    Kami telah memiliki pengalaman lebih dari satu dekade baik pada
                    pengalaman domestik maupun internasional yang berfokus pada pelayanan
                    dan pengembangan segala transaksi hukum perusahaan diberbagai sektor
                    industri.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Lawfirm kami memiliki para konsultan hukum dan para lawyer yang ahli
                    di bidangnya untuk menjawab tantangan global terutama pada sektor
                    industri.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={200}>
            <div className="space-y-8">
              {/* Vision Card */}
              <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 hover:border-accent/50 transition-colors duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase">Visi</h3>
                  <span className="text-4xl text-slate-200 dark:text-slate-800 font-bold group-hover:text-accent/20 transition-colors">01</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Menjadi firma hukum terpercaya dan profesional yang memberikan solusi hukum terbaik untuk klien di berbagai sektor industri.
                </p>
              </div>

              {/* Mission Card */}
              <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 hover:border-accent/50 transition-colors duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase">Misi</h3>
                  <span className="text-4xl text-slate-200 dark:text-slate-800 font-bold group-hover:text-accent/20 transition-colors">02</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Memberikan layanan hukum berkualitas tinggi dengan integritas, profesionalisme, dan komitmen terhadap keadilan serta kepuasan klien.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
