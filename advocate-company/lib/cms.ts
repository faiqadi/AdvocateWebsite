/**
 * CMS Helper Functions
 * Functions to fetch data from Google Sheets
 */

import { getSheetData } from './google-sheets';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  category: 'articles' | 'news';
  publishedDate: string;
  featuredImage?: string;
  status: 'draft' | 'published';
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  category: 'managing-partners' | 'partners' | 'foreign-partners' | 'senior-associates' | 'junior-associates' | 'associates' | 'legal-staff';
  email?: string;
  phone?: string;
  education?: string;
  specialization?: string;
  experience?: string;
  photo?: string;
  order?: number;
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface Specialist {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  cta: string;
  ctaLink: string;
  order: number;
  active: boolean;
}

/**
 * Fetch articles from Google Sheets
 */
export async function getArticles(options?: {
  category?: 'articles' | 'news';
  status?: 'draft' | 'published';
  limit?: number;
  sort?: string;
}): Promise<Article[]> {
  try {
    const data = await getSheetData('Articles');
    
    let articles: Article[] = data.map((row: any, index: number) => ({
      id: row.id || `article-${index}`,
      title: row.title || '',
      slug: row.slug || row.title?.toLowerCase().replace(/\s+/g, '-') || '',
      content: row.content || '',
      excerpt: row.excerpt || '',
      category: (row.category || 'articles') as 'articles' | 'news',
      publishedDate: row.publishedDate || row.date || new Date().toISOString(),
      featuredImage: row.featuredImage || row.image || '',
      status: (row.status || 'published') as 'draft' | 'published',
    }));

    // Filter by category
    if (options?.category) {
      articles = articles.filter((a) => a.category === options.category);
    }

    // Filter by status
    if (options?.status) {
      articles = articles.filter((a) => a.status === options.status);
    } else {
      articles = articles.filter((a) => a.status === 'published');
    }

    // Sort
    if (options?.sort === '-publishedDate') {
      articles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    }

    // Limit
    if (options?.limit) {
      articles = articles.slice(0, options.limit);
    }

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await getArticles({ status: 'published' });
    return articles.find((a) => a.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

/**
 * Fetch profiles from Google Sheets
 */
export async function getProfiles(options?: {
  category?: string;
  limit?: number;
  sort?: string;
}): Promise<Profile[]> {
  try {
    const data = await getSheetData('Profiles');
    
    let profiles: Profile[] = data.map((row: any, index: number) => ({
      id: row.id || `profile-${index}`,
      name: row.name || '',
      title: row.title || '',
      category: (row.category || 'associates') as Profile['category'],
      email: row.email || '',
      phone: row.phone || '',
      education: row.education || '',
      specialization: row.specialization || '',
      experience: row.experience || '',
      photo: row.photo || row.image || '',
      order: parseInt(row.order || index.toString()),
    }));

    // Filter by category
    if (options?.category && options.category !== 'all') {
      profiles = profiles.filter((p) => p.category === options.category);
    }

    // Sort
    if (options?.sort === 'order') {
      profiles.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // Limit
    if (options?.limit) {
      profiles = profiles.slice(0, options.limit);
    }

    return profiles;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
}

/**
 * Fetch practice areas from Google Sheets
 */
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  try {
    const data = await getSheetData('PracticeAreas');
    
    const practiceAreas: PracticeArea[] = data.map((row: any, index: number) => ({
      id: row.id || `practice-${index}`,
      title: row.title || '',
      slug: row.slug || row.title?.toLowerCase().replace(/\s+/g, '-') || '',
      description: row.description || '',
      icon: row.icon || '',
      order: parseInt(row.order || index.toString()),
    }));

    practiceAreas.sort((a, b) => (a.order || 0) - (b.order || 0));
    return practiceAreas;
  } catch (error) {
    console.error('Error fetching practice areas:', error);
    return [];
  }
}

/**
 * Fetch specialists from Google Sheets
 */
export async function getSpecialists(): Promise<Specialist[]> {
  try {
    const data = await getSheetData('Specialists');
    
    const specialists: Specialist[] = data.map((row: any, index: number) => ({
      id: row.id || `specialist-${index}`,
      title: row.title || '',
      slug: row.slug || row.title?.toLowerCase().replace(/\s+/g, '-') || '',
      description: row.description || '',
      icon: row.icon || '',
      order: parseInt(row.order || index.toString()),
    }));

    specialists.sort((a, b) => (a.order || 0) - (b.order || 0));
    return specialists;
  } catch (error) {
    console.error('Error fetching specialists:', error);
    return [];
  }
}

/**
 * Fetch hero slides from Google Sheets
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const data = await getSheetData('HeroSlides');
    
    const slides: HeroSlide[] = data
      .filter((row: any) => row.active !== 'false' && row.active !== false)
      .map((row: any, index: number) => ({
        id: row.id || `slide-${index}`,
        title: row.title || '',
        subtitle: row.subtitle || '',
        description: row.description || '',
        cta: row.cta || 'GET THE LAWYER',
        ctaLink: row.ctaLink || row.cta_link || '/contact',
        order: parseInt(row.order || index.toString()),
        active: row.active !== 'false' && row.active !== false,
      }));

    slides.sort((a, b) => (a.order || 0) - (b.order || 0));
    return slides;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}
