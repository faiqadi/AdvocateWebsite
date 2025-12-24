'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import type { Profile } from '@/lib/cms';
import { fetchWithCache } from '@/lib/cache-client';
import { getBuildingImage } from '@/lib/building-images';

// Lazy load Footer
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

const FALLBACK_PHOTO =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop';

function ProfileSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 relative">
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <div className="h-6 bg-slate-300 dark:bg-slate-700 w-3/4"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

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
        // Artificial delay for smoother transition feel (optional, but good for UX to prevent flickering on fast connections)
        await new Promise(resolve => setTimeout(resolve, 300));
        setProfiles(json.docs || []);
      } catch (err: any) {
        console.error('Error fetching profiles:', err);
        setError('Gagal memuat data profil.');
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
      className="min-h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 font-sans selection:bg-accent selection:text-white transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(2)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-slate-950/80 backdrop-blur-[2px] transition-colors duration-300"></div>

      {/* Industrial Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-200 dark:border-slate-800/30"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation variant="default" />

        {/* Header Section */}
        <div className="pt-32 pb-12 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-block py-1 px-2 border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-4">
                  Our Team
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">
                  Profiles
                </h1>
              </div>
              <p className="max-w-xl text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-800 pl-4 transition-colors duration-300">
                Temukan sosok-sosok di balik tim luar biasa kami. Dengan pengalaman
                yang luas dan dedikasi terhadap kesuksesan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-16 z-40 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto no-scrollbar py-0">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`
                    px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 border-b-2 whitespace-nowrap
                    ${activeFilter === filter.id
                      ? 'border-accent text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'}
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading ? (
              // Skeleton Loading Grid
              Array.from({ length: 8 }).map((_, i) => (
                <ProfileSkeleton key={i} />
              ))
            ) : error ? (
              <div className="col-span-full py-20 text-center text-red-500 font-mono border border-red-900/30 bg-red-900/10 p-8">
                ERROR: {error}
              </div>
            ) : (
              filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-none animate-in fade-in zoom-in-95 duration-500"
                >
                  {/* Hover Corner Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Profile Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-200 dark:bg-slate-800 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img
                      src={profile.photo || (profile as any).image || FALLBACK_PHOTO}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Industrial Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent opacity-90"></div>

                    {/* Floating Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-wide mb-1">
                        {profile.name}
                      </h3>
                      <p className="text-accent text-xs font-mono tracking-widest uppercase mb-3">
                        {profile.title}
                      </p>
                      {profile.email && (
                        <div className="border-t border-slate-200 dark:border-white/10 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <a
                            href={`mailto:${profile.email}`}
                            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-mono truncate block"
                          >
                            {profile.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && !error && filteredProfiles.length === 0 && (
            <div className="text-center py-20 border border-slate-200 dark:border-slate-800 border-dashed">
              <p className="text-slate-500 font-mono">NO_DATA_FOUND</p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
