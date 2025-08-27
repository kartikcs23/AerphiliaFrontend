import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

const ScrollAirplane = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Optimized airplane position transforms with reduced ranges
  const airplaneY = useTransform(scrollYProgress, [0, 1], [0, 1500]); // Reduced from 2000
  const airplaneX = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 80, -40, 0]); // Reduced ranges
  const airplaneRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 12, -8, 4]); // Reduced ranges
  const airplaneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.85]); // Reduced ranges

  // Optimized trail effect
  const trailOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.8, 0.8, 0]);
  const trailScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Handle visibility based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsVisible(latest < 0.95 && latest > 0.05);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30">
      {/* Optimized Airplane Trail Effect - reduced from 8 to 4 lines */}
      <motion.div
        style={{
          y: airplaneY,
          x: airplaneX,
          rotate: airplaneRotate,
          opacity: trailOpacity,
          scale: trailScale,
        }}
        className="absolute right-20 top-20"
      >
        {/* Reduced trail lines for better performance */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-0.5 bg-gradient-to-r from-[#3ec6ff]/60 to-transparent rounded-full"
            style={{
              x: -40 - (i * 20),
              y: i * 3,
              opacity: 1 - (i * 0.2),
            }}
            animate={{
              scaleX: [0.6, 1, 0.6], // Reduced animation range
              opacity: [0.5, 0.8, 0.5], // Reduced opacity range
            }}
            transition={{
              duration: 2.5, // Slower animation
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15, // Slightly longer delay
            }}
          />
        ))}
      </motion.div>

      {/* Main Airplane */}
      <motion.div
        style={{
          y: airplaneY,
          x: airplaneX,
          rotate: airplaneRotate,
          scale: airplaneScale,
        }}
        className="absolute right-20 top-20"
      >
        {/* Optimized Airplane Body with reduced animation complexity */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -4, 0], // Reduced from -5
            rotateY: [0, 4, 0], // Reduced from 5
          }}
          transition={{
            duration: 4, // Slower animation
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Main Airplane Icon with optimized glow effect */}
          <motion.div
            className="relative"
            animate={{
              filter: [
                "drop-shadow(0 0 15px #3ec6ff)", // Reduced glow
                "drop-shadow(0 0 25px #3ec6ff)", // Reduced glow
                "drop-shadow(0 0 15px #3ec6ff)", // Reduced glow
              ],
            }}
            transition={{
              duration: 3, // Slower glow animation
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Plane 
              className="w-14 h-14 text-[#3ec6ff] transform rotate-45" // Slightly smaller
              fill="currentColor"
            />
          </motion.div>

          {/* Optimized Engine Glow Effects */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#0057b7] rounded-full"
            animate={{
              scale: [1, 1.3, 1], // Reduced from 1.5
              opacity: [0.7, 0.9, 0.7], // Reduced opacity range
              boxShadow: [
                "0 0 8px #0057b7", // Reduced glow
                "0 0 15px #0057b7", // Reduced glow
                "0 0 8px #0057b7", // Reduced glow
              ],
            }}
            transition={{
              duration: 1.5, // Slower animation
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#3ec6ff] rounded-full"
            animate={{
              scale: [1, 1.5, 1], // Reduced from 2
              opacity: [0.8, 0.6, 0.8], // Adjusted opacity
            }}
            transition={{
              duration: 1.2, // Slower animation
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Wing Tip Lights */}
          <motion.div
            className="absolute -top-1 -left-1 w-1 h-1 bg-[#3ec6ff] rounded-full"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-1 h-1 bg-[#0057b7] rounded-full"
            animate={{
              opacity: [1, 0, 1],
              scale: [1.5, 0.5, 1.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Optimized Vapor Trail Particles - reduced from 12 to 6 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3ec6ff]/50 rounded-full" // Reduced opacity
            style={{
              x: -20 - (i * 10), // Increased spacing
              y: Math.sin(i) * 8, // Reduced movement
            }}
            animate={{
              scale: [0, 0.8, 0], // Reduced scale
              opacity: [0, 0.6, 0], // Reduced opacity
              x: [-20 - (i * 10), -35 - (i * 10)], // Reduced movement range
            }}
            transition={{
              duration: 4, // Slower animation
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.3, // Longer delay
            }}
          />
        ))}

        {/* Optimized Speed Lines - reduced from 6 to 3 */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`speed-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-[#3ec6ff]/30 to-transparent rounded-full" // Reduced opacity
            style={{
              width: 20 + (i * 8), // Reduced width
              x: -15 - (i * 12), // Adjusted spacing
              y: -6 + (i * 4), // Adjusted positioning
            }}
            animate={{
              scaleX: [0, 0.8, 0], // Reduced scale
              opacity: [0, 0.5, 0], // Reduced opacity
            }}
            transition={{
              duration: 2, // Slower animation
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15, // Slightly longer delay
            }}
          />
        ))}
      </motion.div>

      {/* Optimized Sonic Boom Effect with reduced complexity */}
      <motion.div
        style={{
          y: airplaneY,
          x: airplaneX,
          scale: trailScale,
          opacity: trailOpacity,
        }}
        className="absolute right-20 top-20"
      >
        <motion.div
          className="absolute w-16 h-16 rounded-full border border-[#3ec6ff]/25" // Reduced size and opacity
          animate={{
            scale: [1, 2.5, 1], // Reduced from 3
            opacity: [0.4, 0, 0.4], // Reduced opacity
          }}
          transition={{
            duration: 3, // Slower animation
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollAirplane;
