'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const menuItems = [
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

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900 dark:text-blue-400">
              BAGUS LAW
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
                    // Clear any existing timeout
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                      timeoutRef.current = null;
                    }
                    setActiveDropdown(item.name);
                  }
                }}
                onMouseLeave={() => {
                  // Add delay before closing dropdown
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(() => {
                    setActiveDropdown(null);
                  }, 200); // 200ms delay
                }}
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href || 
                    pathname?.startsWith(item.href + '/') ||
                    (item.href === '/practice-areas' && pathname?.startsWith('/practice-areas'))
                      ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <svg
                      className="inline-block ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                {item.submenu && activeDropdown === item.name && (
                  <div 
                    className={`absolute top-full z-50 mt-1 ${
                      item.name === 'Practice Areas' 
                        ? 'w-[800px] right-0' 
                        : 'w-56 left-0'
                    }`}
                    onMouseEnter={() => {
                      // Clear timeout when mouse enters dropdown
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                        timeoutRef.current = null;
                      }
                      setActiveDropdown(item.name);
                    }}
                    onMouseLeave={() => {
                      // Add delay before closing dropdown
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                      }
                      timeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 200); // 200ms delay
                    }}
                  >
                    <div className={`bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 ${
                      item.name === 'Practice Areas' 
                        ? 'py-4 px-6' 
                        : 'py-2'
                    }`}>
                      {item.name === 'Practice Areas' ? (
                        <div className="grid grid-cols-4 gap-4">
                          {[
                            // Column 1
                            item.submenu.slice(0, 5),
                            // Column 2
                            item.submenu.slice(5, 10),
                            // Column 3
                            item.submenu.slice(10, 15),
                            // Column 4
                            item.submenu.slice(15, 20),
                          ].map((column, colIndex) => (
                            <div key={colIndex} className="space-y-1">
                              {column.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`block py-2 text-sm transition-colors border-b border-yellow-200 dark:border-yellow-800 ${
                                    pathname === subItem.href
                                      ? 'text-blue-900 dark:text-blue-400 font-semibold'
                                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400'
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-3 text-sm transition-colors ${
                              pathname === subItem.href
                                ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-900 dark:hover:text-blue-400'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Theme Toggle Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
              type="button"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 focus:outline-none p-2"
              aria-label="Toggle dark mode"
              type="button"
            >
              {theme === 'dark' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isMenuOpen) {
                  setExpandedMobileMenu(null);
                }
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => {
                        setExpandedMobileMenu(
                          expandedMobileMenu === item.name ? null : item.name
                        );
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md ${
                        pathname === item.href || pathname?.startsWith(item.href + '/')
                          ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          expandedMobileMenu === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {expandedMobileMenu === item.name && (
                      <div
                        className={`pl-4 space-y-1 mt-1 ${
                          item.name === 'Practice Areas'
                            ? 'max-h-96 overflow-y-auto'
                            : ''
                        }`}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-3 py-2 text-sm rounded-md ${
                              pathname === subItem.href
                                ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setExpandedMobileMenu(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md ${
                      pathname === item.href
                        ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

