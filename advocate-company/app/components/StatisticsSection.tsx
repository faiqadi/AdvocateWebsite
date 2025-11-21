export default function StatisticsSection() {
  const stats = [
    { label: 'KASUS DIMENANGKAN', value: '0%' },
    { label: 'TIM PENGACARA', value: '0' },
    { label: 'KONSULTASI GRATIS', value: '0' },
    { label: 'KASUS DISELESAIKAN', value: '0' },
  ];

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-200">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

