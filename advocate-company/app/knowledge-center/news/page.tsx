import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../../components/Navigation';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'News - Knowledge Center - Bagus Law Firm',
  description: 'Latest news and updates from Bagus Law Firm.',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <p className="text-gray-600 italic">
            The current query has no posts. Please make sure you have published items matching your query.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

