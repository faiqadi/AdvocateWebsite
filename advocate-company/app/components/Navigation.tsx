'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

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

  const menuItems: MenuItem[] = [
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
      submenu: [
        { name: 'Antimonopoli dan Perdagangan Internasional', href: '/practice-areas#antimonopoli' },
        { name: 'Teknologi Informasi, E-commerce, Media and Telekomunikasi', href: '/practice-areas#teknologi-informasi' },
        { name: 'Energi, Infrastruktur dan Sumber Daya Mineral', href: '/practice-areas#energi' },
        { name: 'Litigasi and Alternative Dispute Resolution', href: '/practice-areas#litigasi' },
        { name: 'Kejahatan Penipuan dan Investigasi Forensik', href: '/practice-areas#kejahatan' },
        { name: 'Merger dan Akuisisi', href: '/practice-areas#merger' },
        { name: 'Korporasi dan Komersial', href: '/practice-areas#korporasi' },
        { name: 'Perumahan dan Aset', href: '/practice-areas#perumahan' },
        { name: 'PKPU dan Kepailitan', href: '/practice-areas#pkpu' },
        { name: 'Pariwisata dan Perhotelan', href: '/practice-areas#pariwisata' },
        { name: 'Pembiayaan Keuangan', href: '/practice-areas#pembiayaan' },
        { name: 'Investasi', href: '/practice-areas#investasi' },
        { name: 'Keuangan Syariah', href: '/practice-areas#keuangan-syariah' },
        { name: 'Lingkungan', href: '/practice-areas#lingkungan' },
        { name: 'Minyak & Gas', href: '/practice-areas#minyak-gas' },
        { name: 'Perkebunan', href: '/practice-areas#perkebunan' },
        { name: 'Kesehatan', href: '/practice-areas#kesehatan' },
        { name: 'Pelayaran', href: '/practice-areas#pelayaran' },
        { name: 'Penerbangan', href: '/practice-areas#penerbangan' },
        { name: 'Ketenagakerjaan', href: '/practice-areas#ketenagakerjaan' },
      ],
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
      <div className="hidden md:flex justify-between items-center bg-slate-900 text-slate-400 text-[10px] py-2 px-8 font-mono border-b border-white/5 tracking-wider z-50 relative">
        <div className="flex gap-6">
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 bg-accent rounded-sm"></span>
            JAKARTA, ID
          </span>
          <span className="hidden lg:inline">JL. PACUAN KUDA RAYA NO. 6</span>
        </div>
        <div className="flex gap-6">
          <a href="tel:+622122868539" className="hover:text-white transition-colors">
            +62 (21) 2286-8539
          </a>
          <a href="mailto:info@baguslawfirm.com" className="hover:text-white transition-colors">
            INFO@BAGUSLAWFIRM.COM
          </a>
        </div>
      </div>

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? 'top-0 glass-industrial py-2'
          : 'top-0 md:top-[33px] bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="group flex flex-col">
                <span className={`text-2xl font-bold tracking-tighter transition-colors ${getTextColorClass()}`}>
                  BAGUS<span className="text-accent">LAW</span>
                </span>
                <span className={`text-[9px] font-mono tracking-[0.4em] uppercase ${getSubTextColorClass()}`}>FIRM & PARTNERS</span>
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
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {item.submenu.map((subItem) => (
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
                className={`p-2 rounded-sm transition-colors ${getMobileButtonClass()}`}
              >
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2 bg-accent' : getMobileLineClass(isMenuOpen)}`}></span>
                  <span className={`block w-6 h-0.5 transition-opacity ${isMenuOpen ? 'opacity-0' : getMobileLineClass(isMenuOpen)}`}></span>
                  <span className={`block w-6 h-0.5 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-accent' : getMobileLineClass(isMenuOpen)}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 bg-slate-900 border-b border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[80vh] opacity-100 top-[64px]' : 'max-h-0 opacity-0 top-[64px]'
            }`}
        >
          <div className="p-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-slate-800 last:border-0">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.name ? null : item.name)}
                      className="w-full flex justify-between items-center py-3 text-sm font-bold text-slate-300 uppercase tracking-wide"
                    >
                      {item.name}
                      <span className={`text-accent transition-transform ${expandedMobileMenu === item.name ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {expandedMobileMenu === item.name && (
                      <div className="bg-slate-950/50 p-3 space-y-2 mb-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-xs text-slate-400 hover:text-white py-1 pl-2 border-l border-slate-700 hover:border-accent transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-sm font-bold text-slate-300 hover:text-white uppercase tracking-wide"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">APPEARANCE</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
