import { NextResponse } from 'next/server';
import { getTentangKantor } from '@/lib/cms';

// Cache duration: 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const tentangKantor = await getTentangKantor();

    const response = NextResponse.json({ docs: tentangKantor, totalDocs: tentangKantor.length });

    // Add cache headers for client-side caching
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('Error fetching tentang kantor:', error);
    return NextResponse.json({ error: 'Failed to fetch tentang kantor' }, { status: 500 });
  }
}

