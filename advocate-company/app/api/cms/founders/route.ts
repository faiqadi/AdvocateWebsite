import { NextResponse } from 'next/server';
import { getFounders } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const founders = await getFounders();

    const response = NextResponse.json({ docs: founders, totalDocs: founders.length });

    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('Error fetching founders:', error);
    return NextResponse.json({ error: 'Failed to fetch founders' }, { status: 500 });
  }
}

