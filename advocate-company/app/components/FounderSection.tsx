'use client';

import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

export default function FounderSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Founder
            </h2>
          </ScrollAnimation>
        </div>

        <div className="max-w-4xl mx-auto">
          <ScrollAnimation direction="up" delay={100}>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 bg-blue-900 rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                    BL
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    BAGUS PRATAMA, S.H., M.H., CTL
                  </h3>
                  <p className="text-xl text-blue-900 dark:text-blue-400 font-semibold mb-4">
                    Founder & Senior Lawyer
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Sebagai pendiri Bagus Law Firm, saya berkomitmen untuk memberikan 
                    layanan hukum terbaik dengan pengalaman lebih dari satu dekade di 
                    bidang hukum domestik dan internasional. Dengan tim yang profesional 
                    dan berdedikasi, kami siap membantu menyelesaikan berbagai kebutuhan 
                    hukum Anda.
                  </p>
                  <Link
                    href="/profiles"
                    className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
                  >
                    Lihat Profil Lengkap
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

