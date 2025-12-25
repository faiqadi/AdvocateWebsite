/**
 * CMS Helper Functions
 * Functions to fetch data from Google Sheets
 */

import { getSheetData } from './google-sheets';

/**
 * Normalize Google Drive URL to use proxy service for better reliability
 */
function normalizeGoogleDriveUrl(url: string, type: 'landscape' | 'portrait' | 'original' = 'landscape'): string {
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

    if (type === 'original') {
      // Keep original aspect ratio, limit width to 1000px for performance
      return `https://images.weserv.nl/?url=${encodeURIComponent(driveUrl)}&w=1000`;
    }

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
  categories: string[]; // Support multiple categories
  category?: string; // Keep for backward compatibility
  slug?: string; // URL-friendly slug
  email?: string;
  phone?: string;
  education?: string;
  specialization?: string;
  speech?: string; // Quote/speech for profile page
  shortDescription?: string; // Short bio/description for profile page
  photo?: string;
  photoDetail?: string; // Detail photo for profile detail page
  order?: number;
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  overview?: string;
  services?: string[];
  expertise?: string[];
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

export interface TentangKantor {
  id: string;
  title: string;
  content: string;
}

export interface Founder {
  id: string;
  name: string;
  title: string;
  description: string;
  slug?: string;
  photo?: string;
  order?: number;
}

export interface ProfileCategory {
  id: string;
  category: string;
  titleCategory: string;
  order?: number;
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

      // Use 'original' type to prevent cropping and preserve portrait aspect ratios
      const photo = normalizeGoogleDriveUrl(rawPhoto, 'original');

      // Parse categories from existing 'category' column - support multiple categories
      let categories: string[] = [];
      if (row.category) {
        // Split by comma and clean up - support multiple categories in single column
        categories = row.category
          .split(',')
          .map((c: string) => c.trim())
          .filter((c: string) => c.length > 0);
      }

      // Ensure at least one category
      if (categories.length === 0) {
        categories = ['associates'];
      }

      // Generate slug from name
      const slug = (row.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim()
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

      // Generate consistent ID - use row.id if available, otherwise use index-based ID
      const profileId = (row.id && String(row.id).trim()) ? String(row.id).trim() : `profile-${index + 1}`;

      return {
        id: profileId,
        name: row.name || '',
        title: row.title || '',
        categories: categories,
        category: categories[0], // Keep for backward compatibility
        slug: slug || `profile-${index + 1}`,
        email: row.email || '',
        phone: row.phone || '',
        education: row.education || '',
        specialization: row.specialization || '',
        speech: row.speech || '',
        shortDescription: row.shortDescription || '',
        photo,
        photoDetail: normalizeGoogleDriveUrl(row.photoDetail || '', 'original'),
        order: parseInt(row.order || (index + 1).toString()),
      };
    });

    return profiles;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
}

/**
 * Fetch a single profile by ID
 */
export async function getProfileById(id: string): Promise<Profile | null> {
  try {
    const profiles = await getProfiles({ sort: 'order' });
    return profiles.find((p) => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  try {
    const profiles = await getProfiles({ sort: 'order' });
    return profiles.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching profile by slug:', error);
    return null;
  }
}

/**
 * Fetch practice areas from Google Sheets
 */
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  try {
    const data = await getSheetData('PracticeAreas');

    const practiceAreas: PracticeArea[] = data.map((row: any, index: number) => {
      // Generate proper slug from title if slug column contains wrong data
      let slug = row.slug || '';
      if (!slug || slug.length > 50) { // If slug is missing or looks like description text
        slug = (row.title || '')
          .toLowerCase()
          .replace(/[&]/g, 'dan') // Replace & with 'dan'
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
          .trim()
          .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      }

      // Parse services and expertise if they exist as JSON strings or comma-separated values
      let services: string[] = [];
      let expertise: string[] = [];

      if (row.services) {
        try {
          // Try to parse as JSON first
          services = typeof row.services === 'string' && row.services.startsWith('[')
            ? JSON.parse(row.services)
            : row.services.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
        } catch {
          services = row.services.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
        }
      }

      if (row.expertise) {
        try {
          // Try to parse as JSON first
          expertise = typeof row.expertise === 'string' && row.expertise.startsWith('[')
            ? JSON.parse(row.expertise)
            : row.expertise.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
        } catch {
          expertise = row.expertise.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
        }
      }

      return {
        id: row.id || `practice-${index}`,
        title: row.title || '',
        slug: slug || `practice-${index}`,
        description: row.description || '',
        shortDescription: row.shortDescription || '',
        overview: row.overview || '',
        services: services,
        expertise: expertise,
        icon: row.icon || '',
        order: parseInt(row.order || index.toString()),
      };
    });

    practiceAreas.sort((a, b) => (a.order || 0) - (b.order || 0));
    return practiceAreas;
  } catch (error) {
    console.error('Error fetching practice areas from Google Sheets:', error);
    // Fallback to static data
    console.log('Falling back to static practice areas data');
    try {
      const { getAllPracticeAreas } = await import('./practice-areas-data');
      const staticData = getAllPracticeAreas();
      return staticData.map((area, index) => ({
        id: area.id,
        title: area.title,
        slug: area.slug,
        description: area.description,
        icon: area.icon,
        order: index,
      }));
    } catch (fallbackError) {
      console.error('Error loading fallback practice areas data:', fallbackError);
      return [];
    }
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

/**
 * Fetch Tentang Kantor content from Google Sheets
 */
export async function getTentangKantor(): Promise<TentangKantor[]> {
  try {
    const data = await getSheetData('TentangKantor');

    const tentangKantor: TentangKantor[] = data.map((row: any, index: number) => ({
      id: row.id || `kantor-${index}`,
      title: row.title || '',
      content: row.content || '',
    }));

    return tentangKantor;
  } catch (error) {
    console.error('Error fetching tentang kantor:', error);
    return [];
  }
}

/**
 * Fetch Founders content from Google Sheets
 */
export async function getFounders(): Promise<Founder[]> {
  try {
    const data = await getSheetData('Founders');

    const founders: Founder[] = data.map((row: any, index: number) => {
      // Normalize photo URL, including Google Drive links (same as profiles)
      const rawPhoto: string = row.photo || '';
      const photo = normalizeGoogleDriveUrl(rawPhoto, 'original');

      // Generate slug from name
      const slug = (row.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim()
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

      console.log(`Processing founder photo for ${row.name}:`, rawPhoto, '->', photo);

      return {
        id: row.id || `founder-${index}`,
        name: row.name || '',
        title: row.title || '',
        description: row.description || '',
        slug: slug || `founder-${index}`,
        photo: photo,
        order: parseInt(row.order || index.toString()),
      };
    });

    founders.sort((a, b) => (a.order || 0) - (b.order || 0));
    return founders;
  } catch (error) {
    console.error('Error fetching founders:', error);
    return [];
  }
}

/**
 * Fetch Profile Categories from Google Sheets
 */
export async function getProfileCategories(): Promise<ProfileCategory[]> {
  try {
    const data = await getSheetData('ProfilesCategory');

    const categories: ProfileCategory[] = data.map((row: any, index: number) => ({
      id: row.id || `category-${index}`,
      category: row.category || '',
      titleCategory: row.titleCategory || '',
      order: parseInt(row.order || index.toString()),
    }));

    categories.sort((a, b) => (a.order || 0) - (b.order || 0));
    return categories;
  } catch (error) {
    console.error('Error fetching profile categories:', error);
    return [];
  }
}
