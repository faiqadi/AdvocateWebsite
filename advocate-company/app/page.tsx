import dynamic from 'next/dynamic';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import TentangKantorSection from './components/TentangKantorSection';
import FounderSection from './components/FounderSection';
import ManfaatKerjaSamaSection from './components/ManfaatKerjaSamaSection';

// Lazy load components that are below the fold
const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse" />,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation variant="home" />
      <HeroSection />
      <TentangKantorSection />
      <FounderSection />
      <ManfaatKerjaSamaSection />
      <Footer />
    </div>
  );
}
