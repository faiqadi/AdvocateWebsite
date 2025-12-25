'use client';

import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

interface PracticeArea {
  id: string | number;
  title: string;
  description: string;
  slug: string;
  icon?: string;
}

interface PracticeAreasSectionProps {
  practiceAreas?: PracticeArea[];
}

export default function PracticeAreasSection({ practiceAreas = [] }: PracticeAreasSectionProps) {
  // Use passed data or fallback to empty array
  const displayAreas = practiceAreas.length > 0 ? practiceAreas : [];

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Wilayah Praktek
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Tim terbaik dari kantor kami memberikan analisa, nasehat serta
              tindakan hukum secara profesional.
            </p>
          </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAreas.map((area, index) => (
            <ScrollAnimation key={area.id} direction="up" delay={index * 50}>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-accent border border-transparent hover:-translate-y-1">
                {area.icon && <div className="text-4xl mb-4">{area.icon}</div>}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{area.description}</p>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="text-accent font-semibold hover:underline inline-flex items-center"
                >
                  Detail
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

