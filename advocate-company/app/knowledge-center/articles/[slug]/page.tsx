import { getArticles } from '@/lib/cms';
import ArticleClient from './ArticleClient';

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const articles = await getArticles({ category: 'articles' });
    if (articles && articles.length > 0) {
      return articles.map((article) => ({
        slug: article.slug,
      }));
    }
  } catch (error) {
    console.warn('Error fetching articles for params, using fallback');
  }

  // Fallback to prevent build errors
  return [{ slug: 'coming-soon' }];
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleClient slug={slug} />;
}
