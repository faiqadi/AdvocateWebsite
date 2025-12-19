import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import { getPracticeAreaBySlug, getAllPracticeAreas } from '../../../lib/practice-areas-data';
import ScrollAnimation from '../../components/ScrollAnimation';

// Lazy load Footer
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practiceArea = getPracticeAreaBySlug(slug);

  if (!practiceArea) {
    return {
      title: 'Practice Area Not Found - Bagus Law Firm',
    };
  }

  return {
    title: `${practiceArea.title} - Bagus Law Firm`,
    description: practiceArea.description,
  };
}

// Generate static params for all practice areas
export async function generateStaticParams() {
  const practiceAreas = getAllPracticeAreas();
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export default async function PracticeAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const practiceArea = getPracticeAreaBySlug(slug);

  if (!practiceArea) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              {practiceArea.title}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-lg md:text-xl text-center text-blue-100">
              {practiceArea.description}
            </p>
          </ScrollAnimation>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link
              href="/practice-areas"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
            >
              Practice Areas
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {practiceArea.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <ScrollAnimation direction="up">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {practiceArea.overview}
                </p>
              </section>
            </ScrollAnimation>

            {/* Services */}
            <ScrollAnimation direction="up" delay={100}>
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Layanan Kami
                </h2>
                <ul className="space-y-4">
                  {practiceArea.services.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="w-6 h-6 text-blue-900 dark:text-blue-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-lg">{service}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollAnimation>

            {/* Expertise */}
            <ScrollAnimation direction="up" delay={200}>
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Keahlian Kami
                </h2>
                <div className="flex flex-wrap gap-3">
                  {practiceArea.expertise.map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </ScrollAnimation>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ScrollAnimation direction="up" delay={300}>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Butuh Bantuan?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Tim kami siap membantu Anda dengan layanan hukum profesional.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center bg-blue-900 dark:bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors mb-4"
                >
                  Hubungi Kami
                </Link>
                <Link
                  href="/practice-areas"
                  className="block w-full text-center bg-white dark:bg-gray-700 text-blue-900 dark:text-blue-400 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-blue-900 dark:border-blue-400"
                >
                  Lihat Practice Areas Lainnya
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai Konsultasi?
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Hubungi kami sekarang untuk mendapatkan konsultasi hukum profesional
              terkait {practiceArea.title.toLowerCase()}.
            </p>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Jadwalkan Konsultasi
            </Link>
          </ScrollAnimation>
        </div>
      </div>

      <Footer />
    </div>
  );
}


