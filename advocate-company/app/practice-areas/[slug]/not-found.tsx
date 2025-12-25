import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Practice Area Not Found
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Maaf, practice area yang Anda cari tidak ditemukan.
        </p>
        <Link
          href="/practice-areas"
          className="inline-block bg-blue-900 dark:bg-blue-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
        >
          Kembali ke Practice Areas
        </Link>
      </div>

      <Footer />
    </div>
  );
}






