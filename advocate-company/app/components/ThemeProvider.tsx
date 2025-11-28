'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    let initialTheme: Theme = 'light';
    
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      initialTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark' : 'light';
    }
    
    setTheme(initialTheme);
    setMounted(true);
    
    // Apply theme to HTML
    if (initialTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      const html = document.documentElement;
      
      // Update localStorage
      localStorage.setItem('theme', newTheme);
      
      // Update DOM class - force reflow to ensure class is applied
      if (newTheme === 'dark') {
        html.classList.remove('light');
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
      }
      
      // Force a reflow to ensure styles are applied
      void html.offsetHeight;
      
      return newTheme;
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  // Always provide the context, even during SSR
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default theme if not within provider (for SSR safety)
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
    };
  }
  return context;
}

