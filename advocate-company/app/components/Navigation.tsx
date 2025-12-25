'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { fetchWithCache } from '@/lib/cache-client';

interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  description: string;
}

interface SubMenuItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

interface MenuItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

interface NavigationProps {
  variant?: 'home' | 'default';
}

export default function Navigation({ variant = 'default' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [practiceAreasLoading, setPracticeAreasLoading] = useState(true);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Fetch practice areas for dynamic menu
  useEffect(() => {
    async function fetchPracticeAreasMenu() {
      try {
        const json = await fetchWithCache<{ docs: PracticeArea[]; totalDocs: number }>(
          '/api/cms/practice-areas'
        );
        const areas = json.docs || [];
        console.log('Practice Areas Navigation Data:', areas.map(a => ({ title: a.title, order: a.order })));
        setPracticeAreas(areas);
      } catch (error) {
        console.error('Error fetching practice areas for menu:', error);
        setPracticeAreas([]);
      } finally {
        setPracticeAreasLoading(false);
      }
    }

    fetchPracticeAreasMenu();
  }, []);

  const menuItems = useMemo<MenuItem[]>(() => {
    const practiceAreasSubmenu = practiceAreas.map(area => ({
      name: area.title,
      href: `/practice-areas/${area.slug}`,
    }));

    return [
      { name: 'Home', href: '/' },
      {
        name: 'Law Firm',
        href: '/law-firm',
        submenu: [{ name: 'Tentang Kami', href: '/law-firm/tentang-kami' }],
      },
      {
        name: 'Knowledge Center',
        href: '/knowledge-center',
        submenu: [
          { name: 'News', href: '/knowledge-center/news' },
          { name: 'Articles', href: '/knowledge-center/articles' },
        ],
      },
      {
        name: 'Practice Areas',
        href: '/practice-areas',
        submenu: practiceAreasSubmenu,
      },
      {
        name: 'Profiles',
        href: '/profiles',
      },
      {
        name: 'Contact Us',
        href: '/contact',
      },
    ];
  }, [practiceAreas]);

  // Helper to determine text colors based on variant and state
  const getTextColorClass = () => {
    if (scrolled) return 'text-slate-900 dark:text-white';
    // Not scrolled - use accent in day mode, white in night mode
    return 'text-accent dark:text-white';
  };

  const getSubTextColorClass = () => {
    if (scrolled) return 'text-slate-500 dark:text-slate-400';
    return 'text-accent/80 dark:text-slate-400';
  };

  const getLinkClass = (isActive: boolean) => {
    const baseClass = "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-transparent rounded-sm";

    if (isActive) return `${baseClass} bg-accent text-white border-accent`;

    if (scrolled) {
      return `${baseClass} text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white`;
    }

    // Not scrolled - use accent in day mode, white in night mode
    return `${baseClass} text-accent hover:text-orange-600 hover:bg-accent/10 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10`;
  };

  const getMobileButtonClass = () => {
    if (scrolled) return 'text-slate-900 dark:text-white';
    if (variant === 'home') return 'text-white';
    return 'text-slate-900 dark:text-white';
  };

  const getMobileLineClass = (isOpen: boolean) => {
    if (isOpen) return 'bg-accent';
    if (scrolled) return 'bg-slate-900 dark:bg-white';
    if (variant === 'home') return 'bg-white';
    return 'bg-slate-900 dark:bg-white';
  };


  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 text-slate-400 text-[9px] md:text-[10px] py-2 md:py-1 px-4 md:px-8 font-mono border-b border-slate-800 tracking-wider z-50 relative overflow-hidden gap-2 md:gap-0">
        {/* Top Bar Background Pattern */}
        <div className="absolute inset-0 opacity-10 blueprint-grid pointer-events-none"></div>

        <div className="flex gap-4 md:gap-6 relative z-10 w-full md:w-auto justify-between md:justify-start border-b md:border-b-0 border-slate-800 pb-1 md:pb-0">
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 bg-accent"></span>
            JKT //
          </span>
          <span className="md:hidden lg:inline">PACUAN KUDA RAYA NO. 6</span>
        </div>
        <div className="flex gap-4 md:gap-6 relative z-10 justify-between w-full md:w-auto">
          <a href="tel:6285703444000" className="hover:text-white transition-colors flex items-center gap-2">
            <span>[T]</span> +62 857-0344-4000
          </a>
          <span className="text-slate-700 hidden md:inline">|</span>
          <a href="mailto:info@eshlaw.com" className="hover:text-white transition-colors flex items-center gap-2">
            <span>[M]</span> INFO@ESHLAW.COM
          </a>
        </div>
      </div>

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? 'top-0 glass-industrial py-2 border-b border-slate-200 dark:border-slate-800'
          : 'top-[44px] md:top-[33px] bg-transparent py-4 md:py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="group flex flex-row items-center gap-0 relative pl-2">
                {/* Logo Accent Marker - Optional now that we have an image, but kept for style if needed, or removed. I'll remove the old marker code if it conflicts, but here I'm replacing the whole Link content structure. */}

                <div className="relative h-20 w-20 md:h-32 md:w-32 shrink-0">
                  <img
                    src="/logoESH.png"
                    alt="ESH Law Office"
                    className="h-full w-full object-contain brightness-100 transition-all group-hover:scale-125"
                  />
                </div>

                <div className="flex flex-col items-center md:items-start">
                  <span className={`text-xl md:text-2xl font-bold tracking-tighter leading-none transition-colors ${getTextColorClass()}`}>
                    ESH
                  </span>
                  <span className={`text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase leading-none ${getSubTextColorClass()}`}>LAW OFFICE</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => {
                    if (item.submenu) {
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                        timeoutRef.current = null;
                      }
                      setActiveDropdown(item.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                    }
                    timeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                    }, 200);
                  }}
                >
                  <Link
                    href={item.href}
                    className={getLinkClass(pathname === item.href || pathname?.startsWith(item.href + '/') || (item.href === '/practice-areas' && pathname?.startsWith('/practice-areas')))}
                  >
                    {item.name}
                  </Link>

                  {item.submenu && activeDropdown === item.name && (
                    <div
                      className={`absolute top-full z-50 mt-2 ${item.name === 'Practice Areas'
                        ? 'w-[800px] -right-20'
                        : 'w-60 left-0'
                        }`}
                      onMouseEnter={() => {
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                          timeoutRef.current = null;
                        }
                        setActiveDropdown(item.name);
                      }}
                      onMouseLeave={() => {
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                        }
                        timeoutRef.current = setTimeout(() => {
                          setActiveDropdown(null);
                        }, 200);
                      }}
                    >
                      <div className="bg-slate-900 border border-slate-700 shadow-2xl p-6 rounded-sm">
                        {/* Industrial Corner Accent */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-accent"></div>

                        {item.name === 'Practice Areas' ? (
                          practiceAreasLoading ? (
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                              <div className="col-span-2 text-center py-4 text-xs text-slate-500 font-mono">
                                LOADING...
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                              {item.submenu?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`block py-2 text-xs font-medium text-slate-400 hover:text-white hover:translate-x-1 transition-all border-b border-slate-800 ${pathname === subItem.href ? 'text-accent border-accent/30' : ''
                                    }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )
                        ) : (
                          <div className="flex flex-col gap-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block px-4 py-3 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white border-l-2 border-transparent hover:border-accent transition-all ${pathname === subItem.href ? 'bg-white/5 text-white border-accent' : ''
                                  }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="ml-4 pl-4 border-l border-white/20">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  if (isMenuOpen) setExpandedMobileMenu(null);
                }}
                className={`p-4 -mr-4 rounded-full transition-all duration-300 active:scale-90 ${getMobileButtonClass()} hover:bg-white/10`}
                aria-label="Toggle Menu"
              >
                <div className="space-y-1.5 relative w-6 h-4 flex flex-col justify-center">
                  <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ease-out origin-center ${isMenuOpen ? 'absolute top-1.5 rotate-45 bg-accent' : getMobileLineClass(isMenuOpen)}`}></span>
                  <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0 scale-0' : `opacity-100 ${getMobileLineClass(isMenuOpen)}`}`}></span>
                  <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ease-out origin-center ${isMenuOpen ? 'absolute top-1.5 -rotate-45 bg-accent' : getMobileLineClass(isMenuOpen)}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden fixed inset-x-0 bottom-0 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'top-[64px] opacity-100 translate-y-0' : 'top-[100vh] opacity-0 translate-y-10 pointer-events-none'
            } z-40 overflow-y-auto`}
        >
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"></div>

          <div className="p-6 space-y-6 relative z-10 min-h-full flex flex-col">
            <div className="space-y-4 flex-1">
              {menuItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`border-b border-slate-800/50 last:border-0 pb-4 last:pb-0 transition-all duration-500 delay-[${index * 50}ms] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                >
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.name ? null : item.name)}
                        className="w-full flex justify-between items-center text-lg font-bold text-slate-200 uppercase tracking-widest group"
                      >
                        <span className="group-hover:text-accent transition-colors flex items-center gap-2">
                          {activeDropdown === item.name && <span className="w-1.5 h-1.5 bg-accent"></span>}
                          {item.name}
                        </span>
                        <span className={`text-accent transition-transform duration-300 ${expandedMobileMenu === item.name ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${expandedMobileMenu === item.name ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                        <div className="min-h-0 bg-white/5 border-l-2 border-accent/20 pl-4 py-2 space-y-3">
                          {item.name === 'Practice Areas' && practiceAreasLoading ? (
                            <div className="text-sm text-slate-500 font-mono uppercase">
                              Loading...
                            </div>
                          ) : (
                            item.submenu?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm text-slate-400 hover:text-white hover:translate-x-2 transition-all font-mono uppercase"
                              >
                                {subItem.name}
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-bold text-slate-200 hover:text-accent uppercase tracking-widest transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-end">
              <div>
                <span className="block text-[10px] text-slate-500 font-mono mb-2">SYSTEM PREFERENCES</span>
                <ThemeToggle />
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-600 font-mono">
                  STATUS: ONLINE<br />
                  LOC: JAKARTA
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
