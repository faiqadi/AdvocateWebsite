/**
 * CMS Helper Functions
 * Functions to fetch data from Google Sheets
 */

import { getSheetData } from './google-sheets';

/**
 * Normalize Google Drive URL to use proxy service for better reliability
 */
function normalizeGoogleDriveUrl(url: string): string {
  if (!url) return '';
  
  // Handle Google Drive share links
  // Examples:
  // - https://drive.google.com/file/d/FILE_ID/view?usp=...
  // - https://drive.google.com/open?id=FILE_ID
  // - https://drive.google.com/uc?export=view&id=FILE_ID
  const driveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  const fileId = driveFileMatch?.[1] || driveIdMatch?.[1];

  if (fileId) {
    // Use proxy service for better reliability
    // images.weserv.nl is a free image proxy/CDN service
    const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(driveUrl)}&w=1200&h=800&fit=cover`;
  }
  
  // Return original URL if not a Google Drive link
  return url;
}

/**
 * Process content to convert // separators to HTML paragraphs
 * Google Sheets doesn't support line breaks easily, so // is used as paragraph separator
 */
function processContent(content: string): string {
  if (!content) return '';
  
  // If content already contains HTML tags, process // separators within HTML
  if (content.includes('<p>') || content.includes('<div>') || content.includes('<br')) {
    // Replace // with </p><p> to create new paragraphs
    // But be careful not to break existing HTML structure
    return content
      .replace(/\/\//g, '</p><p>')
      .replace(/<p>\s*<\/p>/g, ''); // Remove empty paragraphs
  }
  
  // Split by // separator and wrap each part in <p> tags
  const paragraphs = content
    .split('//')
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // If no // found, wrap entire content in <p> tag
  if (paragraphs.length === 0) {
    return `<p>${content}</p>`;
  }
  
  // Wrap each paragraph in <p> tags
  return paragraphs.map(p => `<p>${p}</p>`).join('');
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  category: 'articles' | 'news';
  publishedDate: string;
  featuredImage?: string;
  status: 'active' | 'off';
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

export interface AboutUs {
  id: string;
  title?: string;
  content: string;
  order: number;
  active: boolean;
}

/**
 * Fetch articles from Google Sheets
 */
export async function getArticles(options?: {
  category?: 'articles' | 'news';
  status?: 'active' | 'off';
  limit?: number;
  sort?: string;
}): Promise<Article[]> {
  try {
    const params: Record<string, string> = {};
    
    if (options?.status) {
      params.status = options.status;
    } else {
      params.status = 'active';
    }
    
    if (options?.category) {
      params.category = options.category;
    }
    
    if (options?.sort) {
      params.sort = options.sort;
    }
    
    if (options?.limit) {
      params.limit = options.limit.toString();
    }
    
    const data = await getSheetData('Articles', params);
    
    const articles: Article[] = data.map((row: any, index: number) => {
      const id = row.id || `article-${index}`;
      const title = row.title || '';
      
      // Create slug from title if not provided
      let slug = row.slug || '';
      if (!slug && title) {
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
          .trim()
          .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      }
      
      // Fallback to id if slug is still empty
      if (!slug) {
        slug = id;
      }
      
      // Normalize featured image URL (handle Google Drive links)
      const rawImage = row.featuredImage || row.image || '';
      const featuredImage = normalizeGoogleDriveUrl(rawImage);
      
      // Process content to convert // separators to HTML paragraphs
      const rawContent = row.content || '';
      const content = processContent(rawContent);
      
      return {
        id,
        title,
        slug,
        content,
        excerpt: row.excerpt || '',
        category: (row.category || 'articles') as 'articles' | 'news',
        publishedDate: row.publishedDate || row.date || new Date().toISOString(),
        featuredImage,
        status: (row.status || 'active') as 'active' | 'off',
      };
    });

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Fetch a single article by slug or id
 */
export async function getArticleBySlug(slugOrId: string): Promise<Article | null> {
  try {
    const articles = await getArticles({ status: 'active' });
    
    // Decode the slug/id in case it's URL encoded
    const decodedSlug = decodeURIComponent(slugOrId);
    
    // Try multiple matching strategies:
    // 1. Exact slug match (decoded)
    let article = articles.find((a) => a.slug === decodedSlug);
    
    // 2. Exact id match (decoded)
    if (!article) {
      article = articles.find((a) => a.id === decodedSlug);
    }
    
    // 3. Slug match (original, in case it's already correct)
    if (!article && decodedSlug !== slugOrId) {
      article = articles.find((a) => a.slug === slugOrId);
    }
    
    // 4. Id match (original)
    if (!article && decodedSlug !== slugOrId) {
      article = articles.find((a) => a.id === slugOrId);
    }
    
    // 5. Try to match by creating slug from the search term (for cases where title is used)
    if (!article) {
      const searchSlug = decodedSlug
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
      article = articles.find((a) => a.slug === searchSlug);
    }
    
    return article || null;
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
    const params: Record<string, string> = {};
    
    if (options?.category && options.category !== 'all') {
      params.category = options.category;
    }
    
    if (options?.sort) {
      params.sort = options.sort;
    }
    
    if (options?.limit) {
      params.limit = options.limit.toString();
    }
    
    const data = await getSheetData('Profiles', params);
    
    const profiles: Profile[] = data.map((row: any, index: number) => {
      // Try to find a photo/image column (supports photo, Photo, FOTO, image, imageUrl, etc.)
      const photoKey =
        Object.keys(row).find((key) =>
          ['photo', 'image', 'gambar', 'foto', 'picture', 'pic'].some((k) =>
            key.toLowerCase().includes(k)
          )
        ) || 'photo';

      // Normalize photo URL, including Google Drive links
      const rawPhoto: string = row[photoKey] || '';
      const photo = normalizeGoogleDriveUrl(rawPhoto);

      return {
        id: row.id || `profile-${index}`,
        name: row.name || '',
        title: row.title || '',
        category: (row.category || 'associates') as Profile['category'],
        email: row.email || '',
        phone: row.phone || '',
        education: row.education || '',
        specialization: row.specialization || '',
        experience: row.experience || '',
        photo,
        order: parseInt(row.order || index.toString()),
      };
    });

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
    const data = await getSheetData('PracticeAreas', { active: 'true' });
    
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
    const data = await getSheetData('HeroSlides', { active: 'true', sort: 'order' });
    
    const slides: HeroSlide[] = data.map((row: any, index: number) => ({
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

/**
 * Fetch About Us content from Google Sheets
 */
export async function getAboutUs(): Promise<AboutUs[]> {
  try {
    const data = await getSheetData('AboutUs', { active: 'true', sort: 'order' });
    
    const aboutUs: AboutUs[] = data.map((row: any, index: number) => ({
      id: row.id || `about-${index}`,
      title: row.title || '',
      content: row.content || '',
      order: parseInt(row.order || index.toString()),
      active: row.active !== 'false' && row.active !== false,
    }));

    aboutUs.sort((a, b) => (a.order || 0) - (b.order || 0));
    return aboutUs;
  } catch (error) {
    console.error('Error fetching about us:', error);
    return [];
  }
}
