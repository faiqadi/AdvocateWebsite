'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import type { Article } from '@/lib/cms';
import { fetchWithCache } from '@/lib/cache-client';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
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
        const json = await fetchWithCache<{ docs: Article[]; totalDocs: number }>(
          '/api/cms/articles?category=articles&status=active&sort=-publishedDate&limit=5'
        );
        setArticles(json.docs || []);
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
        const json = await fetchWithCache<{ docs: Article[]; totalDocs: number }>(
          '/api/cms/news?status=active&sort=-publishedDate&limit=5'
        );
        setNews(json.docs || []);
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Knowledge Center</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* News Section */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">News</h2>
              {loadingNews && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400">Memuat berita...</p>
                </div>
              )}
              {!loadingNews && errorNews && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="text-red-600 dark:text-red-400">{errorNews}</p>
                </div>
              )}
              {!loadingNews && !errorNews && news.length === 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    Belum ada berita yang dipublikasikan.
                  </p>
                </div>
              )}
              {!loadingNews && !errorNews && news.length > 0 && (
                <div className="space-y-6">
                  {news.map((item) => (
                    <article
                      key={item.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-semibold text-blue-900 dark:text-blue-400">
                          News
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">
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
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span>•</span>
                        <time>{formatDate(item.publishedDate)}</time>
                      </div>
                    </article>
                  ))}
                  <div className="mt-4 text-center">
                    <Link
                      href="/knowledge-center/news"
                      className="inline-block text-blue-900 dark:text-blue-400 font-semibold hover:underline"
                    >
                      See More &gt;&gt;
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* Articles Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Articles</h2>
              {loadingArticles && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400">Memuat artikel...</p>
                </div>
              )}
              {!loadingArticles && errorArticles && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="text-red-600 dark:text-red-400">{errorArticles}</p>
                </div>
              )}
              {!loadingArticles && !errorArticles && articles.length === 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    Belum ada artikel yang dipublikasikan.
                  </p>
                </div>
              )}
              {!loadingArticles && !errorArticles && articles.length > 0 && (
                <>
                  <div className="space-y-6">
                    {articles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-sm font-semibold text-blue-900 dark:text-blue-400">
                            Articles
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">
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
                          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                          <span>•</span>
                          <time>{formatDate(article.publishedDate)}</time>
                        </div>
                      </article>
                    ))}
                  </div>
                  
                  {/* See More Link */}
                  <div className="mt-8 text-center">
                    <Link
                      href="/knowledge-center/articles"
                      className="inline-block text-blue-900 dark:text-blue-400 font-semibold hover:underline"
                    >
                      See More &gt;&gt;
                    </Link>
                  </div>
                </>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-20 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/knowledge-center/news"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge-center/articles"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
                  >
                    Articles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
