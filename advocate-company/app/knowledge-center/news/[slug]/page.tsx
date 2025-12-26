import { getArticles } from '@/lib/cms';
import NewsClient from './NewsClient';

// Generate static params for all news
export async function generateStaticParams() {
    try {
        const news = await getArticles({ category: 'news' });
        if (Array.isArray(news) && news.length > 0) {
            return news.map((item) => ({
                slug: item.slug,
            }));
        }
        // Fallback if no news found
        return [{ slug: 'coming-soon' }];
    } catch (error) {
        console.error('Error in generateStaticParams for news:', error);
        // Fallback on error to ensure build passes
        return [{ slug: 'coming-soon' }];
    }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <NewsClient slug={slug} />;
}
