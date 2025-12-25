import { NextResponse } from 'next/server';
import { getPracticeAreas } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const practiceAreas = await getPracticeAreas();

    const response = NextResponse.json({ docs: practiceAreas, totalDocs: practiceAreas.length });

    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('Error fetching practice areas:', error);
    return NextResponse.json({ error: 'Failed to fetch practice areas' }, { status: 500 });
  }
}

