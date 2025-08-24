import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import HeroSection from '../../components/HomePage/HeroSection/HeroSection';
import EventCategoriesSection from '../../components/HomePage/EventCategoriesSection/EventCategoriesSection';
import KeynoteSpeakersSection from '../../components/HomePage/KeynoteSpeakersSection/KeynoteSpeakersSection';
import PartnersSection from '../../components/HomePage/PartnersSection/PartnersSection';
import ScrollAirplane from '../../components/HomePage/ScrollAirplane/ScrollAirplane';
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Enhanced parallax transforms with smoother animations
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  // Ultra smooth parallax - pure smooth movement without any shrinking
  const heroY = useTransform(smoothProgress, [0, 1], [0, -50]);
  const categoriesY = useTransform(smoothProgress, [0, 1], [0, 0]);
  const speakersY = useTransform(smoothProgress, [0, 1], [0, 0]);
  const partnersY = useTransform(smoothProgress, [0, 1], [0, 0]);

  // Mouse tracking for cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cursor glow effect
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: 'rgba(62, 198, 255, 0.4)',
    },
    hover: {
      scale: 2,
      backgroundColor: 'rgba(0, 87, 183, 0.6)',
    }
  };

  return (
    <div ref={containerRef} className={`min-h-screen w-full relative ${className}`}>
      {/* Legendary Scroll Airplane */}
      <ScrollAirplane />
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-[#3ec6ff]/50 rounded-full pointer-events-none z-50 mix-blend-screen shadow-2xl shadow-[#3ec6ff]/40"
        variants={cursorVariants}
        animate="default"
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
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
        
        {/* Ultra Premium Floating Elements with Enhanced Physics */}
        <motion.div 
          className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-[#3ec6ff]/20 to-[#0057b7]/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2],
            x: [0, 200, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#0057b7]/25 to-[#3ec6ff]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.7, 0.3],
            x: [0, -150, 0],
            y: [0, 120, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-10 w-64 h-64 bg-gradient-to-r from-[#1e40af]/15 to-[#3ec6ff]/25 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.15, 0.5, 0.15],
            x: [0, 250, 0],
            y: [0, -180, 0],
            rotate: [0, 270, 360]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-1/2 w-72 h-72 bg-gradient-to-r from-[#0057b7]/20 to-[#1e40af]/30 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1.5, 1.1],
            opacity: [0.2, 0.6, 0.2],
            x: [0, -120, 0],
            y: [0, 150, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Legendary Floating Particles with Neural Network Effect */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3ec6ff]/70 rounded-full backdrop-blur-sm shadow-lg shadow-[#3ec6ff]/30"
            animate={{
              x: [0, Math.random() * 800 - 400],
              y: [0, Math.random() * 800 - 400],
              scale: [0, Math.random() * 2.5 + 0.5, 0],
              opacity: [0, Math.random() * 0.9 + 0.4, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 25
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Futuristic Geometric Shapes */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-72 h-72 border border-[#3ec6ff]/30 rounded-full shadow-2xl shadow-[#3ec6ff]/10"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-56 h-56 border-2 border-[#0057b7]/40 rounded-lg shadow-2xl shadow-[#0057b7]/15"
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-40 h-40 border-2 border-[#1e40af]/35 rounded-full shadow-xl shadow-[#1e40af]/10"
          animate={{ 
            rotate: 360,
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/2 w-32 h-32 border border-[#3ec6ff]/25 rounded-lg shadow-lg shadow-[#3ec6ff]/10"
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{ 
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.1 ? 0 : 1,
          y: [0, 10, 0]
        }}
        transition={{ 
          y: { duration: 2, repeat: Infinity },
          opacity: { duration: 0.3 }
        }}
      >
        <div className="flex flex-col items-center text-white/70 bg-[#0057b7]/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-[#3ec6ff]/30">
          <span className="text-sm font-medium mb-2 bg-gradient-to-r from-[#3ec6ff] to-[#0057b7] bg-clip-text text-transparent">Scroll to explore</span>
          <ArrowDown className="w-6 h-6 animate-bounce text-[#3ec6ff]" />
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

      {/* Event Categories with Butter Smooth Scrolling */}
      <motion.section 
        className="relative py-20 px-4"
        style={{ y: categoriesY }}
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

      {/* Keynote Speakers with Smooth Flow */}
      <motion.section 
        className="relative py-20 px-4"
        style={{ y: speakersY }}
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

      {/* Partners with Pure Elegance */}
      <motion.section 
        className="relative py-20 px-4 mb-20"
        style={{ y: partnersY }}
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

      {/* Premium Loading State */}
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f172a] to-[#0d1421] z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 1 }}
          onAnimationComplete={() => setIsLoaded(true)}
        >
          <motion.div
            className="text-[#3ec6ff] text-4xl font-bold flex flex-col items-center space-y-6"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
                filter: ["drop-shadow(0 0 20px #3ec6ff)", "drop-shadow(0 0 40px #3ec6ff)", "drop-shadow(0 0 20px #3ec6ff)"]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="w-16 h-16" />
            </motion.div>
            <motion.span 
              className="text-2xl font-light bg-gradient-to-r from-[#3ec6ff] to-[#0057b7] bg-clip-text text-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading Experience...
            </motion.span>
            <motion.div 
              className="w-48 h-1 bg-gradient-to-r from-transparent via-[#3ec6ff] to-transparent rounded-full"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;