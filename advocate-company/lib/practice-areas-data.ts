export interface PracticeAreaDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  services: string[];
  expertise: string[];
  icon?: string;
}

// Helper function to create slug from title
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[&]/g, 'dan')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Practice Areas Data
export const practiceAreasData: PracticeAreaDetail[] = [
  {
    id: 'antimonopoli',
    title: 'Antimonopoli dan Perdagangan Internasional',
    slug: 'antimonopoli-dan-perdagangan-internasional',
    description: 'Bagus Law memberikan nasihat hukum di sektor persaingan usaha dan anti-monopoli.',
    overview: 'Kami menyediakan layanan hukum komprehensif di bidang persaingan usaha dan perdagangan internasional, membantu klien memahami dan mematuhi regulasi yang kompleks dalam lingkungan bisnis global.',
    services: [
      'Konsultasi terkait Undang-Undang Persaingan Usaha',
      'Analisis dampak merger dan akuisisi terhadap persaingan pasar',
      'Pendampingan dalam investigasi KPPU',
      'Nasihat hukum perdagangan internasional',
      'Penyusunan perjanjian distribusi dan franchise',
    ],
    expertise: [
      'Hukum Persaingan Usaha',
      'Perdagangan Internasional',
      'WTO dan Perjanjian Perdagangan Bebas',
      'Anti-Dumping dan Countervailing Duties',
    ],
  },
  {
    id: 'litigasi',
    title: 'Litigasi and Alternative Dispute Resolution',
    slug: 'litigasi-and-alternative-dispute-resolution',
    description: 'Tim terbaik dari kantor kami memberikan analisa, nasehat serta tindakan hukum secara profesional.',
    overview: 'Kami memiliki pengalaman luas dalam menangani berbagai jenis sengketa hukum, baik melalui proses litigasi di pengadilan maupun melalui mekanisme penyelesaian sengketa alternatif seperti arbitrase dan mediasi.',
    services: [
      'Representasi di pengadilan umum dan pengadilan khusus',
      'Arbitrase domestik dan internasional',
      'Mediasi dan negosiasi penyelesaian sengketa',
      'Penyusunan opini hukum dan legal opinion',
      'Pendampingan dalam proses eksekusi putusan',
    ],
    expertise: [
      'Hukum Perdata dan Dagang',
      'Hukum Pidana Bisnis',
      'Hukum Administrasi',
      'Arbitrase Internasional',
    ],
  },
  {
    id: 'pkpu',
    title: 'PKPU dan Kepailitan',
    slug: 'pkpu-dan-kepailitan',
    description: 'Bagus Law menyediakan layanan hukum untuk Penundaan Kewajiban Pembayaran Utang dan Kepailitan.',
    overview: 'Kami membantu perusahaan yang mengalami kesulitan keuangan untuk melakukan restrukturisasi utang melalui mekanisme PKPU atau menangani proses kepailitan dengan pendekatan yang strategis.',
    services: [
      'Pengajuan permohonan PKPU',
      'Pendampingan dalam proses kepailitan',
      'Restrukturisasi utang dan perjanjian komposisi',
      'Representasi kreditur dalam proses kepailitan',
      'Konsultasi pencegahan kepailitan',
    ],
    expertise: [
      'Hukum Kepailitan dan PKPU',
      'Restrukturisasi Utang',
      'Hukum Perbankan',
      'Corporate Restructuring',
    ],
  },
  {
    id: 'perumahan',
    title: 'Perumahan dan Aset',
    slug: 'perumahan-dan-aset',
    description: 'Kami memberikan nasihat hukum terkait perumahan dan pengelolaan aset.',
    overview: 'Layanan hukum komprehensif untuk pengembangan properti, pengelolaan aset, dan transaksi real estate dengan fokus pada kepatuhan regulasi dan optimalisasi nilai aset.',
    services: [
      'Due diligence properti dan real estate',
      'Penyusunan perjanjian jual beli dan sewa menyewa',
      'Konsultasi pengembangan properti',
      'Pengurusan izin pembangunan dan sertifikat',
      'Pengelolaan portofolio aset',
    ],
    expertise: [
      'Hukum Agraria dan Tata Ruang',
      'Real Estate Development',
      'Property Management',
      'Hukum Perjanjian',
    ],
  },
  {
    id: 'pembiayaan',
    title: 'Pembiayaan Keuangan',
    slug: 'pembiayaan-keuangan',
    description: 'Bagus Law memberikan nasihat hukum untuk berbagai skema pembiayaan keuangan.',
    overview: 'Kami membantu klien dalam menyusun dan menegosiasikan berbagai struktur pembiayaan, mulai dari pinjaman konvensional hingga instrumen keuangan yang lebih kompleks.',
    services: [
      'Strukturisasi pembiayaan proyek',
      'Penyusunan perjanjian kredit dan pembiayaan',
      'Syndicated loans dan structured finance',
      'Konsultasi regulatory compliance',
      'Restrukturisasi pembiayaan',
    ],
    expertise: [
      'Project Finance',
      'Structured Finance',
      'Syndicated Loans',
      'Regulatory Compliance',
    ],
  },
  {
    id: 'minyak-gas',
    title: 'Minyak & Gas',
    slug: 'minyak-gas',
    description: 'Firma Hukum pada Bidang Minyak dan Gas. Memberikan Saran Hukum yang efektif.',
    overview: 'Kami memiliki pengalaman mendalam dalam industri minyak dan gas, membantu klien menavigasi regulasi yang kompleks dan menegosiasikan kontrak-kontrak strategis.',
    services: [
      'Konsultasi Production Sharing Contract (PSC)',
      'Penyusunan perjanjian jual beli minyak dan gas',
      'Pengurusan izin operasi migas',
      'Due diligence dalam transaksi migas',
      'Penyelesaian sengketa kontrak migas',
    ],
    expertise: [
      'Oil & Gas Law',
      'Production Sharing Contracts',
      'Energy Regulation',
      'Upstream & Downstream Operations',
    ],
  },
  {
    id: 'merger',
    title: 'Merger dan Akuisisi',
    slug: 'merger-dan-akuisisi',
    description: 'Bagus Law memberikan nasihat hukum komprehensif untuk transaksi merger dan akuisisi.',
    overview: 'Kami menyediakan layanan hukum end-to-end untuk transaksi M&A, mulai dari strategi awal hingga integrasi pasca-transaksi, dengan fokus pada nilai maksimal bagi klien.',
    services: [
      'Due diligence hukum',
      'Strukturisasi transaksi M&A',
      'Penyusunan perjanjian pembelian saham/aset',
      'Konsultasi persetujuan regulator',
      'Integrasi pasca-akuisisi',
    ],
    expertise: [
      'Corporate M&A',
      'Due Diligence',
      'Share Purchase Agreements',
      'Asset Purchase Agreements',
    ],
  },
  {
    id: 'keuangan-syariah',
    title: 'Keuangan Syariah',
    slug: 'keuangan-syariah',
    description: 'Layanan hukum untuk produk dan transaksi keuangan syariah.',
    overview: 'Kami membantu lembaga keuangan syariah dan klien dalam menyusun produk keuangan syariah yang compliant dengan prinsip syariah dan regulasi yang berlaku.',
    services: [
      'Strukturisasi produk keuangan syariah',
      'Penyusunan akad syariah (mudharabah, musyarakah, ijarah, dll)',
      'Konsultasi compliance syariah',
      'Pendampingan dalam transaksi sukuk',
      'Konsultasi zakat dan wakaf',
    ],
    expertise: [
      'Islamic Finance',
      'Sharia Compliance',
      'Sukuk Structuring',
      'Islamic Banking',
    ],
  },
  {
    id: 'investasi',
    title: 'Investasi',
    slug: 'investasi',
    description: 'Nasihat hukum untuk investasi domestik dan asing di Indonesia.',
    overview: 'Kami membantu investor dalam memahami dan mematuhi regulasi investasi di Indonesia, serta menyusun struktur investasi yang optimal.',
    services: [
      'Konsultasi PMA (Penanaman Modal Asing)',
      'Pengurusan izin investasi dan perizinan terkait',
      'Strukturisasi investasi dan joint venture',
      'Due diligence investasi',
      'Konsultasi insentif investasi',
    ],
    expertise: [
      'Foreign Investment Law',
      'Investment Licensing',
      'Joint Ventures',
      'Investment Incentives',
    ],
  },
  {
    id: 'teknologi-informasi',
    title: 'Teknologi Informasi, E-commerce, Media and Telekomunikasi',
    slug: 'teknologi-informasi-e-commerce-media-and-telekomunikasi',
    description: 'Layanan hukum untuk industri teknologi, e-commerce, media, dan telekomunikasi.',
    overview: 'Kami memahami kompleksitas regulasi di sektor digital dan membantu klien dalam mengembangkan bisnis teknologi yang compliant dengan regulasi yang terus berkembang.',
    services: [
      'Konsultasi UU ITE dan perlindungan data pribadi',
      'Penyusunan Terms of Service dan Privacy Policy',
      'Konsultasi e-commerce dan marketplace',
      'Pengurusan izin telekomunikasi',
      'Konsultasi konten digital dan hak cipta',
    ],
    expertise: [
      'IT Law',
      'Data Protection',
      'E-commerce Regulation',
      'Telecommunications Law',
    ],
  },
  {
    id: 'kesehatan',
    title: 'Kesehatan',
    slug: 'kesehatan',
    description: 'Bagus Law menyediakan jasa dalam menyarankan investor tentang pendirian, akuisisi, operasi rumah sakit dan klinik swasta.',
    overview: 'Kami membantu klien dalam mengembangkan dan mengoperasikan fasilitas kesehatan dengan memastikan kepatuhan terhadap regulasi kesehatan yang ketat.',
    services: [
      'Konsultasi pendirian rumah sakit dan klinik',
      'Pengurusan izin operasional fasilitas kesehatan',
      'Penyusunan perjanjian dengan tenaga kesehatan',
      'Konsultasi regulasi BPJS Kesehatan',
      'Due diligence akuisisi fasilitas kesehatan',
    ],
    expertise: [
      'Healthcare Law',
      'Hospital Licensing',
      'Medical Practice Regulation',
      'Healthcare Compliance',
    ],
  },
  {
    id: 'perkebunan',
    title: 'Perkebunan dan Kehutanan',
    slug: 'perkebunan-dan-kehutanan',
    description: 'Layanan hukum untuk industri perkebunan dan kehutanan.',
    overview: 'Kami membantu perusahaan perkebunan dan kehutanan dalam mengelola aset, memperoleh izin, dan memastikan kepatuhan terhadap regulasi lingkungan dan kehutanan.',
    services: [
      'Pengurusan HGU (Hak Guna Usaha) dan izin perkebunan',
      'Konsultasi RSPO dan sertifikasi berkelanjutan',
      'Penyusunan perjanjian kemitraan dengan petani',
      'Konsultasi regulasi kehutanan',
      'Due diligence lahan perkebunan',
    ],
    expertise: [
      'Plantation Law',
      'Forestry Regulation',
      'Land Rights',
      'Sustainability Certification',
    ],
  },
  {
    id: 'kejahatan',
    title: 'Kejahatan Penipuan dan Investigasi Forensik',
    slug: 'kejahatan-penipuan-dan-investigasi-forensik',
    description: 'Rezim penegakan yang ketat saat ini menuntut klien untuk tidak hanya untuk mematuhi peraturan, tetapi juga untuk berinvestasi dalam program pencegahan.',
    overview: 'Kami membantu klien dalam mencegah, mendeteksi, dan menangani kasus penipuan serta melakukan investigasi forensik untuk melindungi aset dan reputasi perusahaan.',
    services: [
      'Investigasi internal dan forensik',
      'Penyusunan program pencegahan penipuan',
      'Pendampingan dalam kasus penipuan',
      'Konsultasi whistleblowing system',
      'Digital forensics dan cybercrime',
    ],
    expertise: [
      'Fraud Investigation',
      'Forensic Accounting',
      'Cybercrime',
      'Corporate Compliance',
    ],
  },
  {
    id: 'lingkungan',
    title: 'Lingkungan',
    slug: 'lingkungan',
    description: 'Layanan hukum terkait regulasi lingkungan dan keberlanjutan.',
    overview: 'Kami membantu perusahaan dalam mematuhi regulasi lingkungan, mengelola risiko lingkungan, dan mengembangkan praktik bisnis yang berkelanjutan.',
    services: [
      'Konsultasi AMDAL dan UKL-UPL',
      'Pengurusan izin lingkungan',
      'Konsultasi pengelolaan limbah B3',
      'Pendampingan dalam sengketa lingkungan',
      'Konsultasi carbon trading dan ESG',
    ],
    expertise: [
      'Environmental Law',
      'Environmental Impact Assessment',
      'Waste Management',
      'ESG Compliance',
    ],
  },
  {
    id: 'energi',
    title: 'Energi, Infrastruktur dan Sumber Daya Mineral',
    slug: 'energi-infrastruktur-dan-sumber-daya-mineral',
    description: 'Layanan hukum untuk sektor energi, infrastruktur, dan pertambangan.',
    overview: 'Kami memiliki pengalaman luas dalam membantu klien mengembangkan proyek energi dan infrastruktur, serta mengelola operasi pertambangan dengan kepatuhan penuh terhadap regulasi.',
    services: [
      'Konsultasi proyek infrastruktur (jalan, pelabuhan, bandara)',
      'Pengurusan izin pertambangan dan energi',
      'Strukturisasi proyek energi terbarukan',
      'Penyusunan perjanjian EPC dan O&M',
      'Konsultasi Public-Private Partnership (PPP)',
    ],
    expertise: [
      'Infrastructure Law',
      'Mining Law',
      'Renewable Energy',
      'PPP Projects',
    ],
  },
  {
    id: 'korporasi',
    title: 'Korporasi dan Komersial',
    slug: 'korporasi-dan-komersial',
    description: 'Layanan hukum korporat dan komersial yang komprehensif.',
    overview: 'Kami menyediakan layanan hukum korporat end-to-end, mulai dari pendirian perusahaan hingga tata kelola korporat dan transaksi komersial sehari-hari.',
    services: [
      'Pendirian perusahaan (PT, CV, Firma)',
      'Tata kelola korporat dan compliance',
      'Penyusunan perjanjian komersial',
      'Konsultasi corporate secretary',
      'Restrukturisasi perusahaan',
    ],
    expertise: [
      'Corporate Law',
      'Corporate Governance',
      'Commercial Contracts',
      'Company Secretarial',
    ],
  },
  {
    id: 'pariwisata',
    title: 'Pariwisata dan Perhotelan',
    slug: 'pariwisata-dan-perhotelan',
    description: 'Layanan hukum untuk industri pariwisata dan perhotelan.',
    overview: 'Kami membantu klien dalam mengembangkan dan mengoperasikan bisnis pariwisata dan perhotelan dengan memastikan kepatuhan terhadap regulasi yang berlaku.',
    services: [
      'Konsultasi pendirian hotel dan resort',
      'Pengurusan izin usaha pariwisata',
      'Penyusunan perjanjian manajemen hotel',
      'Konsultasi regulasi pariwisata',
      'Due diligence investasi pariwisata',
    ],
    expertise: [
      'Tourism Law',
      'Hotel Management',
      'Hospitality Regulation',
      'Tourism Investment',
    ],
  },
  {
    id: 'penerbangan',
    title: 'Penerbangan',
    slug: 'penerbangan',
    description: 'Layanan hukum untuk industri penerbangan.',
    overview: 'Kami membantu perusahaan penerbangan dan terkait dalam mengelola operasi, memperoleh izin, dan menangani berbagai aspek hukum industri penerbangan.',
    services: [
      'Pengurusan izin operasi penerbangan',
      'Konsultasi regulasi penerbangan sipil',
      'Penyusunan perjanjian sewa pesawat',
      'Konsultasi asuransi penerbangan',
      'Pendampingan dalam sengketa penerbangan',
    ],
    expertise: [
      'Aviation Law',
      'Aircraft Leasing',
      'Aviation Regulation',
      'Aviation Insurance',
    ],
  },
  {
    id: 'pelayaran',
    title: 'Pelayaran',
    slug: 'pelayaran',
    description: 'Layanan hukum untuk industri pelayaran dan maritim.',
    overview: 'Kami memiliki pengalaman dalam membantu klien dalam berbagai aspek hukum pelayaran, dari perizinan hingga penyelesaian sengketa maritim.',
    services: [
      'Pengurusan izin pelayaran',
      'Konsultasi regulasi maritim',
      'Penyusunan perjanjian charter kapal',
      'Konsultasi asuransi maritim',
      'Pendampingan dalam sengketa maritim',
    ],
    expertise: [
      'Maritime Law',
      'Ship Registration',
      'Maritime Regulation',
      'Maritime Insurance',
    ],
  },
  {
    id: 'ketenagakerjaan',
    title: 'Imigrasi dan Ketenagakerjaan',
    slug: 'imigrasi-dan-ketenagakerjaan',
    description: 'Di bidang keimigrasian dan hukum perburuhan, kami memberikan saran tentang: permohonan izin tinggal dan izin kerja bagi tenaga kerja asing, penyusunan kontrak kerja, kebijakan dan praktik personel',
    overview: 'Kami membantu perusahaan dalam mengelola tenaga kerja, baik lokal maupun asing, dengan memastikan kepatuhan terhadap regulasi ketenagakerjaan dan keimigrasian.',
    services: [
      'Pengurusan izin kerja dan izin tinggal TKA',
      'Penyusunan perjanjian kerja dan PKWT/PKWTT',
      'Konsultasi hubungan industrial dan PHK',
      'Penyusunan peraturan perusahaan dan PKB',
      'Konsultasi jaminan sosial ketenagakerjaan',
    ],
    expertise: [
      'Labor Law',
      'Immigration Law',
      'Industrial Relations',
      'Employment Contracts',
    ],
  },
];

// Helper function to get practice area by slug
export function getPracticeAreaBySlug(slug: string): PracticeAreaDetail | undefined {
  return practiceAreasData.find((area) => area.slug === slug);
}

// Helper function to get all practice areas
export function getAllPracticeAreas(): PracticeAreaDetail[] {
  return practiceAreasData;
}





