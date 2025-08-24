import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Clock, Zap, Star, Sparkles, Timer, Calendar } from 'lucide-react';
import ProCountdownTimer from './ProCountdownTimer';

const LegendaryCountdown = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [30, -30]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // Generate stable time particles
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 15 + (i * 70) % 100,
      y: 20 + (i * 30) % 80,
      delay: i * 0.8
    }));
    setParticles(newParticles);
  }, []);

  const eventDate = new Date('2025-10-23');

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Legendary Time Collapse Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3a] to-[#0f0f23]">
        {/* Enhanced Stable Time Vortex Effect */}
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
        
        {/* Stable Neural Network Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            {/* Optimized Time Web Pattern */}
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i}>
                <motion.circle
                  cx={100 + (i % 3) * 300}
                  cy={150 + Math.floor(i / 3) * 250}
                  r="3"
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
                {i < 8 && i % 3 !== 2 && (
                  <motion.line
                    x1={100 + (i % 3) * 300}
                    y1={150 + Math.floor(i / 3) * 250}
                    x2={100 + ((i + 1) % 3) * 300}
                    y2={150 + Math.floor((i + 1) / 3) * 250}
                    stroke="#0057b7"
                    strokeWidth="2"
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

      {/* Stable Time Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-[#3ec6ff] rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
              y: [-20, 20, -20]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Legendary Countdown Container */}
      <motion.div
        style={{ y }}
        className="relative z-20 w-full max-w-6xl mx-auto"
      >

        {/* Ultra Premium Countdown */}
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
          {/* Professional Legendary Container */}
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-white/8 via-white/4 to-transparent backdrop-blur-3xl border border-[#3ec6ff]/20 rounded-3xl shadow-2xl shadow-[#0057b7]/15 overflow-hidden">
            
            {/* Stable Dynamic Glow Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/8 via-transparent to-[#0057b7]/6 rounded-3xl"
              animate={{
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Professional Corner Energy Effects */}
            <motion.div
              className="absolute top-6 left-6 w-4 h-4 bg-[#3ec6ff] rounded-full blur-sm"
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
              className="absolute bottom-6 right-6 w-3 h-3 bg-[#0057b7] rounded-full blur-sm"
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

            {/* Event Date Display */}
            <motion.div
              className="mt-12 pt-8 border-t border-[#3ec6ff]/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="flex items-center justify-center space-x-4 text-white/80">
                <Calendar className="w-6 h-6 text-[#3ec6ff]" />
                <span className="text-xl font-semibold">November 5-7, 2025</span>
                <div className="w-2 h-2 bg-[#3ec6ff] rounded-full animate-pulse"></div>
                <span className="text-xl">Sahyadri College, Mangalore</span>
              </div>
            </motion.div>
          </div>

          {/* Professional Floating Time Elements */}
          <motion.div
            className="absolute -top-12 -left-12 text-[#3ec6ff]/50"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Clock size={48} />
          </motion.div>

          <motion.div
            className="absolute -bottom-12 -right-12 text-[#0057b7]/50"
            animate={{
              rotate: [0, -360],
              scale: [1.1, 1, 1.1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Zap size={42} />
          </motion.div>

          <motion.div
            className="absolute top-1/3 -left-16 text-[#3ec6ff]/40"
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 180, 360],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star size={36} />
          </motion.div>

          <motion.div
            className="absolute top-1/4 -right-14 text-[#0057b7]/40"
            animate={{
              x: [-10, 10, -10],
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
            <Sparkles size={32} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LegendaryCountdown;
