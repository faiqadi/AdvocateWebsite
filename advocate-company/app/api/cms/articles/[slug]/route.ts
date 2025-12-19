import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Decode URL parameter (handle %20 and other encoded characters)
    const decodedSlug = decodeURIComponent(params.slug);
    console.log('API: Searching for article with slug/id:', decodedSlug, '(original:', params.slug, ')');
    
    // Try to find by decoded slug/id
    let article = await getArticleBySlug(decodedSlug);
    
    // If not found, try with original slug (in case it's already correct)
    if (!article && decodedSlug !== params.slug) {
      article = await getArticleBySlug(params.slug);
    }
    
    if (!article) {
      console.error('API: Article not found for slug/id:', decodedSlug);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    console.log('API: Article found:', { id: article.id, slug: article.slug, title: article.title });
    const response = NextResponse.json(article);
    
    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

