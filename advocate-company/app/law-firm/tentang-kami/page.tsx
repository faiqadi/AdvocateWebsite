'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';
import Link from 'next/link';
import ScrollAnimation from '../../components/ScrollAnimation';
import { fetchWithCache } from '@/lib/cache-client';
import { getBuildingImage } from '@/lib/building-images';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

interface AboutUs {
  id: string;
  title?: string;
  content: string;
  order: number;
  active: boolean;
}

export default function TentangKamiPage() {
  const [content, setContent] = useState<AboutUs[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback content if Google Sheets is not configured or empty
  const defaultContent: AboutUs[] = [
    {
      id: 'default-1',
      title: '',
      content: 'Bagus Law Firm merupakan perusahaan yang bergerak dalam bidang jasa pelayanan konsultasi hukum serta penanganan perkara hukum, khususnya terkait kegiatan ekonomi dan bisnis. Bagus Law Firm memiliki dua kantor yakni di Kota Jakarta dan Semarang. Pengelolaan kedua kantor tersebut dilakukan secara profesional dan independen dan memiliki standar operasional yang berkualitas. Transparansi antara klien dengan pengacara merupakan nilai lebih dalam pelaksanaan penanganan perkara dalam firma hukum ini.',
      order: 1,
      active: true,
    },
    {
      id: 'default-2',
      title: '',
      content: 'Bagus Law Firm yang sekarang kami menyebut dengan penamaan BAGUS LAW merupakan salah satu firma hukum yang berbentuk badan hukum yang telah dikenal oleh masyarakat luas. Kami telah memiliki pengalaman lebih dari satu dekade baik pada pengalaman domestik maupun internasional yang berfokus pada pelayan dan pengembangan segala transaksi hukum perusahaan diberbagai sektor industri. Lawfirm kami memilik para konsultan hukum dan para lawyer yang ahli di bidangnya untuk menjawab tantangan global terutama pada sektor industri.',
      order: 2,
      active: true,
    },
    {
      id: 'default-3',
      title: '',
      content: 'Lawfirm kami telah bekerja dengan banyak perusahaan domestik dan internasional di berbagai sektor sehingga menciptakan dan memberikan solusi yang efektif serta berfokus pada pengembangan segala transaksi bisnis dan investasi bagi para klien. Sumber daya manusia yang telah kami miliki telah terlatih secara professional dan memiliki kemampuan untuk menganalisa aspek hukum serta menerapkannya yang diharapkan dapat meningkatkan produktifitas bisnis dan industri. Oleh karena itu lawfirm kami adalah salah satu solusi yang anda butuhkan dalam pembangunan dan pengembangan bisnis saudara.',
      order: 3,
      active: true,
    },
  ];

  useEffect(() => {
    async function fetchAboutUs() {
      setLoading(true);
      try {
        const json = await fetchWithCache<{ docs: AboutUs[]; totalDocs: number }>(
          '/api/cms/about-us'
        );
        setContent(json.docs.length > 0 ? json.docs : defaultContent);
      } catch (error) {
        console.error('Error fetching about us:', error);
        // Use default content on error
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutUs();
  }, []);

  const displayContent = content.length > 0 ? content : defaultContent;

  return (
    <div
      className="min-h-screen relative bg-slate-50 dark:bg-slate-950 font-sans selection:bg-accent selection:text-white transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(7)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      {/* Light Mode: White overlay to fade out image for dark text readability */}
      {/* Dark Mode: Dark overlay for white text readability */}
      <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/90 backdrop-blur-[2px] transition-colors duration-300"></div>

      {/* Industrial Grid Texture (Subtle) */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-900/5 dark:border-white/5"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation variant="default" />

        {/* Header Section */}
        <div className="pt-32 pb-12 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-block py-1 px-2 border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-4">
                  Firm Profile
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">
                  Tentang Kami
                </h1>
              </div>
              <p className="max-w-xl text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-4 transition-colors duration-300">
                Membangun kepercayaan melalui integritas, profesionalisme, dan dedikasi dalam setiap layanan hukum yang kami berikan.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse border border-slate-200 dark:border-slate-800 p-8 bg-white/50 dark:bg-slate-900/50">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 w-1/3 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {displayContent.map((item, index) => (
                <ScrollAnimation key={item.id} direction="up" delay={index * 100}>
                  <div className="relative group p-8 bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl backdrop-blur-sm">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>

                    {item.title && (
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wide border-b border-slate-200 dark:border-white/10 pb-4">
                        {item.title}
                      </h2>
                    )}
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-16 text-center">
            <ScrollAnimation direction="up" delay={displayContent.length * 100}>
              <div className="inline-block relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-orange-600 rounded-sm blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <Link
                  href="/profiles"
                  className="relative flex items-center px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-700 hover:border-accent transition-all duration-300"
                >
                  <span>Lihat Profil Tim</span>
                  <svg className="w-4 h-4 ml-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
