import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { BackgroundEffectsProps, StarProps, CloudProps } from './BackgroundEffects.type';
import { AVIATION_CONSTANTS } from '../../utils/constants';

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  intensity = 'medium',
  enableParallax = true,
  enableAurora = true,
  enableStars = true,
  enableClouds = true,
}) => {
  // Generate stars based on intensity
  const stars = useMemo<StarProps[]>(() => {
    const starCount = intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100;
    return Array.from({ length: starCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      twinkleDelay: Math.random() * 3,
    }));
  }, [intensity]);

  // Generate clouds
  const clouds = useMemo<CloudProps[]>(() => {
    const cloudCount = intensity === 'low' ? 3 : intensity === 'medium' ? 5 : 8;
    return Array.from({ length: cloudCount }, () => ({
      x: Math.random() * 120 - 20, // Allow clouds to start/end off-screen
      y: Math.random() * 60 + 10,
      scale: Math.random() * 0.8 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 20 + 10,
    }));
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Aurora Background */}
      {enableAurora && (
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: AVIATION_CONSTANTS.COLORS.GRADIENTS.AURORA,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Stars */}
      {enableStars && (
        <div className="absolute inset-0">
          {stars.map((star, index) => (
            <motion.div
              key={index}
              className="absolute bg-white rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: star.twinkleDelay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Moving Clouds */}
      {enableClouds && (
        <div className="absolute inset-0">
          {clouds.map((cloud, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                transform: `scale(${cloud.scale})`,
              }}
              animate={{
                x: [`-10vw`, `110vw`],
                opacity: [0, cloud.opacity, cloud.opacity, 0],
              }}
              transition={{
                duration: cloud.speed,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            >
              <svg width="100" height="60" viewBox="0 0 100 60" className="text-white">
                <path
                  d="M20 40 Q10 30 20 20 Q30 10 40 20 Q50 5 60 20 Q70 10 80 20 Q90 30 80 40 Q70 50 60 40 Q50 50 40 40 Q30 50 20 40 Z"
                  fill="currentColor"
                  opacity="0.1"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Atmospheric Layers */}
      <div className="absolute inset-0">
        {/* Top atmosphere */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/3 opacity-30"
          style={{
            background: 'linear-gradient(180deg, rgba(15,15,35,0.8) 0%, transparent 100%)',
          }}
          animate={enableParallax ? {
            y: [0, -20, 0],
          } : {}}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Middle atmosphere */}
        <motion.div
          className="absolute top-1/3 left-0 right-0 h-1/3 opacity-20"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(30,41,59,0.4) 50%, transparent 100%)',
          }}
          animate={enableParallax ? {
            y: [0, 10, 0],
          } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Bottom atmosphere */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-40"
          style={{
            background: 'linear-gradient(0deg, rgba(15,15,35,0.9) 0%, transparent 100%)',
          }}
          animate={enableParallax ? {
            y: [0, 5, 0],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Flying Objects (Distant Planes) */}
      {intensity !== 'low' && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 opacity-20"
            initial={{ x: '-10vw', y: '20vh' }}
            animate={{ 
              x: '110vw', 
              y: '25vh',
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
          >
            <svg width="40" height="20" viewBox="0 0 40 20" className="text-cyan-300">
              <path
                d="M5 10 L30 8 L32 10 L30 12 L5 10 Z M12 10 L8 5 L15 7 L20 9 L12 10 Z M12 10 L8 15 L15 13 L20 11 L12 10 Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute top-2/3 opacity-15"
            initial={{ x: '110vw', y: '60vh' }}
            animate={{ 
              x: '-10vw', 
              y: '55vh',
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 12
            }}
          >
            <svg width="35" height="18" viewBox="0 0 35 18" className="text-blue-400">
              <path
                d="M5 9 L28 7 L30 9 L28 11 L5 9 Z M11 9 L7 4 L14 6 L19 8 L11 9 Z M11 9 L7 14 L14 12 L19 10 L11 9 Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Contrail Effects */}
      {intensity === 'high' && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 left-0 w-full h-px opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.3) 80%, transparent 100%)',
            }}
            animate={{
              scaleX: [0, 1, 1, 0],
              x: ['-100%', '0%', '100%', '200%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 8
            }}
          />
          
          <motion.div
            className="absolute top-2/3 left-0 w-full h-px opacity-25"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.2) 70%, transparent 100%)',
            }}
            animate={{
              scaleX: [0, 1, 1, 0],
              x: ['100%', '0%', '-100%', '-200%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: 15
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundEffects;
