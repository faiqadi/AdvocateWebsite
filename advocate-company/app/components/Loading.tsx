'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show loading immediately when pathname changes
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Intercept all link clicks to show loading immediately
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href) {
        const href = link.getAttribute('href');
        // Only show loading for internal links (not external links or anchors)
        if (href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('#')) {
          const currentPath = window.location.pathname;
          const targetPath = new URL(link.href, window.location.origin).pathname;
          
          // Only show loading if navigating to a different page
          if (targetPath !== currentPath) {
            setIsLoading(true);
          }
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-900 rounded-full border-t-transparent animate-spin"></div>
        </div>
        {/* Loading Text */}
        <p className="text-blue-900 font-semibold text-lg animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

