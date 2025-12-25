import { NextResponse } from 'next/server';
import { getProfileCategories } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const categories = await getProfileCategories();

    const response = NextResponse.json({ docs: categories, totalDocs: categories.length });

    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('Error fetching profile categories:', error);
    return NextResponse.json({ error: 'Failed to fetch profile categories' }, { status: 500 });
  }
}

