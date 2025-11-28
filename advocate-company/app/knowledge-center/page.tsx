import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Knowledge Center - Bagus Law Firm',
  description: 'Knowledge Center Bagus Law Firm - News and Articles about legal updates, regulations, and insights.',
};

export default function KnowledgeCenterPage() {
  const articles = [
    {
      id: 1,
      title: 'Majala Hukum Edisi Nov 2025 BAGUS LAW-Disharmoni Pengaturan RME',
      date: 'November 11, 2025',
      category: 'Articles',
      comments: 0,
    },
    {
      id: 2,
      title: 'Perbedaan Audit Hukum-Legal Opinion dan Legal Reasoning',
      date: 'November 3, 2025',
      category: 'Articles',
      comments: 0,
    },
    {
      id: 3,
      title: 'IMPLIKASI PERMENDAGRI No. 73 Tahun 2022 tentang Pencatatan Nama pada Dokumen Kependudukan terhadap Kew',
      date: 'Oktober 27, 2025',
      category: 'Articles',
      comments: 0,
    },
    {
      id: 4,
      title: 'IDXCarbon dan Transisi Menuju Ekonomi Hijau di Indonesia',
      date: 'Oktober 13, 2025',
      category: 'Articles',
      comments: 0,
    },
    {
      id: 5,
      title: 'Kontrak Digital Apa yang terjadi Jika Wanprestasi',
      date: 'Oktober 8, 2025',
      category: 'Articles',
      comments: 0,
    },
    {
      id: 6,
      title: 'Dampak Sosial dan Keadilan Prosedural dalam Merger Perusahaan terhadap PHK Tinjauan Hukum Ketenagakerjaan',
      date: 'Oktober 8, 2025',
      category: 'Articles',
      comments: 0,
    },
    {
      id: 7,
      title: 'Konsekuensi Perpajakan dalam Transaksi MERGER di Indonesia',
      date: 'Oktober 8, 2025',
      category: 'Articles',
      comments: 0,
    },
    {
      id: 8,
      title: 'Aturan Asal Barang (Rules of Origin) dalam Era Digital dan Integrasi Perdagangan',
      date: 'Oktober 6, 2025',
      category: 'Articles',
      comments: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Knowledge Center</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* News Section */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">News</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  The current query has no posts. Please make sure you have published items matching your query.
                </p>
              </div>
            </section>

            {/* Articles Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Articles</h2>
              <div className="space-y-6">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-400">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">
                      <Link href={`/knowledge-center/articles/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <span>•</span>
                      <time>{article.date}</time>
                      <span>•</span>
                      <span>{article.comments} Comments</span>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* See More Link */}
              <div className="mt-8 text-center">
                <Link
                  href="/knowledge-center/articles"
                  className="inline-block text-blue-900 dark:text-blue-400 font-semibold hover:underline"
                >
                  See More &gt;&gt;
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/knowledge-center/news"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge-center/articles"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
                  >
                    Articles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

