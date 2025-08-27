import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import HeroSection from '../../components/HomePage/HeroSection/HeroSection';
import EventCategoriesSection from '../../components/HomePage/EventCategoriesSection/EventCategoriesSection';
import KeynoteSpeakersSection from '../../components/HomePage/KeynoteSpeakersSection/KeynoteSpeakersSection';
import PartnersSection from '../../components/HomePage/PartnersSection/PartnersSection';
import TravellingAir from '../../components/HomePage/TravellingAir/TravellingAir';
// import ScrollAirplane from '../../components/HomePage/ScrollAirplane/ScrollAirplane';
import LegendaryCountdown from '../../components/HomePage/LegendaryCountdown/LegendaryCountdown';
import type { HomePageProps } from './HomePage.types';

const HomePage: React.FC<HomePageProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Ultra-lightweight scroll with minimal spring effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]); // Further reduced from 20%
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -20]); // Further reduced from -30

  // Ultra-throttled mouse tracking for minimal CPU usage
  useEffect(() => {
    let lastCall = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to 30fps for much better performance
      if (now - lastCall >= 33) { 
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastCall = now;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    setIsLoaded(true);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ultra-lightweight cursor variants with minimal re-calculations
  const cursorVariants = useMemo(() => ({
    default: {
      x: mousePosition.x - 12, // Smaller cursor
      y: mousePosition.y - 12,
      backgroundColor: 'rgba(62, 198, 255, 0.3)', // Reduced opacity
    }
  }), [mousePosition.x, mousePosition.y]);

  return (
    <div ref={containerRef} className={`min-h-screen w-full relative ${className}`}>
      {/* Legendary Scroll Airplane */}
      {/* <ScrollAirplane /> */}
      
      {/* Ultra-lightweight Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#3ec6ff]/40 rounded-full pointer-events-none z-50" // Smaller and less opacity
        variants={cursorVariants}
        animate="default"
        transition={{ type: "tween", duration: 0.1 }} // Fast, simple transition
      />
      
      {/* Ultra Futuristic Dynamic Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 -z-20 overflow-hidden"
      >
        {/* Main gradient background with deeper space feel */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#030712]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0057b7]/15 via-[#3ec6ff]/8 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(62,198,255,0.12),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,87,183,0.15),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(62,198,255,0.03)_0deg,transparent_120deg,rgba(0,87,183,0.06)_240deg,transparent_360deg)]"></div>
          
          {/* Neural network pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(62,198,255,0.3)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
          </div>
        </div>
        
        {/* Ultra-lightweight Floating Elements with minimal complexity */}
        <motion.div 
          className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-r from-[#3ec6ff]/10 to-[#0057b7]/15 rounded-full blur-2xl" // Smaller and less blur
          animate={{
            scale: [1, 1.1, 1], // Reduced from 1.3
            opacity: [0.1, 0.25, 0.1], // Much reduced intensity
            x: [0, 100, 0], // Reduced from 150
            y: [0, -50, 0], // Reduced from -80
          }}
          transition={{
            duration: 40, // Much slower animation
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ultra-optimized Floating Particles - reduced from 20 to 8 for maximum performance */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3ec6ff]/40 rounded-full" // Removed expensive effects
            animate={{
              x: [0, Math.random() * 300 - 150], // Further reduced range
              y: [0, Math.random() * 300 - 150], // Further reduced range
              scale: [0, Math.random() * 1 + 0.5, 0], // Reduced scale
              opacity: [0, Math.random() * 0.5 + 0.2, 0], // Further reduced opacity
            }}
            transition={{
              duration: Math.random() * 25 + 25, // Much slower animation
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15 // Increased delay range
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Ultra-lightweight Geometric Shapes - significantly reduced complexity */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-48 h-48 border border-[#3ec6ff]/20 rounded-full" // Smaller and less opacity
          animate={{ 
            rotate: 360,
            opacity: [0.2, 0.3, 0.2] // Much reduced opacity range
          }}
          transition={{ 
            rotate: { duration: 90, repeat: Infinity, ease: "linear" }, // Much slower rotation
            opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>

      {/* Ultra-lightweight Scroll Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        animate={{ 
          opacity: scrollYProgress.get() > 0.1 ? 0 : 1, // Earlier fade out
        }}
        transition={{ 
          opacity: { duration: 0.2 }
        }}
      >
        <div className="flex flex-col items-center text-white/60 bg-[#0057b7]/15 backdrop-blur-sm px-3 py-2 rounded-xl border border-[#3ec6ff]/20">
          <span className="text-xs font-medium mb-1 text-[#3ec6ff]">Scroll</span>
          <ArrowDown className="w-4 h-4 text-[#3ec6ff]" /> {/* Removed animate-bounce for performance */}
        </div>
      </motion.div>

      {/* Hero Section with Pure Smooth Scrolling */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{ y: heroY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1600px] relative"
        >
          {/* Transparent glass morphism container */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/5 via-transparent to-[#0057b7]/5 rounded-3xl backdrop-blur-sm border border-[#3ec6ff]/10 shadow-2xl shadow-[#3ec6ff]/5"></div>
          <HeroSection />
        </motion.div>
      </motion.section>

      {/* Legendary Time Collapse Countdown */}
      <LegendaryCountdown />

      {/* Event Categories with Static Positioning for Performance */}
      <motion.section 
        className="relative py-20 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1600px] mx-auto relative"
        >
          {/* Ultra transparent container */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0057b7]/3 via-transparent to-[#3ec6ff]/3 rounded-3xl backdrop-blur-sm border border-[#3ec6ff]/8 shadow-xl shadow-[#0057b7]/3"></div>
          <EventCategoriesSection />
        </motion.div>
      </motion.section>

      {/* Keynote Speakers with Static Positioning */}
      <motion.section 
        className="relative py-20 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full max-w-[1600px] mx-auto relative"
        >
          {/* Seamless transparent design */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af]/3 via-transparent to-[#0057b7]/4 rounded-3xl backdrop-blur-sm border border-[#0057b7]/8 shadow-xl shadow-[#3ec6ff]/3"></div>
          <KeynoteSpeakersSection />
        </motion.div>
      </motion.section>

      {/* Partners with Static Positioning */}
      <motion.section 
        className="relative py-20 px-4 mb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full max-w-[1600px] mx-auto relative"
        >
          {/* Final transparent masterpiece */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/4 via-transparent to-[#0057b7]/3 rounded-3xl backdrop-blur-sm border border-[#0057b7]/10 shadow-xl shadow-[#3ec6ff]/4"></div>
          <PartnersSection />
        </motion.div>
      </motion.section>

      {/* Travelling Air Animation Section */}
      <motion.section 
        className="relative py-20 px-4 mb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="w-full max-w-[1600px] mx-auto relative"
        >
          {/* Epic traveling animation container */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/5 via-transparent to-[#0284c7]/5 rounded-3xl backdrop-blur-sm border border-[#0ea5e9]/10 shadow-xl shadow-[#0ea5e9]/4"></div>
          <TravellingAir />
        </motion.div>
      </motion.section>

      {/* Ultra-lightweight Loading State */}
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f172a] to-[#0d1421] z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }} // Faster loading
          onAnimationComplete={() => setIsLoaded(true)}
        >
          <div className="text-[#3ec6ff] text-2xl font-bold flex flex-col items-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
            <span className="text-lg font-light text-[#3ec6ff]">Loading...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;