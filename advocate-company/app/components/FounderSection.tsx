'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';
import { getBuildingImage } from '@/lib/building-images';

interface Founder {
  id: string;
  name: string;
  title: string;
  description: string;
  initials: string;
  photo?: string;
}

const founders: Founder[] = [
  {
    id: '1',
    name: 'BAGUS PRATAMA, S.H., M.H., CTL',
    title: 'Founder & Senior Lawyer',
    description: 'Sebagai pendiri Bagus Law Firm, saya berkomitmen untuk memberikan layanan hukum terbaik dengan pengalaman lebih dari satu dekade di bidang hukum domestik dan internasional. Dengan tim yang profesional dan berdedikasi, kami siap membantu menyelesaikan berbagai kebutuhan hukum Anda.',
    initials: 'BP',
  },
  {
    id: '2',
    name: 'FOUNDER KEDUA',
    title: 'Founder & Senior Lawyer',
    description: 'Deskripsi founder kedua. Sebagai salah satu pendiri Bagus Law Firm, saya memiliki pengalaman luas dalam berbagai bidang hukum dan berkomitmen untuk memberikan solusi hukum yang tepat dan efektif bagi klien kami.',
    initials: 'FK',
  },
];

export default function FounderSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
    }, 8000);
  };

  return (
    <section
      className="py-24 relative bg-slate-900 border-t border-slate-800"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idHJhbnNwYXJlbnQiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-4">Leadership</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">The Founders</h2>
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto">
          <ScrollAnimation direction="up" delay={100}>
            <div className="relative bg-slate-950 border border-slate-800 p-8 md:p-12">
              {/* Industrial Top Decoration */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent"></div>

              <div className="relative min-h-[400px] md:min-h-[350px]">
                {founders.map((founder, index) => (
                  <div
                    key={founder.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-8 pointer-events-none'
                      }`}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                      <div className="flex-shrink-0 relative group">
                        {/* Photo Frame */}
                        <div className="absolute inset-0 border-2 border-slate-700 translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>

                        {founder.photo ? (
                          <img
                            src={founder.photo}
                            alt={founder.name}
                            className="w-48 h-48 md:w-56 md:h-56 object-cover bg-slate-800 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-48 h-48 md:w-56 md:h-56 bg-slate-800 relative z-10 flex items-center justify-center border border-slate-700 group-hover:border-accent transition-colors">
                            <span className="text-6xl font-bold text-slate-600 font-mono">{founder.initials}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-center md:text-left pt-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
                          {founder.name}
                        </h3>
                        <p className="text-accent font-mono text-sm tracking-widest mb-6 uppercase">
                          {founder.title}
                        </p>
                        <p className="text-slate-400 leading-relaxed mb-8 text-lg font-light">
                          {founder.description}
                        </p>

                        <Link
                          href="/profiles"
                          className="inline-flex items-center gap-2 text-white border-b border-slate-600 hover:border-accent pb-1 transition-colors uppercase text-sm font-bold tracking-wider"
                        >
                          Full Profile <span className="text-accent">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Angle Navigation */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                <button
                  onClick={() => goToSlide((currentIndex - 1 + founders.length) % founders.length)}
                  className="w-10 h-10 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => goToSlide((currentIndex + 1) % founders.length)}
                  className="w-10 h-10 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
