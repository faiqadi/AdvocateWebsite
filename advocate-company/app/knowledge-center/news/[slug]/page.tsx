'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';
import type { Article } from '@/lib/cms';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [news, setNews] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    async function fetchNews() {
      setLoading(true);
      setError('');
      
      // Decode slug for localStorage key
      const decodedSlug = decodeURIComponent(slug);
      const newsKey = `news_${decodedSlug}`;
      
      // Check localStorage first
      try {
        const cachedData = localStorage.getItem(newsKey);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          const cacheAge = Date.now() - (parsed.cachedAt || 0);
          const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes
          
          // Use cached data if it's fresh
          if (cacheAge < CACHE_MAX_AGE && parsed.slug === decodedSlug) {
            console.log('Using cached news data:', newsKey);
            setNews(parsed);
            setLoading(false);
            return;
          } else {
            // Remove stale cache
            localStorage.removeItem(newsKey);
          }
        }
      } catch (e) {
        console.warn('Error reading cache:', e);
      }
      
      // Fetch from API if no cache or cache is stale
      try {
        const res = await fetch(`/api/cms/news/${encodeURIComponent(decodedSlug)}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('Berita tidak ditemukan.');
          } else {
            throw new Error(`HTTP ${res.status}`);
          }
          return;
        }
        const data = await res.json();
        
        // Cache the fetched data
        localStorage.setItem(newsKey, JSON.stringify({
          ...data,
          cachedAt: Date.now()
        }));
        
        setNews(data);
      } catch (err: any) {
        console.error('Error fetching news:', err);
        setError('Gagal memuat berita. Pastikan Web App sudah di-deploy, di-set ke "Anyone", dan spreadsheet dapat diakses.');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [slug]);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/knowledge-center/news"
            className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke News
          </Link>
          {loading && (
            <div className="animate-pulse">
              <div className="h-8 bg-blue-800 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-blue-800 rounded w-1/2"></div>
            </div>
          )}
          {!loading && news && (
            <div className="flex items-center text-blue-200 space-x-4">
              <span className="text-sm font-semibold">News</span>
              <span>•</span>
              <time className="text-sm">{formatDate(news.publishedDate)}</time>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Memuat berita...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Link
              href="/knowledge-center/news"
              className="inline-block mt-4 text-blue-900 dark:text-blue-400 hover:underline"
            >
              ← Kembali ke News
            </Link>
          </div>
        )}

        {!loading && !error && news && (
          <article className="bg-white dark:bg-gray-800 rounded-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {news.title}
            </h1>

            {/* Published Date */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <time className="text-sm text-gray-500 dark:text-gray-400">
                Dipublikasikan pada {formatDate(news.publishedDate)}
              </time>
            </div>

            {/* Featured Image */}
            {news.featuredImage && (
              <div className="mb-8">
                <img
                  src={news.featuredImage}
                  alt={news.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to direct thumbnail if proxy fails
                    const target = e.target as HTMLImageElement;
                    const currentSrc = target.src;
                    if (currentSrc.includes('images.weserv.nl')) {
                      // Extract file ID from the proxied URL
                      const fileIdMatch = currentSrc.match(/id=([a-zA-Z0-9_-]+)/);
                      if (fileIdMatch && fileIdMatch[1]) {
                        target.src = `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1200`;
                      }
                    }
                  }}
                />
              </div>
            )}

            {/* Content */}
            {news.content ? (
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-a:text-blue-900 dark:prose-a:text-blue-400
                  prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                  prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                  prose-img:rounded-lg prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            ) : (
              <div className="text-gray-600 dark:text-gray-400">
                <p>Konten berita belum tersedia.</p>
              </div>
            )}
          </article>
        )}
      </div>

      <Footer />
    </div>
  );
}

