'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';
import { getBuildingImage } from '@/lib/building-images';
import { fetchWithCache } from '@/lib/cache-client';

interface Founder {
  id: string;
  name: string;
  title: string;
  description: string;
  slug?: string;
  photo?: string;
  order?: number;
}

export default function FounderSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchFounders() {
      setLoading(true);
      setError('');
      try {
        const json = await fetchWithCache<{ docs: Founder[]; totalDocs: number }>(
          '/api/cms/founders'
        );
        // Artificial delay for smoother transition feel
        await new Promise(resolve => setTimeout(resolve, 300));
        setFounders(json.docs || []);
      } catch (err: any) {
        console.error('Error fetching founders:', err);
        // Don't show error for founders, just use empty array
        setFounders([]);
        setError('');
      } finally {
        setLoading(false);
      }
    }

    fetchFounders();
  }, []);

  useEffect(() => {
    if (founders.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
      }, 8000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [founders]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (founders.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
      }, 8000);
    }
  };

  return (
    <section
      className="py-24 relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(6)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/80 backdrop-blur-[2px] transition-colors duration-300"></div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idHJhbnNwYXJlbnQiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-4">Leadership</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              <span className="inline-block bg-accent/10 border-l-4 border-accent pl-6 pr-4 py-2">The Founders</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto">
          <ScrollAnimation direction="up" delay={100}>
            <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 md:p-12">
              {/* Industrial Top Decoration */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent"></div>

              <div className="relative min-h-[600px] md:min-h-[350px]">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="space-y-4 text-center">
                      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-slate-500 font-mono text-sm">LOADING FOUNDERS...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-red-500 font-mono border border-red-900/30 bg-red-900/10 p-8">
                      <p className="text-lg mb-2">ERROR</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                ) : founders.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-slate-500 font-mono">
                      <p className="text-lg mb-2">NO_DATA_FOUND</p>
                      <p className="text-sm">No founders data available</p>
                    </div>
                  </div>
                ) : (
                  founders.map((founder, index) => (
                    <div
                      key={founder.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-8 pointer-events-none'
                        }`}
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 pb-16 md:pb-0">
                        <div className="flex-shrink-0 relative group mt-4 md:mt-0">
                          {/* Photo Frame - Industrial Brackets */}
                          <div className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-slate-400 dark:border-slate-600 transition-all group-hover:border-accent"></div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-slate-400 dark:border-slate-600 transition-all group-hover:border-accent"></div>
                          <div className="absolute -bottom-2 -left-2 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-slate-400 dark:border-slate-600 transition-all group-hover:border-accent"></div>
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-slate-400 dark:border-slate-600 transition-all group-hover:border-accent"></div>

                          {/* ID Tag */}
                          <div className="absolute top-2 -left-4 md:top-4 md:-left-6 bg-accent text-white text-[8px] md:text-[10px] font-mono px-2 py-1 -rotate-90 origin-center tracking-widest z-20 shadow-lg">
                            {/* ID: {founder.name.split(' ').map(n => n[0]).join('').toUpperCase()}_00{founder.id} */}
                          </div>

                          {founder.photo ? (
                            <>
                              <img
                                src={founder.photo}
                                alt={founder.name}
                                onError={(e) => {
                                  console.error(`Failed to load founder image for ${founder.name}:`, founder.photo);
                                  const img = e.currentTarget as HTMLImageElement;
                                  const fallback = img.parentElement?.querySelector('.fallback-avatar') as HTMLElement;
                                  if (img && fallback) {
                                    img.style.display = 'none';
                                    fallback.style.display = 'flex';
                                  }
                                }}
                                className="w-50 h-70 md:w-66 md:h-86 object-cover relative z-10 md:grayscale md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 border border-slate-300 dark:border-slate-700"
                              />
                              <div className="fallback-avatar w-40 h-40 md:w-56 md:h-56 bg-slate-100 dark:bg-slate-800 absolute inset-0 z-10 flex items-center justify-center border border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors blueprint-grid" style={{ display: 'none' }}>
                                <span className="text-5xl md:text-6xl font-bold text-slate-300 dark:text-slate-600 font-mono">
                                  {founder.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="w-40 h-40 md:w-56 md:h-56 bg-slate-100 dark:bg-slate-800 relative z-10 flex items-center justify-center border border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors blueprint-grid">
                              <span className="text-5xl md:text-6xl font-bold text-slate-300 dark:text-slate-600 font-mono">
                                {founder.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-center md:text-left pt-2">
                          <h3 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                            {founder.name}
                          </h3>
                          <p className="text-accent font-mono text-xs md:text-sm tracking-widest mb-4 md:mb-6 uppercase">
                            {founder.title}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 md:mb-8 text-base md:text-lg font-light">
                            {founder.description}
                          </p>

                          <Link
                            href={`/profiles/${founder.slug}`}
                            className="inline-flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-400 dark:border-slate-600 hover:border-accent pb-1 transition-colors uppercase text-xs md:text-sm font-bold tracking-wider"
                          >
                            Full Profile <span className="text-accent">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Angle Navigation */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 z-20">
                <button
                  onClick={() => goToSlide((currentIndex - 1 + founders.length) % founders.length)}
                  className="w-8 h-8 md:w-10 md:h-10 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => goToSlide((currentIndex + 1) % founders.length)}
                  className="w-8 h-8 md:w-10 md:h-10 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  →
                </button>
              </div>

            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
