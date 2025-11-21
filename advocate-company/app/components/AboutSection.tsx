import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tim Bagus Law Firm Memperkenalkan pengacara terampil untuk membantu
            semua #kebutuhan hukum Anda.
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
            Lawfirm kami memilik para konsultan hukum dan para lawyer yang ahli
            di bidangnya untuk menjawab tantangan global terutama pada sektor
            industri.
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Bagus Law Firm yang sekarang kami menyebut dengan penamaan
            BAGUS LAW merupakan salah satu firma hukum yang berbentuk badan hukum
            yang telah dikenal oleh masyarakat luas.
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mt-4">
            Kami telah memiliki pengalaman lebih dari satu dekade baik pada
            pengalaman domestik maupun internasional yang berfokus pada pelayan
            dan pengembangan segala transaksi hukum perusahaan diberbagai sektor
            industri.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-900 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
              BL
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              BAGUS PRATAMA, S.H., M.H., CTL
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Founder & senior lawyer
            </p>
            <Link
              href="/profiles"
              className="inline-block bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Putar Profil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

