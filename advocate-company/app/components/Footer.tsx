import Link from 'next/link';

const practiceAreas = [
  'Antimonopoli dan Perdagangan Internasional',
  'Litigasi and Alternative Dispute Resolution',
  'PKPU dan Kepailitan',
  'Perumahan dan Aset',
  'Pembiayaan Keuangan',
  'Minyak & Gas',
  'Merger dan Akuisisi',
  'Keuangan Syariah',
  'Investasi',
  'Teknologi Informasi, E-commerce, Media and Telekomunikasi',
  'Kesehatan',
  'Perkebunan',
  'Kejahatan Penipuan dan Investigasi Forensik',
  'Lingkungan',
  'Energi, Infrastruktur dan Sumber Daya Mineral',
  'Korporasi dan Komersial',
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">BAGUS LAW FIRM</h3>
            <p className="text-gray-400 mb-4">
              Lawfirm kami telah bekerja dengan banyak perusahaan domestik dan
              internasional di berbagai sektor sehingga menciptakan dan
              memberikan solusi yang efektif serta berfokus pada pengembangan
              segala transaksi bisnis dan investasi bagi para klien.
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-xl font-bold mb-4">Practice Areas</h3>
            <ul className="space-y-2 text-gray-400">
              {practiceAreas.slice(0, 8).map((area, index) => (
                <li key={index}>
                  <Link
                    href="/practice-areas"
                    className="hover:text-white transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <div className="space-y-2 text-gray-400">
              <p>
                <span className="font-semibold">Helpline:</span>{' '}
                <a
                  href="tel:+621234567890"
                  className="hover:text-white transition-colors"
                >
                  +62 123 456 7890
                </a>
              </p>
              <p>
                <span className="font-semibold">Semarang:</span>{' '}
                <a
                  href="tel:0241234567"
                  className="hover:text-white transition-colors"
                >
                  024-1234567
                </a>
              </p>
              <p>
                <span className="font-semibold">Jakarta:</span>{' '}
                <a
                  href="tel:0211234567"
                  className="hover:text-white transition-colors"
                >
                  021-1234567
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a
                  href="mailto:info@baguslawfirm.com"
                  className="hover:text-white transition-colors"
                >
                  info@baguslawfirm.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2022 Bagus Law Firm. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

