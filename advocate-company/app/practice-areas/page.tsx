'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { getBuildingImage } from '@/lib/building-images';
import ScrollAnimation from '../components/ScrollAnimation';
import type { PracticeArea } from '@/lib/cms';
import { fetchWithCache } from '@/lib/cache-client';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

function PracticeAreaSkeleton() {
  return (
    <div className="block h-full relative group p-8 bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-6 bg-slate-300 dark:bg-slate-700 w-3/4"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 w-8"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 w-full"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 w-5/6"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 w-4/6"></div>
      </div>
    </div>
  );
}

export default function PracticeAreasPage() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPracticeAreas() {
      setLoading(true);
      setError('');
      try {
        const json = await fetchWithCache<{ docs: PracticeArea[]; totalDocs: number }>(
          '/api/cms/practice-areas'
        );
        // Artificial delay for smoother transition feel
        await new Promise(resolve => setTimeout(resolve, 300));
        const areas = json.docs || [];
        console.log('Practice Areas Footer Data:', areas.map(a => ({ title: a.title, order: a.order })));
        setPracticeAreas(areas);
      } catch (err: any) {
        console.error('Error fetching practice areas:', err);
        // Don't show error, just use empty array
        setPracticeAreas([]);
        setError('');
      } finally {
        setLoading(false);
      }
    }

    fetchPracticeAreas();
  }, []);

  return (
    <div
      className="min-h-screen relative bg-slate-50 dark:bg-slate-950 font-sans selection:bg-accent selection:text-white transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(3)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      {/* Light Mode: White overlay to fade out image for dark text readability */}
      {/* Dark Mode: Dark overlay for white text readability */}
      <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/80 backdrop-blur-[2px] transition-colors duration-300"></div>

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
                  Expertise
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">
                  Practice Areas
                </h1>
              </div>
              <p className="max-w-xl text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-4 transition-colors duration-300">
                Telusuri bidang praktik unggulan kami untuk mengetahui bagaimana kami dapat mendampingi Anda dalam menghadapi berbagai tantangan hukum.
              </p>
            </div>
          </div>
        </div>

        {/* Practice Areas Section */}
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Skeleton Loading Grid
              Array.from({ length: 6 }).map((_, i) => (
                <ScrollAnimation key={i} direction="up" delay={i * 50}>
                  <PracticeAreaSkeleton />
                </ScrollAnimation>
              ))
            ) : error ? (
              <div className="col-span-full py-20 text-center text-red-500 font-mono border border-red-900/30 bg-red-900/10 p-8">
                ERROR: {error}
              </div>
            ) : (
              practiceAreas.map((area, index) => {
                return (
                  <ScrollAnimation key={area.id || index} direction="up" delay={index * 50}>
                    <Link
                      href={`/practice-areas/${area.slug}`}
                      className="block h-full relative group p-8 bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl rubik-glitch-hover backdrop-blur-sm"
                    >
                      {/* Corner Accents */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>

                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors uppercase tracking-tight pr-4">
                          {area.title}
                        </h3>
                        <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-accent flex-shrink-0">
                          →
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors leading-relaxed">
                        {area.shortDescription || area.description}
                      </p>
                    </Link>
                  </ScrollAnimation>
                );
              })
            )}
          </div>

          {!loading && !error && practiceAreas.length === 0 && (
            <div className="text-center py-20 border border-slate-200 dark:border-slate-800 border-dashed">
              <p className="text-slate-500 font-mono">NO_DATA_FOUND</p>
            </div>
          )}
        </div>

        {/* Dynamic Footer Section */}
        <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm py-16 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {!loading && !error && practiceAreas.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
                {/* Practice Areas Summary */}
                <ScrollAnimation direction="left">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                      Layanan Kami
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {practiceAreas.slice(0, 6).map((area, index) => (
                        <Link
                          key={area.id}
                          href={`/practice-areas/${area.slug}`}
                          className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors font-medium"
                        >
                          {area.title}
                        </Link>
                      ))}
                      {practiceAreas.length > 6 && (
                        <span className="text-sm text-slate-500 dark:text-slate-500 font-mono">
                          +{practiceAreas.length - 6} lainnya
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Kami menyediakan {practiceAreas.length} bidang praktik hukum spesialis untuk memenuhi berbagai kebutuhan klien kami.
                    </p>
                  </div>
                </ScrollAnimation>

                {/* Statistics */}
                <ScrollAnimation direction="right">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                        {practiceAreas.length}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                        Bidang Praktik
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                        10+
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                        Tahun Pengalaman
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                        24/7
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                        Layanan Konsultasi
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                        ✓
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                        Legal Support
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            )}

            {/* Consultation CTA */}
            <div className="text-center">
              <ScrollAnimation direction="up">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                  Butuh Bantuan Hukum?
                </h2>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Konsultasikan kebutuhan hukum Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik untuk setiap kasus Anda.
                </p>
                <div className="inline-block relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent to-orange-600 rounded-sm blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <Link
                    href="/contact"
                    className="relative flex items-center px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs border border-slate-700 hover:border-accent transition-all duration-300"
                  >
                    <span>Jadwalkan Konsultasi</span>
                    <svg className="w-4 h-4 ml-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
