import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { getBuildingImage } from '@/lib/building-images';
import ScrollAnimation from '../components/ScrollAnimation';

// Lazy load Footer since it's at the bottom
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-48 bg-slate-900 animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Contact Us - Bagus Law Firm',
  description: 'Kami siap membantu Anda dengan layanan hukum yang cepat dan profesional. Hubungi tim kami untuk konsultasi, informasi layanan, atau pertanyaan lainnya.',
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen relative bg-slate-50 dark:bg-slate-950 font-sans selection:bg-accent selection:text-white transition-colors duration-300"
      style={{
        backgroundImage: `url(${getBuildingImage(4)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Theme Responsive Overlay */}
      {/* Light Mode: White overlay to fade out image for dark text readability */}
      {/* Dark Mode: Dark overlay for white text readability */}
      <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/90 backdrop-blur-[2px] transition-colors duration-300"></div>

      {/* Industrial Grid Texture (Subtle) */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-slate-900/5 dark:border-white/5"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation variant="default" />

        {/* Header Section */}
        <div className="pt-32 pb-12 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-block py-1 px-2 border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-widest uppercase mb-4">
                  Get In Touch
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white uppercase tracking-tight transition-colors duration-300">
                  Contact Us
                </h1>
              </div>
              <p className="max-w-xl text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-4 transition-colors duration-300">
                Kami siap membantu Anda dengan layanan hukum yang cepat dan profesional. Hubungi tim kami untuk konsultasi.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation direction="up">
              <div className="relative group p-8 bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl backdrop-blur-sm mb-12">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-900 dark:border-white/30 group-hover:opacity-100 transition-opacity"></div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center uppercase tracking-wide">SEMARANG OFFICE</h2>

                {/* Map - Wide and Centered */}
                <div className="w-full h-96 lg:h-[500px] border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 mb-8 p-1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5!2d110.4!3d-6.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTcnMDAuMCJTIDExMMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid&q=Jl+Contoh+No+123+Semarang"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bagus Law Firm Semarang Office"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>

                {/* Location Details - Below Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 dark:border-white/5 pt-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Location</h3>
                    <p className="text-slate-800 dark:text-slate-200 text-lg font-bold mb-2">
                      Gedung BAGUS TOWER
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Jl. Contoh No. 123
                      <br />
                      Kecamatan Contoh, Semarang, Jawa Tengah 50123
                    </p>
                    <div className="mt-4">
                      <Link
                        href="https://maps.google.com/?q=Jl+Contoh+No+123+Semarang"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-slate-900 dark:text-white hover:text-accent uppercase tracking-wider border-b border-transparent hover:border-accent transition-all duration-300"
                      >
                        Open in Google Maps
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </Link>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Contact</h3>
                    <ul className="space-y-4">
                      <li>
                        <span className="block text-xs text-slate-500 uppercase">Phone</span>
                        <a href="tel:+621234567890" className="text-slate-900 dark:text-white font-mono hover:text-accent transition-colors">+62 123 456 7890</a>
                      </li>
                      <li>
                        <span className="block text-xs text-slate-500 uppercase">Email</span>
                        <a href="mailto:info@baguslawfirm.com" className="text-slate-900 dark:text-white font-mono hover:text-accent transition-colors">info@baguslawfirm.com</a>
                      </li>
                      <li>
                        <span className="block text-xs text-slate-500 uppercase">Office</span>
                        <a href="tel:0241234567" className="text-slate-900 dark:text-white font-mono hover:text-accent transition-colors">024-1234567</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Social Media Links */}
          <div className="mt-12 text-center pb-16">
            <ScrollAnimation direction="up" delay={200}>
              <div className="inline-block p-6 border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Connect With Us</span>
                <div className="flex justify-center items-center space-x-8">
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-[#0077b5] transition-colors transform hover:scale-110 duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-[#E1306C] transition-colors transform hover:scale-110 duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
