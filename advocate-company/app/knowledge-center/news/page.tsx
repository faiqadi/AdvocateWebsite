'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';
import Link from 'next/link';
import type { Article } from '@/lib/cms';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export default function NewsPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/cms/news?status=active&sort=-publishedDate');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        setNews(json.docs || []);
      } catch (err: any) {
        console.error('Error fetching news:', err);
        setError('Gagal memuat berita. Pastikan Web App sudah di-deploy, di-set ke "Anyone", dan spreadsheet dapat diakses.');
      } finally {
        setLoading(false);
      }
    }

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
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Memuat berita...
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-10 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 italic">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
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
                      // Store news data in localStorage for instant access
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
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
