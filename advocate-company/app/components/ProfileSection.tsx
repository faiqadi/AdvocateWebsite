'use client';

import { useState } from 'react';

interface Profile {
  id: string;
  name: string;
  title: string;
  education?: string;
  specialization?: string;
  experience?: string;
  shortDescription?: string;
  email?: string;
}

interface ProfileSectionProps {
  categoryId: string;
  title: string;
  description: string;
}

// Sample profile data - in a real app, this would come from a database or API
const profileData: Record<string, Profile[]> = {
  'managing-partners': [
    {
      id: '1',
      name: 'BAGUS PRATAMA, S.H., M.H., CTL',
      title: 'Founder & Managing Partner',
      education: 'S.H., M.H., CTL',
      specialization: 'Corporate Law, Investment Law, Mining Law',
      experience: 'Lebih dari satu dekade pengalaman dalam hukum korporasi dan investasi',
      shortDescription: 'Experienced legal professional with over a decade of expertise in corporate and investment law, dedicated to providing exceptional legal solutions.',
      email: 'bagus.pratama@baguslawfirm.com',
    },
  ],
  partners: [
    {
      id: '2',
      name: 'Partner Name 1, S.H., LL.M.',
      title: 'Partner',
      education: 'S.H., LL.M.',
      specialization: 'Litigation, Alternative Dispute Resolution',
      experience: 'Pengalaman luas dalam litigasi dan arbitrase',
      shortDescription: 'Skilled litigator with extensive experience in arbitration and dispute resolution, committed to achieving favorable outcomes for clients.',
    },
    {
      id: '3',
      name: 'Partner Name 2, S.H., M.H.',
      title: 'Partner',
      education: 'S.H., M.H.',
      specialization: 'Banking & Finance, Capital Markets',
      experience: 'Ahli dalam hukum perbankan dan pasar modal',
      shortDescription: 'Expert in banking and capital markets law with comprehensive knowledge of financial regulations and market dynamics.',
    },
  ],
  'foreign-counsel': [
    {
      id: '4',
      name: 'Foreign Counsel Name, Esq.',
      title: 'Foreign Counsel',
      education: 'J.D., LL.M.',
      specialization: 'International Law, Cross-border Transactions',
      experience: 'International legal expert with global experience',
      shortDescription: 'International legal expert specializing in cross-border transactions and global business law with extensive worldwide experience.',
    },
  ],
  'senior-associates': [
    {
      id: '5',
      name: 'Senior Associate 1, S.H.',
      title: 'Senior Associate',
      education: 'S.H.',
      specialization: 'Corporate Law, M&A',
      experience: 'Pengalaman dalam transaksi merger dan akuisisi',
      shortDescription: 'Dedicated corporate lawyer with proven expertise in mergers and acquisitions, providing strategic legal counsel for business transactions.',
    },
    {
      id: '6',
      name: 'Senior Associate 2, S.H., M.H.',
      title: 'Senior Associate',
      education: 'S.H., M.H.',
      specialization: 'Employment Law, Immigration',
      experience: 'Spesialisasi dalam hukum ketenagakerjaan dan keimigrasian',
    },
  ],
  'junior-associates': [
    {
      id: '7',
      name: 'Junior Associate 1, S.H.',
      title: 'Junior Associate',
      education: 'S.H.',
      specialization: 'General Corporate Law',
      shortDescription: 'Aspiring corporate lawyer with strong foundation in business law, committed to delivering quality legal services and professional growth.',
    },
    {
      id: '8',
      name: 'Junior Associate 2, S.H.',
      title: 'Junior Associate',
      education: 'S.H.',
      specialization: 'Commercial Law',
    },
  ],
  associates: [
    {
      id: '9',
      name: 'Associate 1, S.H.',
      title: 'Associate',
      education: 'S.H.',
      specialization: 'Legal Research & Documentation',
    },
    {
      id: '10',
      name: 'Associate 2, S.H.',
      title: 'Associate',
      education: 'S.H.',
      specialization: 'Contract Review',
    },
  ],
  'legal-staff': [
    {
      id: '11',
      name: 'Legal Staff 1',
      title: 'Legal Staff',
      specialization: 'Administrative Support',
    },
    {
      id: '12',
      name: 'Legal Staff 2',
      title: 'Legal Staff',
      specialization: 'Document Management',
    },
  ],
};

export default function ProfileSection({
  categoryId,
  title,
  description,
}: ProfileSectionProps) {
  const [isExpanded, setIsExpanded] = useState(categoryId === 'managing-partners');
  const profiles = profileData[categoryId] || [];

  if (profiles.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-900 hover:text-blue-700 font-semibold transition-colors"
          >
            {isExpanded ? 'Sembunyikan' : 'Tampilkan'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <div className="w-24 h-24 bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {profile.name}
                </h3>
                <p className="text-blue-900 font-semibold text-center mb-3">
                  {profile.title}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                {profile.education && (
                  <p>
                    <span className="font-semibold">Pendidikan:</span>{' '}
                    {profile.education}
                  </p>
                )}
                {profile.specialization && (
                  <p>
                    <span className="font-semibold">Spesialisasi:</span>{' '}
                    {profile.specialization}
                  </p>
                )}
                {profile.experience && (
                  <p className="text-gray-600 italic">{profile.experience}</p>
                )}
                {profile.email && (
                  <p>
                    <span className="font-semibold">Email:</span>{' '}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-blue-900 hover:underline"
                    >
                      {profile.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

