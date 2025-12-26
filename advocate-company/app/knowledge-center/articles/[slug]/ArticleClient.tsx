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

export default function ArticleClient({ slug }: { slug: string }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!slug) return;

        async function fetchArticle() {
            setLoading(true);
            setError('');

            // Decode slug for localStorage key
            const decodedSlug = decodeURIComponent(slug);
            const articleKey = `article_${decodedSlug}`;

            // Check localStorage first
            try {
                const cachedData = localStorage.getItem(articleKey);
                if (cachedData) {
                    const parsed = JSON.parse(cachedData);
                    const cacheAge = Date.now() - (parsed.cachedAt || 0);
                    const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

                    // Use cached data if it's fresh
                    if (cacheAge < CACHE_MAX_AGE && parsed.slug === decodedSlug) {
                        console.log('Using cached article data:', articleKey);
                        setArticle(parsed);
                        setLoading(false);
                        return;
                    } else {
                        // Remove stale cache
                        localStorage.removeItem(articleKey);
                    }
                }
            } catch (e) {
                console.warn('Error reading cache:', e);
            }

            // Fetch from API (CMS lib) if no cache or cache is stale
            // Since we are client side, we use the CMS lib which we know uses fetchWithCache
            // BUT, in the original code I replaced fetchWithCache with explicit fetch calling /api/...
            // BUT I deleted /api/...
            // SO I need to use getArticleBySlug or getArticles from lib/cms directly
            // AND ensure lib/cms works on client side (which I think it does now)

            try {
                // We can't use node-fetch logic here if lib/cms uses incompatible stuff suitable only for server
                // BUT I verified lib/google-sheets.ts uses explicit fetch and window check.
                // However, getArticles calls getSheetData.
                // I will import getArticles from '@/lib/cms' 
                // AND refactor this to use IT instead of fetch('/api/...')

                const { getArticleBySlug } = await import('@/lib/cms');
                console.log('Fetching article client-side with slug:', decodedSlug);

                const data = await getArticleBySlug(decodedSlug);

                if (!data) {
                    console.error('Article not found for slug/id:', decodedSlug);
                    setError(`Artikel tidak ditemukan dengan slug/id: ${decodedSlug}`);
                    return;
                }

                console.log('Article fetched client-side:', data);

                // Cache the fetched data
                localStorage.setItem(articleKey, JSON.stringify({
                    ...data,
                    cachedAt: Date.now()
                }));

                setArticle(data);
            } catch (err: any) {
                console.error('Error fetching article:', err);
                setError('Gagal memuat artikel.');
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
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
            {/* Industrial Grid Texture */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-200 dark:border-slate-800/30"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navigation variant="default" />

                {/* Header Section */}
                <div className="pt-32 pb-12 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm transition-colors duration-300">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/knowledge-center/articles"
                            className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-accent uppercase tracking-widest mb-6 transition-colors"
                        >
                            <span className="mr-2">←</span> Back to Articles
                        </Link>

                        {loading && (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 w-32"></div>
                                <div className="h-8 bg-slate-200 dark:bg-slate-800 w-3/4"></div>
                            </div>
                        )}

                        {!loading && article && (
                            <ScrollAnimation direction="up">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-2 py-1 bg-accent/10 border border-accent/20 text-accent text-xs uppercase tracking-wider font-bold">
                                        Article
                                    </span>
                                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
                                    <time className="text-xs text-slate-500 font-mono uppercase">
                                        {formatDate(article.publishedDate)}
                                    </time>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
                                    {article.title}
                                </h1>
                            </ScrollAnimation>
                        )}
                    </div>
                </div>

                {/* Content */}
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
                                    href="/knowledge-center/articles"
                                    className="text-sm font-bold underline"
                                >
                                    Return to Articles
                                </Link>
                            </div>
                        </div>
                    )}

                    {!loading && !error && article && (
                        <article>
                            {article.featuredImage && (
                                <ScrollAnimation direction="up" delay={100}>
                                    <div className="mb-12 relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                        <img
                                            src={article.featuredImage}
                                            alt={article.title}
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

                            {article.content ? (
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
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                </ScrollAnimation>
                            ) : (
                                <div className="p-8 text-center border border-slate-200 dark:border-slate-800 border-dashed text-slate-500 italic">
                                    Konten artikel belum tersedia.
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
