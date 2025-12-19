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
    // Auto slide every 6 seconds (longer for smoother experience)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset auto slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
    }, 6000);
  };

  return (
    <section 
      className="py-16 relative transition-colors duration-200"
      style={{
        backgroundImage: `url(${getBuildingImage(7)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-950/85"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Founder
            </h2>
          </ScrollAnimation>
        </div>

        <div className="max-w-4xl mx-auto">
          <ScrollAnimation direction="up" delay={100}>
            <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12 relative overflow-hidden border border-gray-700/50">
              {/* Founder Cards */}
              <div className="relative min-h-[400px] md:min-h-[300px]">
                {founders.map((founder, index) => (
                  <div
                    key={founder.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentIndex
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      <div className="flex-shrink-0">
                        {founder.photo ? (
                          <img
                            src={founder.photo}
                            alt={founder.name}
                            className="w-40 h-40 rounded-full object-cover mx-auto shadow-lg transition-transform duration-1000 ease-in-out"
                            style={{
                              transform: index === currentIndex ? 'scale(1)' : 'scale(0.95)',
                            }}
                          />
                        ) : (
                          <div 
                            className="w-40 h-40 bg-blue-900 dark:bg-blue-800 rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold shadow-lg transition-transform duration-1000 ease-in-out"
                            style={{
                              transform: index === currentIndex ? 'scale(1)' : 'scale(0.95)',
                            }}
                          >
                            {founder.initials}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 
                          className="text-2xl md:text-3xl font-bold text-white mb-3 transition-all duration-1000 ease-in-out"
                          style={{
                            transform: index === currentIndex ? 'translateY(0)' : 'translateY(10px)',
                            opacity: index === currentIndex ? 1 : 0.7,
                          }}
                        >
                          {founder.name}
                        </h3>
                        <p 
                          className="text-xl text-blue-400 font-semibold mb-4 transition-all duration-1000 ease-in-out delay-100"
                          style={{
                            transform: index === currentIndex ? 'translateY(0)' : 'translateY(10px)',
                            opacity: index === currentIndex ? 1 : 0.7,
                          }}
                        >
                          {founder.title}
                        </p>
                        <p 
                          className="text-gray-200 leading-relaxed mb-6 transition-all duration-1000 ease-in-out delay-200"
                          style={{
                            transform: index === currentIndex ? 'translateY(0)' : 'translateY(10px)',
                            opacity: index === currentIndex ? 1 : 0.7,
                          }}
                        >
                          {founder.description}
                        </p>
                        <Link
                          href="/profiles"
                          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg delay-300"
                          style={{
                            transform: index === currentIndex ? 'translateY(0)' : 'translateY(10px)',
                            opacity: index === currentIndex ? 1 : 0.7,
                          }}
                        >
                          Lihat Profil Lengkap
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              {founders.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {founders.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-blue-500 w-8'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Arrows */}
              {founders.length > 1 && (
                <>
                  <button
                    onClick={() => goToSlide((currentIndex - 1 + founders.length) % founders.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/90 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-10 border border-gray-600"
                    aria-label="Previous founder"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => goToSlide((currentIndex + 1) % founders.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/90 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-10 border border-gray-600"
                    aria-label="Next founder"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
