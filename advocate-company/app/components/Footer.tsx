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
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* About */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-bold mb-6 tracking-widest uppercase text-white border-b-2 border-accent inline-block pb-1">BAGUS LAW FIRM</h3>
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
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold mb-6 tracking-widest uppercase text-slate-500">Fast Contact</h3>
            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <span className="block text-xs font-mono text-slate-600 uppercase mb-1">Helpline</span>
                <a href="tel:+621234567890" className="text-white hover:text-accent text-lg font-bold block transition-colors">+62 123 456 7890</a>
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
                <a href="mailto:info@baguslawfirm.com" className="hover:text-white transition-colors">info@baguslawfirm.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-mono uppercase tracking-wider">
          <p>© 2024 BAGUS LAW FIRM. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
