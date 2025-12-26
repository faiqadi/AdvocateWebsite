import { getArticles } from '@/lib/cms';
import ArticleClient from './ArticleClient';

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getArticles({ category: 'articles' });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleClient slug={slug} />;
}
