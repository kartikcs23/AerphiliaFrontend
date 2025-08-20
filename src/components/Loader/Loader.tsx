import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import type { LoaderProps, JetAnimationState } from './Loader.type';
import { AVIATION_CONSTANTS, EASING } from '../../utils/constants';

const Loader: React.FC<LoaderProps> = ({ 
  onComplete, 
  duration = AVIATION_CONSTANTS.LOADER_DURATION 
}) => {
  const [animationState, setAnimationState] = useState<JetAnimationState>({
    phase: 'startup',
    progress: 0
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 500);
      }
    });

    // Phase 1: Startup (0-1s)
    timeline.to({}, { 
      duration: 1, 
      onUpdate: function() {
        setAnimationState({
          phase: 'startup',
          progress: this.progress() * 100
        });
      }
    });

    // Phase 2: Taxiing (1-2s)
    timeline.to({}, { 
      duration: 1, 
      onUpdate: function() {
        setAnimationState({
          phase: 'taxiing',
          progress: this.progress() * 100
        });
      }
    });

    // Phase 3: Takeoff (2-3.5s)
    timeline.to({}, { 
      duration: 1.5, 
      onUpdate: function() {
        setAnimationState({
          phase: 'takeoff',
          progress: this.progress() * 100
        });
      }
    });

    // Phase 4: Flight (3.5-4.5s)
    timeline.to({}, { 
      duration: 1, 
      onUpdate: function() {
        setAnimationState({
          phase: 'flight',
          progress: this.progress() * 100
        });
      }
    });

    return () => {
      timeline.kill();
    };
  }, [onComplete, duration]);

  const jetVariants = {
    startup: {
      x: -100,
      y: 0,
      scale: 0.8,
      rotate: 0,
      opacity: 0
    },
    taxiing: {
      x: -50,
      y: 0,
      scale: 0.9,
      rotate: 0,
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: EASING.JET_SMOOTH 
      }
    },
    takeoff: {
      x: 100,
      y: -50,
      scale: 1.1,
      rotate: -15,
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: EASING.JET_SMOOTH 
      }
    },
    flight: {
      x: 300,
      y: -150,
      scale: 0.6,
      rotate: -25,
      opacity: 0.3,
      transition: { 
        duration: 1, 
        ease: EASING.JET_SMOOTH 
      }
    }
  };

  const contrailVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      pathOffset: 1 
    },
    visible: { 
      pathLength: 1, 
      opacity: 0.8,
      pathOffset: 0,
      transition: { 
        duration: 2, 
        ease: EASING.CONTRAIL,
        delay: 2 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Stars */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Aurora Background Effect */}
          <motion.div
            className="absolute inset-0 opacity-30 aviation-aurora-bg"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main Jet Container */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            
            {/* Contrails SVG */}
            <svg 
              className="absolute inset-0 w-full h-full aviation-svg-overflow"
              viewBox="0 0 400 400"
            >
              <defs>
                <linearGradient id="contrailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor="rgba(255,255,255,0.8)" />
                  <stop offset="70%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              
              {animationState.phase !== 'startup' && (
                <motion.path
                  d="M50 200 Q150 180, 350 150"
                  stroke="url(#contrailGradient)"
                  strokeWidth="4"
                  fill="none"
                  variants={contrailVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              )}
              
              {animationState.phase === 'flight' && (
                <motion.path
                  d="M50 210 Q150 190, 350 160"
                  stroke="url(#contrailGradient)"
                  strokeWidth="3"
                  fill="none"
                  variants={contrailVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              )}
            </svg>

            {/* Fighter Jet */}
            <motion.div
              className="relative z-10"
              variants={jetVariants}
              initial="startup"
              animate={animationState.phase}
            >
              <svg width="120" height="60" viewBox="0 0 120 60" className="text-blue-300">
                {/* Jet Body */}
                <path
                  d="M10 30 L90 25 L95 30 L90 35 L10 30 Z"
                  fill="currentColor"
                  className="drop-shadow-lg"
                />
                
                {/* Wings */}
                <path
                  d="M30 30 L20 15 L35 20 L50 25 L30 30 Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M30 30 L20 45 L35 40 L50 35 L30 30 Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                
                {/* Nose */}
                <circle
                  cx="95"
                  cy="30"
                  r="3"
                  fill="white"
                  className="animate-pulse"
                />
                
                {/* Turbines */}
                <motion.circle
                  cx="15"
                  cy="25"
                  r="4"
                  fill="orange"
                  animate={animationState.phase !== 'startup' ? { rotate: 360 } : { rotate: 0 }}
                  transition={animationState.phase !== 'startup' ? { repeat: Infinity, duration: 0.1, ease: 'linear' } : {}}
                />
                <motion.circle
                  cx="15"
                  cy="35"
                  r="4"
                  fill="orange"
                  animate={animationState.phase !== 'startup' ? { rotate: 360 } : { rotate: 0 }}
                  transition={animationState.phase !== 'startup' ? { repeat: Infinity, duration: 0.1, ease: 'linear' } : {}}
                />
                
                {/* Afterburner Effects */}
                {(animationState.phase === 'takeoff' || animationState.phase === 'flight') && (
                  <>
                    <motion.ellipse
                      cx="5"
                      cy="25"
                      rx="8"
                      ry="2"
                      fill="orange"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ 
                        opacity: [0.8, 1, 0.8], 
                        scaleX: [0.5, 1, 0.8] 
                      }}
                      transition={{ 
                        duration: 0.3, 
                        repeat: Infinity 
                      }}
                    />
                    <motion.ellipse
                      cx="5"
                      cy="35"
                      rx="8"
                      ry="2"
                      fill="orange"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ 
                        opacity: [0.8, 1, 0.8], 
                        scaleX: [0.5, 1, 0.8] 
                      }}
                      transition={{ 
                        duration: 0.3, 
                        repeat: Infinity 
                      }}
                    />
                  </>
                )}
              </svg>
            </motion.div>

            {/* Runway Lights */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>

          {/* HUD-Style Loading Text */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="text-center text-cyan-300 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-lg mb-2 tracking-widest">
                AEROPHILIA 2025
              </div>
              <div className="text-sm opacity-70 mb-4">
                INITIALIZING FLIGHT SYSTEMS...
              </div>
              
              {/* Progress Bar */}
              <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${animationState.progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <div className="text-xs mt-2 opacity-50">
                {animationState.phase.toUpperCase()} • {Math.round(animationState.progress)}%
              </div>
            </motion.div>
          </div>

          {/* Cockpit HUD Elements */}
          <div className="absolute top-10 left-10 text-cyan-300 font-mono text-xs opacity-60">
            <div>ALT: 0000 FT</div>
            <div>SPD: {animationState.phase === 'flight' ? '450' : '000'} KTS</div>
            <div>HDG: 090°</div>
          </div>

          <div className="absolute top-10 right-10 text-cyan-300 font-mono text-xs opacity-60">
            <div>FUEL: 100%</div>
            <div>ENG: NOMINAL</div>
            <div>NAV: ACTIVE</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
