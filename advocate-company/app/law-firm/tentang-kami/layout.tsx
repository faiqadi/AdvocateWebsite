import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami - Bagus Law Firm',
  description: 'Bagus Law Firm (BAGUS LAW) - Firma hukum profesional dengan pengalaman lebih dari satu dekade dalam pelayanan konsultasi hukum dan penanganan perkara hukum.',
};

export default function TentangKamiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



