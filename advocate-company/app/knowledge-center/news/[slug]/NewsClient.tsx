'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';
import type { Article } from '@/lib/cms';
import ScrollAnimation from '../../../components/ScrollAnimation';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../../components/Footer'), {
    loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

export default function NewsClient({ slug }: { slug: string }) {
    const [news, setNews] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!slug) return;

        async function fetchNews() {
            setLoading(true);
            setError('');

            if (slug === 'coming-soon') {
                setNews({
                    id: 'coming-soon',
                    title: 'News Coming Soon',
                    slug: 'coming-soon',
                    content: '<p>We are updating our news section. Please check back later.</p>',
                    publishedDate: new Date().toISOString(),
                    category: 'news',
                    status: 'active',
                    featuredImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop'
                });
                setLoading(false);
                return;
            }

            const decodedSlug = decodeURIComponent(slug);
            const newsKey = `news_${decodedSlug}`;

            // Check localStorage first
            try {
                const cachedData = localStorage.getItem(newsKey);
                if (cachedData) {
                    const parsed = JSON.parse(cachedData);
                    const cacheAge = Date.now() - (parsed.cachedAt || 0);
                    const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

                    if (cacheAge < CACHE_MAX_AGE && parsed.slug === decodedSlug) {
                        setNews(parsed);
                        setLoading(false);
                        return;
                    } else {
                        localStorage.removeItem(newsKey);
                    }
                }
            } catch (e) {
                console.warn('Error reading cache:', e);
            }

            // Fetch from API (CMS lib)
            try {
                const { getArticleBySlug } = await import('@/lib/cms');
                const data = await getArticleBySlug(decodedSlug);

                if (!data) {
                    setError(`Berita tidak ditemukan dengan slug/id: ${decodedSlug}`);
                    return;
                }

                localStorage.setItem(newsKey, JSON.stringify({
                    ...data,
                    cachedAt: Date.now()
                }));

                setNews(data);
            } catch (err: any) {
                console.error('Error fetching news:', err);
                setError('Gagal memuat berita.');
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
        <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 font-sans selection:bg-accent selection:text-white transition-colors duration-300">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-200 dark:border-slate-800/30"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navigation variant="default" />

                <div className="pt-32 pb-12 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm transition-colors duration-300">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/knowledge-center/news"
                            className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-accent uppercase tracking-widest mb-6 transition-colors"
                        >
                            <span className="mr-2">←</span> Back to News
                        </Link>

                        {loading && (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 w-32"></div>
                                <div className="h-8 bg-slate-200 dark:bg-slate-800 w-3/4"></div>
                            </div>
                        )}

                        {!loading && news && (
                            <ScrollAnimation direction="up">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-2 py-1 bg-accent/10 border border-accent/20 text-accent text-xs uppercase tracking-wider font-bold">
                                        News
                                    </span>
                                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
                                    <time className="text-xs text-slate-500 font-mono uppercase">
                                        {formatDate(news.publishedDate)}
                                    </time>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
                                    {news.title}
                                </h1>
                            </ScrollAnimation>
                        )}
                    </div>
                </div>

                <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
                    {loading && (
                        <div className="space-y-6">
                            <div className="h-64 bg-slate-200 dark:bg-slate-800 w-full animate-pulse"></div>
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 w-5/6"></div>
                            </div>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="p-8 text-center text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
                            {error}
                            <div className="mt-4">
                                <Link
                                    href="/knowledge-center/news"
                                    className="text-sm font-bold underline"
                                >
                                    Return to News
                                </Link>
                            </div>
                        </div>
                    )}

                    {!loading && !error && news && (
                        <article>
                            {news.featuredImage && (
                                <ScrollAnimation direction="up" delay={100}>
                                    <div className="mb-12 relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                        <img
                                            src={news.featuredImage}
                                            alt={news.title}
                                            className="w-full h-auto"
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                const currentSrc = target.src;
                                                if (currentSrc.includes('images.weserv.nl')) {
                                                    const fileIdMatch = currentSrc.match(/id=([a-zA-Z0-9_-]+)/);
                                                    if (fileIdMatch && fileIdMatch[1]) {
                                                        target.src = `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1200`;
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </ScrollAnimation>
                            )}

                            {news.content ? (
                                <ScrollAnimation direction="up" delay={200}>
                                    <div
                                        className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
                        prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-slate-900 dark:prose-strong:text-white
                        prose-ul:text-slate-600 dark:prose-ul:text-slate-300
                        prose-ol:text-slate-600 dark:prose-ol:text-slate-300
                        prose-blockquote:border-l-accent prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
                        "
                                        dangerouslySetInnerHTML={{ __html: news.content }}
                                    />
                                </ScrollAnimation>
                            ) : (
                                <div className="p-8 text-center border border-slate-200 dark:border-slate-800 border-dashed text-slate-500 italic">
                                    Konten berita belum tersedia.
                                </div>
                            )}
                        </article>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
}
