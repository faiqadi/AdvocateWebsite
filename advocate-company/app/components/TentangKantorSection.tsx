'use client';

import { useEffect, useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import { getBuildingImage } from '@/lib/building-images';
import { fetchWithCache } from '@/lib/cache-client';

// Helper function to process content with // separators
function processContent(content: string): string {
  if (!content) return '';

  // If content already contains HTML tags, process // separators within HTML
  if (content.includes('<p>') || content.includes('<div>') || content.includes('<br')) {
    // Replace // with </p><p> to create new paragraphs
    // But be careful not to break existing HTML structure
    return content
      .replace(/\/\//g, '</p><p>')
      .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
      .replace(/ESH LAW FIRM/g, '<span class="font-bold text-slate-900 dark:text-white">ESH LAW FIRM</span>');
  }

  // Split by // separator and wrap each part in <p> tags
  const paragraphs = content
    .split('//')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  // If no // found, wrap entire content in <p> tag
  if (paragraphs.length === 0) {
    return `<p>${content.replace(/ESH LAW FIRM/g, '<span class="font-bold text-slate-900 dark:text-white">ESH LAW FIRM</span>')}</p>`;
  }

  // Wrap each paragraph in <p> tags
  return paragraphs.map(p =>
    `<p>${p.replace(/ESH LAW FIRM/g, '<span class="font-bold text-slate-900 dark:text-white">ESH LAW FIRM</span>')}</p>`
  ).join('');
}

interface TentangKantor {
  id: string;
  title: string;
  content: string;
}

export default function TentangKantorSection() {
  const [kantorData, setKantorData] = useState<TentangKantor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTentangKantor() {
      setLoading(true);
      setError('');
      try {
        const json = await fetchWithCache<{ docs: TentangKantor[]; totalDocs: number }>(
          '/api/cms/tentang-kantor'
        );
        // Artificial delay for smoother transition feel
        await new Promise(resolve => setTimeout(resolve, 300));
        setKantorData(json.docs || []);
      } catch (err: any) {
        console.error('Error fetching tentang kantor:', err);
        // Don't show error, just use fallback data
        setKantorData([]);
        setError('');
      } finally {
        setLoading(false);
      }
    }

    fetchTentangKantor();
  }, []);

  // Get the first item or fallback content
  const kantor = kantorData[0] || {
    title: 'Tentang Kantor',
    content: `Bagus Law Firm yang sekarang kami menyebut dengan penamaan <span class="font-bold text-slate-900 dark:text-white"> BAGUS LAW</span> merupakan salah satu firma hukum yang berbentuk badan hukum yang telah dikenal oleh masyarakat luas.

Kami telah memiliki pengalaman lebih dari satu dekade baik pada pengalaman domestik maupun internasional yang berfokus pada pelayanan dan pengembangan segala transaksi hukum perusahaan diberbagai sektor industri.

Lawfirm kami memiliki para konsultan hukum dan para lawyer yang ahli di bidangnya untuk menjawab tantangan global terutama pada sektor industri.`
  };

  return (
    <section
      className="py-24 relative bg-white dark:bg-slate-950 transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(5)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/80 backdrop-blur-[2px] transition-colors duration-300"></div>

      {/* Abstract Industrial Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full border-l border-slate-200 dark:border-slate-800"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-left mb-16 border-b border-slate-200 dark:border-slate-800 pb-8">
          <ScrollAnimation direction="up">
            <div className="flex items-center gap-4 mb-2">
              <span className="w-12 h-[2px] bg-accent"></span>
              <span className="text-accent font-mono text-sm tracking-widest uppercase">About The Firm</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              <span className="inline-block border-l-4 border-accent pl-4">{kantor.title}</span>
            </h2>
          </ScrollAnimation>
        </div>

        <div className="max-w-4xl mx-auto">
          <ScrollAnimation direction="up" delay={100}>
            <div className="relative">
              {/* Technical Corner Markers */}
              <div className="absolute -top-4 -left-4 w-8 h-8 md:w-12 md:h-12 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-slate-800 dark:border-slate-400"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 md:w-12 md:h-12 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-slate-800 dark:border-slate-400"></div>
              {/* Inner Decorative Lines */}
              <div className="absolute top-4 -right-4 w-1 h-32 bg-slate-300 dark:bg-slate-700"></div>
              <div className="absolute -bottom-4 left-4 h-1 w-32 bg-slate-300 dark:bg-slate-700"></div>

              <div className="bg-white/90 dark:bg-slate-900/50 backdrop-blur-sm p-8 border border-slate-200 dark:border-slate-800">
                <div className="space-y-6 text-slate-600 dark:text-slate-300">
                  {loading ? (
                    <div className="space-y-4">
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded animate-pulse w-5/6"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded animate-pulse w-4/6"></div>
                    </div>
                  ) : error ? (
                    <div className="text-red-500 font-mono text-sm border border-red-900/30 bg-red-900/10 p-4">
                      ERROR: {error}
                    </div>
                  ) : (
                    <div
                      className="text-lg leading-relaxed prose prose-slate dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: processContent(kantor.content)
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
