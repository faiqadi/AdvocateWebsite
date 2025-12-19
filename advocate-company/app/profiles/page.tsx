'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import type { Profile } from '@/lib/cms';
import { fetchWithCache } from '@/lib/cache-client';
import { getBuildingImage } from '@/lib/building-images';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

const FALLBACK_PHOTO =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop';

export default function ProfilesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'managing-partners', label: 'MANAGING PARTNERS' },
    { id: 'partners', label: 'PARTNERS' },
    { id: 'foreign-partners', label: 'FOREIGN PARTNERS' },
    { id: 'senior-associates', label: 'SENIOR ASSOCIATES' },
    { id: 'junior-associates', label: 'JUNIOR ASSOCIATES' },
    { id: 'associates', label: 'ASSOCIATES' },
    { id: 'legal-staff', label: 'LEGAL STAFF' },
  ];

  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (activeFilter && activeFilter !== 'all') {
          params.set('category', activeFilter);
        }
        params.set('sort', 'order');

        const json = await fetchWithCache<{ docs: Profile[]; totalDocs: number }>(
          `/api/cms/profiles?${params.toString()}`
        );
        setProfiles(json.docs || []);
      } catch (err: any) {
        console.error('Error fetching profiles:', err);
        setError(
          'Gagal memuat data profil. Pastikan Web App sudah di-deploy, di-set ke "Anyone", dan spreadsheet dapat diakses.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [activeFilter]);

  const filteredProfiles = useMemo(
    () =>
      activeFilter === 'all'
        ? profiles
        : profiles.filter((profile) => profile.category === activeFilter),
    [profiles, activeFilter]
  );

  return (
    <div 
      className="min-h-screen relative transition-colors duration-200"
      style={{
        backgroundImage: `url(${getBuildingImage(2)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/90"></div>
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 transform rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-0 w-48 h-48 bg-orange-400 transform rotate-12 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-pink-400 transform -rotate-12 -translate-y-1/4"></div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-blue-400 transform rotate-45"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-gray-300/50 dark:border-gray-700/50">
            <p className="text-gray-900 dark:text-white text-lg md:text-xl leading-relaxed">
              Temukan sosok-sosok di balik tim luar biasa kami. Dengan pengalaman
              yang luas dan dedikasi terhadap kesuksesan Anda, para pengacara kami
              bukan hanya profesional di bidang hukum, tetapi juga mitra terpercaya
              dalam perjalanan hukum Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-300/50 dark:border-gray-700/50 sticky top-16 z-40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 py-4 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-300/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && (
            <div className="col-span-full text-center py-10 text-gray-600 dark:text-gray-400">
              Memuat data profil...
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full text-center py-10 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative group border border-gray-300/50 dark:border-gray-700/50"
              >
                {/* Star Icon */}
                <div className="absolute bottom-2 right-2 z-10">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                {/* Profile Image */}
                <div className="relative w-full aspect-square bg-gray-700 overflow-hidden">
                  <img
                    src={profile.photo || (profile as any).image || FALLBACK_PHOTO}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-2"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    onError={(e) => {
                      // Fallback to direct thumbnail if proxy fails
                      const target = e.target as HTMLImageElement;
                      const currentSrc = target.src;
                      
                      // Don't retry if already using fallback
                      if (currentSrc === FALLBACK_PHOTO || currentSrc.includes('unsplash.com')) {
                        return;
                      }
                      
                      if (currentSrc.includes('images.weserv.nl')) {
                        // Extract file ID from the proxied URL
                        const fileIdMatch = currentSrc.match(/id=([a-zA-Z0-9_-]+)/);
                        if (fileIdMatch && fileIdMatch[1]) {
                          // Try direct thumbnail format
                          target.src = `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w800`;
                        } else {
                          target.src = FALLBACK_PHOTO;
                        }
                      } else if (currentSrc.includes('drive.google.com')) {
                        // If direct thumbnail also fails, use fallback
                        target.src = FALLBACK_PHOTO;
                      } else {
                        // Unknown format, use fallback
                        target.src = FALLBACK_PHOTO;
                      }
                    }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300"></div>
                </div>

                {/* Profile Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                    {profile.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">{profile.title}</p>
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-blue-600 dark:text-blue-400 text-xs hover:underline mt-1 block"
                    >
                      {profile.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>

          {!loading && !error && filteredProfiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No profiles found in this category.</p>
            </div>
          )}
      </div>

      <Footer />
      </div>
    </div>
  );
}

