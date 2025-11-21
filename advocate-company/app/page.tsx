import dynamic from 'next/dynamic';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';

// Lazy load components that are below the fold
const SpecializationsSection = dynamic(() => import('./components/SpecializationsSection'), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});
const PracticeAreasSection = dynamic(() => import('./components/PracticeAreasSection'), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});
const FeaturesSection = dynamic(() => import('./components/FeaturesSection'), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});
const StatisticsSection = dynamic(() => import('./components/StatisticsSection'), {
  loading: () => <div className="h-64 bg-blue-900 animate-pulse" />,
});
const ContactSection = dynamic(() => import('./components/ContactSection'), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});
const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SpecializationsSection />
      <PracticeAreasSection />
      <FeaturesSection />
      <StatisticsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
