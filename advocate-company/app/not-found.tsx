'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import to avoid potential issues
const Navigation = dynamic(() => import('./components/Navigation'), {
  loading: () => <div className="h-16 bg-slate-900 animate-pulse" />,
  ssr: false
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ditemukan.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
      <Footer />
    </div>
  );
}

