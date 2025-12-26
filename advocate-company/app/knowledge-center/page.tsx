'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { getArticles } from '@/lib/cms';
import type { Article } from '@/lib/cms';
import ScrollAnimation from '../components/ScrollAnimation';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

export default function KnowledgeCenterPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [news, setNews] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorArticles, setErrorArticles] = useState('');
  const [errorNews, setErrorNews] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      setLoadingArticles(true);
      setErrorArticles('');
      try {
        const docs = await getArticles({
          category: 'articles',
          status: 'active',
          sort: '-publishedDate',
          limit: 5
        });
        setArticles(docs);
      } catch (err: any) {
        console.error('Error fetching articles:', err);
        setErrorArticles('Gagal memuat artikel.');
      } finally {
        setLoadingArticles(false);
      }
    }

    async function fetchNews() {
      setLoadingNews(true);
      setErrorNews('');
      try {
        const docs = await getArticles({
          category: 'news',
          status: 'active',
          sort: '-publishedDate',
          limit: 5
        });
        setNews(docs);
      } catch (err: any) {
        console.error('Error fetching news:', err);
        setErrorNews('Gagal memuat berita.');
      } finally {
        setLoadingNews(false);
      }
    }

    fetchArticles();
    fetchNews();
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
                  Knowledge Base
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">
                  Knowledge Center
                </h1>
              </div>
              <p className="max-w-xl text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-800 pl-4 transition-colors duration-300">
                Pusat informasi, berita terkini, dan analisis hukum mendalam dari Bagus Law Firm.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-16">

              {/* News Section */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">Latest News</h2>
                  <div className="h-px bg-slate-200 dark:bg-slate-800 w-12"></div>
                </div>

                {loadingNews && (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="animate-pulse border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 w-1/4 mb-4"></div>
                        <div className="h-6 bg-slate-200 dark:bg-slate-800 w-3/4 mb-2"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                      </div>
                    ))}
                  </div>
                )}

                {!loadingNews && errorNews && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm">
                    {errorNews}
                  </div>
                )}

                {!loadingNews && !errorNews && news.length === 0 && (
                  <div className="p-8 text-center border border-slate-200 dark:border-slate-800 border-dashed text-slate-500 italic">
                    Belum ada berita yang dipublikasikan.
                  </div>
                )}

                {!loadingNews && !errorNews && news.length > 0 && (
                  <div className="space-y-6">
                    {news.map((item, index) => (
                      <ScrollAnimation key={item.id} direction="up" delay={index * 50}>
                        <article className="relative group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg dark:shadow-none">
                          {/* Corner Accents */}
                          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>

                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                              News
                            </span>
                            <time className="text-xs text-slate-500 font-mono">
                              {formatDate(item.publishedDate)}
                            </time>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                            <Link
                              href={`/knowledge-center/news/${encodeURIComponent(item.slug || item.id)}`}
                              onClick={() => {
                                const newsKey = `news_${item.slug || item.id}`;
                                localStorage.setItem(newsKey, JSON.stringify({
                                  ...item,
                                  cachedAt: Date.now()
                                }));
                              }}
                            >
                              {item.title}
                            </Link>
                          </h3>

                          {item.excerpt && (
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                              {item.excerpt}
                            </p>
                          )}

                          <Link
                            href={`/knowledge-center/news/${encodeURIComponent(item.slug || item.id)}`}
                            className="inline-flex items-center text-xs font-bold text-slate-900 dark:text-white hover:text-accent uppercase tracking-wider group/link"
                          >
                            Read More
                            <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
                          </Link>
                        </article>
                      </ScrollAnimation>
                    ))}

                    <div className="pt-4 text-center">
                      <Link
                        href="/knowledge-center/news"
                        className="inline-block px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-accent hover:text-accent text-xs font-bold uppercase tracking-widest transition-all duration-300"
                      >
                        View All News
                      </Link>
                    </div>
                  </div>
                )}
              </section>

              {/* Articles Section */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">Articles</h2>
                  <div className="h-px bg-slate-200 dark:bg-slate-800 w-12"></div>
                </div>

                {loadingArticles && (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="animate-pulse border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 w-1/4 mb-4"></div>
                        <div className="h-6 bg-slate-200 dark:bg-slate-800 w-3/4 mb-2"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                      </div>
                    ))}
                  </div>
                )}

                {!loadingArticles && errorArticles && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm">
                    {errorArticles}
                  </div>
                )}

                {!loadingArticles && !errorArticles && articles.length === 0 && (
                  <div className="p-8 text-center border border-slate-200 dark:border-slate-800 border-dashed text-slate-500 italic">
                    Belum ada artikel yang dipublikasikan.
                  </div>
                )}

                {!loadingArticles && !errorArticles && articles.length > 0 && (
                  <div className="space-y-6">
                    {articles.map((article, index) => (
                      <ScrollAnimation key={article.id} direction="up" delay={index * 50}>
                        <article className="relative group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg dark:shadow-none">
                          {/* Corner Accents */}
                          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-300 dark:border-slate-700 group-hover:border-accent transition-colors"></div>

                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                              Article
                            </span>
                            <time className="text-xs text-slate-500 font-mono">
                              {formatDate(article.publishedDate)}
                            </time>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
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
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>
                          )}

                          <Link
                            href={`/knowledge-center/articles/${encodeURIComponent(article.slug || article.id)}`}
                            className="inline-flex items-center text-xs font-bold text-slate-900 dark:text-white hover:text-accent uppercase tracking-wider group/link"
                          >
                            Read Article
                            <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
                          </Link>
                        </article>
                      </ScrollAnimation>
                    ))}

                    <div className="pt-4 text-center">
                      <Link
                        href="/knowledge-center/articles"
                        className="inline-block px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-accent hover:text-accent text-xs font-bold uppercase tracking-widest transition-all duration-300"
                      >
                        View All Articles
                      </Link>
                    </div>
                  </div>
                )}
              </section>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ScrollAnimation direction="left" delay={200}>
                  <div className="bg-white dark:bg-slate-900 border-l-4 border-slate-900 dark:border-slate-700 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
                      Did You Know?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Bagus Law Firm regularly publishes insights on the latest legal developments in Indonesia. Stay updated with our expert analyses.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Quick Navigation</h4>
                      <nav className="flex flex-col space-y-2">
                        <Link
                          href="/knowledge-center/news"
                          className="block p-3 border border-slate-200 dark:border-slate-800 hover:border-accent hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          Latest News
                        </Link>
                        <Link
                          href="/knowledge-center/articles"
                          className="block p-3 border border-slate-200 dark:border-slate-800 hover:border-accent hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          Legal Articles
                        </Link>
                      </nav>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
