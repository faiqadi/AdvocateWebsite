import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { getBuildingImage } from '@/lib/building-images';
import ScrollAnimation from '../components/ScrollAnimation';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Practice Areas - Bagus Law Firm',
  description: 'Telusuri bidang praktik unggulan kami untuk mengetahui bagaimana kami dapat mendampingi Anda dalam menghadapi berbagai tantangan hukum dengan kepercayaan diri dan solusi yang tepat.',
};

export default function PracticeAreasPage() {
  const practiceAreas = [
    {
      title: 'Antimonopoli dan Perdagangan Internasional',
      description: 'Layanan hukum strategis untuk persaingan usaha sehat dan transaksi lintas batas yang kompleks.'
    },
    {
      title: 'Litigasi and Alternative Dispute Resolution',
      description: 'Penyelesaian sengketa efektif melalui jalur litigasi maupun mediasi dan arbitrase.'
    },
    {
      title: 'PKPU dan Kepailitan',
      description: 'Pendampingan hukum menyeluruh dalam proses restrukturisasi utang dan kepailitan.'
    },
    {
      title: 'Perumahan dan Aset',
      description: 'Solusi hukum terkait properti, real estate, dan manajemen aset berharga.'
    },
    {
      title: 'Pembiayaan Keuangan',
      description: 'Konsultasi ahli dalam struktur pembiayaan, perbankan, dan instrumen keuangan.'
    },
    {
      title: 'Minyak & Gas',
      description: 'Keahlian hukum mendalam pada sektor energi hulu hingga hilir.'
    },
    {
      title: 'Merger dan Akuisisi',
      description: 'Pendampingan transaksi korporasi strategis untuk ekspansi dan konsolidasi bisnis.'
    },
    {
      title: 'Keuangan Syariah',
      description: 'Layanan hukum perbankan dan keuangan yang patuh pada prinsip-prinsip Syariah.'
    },
    {
      title: 'Investasi',
      description: 'Panduan hukum komprehensif untuk penanaman modal asing dan domestik di Indonesia.'
    },
    {
      title: 'Teknologi Informasi, E-commerce, Media and Telekomunikasi',
      description: 'Hukum siber dan teknologi untuk bisnis digital modern dan telekomunikasi.'
    },
    {
      title: 'Kesehatan',
      description: 'Advokasi hukum untuk rumah sakit, farmasi, dan penyedia layanan kesehatan.'
    },
    {
      title: 'Perkebunan dan Kehutanan',
      description: 'Navigasi regulasi agraria dan lingkungan untuk industri perkebunan dan kehutanan.'
    },
    {
      title: 'Kejahatan Penipuan dan Investigasi Forensik',
      description: 'Penanganan kasus white-collar crime dan investigasi kepatuhan korporasi.'
    },
    {
      title: 'Lingkungan',
      description: 'Kepatuhan regulasi lingkungan dan penanganan sengketa dampak lingkungan.'
    },
    {
      title: 'Energi, Infrastruktur dan Sumber Daya Mineral',
      description: 'Dukungan hukum untuk proyek infrastruktur vital dan pertambangan.'
    },
    {
      title: 'Korporasi dan Komersial',
      description: 'Layanan hukum umum untuk operasional bisnis sehari-hari dan kontrak komersial.'
    },
    {
      title: 'Pariwisata dan Perhotelan',
      description: 'Hukum hospitalitas untuk pengembangan hotel, resor, dan manajemen pariwisata.'
    },
    {
      title: 'Penerbangan',
      description: 'Regulasi aviasi, pembiayaan pesawat, dan penyelesaian sengketa penerbangan.'
    },
    {
      title: 'Pelayaran',
      description: 'Hukum maritim untuk logistik laut, perkapalan, dan asuransi kelautan.'
    },
    {
      title: 'Imigrasi dan Ketenagakerjaan',
      description: 'Solusi ketenagakerjaan, izin kerja ekspatriat, dan hubungan industrial.'
    },
  ];

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
            {practiceAreas.map((area, index) => {
              // Create slug from area name
              const slug = area.title
                .toLowerCase()
                .replace(/[&]/g, 'dan')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

              return (
                <ScrollAnimation key={index} direction="up" delay={index * 50}>
                  <Link
                    href={`/practice-areas/${slug}`}
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
                      {area.description}
                    </p>
                  </Link>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>

        {/* Consultation Section */}
        <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm py-16 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimation direction="up">
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                Jadwalkan Konsultasi
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Tim kami akan memberikan respons secara profesional dan segera membantu
                Anda dalam mengatur waktu konsultasi yang sesuai dengan kebutuhan Anda.
              </p>
              <div className="inline-block relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-orange-600 rounded-sm blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <Link
                  href="/contact"
                  className="relative flex items-center px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs border border-slate-700 hover:border-accent transition-all duration-300"
                >
                  <span>Hubungi Kami</span>
                  <svg className="w-4 h-4 ml-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
