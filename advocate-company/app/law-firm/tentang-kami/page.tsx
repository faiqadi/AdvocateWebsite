'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';
import Link from 'next/link';
import ScrollAnimation from '../../components/ScrollAnimation';
import { fetchWithCache } from '@/lib/cache-client';
import { getBuildingImage } from '@/lib/building-images';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

interface AboutUs {
  id: string;
  title?: string;
  content: string;
  order: number;
  active: boolean;
}

export default function TentangKamiPage() {
  const [content, setContent] = useState<AboutUs[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback content if Google Sheets is not configured or empty
  const defaultContent: AboutUs[] = [
    {
      id: 'default-1',
      title: '',
      content: 'Bagus Law Firm merupakan perusahaan yang bergerak dalam bidang jasa pelayanan konsultasi hukum serta penanganan perkara hukum, khususnya terkait kegiatan ekonomi dan bisnis. Bagus Law Firm memiliki dua kantor yakni di Kota Jakarta dan Semarang. Pengelolaan kedua kantor tersebut dilakukan secara profesional dan independen dan memiliki standar operasional yang berkualitas. Transparansi antara klien dengan pengacara merupakan nilai lebih dalam pelaksanaan penanganan perkara dalam firma hukum ini.',
      order: 1,
      active: true,
    },
    {
      id: 'default-2',
      title: '',
      content: 'Bagus Law Firm yang sekarang kami menyebut dengan penamaan BAGUS LAW merupakan salah satu firma hukum yang berbentuk badan hukum yang telah dikenal oleh masyarakat luas. Kami telah memiliki pengalaman lebih dari satu dekade baik pada pengalaman domestik maupun internasional yang berfokus pada pelayan dan pengembangan segala transaksi hukum perusahaan diberbagai sektor industri. Lawfirm kami memilik para konsultan hukum dan para lawyer yang ahli di bidangnya untuk menjawab tantangan global terutama pada sektor industri.',
      order: 2,
      active: true,
    },
    {
      id: 'default-3',
      title: '',
      content: 'Lawfirm kami telah bekerja dengan banyak perusahaan domestik dan internasional di berbagai sektor sehingga menciptakan dan memberikan solusi yang efektif serta berfokus pada pengembangan segala transaksi bisnis dan investasi bagi para klien. Sumber daya manusia yang telah kami miliki telah terlatih secara professional dan memiliki kemampuan untuk menganalisa aspek hukum serta menerapkannya yang diharapkan dapat meningkatkan produktifitas bisnis dan industri. Oleh karena itu lawfirm kami adalah salah satu solusi yang anda butuhkan dalam pembangunan dan pengembangan bisnis saudara.',
      order: 3,
      active: true,
    },
  ];

  useEffect(() => {
    async function fetchAboutUs() {
      setLoading(true);
      try {
        const json = await fetchWithCache<{ docs: AboutUs[]; totalDocs: number }>(
          '/api/cms/about-us'
        );
        setContent(json.docs.length > 0 ? json.docs : defaultContent);
      } catch (error) {
        console.error('Error fetching about us:', error);
        // Use default content on error
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutUs();
  }, []);

  const displayContent = content.length > 0 ? content : defaultContent;

  return (
    <div 
      className="min-h-screen relative transition-colors duration-200"
      style={{
        backgroundImage: `url(${getBuildingImage(7)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-950/90"></div>
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <div className="bg-transparent backdrop-blur-sm text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
          </ScrollAnimation>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-white/20 dark:bg-gray-700/50 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-white/20 dark:bg-gray-800/50 rounded mb-2"></div>
                <div className="h-4 bg-white/20 dark:bg-gray-800/50 rounded mb-2"></div>
                <div className="h-4 bg-white/20 dark:bg-gray-800/50 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 text-gray-200 dark:text-gray-300 leading-relaxed">
            {displayContent.map((item, index) => (
            <ScrollAnimation key={item.id} direction="up" delay={index * 100}>
              {item.title && (
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {item.title}
                </h2>
              )}
              <p className="text-base md:text-lg whitespace-pre-line">
                {item.content}
              </p>
            </ScrollAnimation>
          ))}
          </div>
        )}

        {/* Play Firm Profile Button */}
        <div className="mt-10 text-center">
          <ScrollAnimation direction="up" delay={displayContent.length * 100}>
            <Link
              href="/profiles"
              className="inline-block bg-blue-900 dark:bg-blue-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
            >
              Putar Profil Firma
            </Link>
          </ScrollAnimation>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
}
