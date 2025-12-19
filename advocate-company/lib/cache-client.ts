/**
 * Client-side caching utilities
 * Uses localStorage to cache API responses
 */

const CACHE_PREFIX = 'baguslaw_cache_';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Get cached data
 */
export function getCachedData<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - entry.timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

/**
 * Set cache data
 */
export function setCachedData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch (error) {
    console.error('Error writing to cache:', error);
    // If storage is full, try to clear old entries
    try {
      clearOldCache();
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
    } catch (retryError) {
      console.error('Error after cache cleanup:', retryError);
    }
  }
}

/**
 * Clear old cache entries
 */
function clearOldCache(): void {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          const entry = JSON.parse(cached);
          if (now - entry.timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        // If entry is corrupted, remove it
        localStorage.removeItem(key);
      }
    }
  });
}

/**
 * Clear all cache
 */
export function clearCache(): void {
  if (typeof window === 'undefined') return;

  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Fetch with cache
 */
export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  // Generate cache key from URL and options
  const cacheKey = `${url}_${JSON.stringify(options || {})}`;

  // Try to get from cache first
  const cached = getCachedData<T>(cacheKey);
  if (cached !== null) {
    return cached;
  }

  // Fetch from API
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  // Cache the response
  setCachedData(cacheKey, data);

  return data;
}

