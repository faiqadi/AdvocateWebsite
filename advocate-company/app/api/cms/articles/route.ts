import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/cms';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as 'articles' | 'news' | undefined;
    const status = searchParams.get('status') as 'draft' | 'published' | undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const sort = searchParams.get('sort') || '-publishedDate';

    const articles = await getArticles({
      category,
      status,
      limit,
      sort,
    });

    return NextResponse.json({ docs: articles, totalDocs: articles.length });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

