import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import { getPracticeAreas } from '../../../lib/cms';
import ScrollAnimation from '../../components/ScrollAnimation';
import { getBuildingImage } from '@/lib/building-images';

// Lazy load Footer
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practiceAreas = await getPracticeAreas();
  const practiceArea = practiceAreas.find(area => area.slug === slug);

  if (!practiceArea) {
    return {
      title: 'Practice Area Not Found - Bagus Law Firm',
    };
  }

  return {
    title: `${practiceArea.title} - Bagus Law Firm`,
    description: practiceArea.shortDescription || practiceArea.description,
  };
}

// Generate static params for all practice areas
export async function generateStaticParams() {
  try {
    const practiceAreas = await getPracticeAreas();
    if (practiceAreas && practiceAreas.length > 0) {
      return practiceAreas.map((area) => ({
        slug: area.slug,
      }));
    }
  } catch (error) {
    console.warn('Error fetching practice areas for params, using fallback');
  }

  // Fallback to prevent build errors
  return [{ slug: 'coming-soon' }];
}

export default async function PracticeAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const practiceAreas = await getPracticeAreas();
  const practiceArea = practiceAreas.find(area => area.slug === slug);

  if (!practiceArea) {
    notFound();
  }

  return (
    <div
      className="min-h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 font-sans selection:bg-accent selection:text-white transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(3)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/80 backdrop-blur-[2px] transition-colors duration-300"></div>

      {/* Industrial Grid Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-900/5 dark:border-white/5"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation variant="default" />

        {/* Header Section */}
        <div className="pt-32 pb-8 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider mb-6 text-slate-500 dark:text-slate-400">
              <Link
                href="/"
                className="hover:text-accent transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/practice-areas"
                className="hover:text-accent transition-colors"
              >
                Practice Areas
              </Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-bold">
                {practiceArea.title}
              </span>
            </nav>

            <ScrollAnimation direction="up">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-6">
                {practiceArea.title}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={100}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {practiceArea.description}
              </p>
            </ScrollAnimation>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <ScrollAnimation direction="up">
                <section className="bg-white/80 dark:bg-slate-900/60 p-8 border border-slate-200 dark:border-white/10 backdrop-blur-sm relative group">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight flex items-center">
                    <span className="w-1 h-6 bg-accent mr-4 inline-block"></span>
                    Overview
                  </h2>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {practiceArea.overview || practiceArea.description}
                  </p>
                </section>
              </ScrollAnimation>

              {/* Services */}
              <ScrollAnimation direction="up" delay={100}>
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight flex items-center">
                    <span className="w-1 h-6 bg-slate-400 dark:bg-slate-600 mr-4 inline-block"></span>
                    Layanan Kami
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(practiceArea.services && practiceArea.services.length > 0 ? practiceArea.services : ['Konsultasi hukum', 'Pendampingan proses', 'Dokumentasi legal']).map((service, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 hover:border-accent/50 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
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
                        <span className="text-slate-700 dark:text-slate-300">{service}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollAnimation>

              {/* Expertise */}
              <ScrollAnimation direction="up" delay={200}>
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight flex items-center">
                    <span className="w-1 h-6 bg-slate-400 dark:bg-slate-600 mr-4 inline-block"></span>
                    Keahlian Kami
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {(practiceArea.expertise && practiceArea.expertise.length > 0 ? practiceArea.expertise : ['Hukum Nasional', 'Kepatuhan Regulasi', 'Strategi Legal']).map((item, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent transition-colors uppercase tracking-wider text-xs"
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
                <div className="bg-white/90 dark:bg-slate-900/80 p-6 sticky top-24 border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-xl">
                  <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">
                    Need Assistance?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                    Tim hukum kami siap memberikan pendampingan strategis untuk kasus Anda.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-slate-900 text-white px-6 py-4 font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors mb-4"
                  >
                    Hubungi Kami
                  </Link>
                  <Link
                    href="/practice-areas"
                    className="block w-full text-center bg-transparent text-slate-600 dark:text-slate-400 px-6 py-4 font-bold uppercase tracking-widest text-xs hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                  >
                    Lihat Area Lain
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm py-16 relative z-10 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                Siap Memulai Konsultasi?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Hubungi kami sekarang untuk mendapatkan konsultasi hukum profesional
                terkait {practiceArea.title}.
              </p>
              <div className="inline-block relative group">
                <Link
                  href="/contact"
                  className="relative flex items-center px-8 py-4 bg-accent text-white font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-accent/40"
                >
                  <span>Jadwalkan Konsultasi</span>
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

