'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchWithCache } from '@/lib/cache-client';

interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export default function Footer() {
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPracticeAreas() {
      try {
        const json = await fetchWithCache<{ docs: PracticeArea[]; totalDocs: number }>(
          '/api/cms/practice-areas'
        );
        const areas = json.docs || [];
        setPracticeAreas(areas.map(a => a.title));
      } catch (error) {
        console.error('Error fetching practice areas for footer:', error);
        // Fallback or empty on error
        setPracticeAreas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPracticeAreas();
  }, []);

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* About */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-bold mb-6 tracking-widest uppercase text-white border-b-2 border-accent inline-block pb-1">ESH LAW OFFICE</h3>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              Lawfirm kami telah bekerja dengan banyak perusahaan domestik dan
              internasional di berbagai sektor sehingga menciptakan dan
              memberikan solusi yang efektif serta berfokus pada pengembangan
              segala transaksi bisnis dan investasi bagi para klien.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders if needed */}
            </div>
          </div>

          {/* Practice Areas */}
          <div className="md:col-span-5">
            <h3 className="text-sm font-bold mb-6 tracking-widest uppercase text-slate-500">Practice Areas</h3>
            {loading ? (
              <div className="text-xs text-slate-500 font-mono">LOADING...</div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400">
                {practiceAreas.slice(0, 10).map((area, index) => (
                  <li key={index}>
                    <Link
                      href="/practice-areas"
                      className="hover:text-accent transition-colors block py-1 border-b border-transparent hover:border-slate-800"
                    >
                      {area}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/practice-areas" className="text-accent hover:text-white font-bold mt-2 inline-block">View All Areas →</Link>
                </li>
              </ul>
            )}
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold mb-6 tracking-widest uppercase text-slate-500">Fast Contact</h3>
            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <span className="block text-xs font-mono text-slate-600 uppercase mb-1">Helpline</span>
                <a href="tel:6285703444000" className="text-white hover:text-accent text-lg font-bold block transition-colors">+62 857-0344-4000</a>
              </div>
              <div className="h-[1px] bg-slate-900"></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-mono text-slate-600 uppercase mb-1">Jakarta</span>
                  <a href="tel:0211234567" className="hover:text-white transition-colors">021-1234567</a>
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-600 uppercase mb-1">Semarang</span>
                  <a href="tel:0241234567" className="hover:text-white transition-colors">024-1234567</a>
                </div>
              </div>
              <div className="h-[1px] bg-slate-900"></div>
              <div>
                <span className="block text-xs font-mono text-slate-600 uppercase mb-1">Email Inquiry</span>
                <a href="mailto:info@eshlaw.com" className="hover:text-white transition-colors">info@eshlaw.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono uppercase tracking-wider relative">
          {/* Footer Technical Markers */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-slate-800"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-slate-800"></div>

          <p>© 2024 ESH LAW OFFICE. // SYSTEM: ONLINE // VER: 2.0.4</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">[PRIVACY_POLICY]</Link>
            <Link href="#" className="hover:text-white transition-colors">[TERMS_OF_SERVICE]</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
