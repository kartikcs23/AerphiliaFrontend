import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Import components
import HeroSection from '../../components/HomePage/HeroSection/HeroSection';
import EventCategoriesSection from '../../components/HomePage/EventCategoriesSection/EventCategoriesSection';
import KeynoteSpeakersSection from '../../components/HomePage/KeynoteSpeakersSection/KeynoteSpeakersSection';
import PartnersSection from '../../components/HomePage/PartnersSection/PartnersSection';
import type { HomePageProps } from './HomePage.types';

const HomePage: React.FC<HomePageProps> = ({ className }) => {
  return (
    <div className={`min-h-screen min-w-screen bg-black ${className}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-blue-950/30 to-purple-950/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section - Full viewport height */}
      <section className="w-full flex justify-center items-center min-h-screen relative overflow-hidden">
        <Card className="w-full max-w-[1800px] shadow-2xl bg-gradient-to-br from-black via-blue-950 to-purple-950 border border-blue-500/30 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <HeroSection />
          </CardContent>
        </Card>
      </section>

      {/* Event Categories - Full width section */}
      <section className="w-full flex justify-center items-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/50 to-purple-950/50 -z-10"></div>
        <Card className="w-full max-w-[1800px] shadow-2xl border border-blue-500/30 rounded-xl bg-gradient-to-b from-black/80 to-blue-950/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <EventCategoriesSection />
          </CardContent>
        </Card>
      </section>

      {/* Keynote Speakers - Full width section */}
      <section className="w-full flex justify-center items-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-purple-950/50 to-black -z-10"></div>
        <Card className="w-full max-w-[1800px] shadow-2xl border border-purple-500/30 rounded-xl bg-gradient-to-b from-blue-950/80 to-purple-950/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <KeynoteSpeakersSection />
          </CardContent>
        </Card>
      </section>

      {/* Partners - Full width section */}
      <section className="w-full flex justify-center items-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/50 to-black -z-10"></div>
        <Card className="w-full max-w-[1800px] shadow-2xl border border-cyan-500/30 rounded-xl bg-gradient-to-b from-purple-950/80 to-black backdrop-blur-sm">
          <CardContent className="p-0">
            <PartnersSection />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;