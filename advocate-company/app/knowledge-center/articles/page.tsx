import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Articles - Knowledge Center - Bagus Law Firm',
  description: 'Legal articles and insights from Bagus Law Firm.',
};

export default function ArticlesPage() {
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Articles</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-blue-900">
                  {article.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-900 transition-colors">
                <Link href={`/knowledge-center/articles/${article.id}`}>
                  {article.title}
                </Link>
              </h3>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>•</span>
                <time>{article.date}</time>
                <span>•</span>
                <span>{article.comments} Comments</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

