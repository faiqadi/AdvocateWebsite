import Link from 'next/link';

const features = [
  {
    id: 1,
    title: 'Penasihat tepercaya untuk orang-orang sukses',
    description:
      'Bagus Law menyediakan jasa kepada perusahaan swasta, domestik, dan perusahaan multinasional di berbagai sektor usaha.',
  },
  {
    id: 2,
    title: 'Kami adalah juara kepentingan klien',
    description:
      'Bagus Law bukan hanya penasihat hukum terpercaya yang dapat anda miliki, kami merupakan penasihat serta rekan bisnis yang dapat anda percayai.',
  },
  {
    id: 3,
    title: 'Pembicaraan kita dengan orang-orang bersifat rahasia',
    description:
      'Bagus Law bukan hanya penasihat hukum terpercaya yang dapat anda miliki, kami merupakan penasihat serta rekan bisnis yang dapat anda percayai.',
  },
  {
    id: 4,
    title: 'Perkembangan hukum & peraturan yang berdampak',
    description:
      'Penegakan yang ketat saat ini menuntut klien untuk tidak hanya untuk mematuhi peraturan, tetapi juga untuk berinvestasi dalam program pencegahan.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kami memecahkan masalah hukum yang rumit #dengan mudah.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

