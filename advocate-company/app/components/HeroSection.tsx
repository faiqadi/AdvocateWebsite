'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { getBuildingImage } from '@/lib/building-images';

const heroSlides = [
  {
    id: 1,
    title: 'KONSULTAN HUKUM',
    subtitle: 'Kami menyediakan Konsultan Hukum terbaik berbasis Mandarin',
    cta: 'CONSULT',
  },
  {
    id: 2,
    title: 'Firma Hukum ahli pada bidang Perizinan',
    subtitle: 'Pembangunan Kawasan Industri di Indonesia',
    cta: 'GET THE LAWYER',
  },
  {
    id: 3,
    title: 'Firma Hukum pada Bidang Minyak dan Gas',
    subtitle: 'Memberikan Saran Hukum yang efektif',
    cta: 'GET THE LAWYER',
  },
  {
    id: 4,
    title: 'Firma Hukum Terpercaya',
    subtitle: 'Memberikan analisa, nasehat serta tindakan hukum secara profesional.',
    description: 'Kami telah memiliki pengalaman lebih dari satu dekade baik pada pengalaman domestik maupun internasional',
    cta: 'GET THE LAWYER',
  },
  {
    id: 5,
    title: 'Firma Hukum Tersukses',
    subtitle: 'Solusi Hukum yang Efektif',
    description: 'Firma Hukum yang terpercaya, profesional dengan dasar keilmuan serta pengalaman dan menjunjung tinggi nilai profesi',
    cta: 'GET THE LAWYER',
  },
  {
    id: 6,
    title: 'Firma Hukum Berkompeten',
    subtitle: 'Regulasi Ekspor dan Import',
    description: 'Memberi kemudahan dalam pengembangan Industri Pasar Global',
    cta: 'GET THE LAWYER',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Pre-fetch images to avoid flicker
  const slideImages = useMemo(() => {
    return heroSlides.map((_, index) => getBuildingImage(index));
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false); // Pause auto-play interaction
    // Resume auto-play after 10s of inactivity if desired, or simplified to just pause
  }, []);

  return (
    <div className="relative h-screen min-h-[700px] flex flex-col md:flex-row overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* Left Column: Content */}
      <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20 bg-white/95 dark:bg-slate-950/90 md:bg-white md:dark:bg-slate-950 transition-colors duration-300">

        {/* Decorative Industrial Background Elements for Left Side */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-800/50"></div>
          <div className="absolute bottom-12 right-0 w-64 h-64 border border-slate-200 dark:border-slate-800/20 rounded-full opacity-20"></div>
        </div>

        {/* Content Slider */}
        <div className="relative min-h-[400px] flex items-center">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out transform ${index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-0 translate-x-10 pointer-events-none'
                }`}
            >
              {/* Accent Line */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-accent"></div>
                <span className="text-accent font-mono text-xs tracking-widest uppercase">Slide 0{index + 1} / 0{heroSlides.length}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight uppercase font-sans tracking-tight transition-colors duration-300">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light mb-8 max-w-lg border-l-4 border-slate-300 dark:border-slate-800 pl-4 py-1 transition-colors duration-300">
                {slide.subtitle}
              </p>

              {slide.description && (
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-500 mb-8 max-w-lg leading-relaxed hidden lg:block transition-colors duration-300">
                  {slide.description}
                </p>
              )}

              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 text-slate-900 dark:text-white font-bold uppercase tracking-[0.2em] text-sm hover:text-accent transition-colors"
              >
                <span className="border-b-2 border-accent pb-1">{slide.cta}</span>
                <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer / Indicators on Left Side */}
        <div className="absolute bottom-8 left-8 md:left-24 flex items-center gap-4">
          <button
            onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
            className="p-2 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-500 hover:text-accent hover:border-accent transition-colors rotate-180"
          >
            →
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 transition-all duration-300 ${index === currentSlide
                  ? 'bg-accent w-8'
                  : 'bg-slate-300 dark:bg-slate-800 w-4 hover:bg-slate-400 dark:hover:bg-slate-700'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
            className="p-2 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-500 hover:text-accent hover:border-accent transition-colors"
          >
            →
          </button>
        </div>

      </div>

      {/* Right Column: Dynamic Image */}
      <div className="absolute inset-0 md:relative md:w-1/2 h-full z-10 md:z-auto">
        {heroSlides.map((_, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url(${slideImages[index]})`
            }}
          >
            {/* Overlay for text readability on mobile, reduced on desktop */}
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/80 md:bg-slate-100/40 md:dark:bg-slate-950/30 md:mix-blend-multiply transition-colors duration-500"></div>

            {/* Industrial Overlay Texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDIwMCwyMDAsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>
          </div>
        ))}

        {/* Right Side Decoration */}
        <div className="absolute bottom-10 right-10 hidden md:block z-20">
          <div className="text-right">
            <div className="text-4xl font-bold text-slate-900/10 dark:text-white/10 font-mono">0{currentSlide + 1}</div>
            <div className="text-xs text-slate-900/20 dark:text-white/20 font-mono tracking-widest">CURRENT DISPLAY</div>
          </div>
        </div>
      </div>

    </div>
  );
}
