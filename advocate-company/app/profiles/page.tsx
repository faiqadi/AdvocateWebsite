'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Navigation from '../components/Navigation';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export default function ProfilesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

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

  const profiles = [
    // Managing Partners
    {
      id: '1',
      name: 'BAGUS PRATAMA, SH., MH., CTL',
      title: 'Managing Partners',
      category: 'managing-partners',
      email: 'bagus.pratama@baguslawfirm.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    // Partners
    {
      id: '2',
      name: 'ALEX TAN KIAN TIK, SE., SH., MSi., MH., BKP., CTL',
      title: 'Konsultan Pajak',
      category: 'partners',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      name: 'RINI ARIFFIANI, SS',
      title: 'Partners',
      category: 'partners',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      id: '4',
      name: 'ANDRY WIDJARNARKO',
      title: 'Konsultan Perizinan',
      category: 'partners',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
      id: '5',
      name: 'ADYUTA PURI PRANA, SE, AK, CA, CPA, CPA, BKP',
      title: 'Akuntan Publik',
      category: 'partners',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    },
    {
      id: '6',
      name: 'JASON ARIEL SALIM',
      title: 'Penerjemah Mandarin',
      category: 'partners',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: '7',
      name: 'EKA BAGUS SETYAWAN, S.H.',
      title: 'Pengurus & Kurator',
      category: 'partners',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop',
    },
    {
      id: '8',
      name: 'ERICO SETYAWAN K. P., S.H., M.Kn.',
      title: 'Pengurus & Kurator',
      category: 'partners',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    },
    // Foreign Partners
    {
      id: '9',
      name: 'ELAINE XIE',
      title: 'Foreign Partner',
      category: 'foreign-partners',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    },
    // Senior Associates
    {
      id: '10',
      name: 'VENDRA WAHID, SH',
      title: 'Senior Associate',
      category: 'senior-associates',
      email: 'vendra.wahid@baguslawfirm.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: '11',
      name: 'FU\'AS PRIBADI, SH',
      title: 'Senior Associate',
      category: 'senior-associates',
      email: 'fuas.pribadi@baguslawfirm.com',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    },
    // Junior Associates
    {
      id: '12',
      name: 'JEREMIA MANIK, S.TP',
      title: 'Junior Associate',
      category: 'junior-associates',
      email: 'jeremia.manik@baguslawfirm.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: '13',
      name: 'RIZKY DIAN PRATAMA, SH',
      title: 'Junior Associate',
      category: 'junior-associates',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop',
    },
    // Associates
    {
      id: '14',
      name: 'NAUFAL RAHADI, SH',
      title: 'Associate',
      category: 'associates',
      email: 'naufal.rahadi@baguslawfirm.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: '15',
      name: 'ALAN F. BACHTIAR, SH',
      title: 'Associate',
      category: 'associates',
      email: 'alan.bachtiar@baguslawfirm.com',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    },
    {
      id: '16',
      name: 'YOSEPH ADWITIYA ADHI, SH., LL.M',
      title: 'Associate',
      category: 'associates',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    },
    {
      id: '17',
      name: 'JUAN FARREL, SH',
      title: 'Associate',
      category: 'associates',
      email: 'juan.farrel@baguslawfirm.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    // Legal Staff
    {
      id: '18',
      name: 'TALITHA SHAFA PUTRI I, SH',
      title: 'Legal Staff',
      category: 'legal-staff',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    },
    {
      id: '19',
      name: 'ALIYA NURIFA PERWITASARI, SH',
      title: 'Legal Staff',
      category: 'legal-staff',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      id: '20',
      name: 'DHIAN PUTRI MAHARANI, SH',
      title: 'Legal Staff',
      category: 'legal-staff',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    },
  ];

  const filteredProfiles =
    activeFilter === 'all'
      ? profiles
      : profiles.filter((profile) => profile.category === activeFilter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-20 overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 transform rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-0 w-48 h-48 bg-orange-400 transform rotate-12 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-pink-400 transform -rotate-12 -translate-y-1/4"></div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-blue-400 transform rotate-45"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/20">
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Temukan sosok-sosok di balik tim luar biasa kami. Dengan pengalaman
              yang luas dan dedikasi terhadap kesuksesan Anda, para pengacara kami
              bukan hanya profesional di bidang hukum, tetapi juga mitra terpercaya
              dalam perjalanan hukum Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 py-4 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-blue-900 dark:bg-blue-800 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group"
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
              <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-2"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300"></div>
              </div>

              {/* Profile Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                  {profile.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{profile.title}</p>
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-blue-900 dark:text-blue-400 text-xs hover:underline mt-1 block"
                  >
                    {profile.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No profiles found in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
