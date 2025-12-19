import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'active' | 'off' | undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const sort = searchParams.get('sort') || '-publishedDate';

    const news = await getArticles({
      category: 'news',
      status,
      limit,
      sort,
    });

    const response = NextResponse.json({ docs: news, totalDocs: news.length });
    
    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

