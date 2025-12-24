import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // Decode URL parameter (handle %20 and other encoded characters)
    const decodedSlug = decodeURIComponent(slug);

    const news = await getArticles({
      category: 'news',
      status: 'active'
    });

    // Try to find by decoded slug first, then by id as fallback
    let foundNews = news.find((item) => item.slug === decodedSlug);

    if (!foundNews) {
      foundNews = news.find((item) => item.id === decodedSlug);
    }

    // If not found, try with original slug
    if (!foundNews && decodedSlug !== slug) {
      foundNews = news.find((item) => item.slug === slug || item.id === slug);
    }

    if (!foundNews) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    const response = NextResponse.json(foundNews);

    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

