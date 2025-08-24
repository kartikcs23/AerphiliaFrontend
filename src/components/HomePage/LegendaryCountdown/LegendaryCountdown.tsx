import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring,} from 'framer-motion';
import { Clock, Zap, Star, Sparkles, Calendar } from 'lucide-react';
import ProCountdownTimer from './ProCountdownTimer';

const LegendaryCountdown = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  // Responsive screen size detection
  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });
  
  const { scrollYProgress } = useScroll(
    isMounted ? {
      target: containerRef,
      offset: ["start end", "end start"]
    } : undefined
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [30, -30]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // Responsive breakpoints
  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  // const isDesktop = screenSize.width >= 1024;

  // Generate responsive particles
  useEffect(() => {
    setIsMounted(true);
    
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    const particleCount = isMobile ? 8 : isTablet ? 10 : 12;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: 15 + (i * (70 / particleCount * 12)) % 85, // Keep within safe bounds
      y: 20 + (i * 25) % 60, // Reduced vertical spread
      delay: i * 0.6
    }));
    setParticles(newParticles);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [isMobile, isTablet]);

  const eventDate = new Date('2025-10-23');

  // Prevent hydration mismatch
  if (!isMounted) {
    return <div className="relative py-32 px-4 min-h-[600px] bg-gradient-to-br from-[#0f0f23] via-[#1a1a3a] to-[#0f0f23]" />;
  }

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity }}
      className={`relative overflow-hidden ${
        isMobile ? 'py-16 px-3' : 
        isTablet ? 'py-24 px-4' : 
        'py-32 px-4'
      }`}
    >
      {/* Legendary Time Collapse Background - Fully Responsive */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3a] to-[#0f0f23]">
        {/* Enhanced Responsive Time Vortex Effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(62,198,255,0.08) 0%, transparent 70%)',
              'radial-gradient(circle at 50% 50%, rgba(0,87,183,0.12) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 50%, rgba(30,64,175,0.10) 0%, transparent 80%)',
              'radial-gradient(circle at 50% 50%, rgba(62,198,255,0.08) 0%, transparent 70%)'
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Responsive Neural Network Pattern */}
        <div className={`absolute inset-0 ${isMobile ? 'opacity-10' : isTablet ? 'opacity-15' : 'opacity-20'}`}>
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            {/* Optimized Responsive Time Web Pattern */}
            {Array.from({ length: isMobile ? 6 : isTablet ? 9 : 9 }, (_, i) => (
              <g key={i}>
                <motion.circle
                  cx={100 + (i % 3) * 300}
                  cy={150 + Math.floor(i / 3) * 250}
                  r={isMobile ? "2" : isTablet ? "2.5" : "3"}
                  fill="#3ec6ff"
                  initial={{ opacity: 0.4 }}
                  animate={{ 
                    opacity: [0.4, 0.9, 0.4],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut"
                  }}
                />
                {i < (isMobile ? 5 : isTablet ? 8 : 8) && i % 3 !== 2 && (
                  <motion.line
                    x1={100 + (i % 3) * 300}
                    y1={150 + Math.floor(i / 3) * 250}
                    x2={100 + ((i + 1) % 3) * 300}
                    y2={150 + Math.floor((i + 1) / 3) * 250}
                    stroke="#0057b7"
                    strokeWidth={isMobile ? "1.5" : "2"}
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{ 
                      pathLength: [0.3, 1, 0.3],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Responsive Time Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full bg-[#3ec6ff] ${
              isMobile ? 'w-1.5 h-1.5' : isTablet ? 'w-2 h-2' : 'w-2 h-2'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ scale: 0.5, opacity: 0.3 }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
              y: [isMobile ? -15 : -20, isMobile ? 15 : 20, isMobile ? -15 : -20]
            }}
            transition={{
              duration: isMobile ? 6 : 8,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Legendary Countdown Container - Ultra Responsive */}
      <motion.div
        style={{ y }}
        className={`relative z-20 w-full mx-auto ${
          isMobile ? 'max-w-sm px-2' : 
          isTablet ? 'max-w-4xl px-4' : 
          'max-w-6xl px-6'
        }`}
      >
        {/* Ultra Premium Responsive Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 1.2, 
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative"
        >
          {/* Professional Legendary Container - Responsive Padding */}
          <div className={`relative bg-gradient-to-br from-white/8 via-white/4 to-transparent backdrop-blur-3xl border border-[#3ec6ff]/20 rounded-3xl shadow-2xl shadow-[#0057b7]/15 overflow-hidden ${
            isMobile ? 'p-6' : 
            isTablet ? 'p-10' : 
            'p-12 lg:p-16'
          }`}>
            
            {/* Stable Dynamic Glow Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/8 via-transparent to-[#0057b7]/6 rounded-3xl"
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Professional Corner Energy Effects - Responsive */}
            <motion.div
              className={`absolute rounded-full bg-[#3ec6ff] blur-sm ${
                isMobile ? 'top-3 left-3 w-2.5 h-2.5' : 
                isTablet ? 'top-4 left-4 w-3.5 h-3.5' : 
                'top-6 left-6 w-4 h-4'
              }`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className={`absolute rounded-full bg-[#0057b7] blur-sm ${
                isMobile ? 'bottom-3 right-3 w-2 h-2' : 
                isTablet ? 'bottom-4 right-4 w-2.5 h-2.5' : 
                'bottom-6 right-6 w-3 h-3'
              }`}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Countdown Component */}
            <div className="relative z-10">
              <ProCountdownTimer targetDate={eventDate} />
            </div>

            {/* Event Date Display - Responsive */}
            <motion.div
              className={`border-t border-[#3ec6ff]/20 text-center ${
                isMobile ? 'mt-6 pt-4' : 
                isTablet ? 'mt-8 pt-6' : 
                'mt-12 pt-8'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className={`flex items-center justify-center text-white/80 ${
                isMobile ? 'flex-col space-y-2' : 
                isTablet ? 'flex-wrap gap-2' : 
                'space-x-4'
              }`}>
                <div className="flex items-center space-x-2">
                  <Calendar className={`text-[#3ec6ff] ${
                    isMobile ? 'w-4 h-4' : isTablet ? 'w-5 h-5' : 'w-6 h-6'
                  }`} />
                  <span className={`font-semibold ${
                    isMobile ? 'text-sm' : isTablet ? 'text-lg' : 'text-xl'
                  }`}>November 5-7, 2025</span>
                </div>
                <div className={`bg-[#3ec6ff] rounded-full animate-pulse ${
                  isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                }`}></div>
                <span className={`${
                  isMobile ? 'text-sm' : isTablet ? 'text-lg' : 'text-xl'
                }`}>Sahyadri College, Mangalore</span>
              </div>
            </motion.div>
          </div>

          {/* Professional Floating Time Elements - Responsive Positioning */}
          <motion.div
            className={`absolute text-[#3ec6ff]/50 ${
              isMobile ? '-top-8 -left-8' : 
              isTablet ? '-top-10 -left-10' : 
              '-top-12 -left-12'
            }`}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Clock size={isMobile ? 32 : isTablet ? 40 : 48} />
          </motion.div>

          <motion.div
            className={`absolute text-[#0057b7]/50 ${
              isMobile ? '-bottom-8 -right-8' : 
              isTablet ? '-bottom-10 -right-10' : 
              '-bottom-12 -right-12'
            }`}
            animate={{
              rotate: [0, -360],
              scale: [1.1, 1, 1.1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Zap size={isMobile ? 28 : isTablet ? 36 : 42} />
          </motion.div>

          <motion.div
            className={`absolute text-[#3ec6ff]/40 ${
              isMobile ? 'top-1/3 -left-12' : 
              isTablet ? 'top-1/3 -left-14' : 
              'top-1/3 -left-16'
            }`}
            animate={{
              y: [isMobile ? -10 : -15, isMobile ? 10 : 15, isMobile ? -10 : -15],
              rotate: [0, 180, 360],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star size={isMobile ? 24 : isTablet ? 30 : 36} />
          </motion.div>

          <motion.div
            className={`absolute text-[#0057b7]/40 ${
              isMobile ? 'top-1/4 -right-10' : 
              isTablet ? 'top-1/4 -right-12' : 
              'top-1/4 -right-14'
            }`}
            animate={{
              x: [isMobile ? -8 : -10, isMobile ? 8 : 10, isMobile ? -8 : -10],
              rotate: [0, -180, -360],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            <Sparkles size={isMobile ? 20 : isTablet ? 26 : 32} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LegendaryCountdown;
