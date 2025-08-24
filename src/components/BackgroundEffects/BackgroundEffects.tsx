import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { BackgroundEffectsProps, StarProps, CloudProps } from './BackgroundEffects.type';

// Legendary Aviation Colors
const LEGEND_BLUE_COLORS = {
  PRIMARY: '#3ec6ff',
  SECONDARY: '#0057b7', 
  TERTIARY: '#1e40af',
  ACCENT: '#00d4ff',
  DARK: '#0f0f23'
};

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

  // Generate legendary flying jets
  const jets = useMemo(() => {
    const jetCount = intensity === 'low' ? 2 : intensity === 'medium' ? 4 : 6;
    return Array.from({ length: jetCount }, (_, index) => ({
      id: index,
      startX: Math.random() * -200 - 100,
      startY: Math.random() * 60 + 10,
      endX: Math.random() * 200 + 120,
      endY: Math.random() * 60 + 10,
      speed: Math.random() * 15 + 20,
      delay: Math.random() * 10,
      size: Math.random() * 0.5 + 0.8,
      type: index % 3, // Different jet types
    }));
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      
      {/* Legendary Blue Aurora Background */}
      {enableAurora && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, ${LEGEND_BLUE_COLORS.PRIMARY}15 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, ${LEGEND_BLUE_COLORS.SECONDARY}20 0%, transparent 50%),
              radial-gradient(ellipse at 50% 10%, ${LEGEND_BLUE_COLORS.TERTIARY}10 0%, transparent 60%),
              linear-gradient(135deg, ${LEGEND_BLUE_COLORS.DARK} 0%, #1a1a3a 50%, ${LEGEND_BLUE_COLORS.DARK} 100%)
            `,
          }}
          initial={{ opacity: 0.2 }}
          animate={{
            opacity: [0.2, 0.4, 0.25, 0.35, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Legendary Blue Stars */}
      {enableStars && (
        <div className="absolute inset-0">
          {stars.map((star, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: index % 3 === 0 ? LEGEND_BLUE_COLORS.PRIMARY : 
                           index % 3 === 1 ? LEGEND_BLUE_COLORS.ACCENT : '#ffffff',
                boxShadow: `0 0 ${star.size * 2}px ${index % 3 === 0 ? LEGEND_BLUE_COLORS.PRIMARY : 
                           index % 3 === 1 ? LEGEND_BLUE_COLORS.ACCENT : '#ffffff'}50`
              }}
              initial={{ opacity: 0.4, scale: 0.8 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
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
              initial={{ x: "-10vw", opacity: 0 }}
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

      {/* Legendary Flying Jets and Airplanes */}
      {intensity !== 'low' && (
        <div className="absolute inset-0">
          {jets.map((jet) => (
            <motion.div
              key={jet.id}
              className="absolute"
              initial={{ 
                x: `${jet.startX}vw`, 
                y: `${jet.startY}vh`,
                scale: jet.size,
                opacity: 0
              }}
              animate={{ 
                x: `${jet.endX}vw`, 
                y: `${jet.endY}vh`,
                opacity: [0, 0.6, 0.8, 0.6, 0]
              }}
              transition={{
                duration: jet.speed,
                repeat: Infinity,
                ease: "linear",
                delay: jet.delay
              }}
            >
              {/* Fighter Jet */}
              {jet.type === 0 && (
                <div className="relative">
                  <svg width="60" height="25" viewBox="0 0 60 25" className="drop-shadow-lg">
                    {/* Main Fuselage */}
                    <path
                      d="M5 12.5 L45 10 L50 12.5 L45 15 L5 12.5 Z"
                      fill={LEGEND_BLUE_COLORS.PRIMARY}
                      opacity="0.8"
                    />
                    {/* Wings */}
                    <path
                      d="M15 12.5 L8 5 L20 8 L28 11 L15 12.5 Z M15 12.5 L8 20 L20 17 L28 14 L15 12.5 Z"
                      fill={LEGEND_BLUE_COLORS.SECONDARY}
                      opacity="0.9"
                    />
                    {/* Tail */}
                    <path
                      d="M45 12.5 L55 8 L55 17 L45 12.5 Z"
                      fill={LEGEND_BLUE_COLORS.TERTIARY}
                      opacity="0.7"
                    />
                    {/* Engine Glow */}
                    <circle cx="55" cy="12.5" r="3" fill={LEGEND_BLUE_COLORS.ACCENT} opacity="0.6">
                      <animate attributeName="opacity" values="0.4;0.9;0.4" dur="0.5s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  {/* Vapor Trail */}
                  <motion.div
                    className="absolute top-1/2 left-full w-40 h-0.5 -translate-y-1/2"
                    style={{
                      background: `linear-gradient(90deg, ${LEGEND_BLUE_COLORS.ACCENT}60 0%, transparent 100%)`,
                    }}
                    initial={{ scaleX: 0.5, opacity: 0.3 }}
                    animate={{
                      scaleX: [0.5, 1, 0.8],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              )}

              {/* Commercial Airliner */}
              {jet.type === 1 && (
                <div className="relative">
                  <svg width="80" height="30" viewBox="0 0 80 30" className="drop-shadow-lg">
                    {/* Main Fuselage */}
                    <path
                      d="M8 15 L65 12 L70 15 L65 18 L8 15 Z"
                      fill={LEGEND_BLUE_COLORS.SECONDARY}
                      opacity="0.9"
                    />
                    {/* Wings */}
                    <path
                      d="M25 15 L15 8 L35 10 L45 13 L25 15 Z M25 15 L15 22 L35 20 L45 17 L25 15 Z"
                      fill={LEGEND_BLUE_COLORS.PRIMARY}
                      opacity="0.8"
                    />
                    {/* Tail */}
                    <path
                      d="M65 15 L75 10 L75 20 L65 15 Z"
                      fill={LEGEND_BLUE_COLORS.TERTIARY}
                      opacity="0.8"
                    />
                    {/* Engine Lights */}
                    <circle cx="30" cy="12" r="2" fill={LEGEND_BLUE_COLORS.ACCENT} opacity="0.7">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="30" cy="18" r="2" fill={LEGEND_BLUE_COLORS.ACCENT} opacity="0.7">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.5s" />
                    </circle>
                  </svg>
                  {/* Contrail */}
                  <motion.div
                    className="absolute top-1/2 left-full w-60 h-1 -translate-y-1/2"
                    style={{
                      background: `linear-gradient(90deg, ${LEGEND_BLUE_COLORS.PRIMARY}40 0%, transparent 100%)`,
                    }}
                    initial={{ scaleX: 0.8, opacity: 0.2 }}
                    animate={{
                      scaleX: [0.8, 1.2, 0.9],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              )}

              {/* Stealth Fighter */}
              {jet.type === 2 && (
                <div className="relative">
                  <svg width="50" height="20" viewBox="0 0 50 20" className="drop-shadow-lg">
                    {/* Stealth Body */}
                    <path
                      d="M5 10 L35 8 L40 10 L35 12 L5 10 Z"
                      fill={LEGEND_BLUE_COLORS.TERTIARY}
                      opacity="0.9"
                    />
                    {/* Angular Wings */}
                    <path
                      d="M12 10 L8 6 L18 7 L22 9 L12 10 Z M12 10 L8 14 L18 13 L22 11 L12 10 Z"
                      fill={LEGEND_BLUE_COLORS.SECONDARY}
                      opacity="0.8"
                    />
                    {/* Stealth Tail */}
                    <path
                      d="M35 10 L45 7 L45 13 L35 10 Z"
                      fill={LEGEND_BLUE_COLORS.PRIMARY}
                      opacity="0.7"
                    />
                    {/* Plasma Glow */}
                    <circle cx="45" cy="10" r="2.5" fill={LEGEND_BLUE_COLORS.ACCENT} opacity="0.8">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="0.3s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  {/* Plasma Trail */}
                  <motion.div
                    className="absolute top-1/2 left-full w-30 h-0.5 -translate-y-1/2"
                    style={{
                      background: `linear-gradient(90deg, ${LEGEND_BLUE_COLORS.ACCENT}80 0%, ${LEGEND_BLUE_COLORS.PRIMARY}40 50%, transparent 100%)`,
                    }}
                    initial={{ scaleX: 0.7, opacity: 0.5 }}
                    animate={{
                      scaleX: [0.7, 1.3, 0.9],
                      opacity: [0.5, 0.9, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Legendary Blue Contrail Effects */}
      {intensity === 'high' && (
        <div className="absolute inset-0">
          {/* High Altitude Contrail */}
          <motion.div
            className="absolute top-1/4 left-0 w-full h-1 opacity-40"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${LEGEND_BLUE_COLORS.ACCENT}60 20%, ${LEGEND_BLUE_COLORS.PRIMARY}40 50%, ${LEGEND_BLUE_COLORS.SECONDARY}30 80%, transparent 100%)`,
              filter: 'blur(1px)'
            }}
            initial={{ scaleX: 0, x: '-100%', opacity: 0 }}
            animate={{
              scaleX: [0, 1.2, 1, 0],
              x: ['-100%', '0%', '100%', '200%'],
              opacity: [0, 0.6, 0.4, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: 3
            }}
          />
          
          {/* Mid Altitude Contrail */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-0.5 opacity-35"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${LEGEND_BLUE_COLORS.PRIMARY}50 30%, ${LEGEND_BLUE_COLORS.ACCENT}40 70%, transparent 100%)`,
              filter: 'blur(0.5px)'
            }}
            initial={{ scaleX: 0, x: '100%', opacity: 0 }}
            animate={{
              scaleX: [0, 1, 1.1, 0],
              x: ['100%', '0%', '-100%', '-200%'],
              opacity: [0, 0.5, 0.35, 0]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
              delay: 8
            }}
          />

          {/* Low Altitude Jet Stream */}
          <motion.div
            className="absolute top-2/3 left-0 w-full h-2 opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${LEGEND_BLUE_COLORS.TERTIARY}40 25%, ${LEGEND_BLUE_COLORS.SECONDARY}50 50%, ${LEGEND_BLUE_COLORS.PRIMARY}30 75%, transparent 100%)`,
              filter: 'blur(2px)'
            }}
            initial={{ scaleX: 0, x: '-50%', opacity: 0 }}
            animate={{
              scaleX: [0, 0.8, 1.3, 0],
              x: ['-50%', '50%', '150%'],
              opacity: [0, 0.4, 0.3, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 15
            }}
          />
        </div>
      )}

      {/* Legendary Atmospheric Layers */}
      <div className="absolute inset-0">
        {/* Top atmosphere - Deep Space Blue */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/3 opacity-40"
          style={{
            background: `linear-gradient(180deg, ${LEGEND_BLUE_COLORS.DARK}cc 0%, ${LEGEND_BLUE_COLORS.TERTIARY}20 50%, transparent 100%)`,
          }}
          animate={enableParallax ? {
            y: [0, -25, 0],
          } : {}}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Middle atmosphere - Jet Stream Blue */}
        <motion.div
          className="absolute top-1/3 left-0 right-0 h-1/3 opacity-25"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${LEGEND_BLUE_COLORS.SECONDARY}30 50%, ${LEGEND_BLUE_COLORS.PRIMARY}20 75%, transparent 100%)`,
          }}
          animate={enableParallax ? {
            y: [0, 15, 0],
          } : {}}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Bottom atmosphere - Horizon Blue */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-50"
          style={{
            background: `linear-gradient(0deg, ${LEGEND_BLUE_COLORS.DARK}dd 0%, ${LEGEND_BLUE_COLORS.SECONDARY}40 30%, ${LEGEND_BLUE_COLORS.PRIMARY}20 70%, transparent 100%)`,
          }}
          animate={enableParallax ? {
            y: [0, 8, 0],
          } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundEffects;
