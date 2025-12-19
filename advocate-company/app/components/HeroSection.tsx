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
    bgColor: 'bg-blue-900',
  },
  {
    id: 2,
    title: 'Firma Hukum ahli pada bidang Perizinan',
    subtitle: 'Pembangunan Kawasan Industri di Indonesia',
    cta: 'GET THE LAWYER',
    bgColor: 'bg-gray-800',
  },
  {
    id: 3,
    title: 'Firma Hukum pada Bidang Minyak dan Gas',
    subtitle: 'Memberikan Saran Hukum yang efektif',
    cta: 'GET THE LAWYER',
    bgColor: 'bg-blue-800',
  },
  {
    id: 4,
    title: 'Firma Hukum Terpercaya',
    subtitle: 'Memberikan analisa, nasehat serta tindakan hukum secara profesional.',
    description: 'Kami telah memiliki pengalaman lebih dari satu dekade baik pada pengalaman domestik maupun internasional',
    cta: 'GET THE LAWYER',
    bgColor: 'bg-gray-900',
  },
  {
    id: 5,
    title: 'Firma Hukum Tersukses',
    subtitle: 'Solusi Hukum yang Efektif',
    description: 'Firma Hukum yang terpercaya, profesional dengan dasar keilmuan serta pengalaman dan menjunjung tinggi nilai profesi',
    cta: 'GET THE LAWYER',
    bgColor: 'bg-blue-950',
  },
  {
    id: 6,
    title: 'Firma Hukum Berkompeten',
    subtitle: 'Regulasi Ekspor dan Import',
    description: 'Memberi kemudahan dalam pengembangan Industri Pasar Global',
    cta: 'GET THE LAWYER',
    bgColor: 'bg-slate-900',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const buildingImage = useMemo(() => getBuildingImage(0), []);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${buildingImage})`,
          minHeight: '120%',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/75"></div>
      </div>

      {/* Slides */}
      {heroSlides.map((slide, index) => {
        const isOdd = (index + 1) % 2 === 1;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } ${isOdd ? 'bg-white/20' : 'bg-gray-800/20'} flex items-center justify-center`}
          >
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
            {slide.description && (
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                {slide.description}
              </p>
            )}
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
        );
      })}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

