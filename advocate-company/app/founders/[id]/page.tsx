import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProfileById } from '@/lib/cms';
import { getBuildingImage } from '@/lib/building-images';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const FALLBACK_PHOTO =
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop';

export default async function ProfileDetailPage({ params }: PageProps) {
    const { id } = await params;
    const profile = await getProfileById(id);

    if (!profile) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 font-sans selection:bg-accent selection:text-white transition-colors duration-300">
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-10"
                style={{ backgroundImage: `url(${getBuildingImage(4)})` }}
            ></div>

            {/* Industrial Grid Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navigation variant="default" />

                <main className="flex-grow pt-32 pb-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Back Navigation */}
                        <div className="mb-8">
                            <Link
                                href="/profiles"
                                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-accent transition-colors group"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                                Back to Team
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                            {/* Left Column: Info & Content */}
                            <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">

                                {/* Header Info */}
                                <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 font-serif">
                                                {profile.name}
                                            </h1>
                                            <p className="text-accent font-mono text-sm tracking-widest uppercase">
                                                {profile.title}
                                            </p>
                                        </div>

                                        {/* Social Icons */}
                                        <div className="flex gap-3">
                                            {profile.email && (
                                                <a
                                                    href={`mailto:${profile.email}`}
                                                    className="w-10 h-10 rounded-full border border-orange-200 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors"
                                                    title="Email"
                                                >
                                                    <span className="text-lg">✉</span>
                                                </a>
                                            )}
                                            {profile.phone && String(profile.phone).trim() && (
                                                <a
                                                    href={`https://wa.me/${String(profile.phone).replace(/\D/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-50 transition-colors"
                                                    title="WhatsApp"
                                                >
                                                    <span className="text-lg">📱</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Bio Content (Dummy Data) */}
                                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-6 text-sm text-justify">
                                    <p>
                                        {profile.name} graduated from the Jentera Indonesian Law School (STHI). He once interned at the Ministry of National Development Planning/Bappenas, KontraS, and Lokataru Law and Human Rights. His advocacy career began when he was an Associate at Lokataru until now as a Lawyer at ESH Law Office.
                                    </p>
                                    <p>
                                        He has extensive experiences in the fields of litigation and non-litigation, investigations, research, mediation, legal opinions, legal reviews of digital content, and document audits. His dedication to legal excellence and client representation defines his professional approach.
                                    </p>
                                </div>

                                {/* Areas of Expertise */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                                        Areas of Expertise:
                                    </h2>
                                    <div className="flex flex-wrap gap-2 text-slate-600 dark:text-slate-400 font-medium">
                                        {profile.specialization ? (
                                            <span>{profile.specialization}</span>
                                        ) : (
                                            <span>Criminal Law, Civil Law, Human Rights, and State Administrative Law.</span>
                                        )}
                                    </div>
                                </div>


                            </div>

                            {/* Right Column: Photo & Quote */}
                            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center sticky top-32">
                                <div className="relative w-full max-w-md mx-auto">
                                    {/* Background Shape - Orange Circle */}
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] aspect-square bg-orange-500 rounded-full z-0"></div>

                                    {/* Photo with mask/cutout effect */}
                                    <div className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-b-full">
                                        <img
                                            src={profile.photoDetail || profile.photo || FALLBACK_PHOTO}
                                            alt={profile.name}
                                            className="w-full h-full object-cover object-top drop-shadow-2xl"
                                            style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                                        />
                                        {/* Floating Decorative Circle */}
                                        <div className="absolute bottom-10 -left-6 w-24 h-24 bg-teal-800 rounded-full z-20 shadow-xl opacity-90"></div>
                                    </div>

                                    {/* Bottom Line Color */}
                                    <div className="w-full h-2 bg-accent mt-0 mx-auto rounded-full"></div>
                                </div>

                                {/* Quote Section */}
                                <div className="mt-12 text-center max-w-sm mx-auto space-y-4">
                                    {profile.speech ? (
                                        <p className="text-xl font-serif italic text-slate-500 dark:text-slate-400">
                                            "{profile.speech}"
                                        </p>
                                    ) : (
                                        <p className="text-xl font-serif italic text-slate-500 dark:text-slate-400">
                                            "A life that is not fought for is never won"
                                        </p>
                                    )}
                                    <div className="w-8 h-1 bg-accent mx-auto"></div>
                                    <p className="text-lg font-bold text-teal-800 dark:text-teal-400">
                                        {profile.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
