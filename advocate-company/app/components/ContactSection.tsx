import Link from 'next/link';

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Butuh Saran dari Pengacara /Konsultan Profesional?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Dapatkan Janji Temu Sekarang!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors"
          >
            Kontak kami!
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Semarang Office */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">SEMARANG</h3>
            <p className="text-gray-700 mb-2 font-semibold">
              Gedung BAGUS TOWER
            </p>
            <p className="text-gray-700 mb-2">
              Jl. Contoh No. 123
              <br />
              Kecamatan Contoh,
              <br />
              Semarang, Jawa Tengah 50123
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Helpline:</span>{' '}
                <a
                  href="tel:+621234567890"
                  className="text-blue-900 hover:underline"
                >
                  +62 123 456 7890
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Telp:</span>{' '}
                <a
                  href="tel:0241234567"
                  className="text-blue-900 hover:underline"
                >
                  024-1234567
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{' '}
                <a
                  href="mailto:info@baguslawfirm.com"
                  className="text-blue-900 hover:underline"
                >
                  info@baguslawfirm.com
                </a>
              </p>
            </div>
          </div>

          {/* Jakarta Office */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">JAKARTA</h3>
            <p className="text-gray-700 mb-2 font-semibold">Gedung BAGUS PLAZA</p>
            <p className="text-gray-700 mb-2">
              Jl. Contoh Raya No. 456
              <br />
              Kecamatan Contoh, Jakarta Selatan
              <br />
              DKI Jakarta 12345
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Helpline:</span>{' '}
                <a
                  href="tel:+621234567890"
                  className="text-blue-900 hover:underline"
                >
                  +62 123 456 7890
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Telp:</span>{' '}
                <a
                  href="tel:0211234567"
                  className="text-blue-900 hover:underline"
                >
                  021-1234567
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{' '}
                <a
                  href="mailto:info@baguslawfirm.com"
                  className="text-blue-900 hover:underline"
                >
                  info@baguslawfirm.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Jam Operasional:</span> Senin -
            Jumat : 09.00 - 18.00 WIB
          </p>
        </div>
      </div>
    </section>
  );
}

