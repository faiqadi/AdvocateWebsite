import { NextResponse } from 'next/server';
import { getAboutUs } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const aboutUs = await getAboutUs();

    const response = NextResponse.json({ docs: aboutUs, totalDocs: aboutUs.length });
    
    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    console.error('Error fetching about us:', error);
    return NextResponse.json({ error: 'Failed to fetch about us' }, { status: 500 });
  }
}

