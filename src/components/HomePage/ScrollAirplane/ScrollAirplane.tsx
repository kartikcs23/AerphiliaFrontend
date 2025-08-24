import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Plane } from 'lucide-react';

const ScrollAirplane = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Airplane position transforms
  const airplaneY = useTransform(scrollYProgress, [0, 1], [0, 2000]);
  const airplaneX = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 100, -50, 0]);
  const airplaneRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 15, -10, 5]);
  const airplaneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  // Trail effect
  const trailOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const trailScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30">
      {/* Airplane Trail Effect */}
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
        {/* Multiple trail lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-0.5 bg-gradient-to-r from-[#3ec6ff]/60 to-transparent rounded-full"
            style={{
              x: -40 - (i * 15),
              y: i * 2,
              opacity: 1 - (i * 0.15),
            }}
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
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
        {/* Airplane Body */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -5, 0],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Main Airplane Icon */}
          <motion.div
            className="relative"
            animate={{
              filter: [
                "drop-shadow(0 0 20px #3ec6ff)",
                "drop-shadow(0 0 40px #3ec6ff)",
                "drop-shadow(0 0 20px #3ec6ff)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Plane 
              className="w-16 h-16 text-[#3ec6ff] transform rotate-45" 
              fill="currentColor"
            />
          </motion.div>

          {/* Engine Glow Effects */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#0057b7] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
              boxShadow: [
                "0 0 10px #0057b7",
                "0 0 20px #0057b7",
                "0 0 10px #0057b7",
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#3ec6ff] rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.8,
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

        {/* Vapor Trail Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3ec6ff]/60 rounded-full"
            style={{
              x: -20 - (i * 8),
              y: Math.sin(i) * 10,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x: [-20 - (i * 8), -40 - (i * 8)],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Speed Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`speed-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-[#3ec6ff]/40 to-transparent rounded-full"
            style={{
              width: 20 + (i * 5),
              x: -15 - (i * 10),
              y: -8 + (i * 3),
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Sonic Boom Effect */}
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
          className="absolute w-20 h-20 rounded-full border-2 border-[#3ec6ff]/30"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full border border-[#0057b7]/40"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.3,
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollAirplane;
