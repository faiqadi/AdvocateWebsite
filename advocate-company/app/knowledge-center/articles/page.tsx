'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';
import Link from 'next/link';
import type { Article } from '@/lib/cms';
import { fetchWithCache } from '@/lib/cache-client';
import ScrollAnimation from '../../components/ScrollAnimation';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError('');
      try {
        const json = await fetchWithCache<{ docs: Article[]; totalDocs: number }>(
          '/api/cms/articles?category=articles&status=active&sort=-publishedDate'
        );
        setArticles(json.docs || []);
      } catch (err: any) {
        console.error('Error fetching articles:', err);
        setError('Gagal memuat artikel.');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 font-sans selection:bg-accent selection:text-white transition-colors duration-300">
      {/* Industrial Grid Texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-200 dark:border-slate-800/30"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation variant="default" />

        {/* Header Section */}
        <div className="pt-32 pb-12 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-block py-1 px-2 border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-4">
                  Archive
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">
                  Legal Articles
                </h1>
              </div>
              <p className="max-w-xl text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-800 pl-4 transition-colors duration-300">
                Kumpulan artikel hukum komprehensif yang disusun oleh tim ahli Bagus Law Firm.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 w-1/4 mb-4"></div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="p-8 text-center text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
              {error}
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="p-12 text-center border border-slate-200 dark:border-slate-800 border-dashed text-slate-500 italic">
              Belum ada artikel yang dipublikasikan.
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="space-y-6">
              {articles.map((article, index) => (
                <ScrollAnimation key={article.id} direction="up" delay={index * 50}>
                  <article className="relative group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg dark:shadow-none">
                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider font-bold">
                        Article
                      </span>
                      <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
                      <time className="text-xs text-slate-500 font-mono uppercase">
                        {formatDate(article.publishedDate)}
                      </time>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-accent transition-colors">
                      <Link
                        href={`/knowledge-center/articles/${encodeURIComponent(article.slug || article.id)}`}
                        onClick={() => {
                          const articleKey = `article_${article.slug || article.id}`;
                          localStorage.setItem(articleKey, JSON.stringify({
                            ...article,
                            cachedAt: Date.now()
                          }));
                        }}
                      >
                        {article.title}
                      </Link>
                    </h3>

                    {article.excerpt && (
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                      <Link
                        href={`/knowledge-center/articles/${encodeURIComponent(article.slug || article.id)}`}
                        className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white hover:text-accent uppercase tracking-wider group/link"
                      >
                        Read Full Article
                        <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </article>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
