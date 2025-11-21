import { NextResponse } from 'next/server';
import { getProfiles } from '@/lib/cms';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const sort = searchParams.get('sort') || 'order';

    const profiles = await getProfiles({
      category,
      limit,
      sort,
    });

    return NextResponse.json({ docs: profiles, totalDocs: profiles.length });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

