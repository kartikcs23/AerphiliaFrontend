import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import type { LoaderProps, JetAnimationState } from './Loader.type';
import { AVIATION_CONSTANTS } from '../../utils/constants';

// Legendary Aviation Colors
const LEGEND_COLORS = {
  PRIMARY: '#3ec6ff',
  SECONDARY: '#0057b7', 
  TERTIARY: '#1e40af',
  ACCENT: '#00d4ff',
  GOLD: '#ffd700',
  SILVER: '#c0c0c0',
  DARK: '#0f0f23',
  GLOW: '#00ffff'
};

// Epic Boom Sound Effect (using Web Audio API)
const playBoomSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a dramatic boom sound using oscillators
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Low frequency boom
    oscillator1.frequency.setValueAtTime(40, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.3);
    oscillator1.type = 'sawtooth';
    
    // Mid frequency explosion crack
    oscillator2.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
    oscillator2.type = 'square';
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.5);
    oscillator2.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    // Gracefully handle if audio context is not supported
    console.log('Audio context not supported, playing silent boom 💥');
  }
};

const Loader: React.FC<LoaderProps> = ({ 
  onComplete, 
  duration = AVIATION_CONSTANTS.LOADER_DURATION 
}) => {
  const [animationState, setAnimationState] = useState<JetAnimationState>({
    phase: 'startup',
    progress: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
  const [boomPhase, setBoomPhase] = useState(0); // 0: none, 1: building, 2: explosion, 3: afterglow

  // Generate legendary flying squad with precise formation positions
  const flyingSquad = useMemo(() => {
    const formations = [
      { 
        x: 0, y: 0, role: 'leader', size: 1.4, type: 'stealth',
        takeoffSpeed: 1.0, formationDepth: 0, altitude: 0 
      },
      { 
        x: -80, y: -30, role: 'left_wing', size: 1.1, type: 'fighter',
        takeoffSpeed: 0.95, formationDepth: -20, altitude: -8 
      },
      { 
        x: 80, y: -30, role: 'right_wing', size: 1.1, type: 'fighter',
        takeoffSpeed: 0.95, formationDepth: -20, altitude: -8 
      },
      { 
        x: -120, y: 20, role: 'left_rear', size: 0.95, type: 'support',
        takeoffSpeed: 0.90, formationDepth: -40, altitude: -15 
      },
      { 
        x: 120, y: 20, role: 'right_rear', size: 0.95, type: 'support',
        takeoffSpeed: 0.90, formationDepth: -40, altitude: -15 
      }
    ];
    
    return formations.map((formation, i) => ({
      id: i,
      delay: i === 0 ? 0 : i * 0.25, // Professional staggered timing
      size: formation.size,
      type: formation.type,
      role: formation.role,
      isLeader: formation.role === 'leader',
      formationOffset: { x: formation.x, y: formation.y },
      takeoffDelay: i === 0 ? 0 : i * 0.4, // Realistic takeoff sequence
      altitude: formation.altitude, // Individual altitude assignments
      takeoffSpeed: formation.takeoffSpeed, // Variable takeoff speeds
      formationDepth: formation.formationDepth, // 3D depth positioning
      rollAngle: i === 0 ? 0 : (i % 2 === 0 ? -3 : 3) // Slight banking for realism
    }));
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setCelebrationPhase(1);
        
        // Start the BOOM sequence
        setTimeout(() => setBoomPhase(1), 500);        // Building tension
        setTimeout(() => {
          setBoomPhase(2);                             // BOOM explosion!
          playBoomSound();                             // 💥 EPIC AUDIO BOOM!
        }, 1000);       
        setTimeout(() => setBoomPhase(3), 1200);       // Afterglow
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 2000); // Extended timing for boom effect
      }
    });

    // Phase 1: Legendary Startup (0-1.5s)
    timeline.to({}, { 
      duration: 1.5, 
      onUpdate: function() {
        setAnimationState({
          phase: 'startup',
          progress: this.progress() * 20
        });
      }
    });

    // Phase 2: Squadron Assembly & Runway Positioning (1.5-3s)
    timeline.to({}, { 
      duration: 1.5, 
      onUpdate: function() {
        setAnimationState({
          phase: 'taxiing',
          progress: 20 + (this.progress() * 20)
        });
      }
    });

    // Phase 3: Staggered Professional Takeoff (3-5.5s)
    timeline.to({}, { 
      duration: 2.5, 
      onUpdate: function() {
        setAnimationState({
          phase: 'takeoff',
          progress: 40 + (this.progress() * 35)
        });
      }
    });

    // Phase 4: Formation Flight & Celebration (5.5-8s)
    timeline.to({}, { 
      duration: 2.5, 
      onUpdate: function() {
        setAnimationState({
          phase: 'flight',
          progress: 75 + (this.progress() * 25)
        });
      }
    });

    return () => {
      timeline.kill();
    };
  }, [onComplete, duration]);

  const squadronVariants = {
    startup: {
      x: -250,
      y: 80,
      scale: 0.5,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      opacity: 0,
      z: 0
    },
    taxiing: {
      x: -120,
      y: 50,
      scale: 0.7,
      rotateX: 0,
      rotateY: -5,
      rotateZ: 0,
      opacity: 1,
      z: 10,
      transition: { 
        duration: 2, 
        type: "spring" as const,
        damping: 12
      }
    },
    takeoff: {
      x: 20,
      y: -20,
      scale: 1,
      rotateX: -8,
      rotateY: -3,
      rotateZ: -12,
      opacity: 1,
      z: 50,
      transition: { 
        duration: 2.5, 
        type: "spring" as const,
        damping: 10
      }
    },
    flight: {
      x: 200,
      y: -100,
      scale: 0.8,
      rotateX: -15,
      rotateY: -8,
      rotateZ: -18,
      opacity: 0.95,
      z: 100,
      transition: { 
        duration: 2.5
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
        duration: 3, 
        delay: 1.5
      }
    },
    celebration: {
      pathLength: 1,
      opacity: 1,
      pathOffset: 0,
      transition: {
        duration: 0.5
      }
    }
  };


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, ${LEGEND_COLORS.PRIMARY}15 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, ${LEGEND_COLORS.SECONDARY}20 0%, transparent 50%),
              radial-gradient(ellipse at 50% 10%, ${LEGEND_COLORS.TERTIARY}10 0%, transparent 60%),
              linear-gradient(135deg, ${LEGEND_COLORS.DARK} 0%, #1a1a3a 50%, ${LEGEND_COLORS.DARK} 100%)
            `
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          animate={
            boomPhase === 2 ? {
              x: [0, -3, 3, -2, 2, -1, 1, 0],
              y: [0, -2, 2, -1, 1, -0.5, 0.5, 0]
            } : {}
          }
        >
          {/* Legendary Star Field */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 120 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  background: `radial-gradient(circle, ${LEGEND_COLORS.ACCENT} 0%, ${LEGEND_COLORS.PRIMARY} 50%, transparent 100%)`,
                  boxShadow: `0 0 ${Math.random() * 4 + 2}px ${LEGEND_COLORS.GLOW}60`
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Aurora Background Effect */}
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse at 30% 20%, ${LEGEND_COLORS.ACCENT}20 0%, transparent 60%),
                radial-gradient(ellipse at 70% 80%, ${LEGEND_COLORS.PRIMARY}15 0%, transparent 60%),
                radial-gradient(ellipse at 90% 40%, ${LEGEND_COLORS.SECONDARY}18 0%, transparent 50%)
              `
            }}
            animate={{
              opacity: [0.2, 0.5, 0.3, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main Squadron Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Legendary Contrails */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 600"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))' }}
            >
              <defs>
                <linearGradient id="legendaryContrail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="20%" stopColor={`${LEGEND_COLORS.ACCENT}80`} />
                  <stop offset="50%" stopColor={`${LEGEND_COLORS.PRIMARY}60`} />
                  <stop offset="80%" stopColor={`${LEGEND_COLORS.SECONDARY}40`} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="goldContrail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor={`${LEGEND_COLORS.GOLD}60`} />
                  <stop offset="70%" stopColor={`${LEGEND_COLORS.SILVER}40`} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Formation Contrails */}
              {animationState.phase !== 'startup' && (
                <>
                  {/* Lead Aircraft Contrail */}
                  <motion.path
                    d="M100 300 Q300 280, 600 250"
                    stroke="url(#goldContrail)"
                    strokeWidth="6"
                    fill="none"
                    filter="url(#glow)"
                    variants={contrailVariants}
                    initial="hidden"
                    animate={celebrationPhase ? "celebration" : "visible"}
                  />
                  
                  {/* Wing Aircraft Contrails */}
                  <motion.path
                    d="M100 280 Q300 260, 600 230"
                    stroke="url(#legendaryContrail)"
                    strokeWidth="4"
                    fill="none"
                    variants={contrailVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.path
                    d="M100 320 Q300 300, 600 270"
                    stroke="url(#legendaryContrail)"
                    strokeWidth="4"
                    fill="none"
                    variants={contrailVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.path
                    d="M100 260 Q300 240, 600 210"
                    stroke="url(#legendaryContrail)"
                    strokeWidth="3"
                    fill="none"
                    variants={contrailVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.path
                    d="M100 340 Q300 320, 600 290"
                    stroke="url(#legendaryContrail)"
                    strokeWidth="3"
                    fill="none"
                    variants={contrailVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </>
              )}
            </svg>

            {/* Flying Squadron */}
            <div className="relative z-10">
              {flyingSquad.map((aircraft, index) => (
                <motion.div
                  key={aircraft.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: `${aircraft.formationOffset.x}px`,
                    marginTop: `${aircraft.formationOffset.y}px`,
                    zIndex: 50 + aircraft.formationDepth, // 3D depth layering
                    transform: `rotateZ(${aircraft.rollAngle}deg)`, // Banking angle
                  }}
                  variants={squadronVariants}
                  initial="startup"
                  animate={animationState.phase}
                  transition={{
                    delay: aircraft.takeoffDelay, // Use realistic takeoff timing
                    duration: 2 * aircraft.takeoffSpeed, // Variable takeoff speed
                    ease: "easeInOut"
                  }}
                >
                  {/* Leader Aircraft - Legendary Design */}
                  {aircraft.isLeader ? (
                    <motion.div
                      style={{ scale: aircraft.size }}
                      animate={{
                        y: [0, -5, 0],
                        rotate: animationState.phase === 'flight' ? [-15, -12, -15] : 0
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg width="140" height="70" viewBox="0 0 140 70" className="drop-shadow-2xl">
                        {/* Legendary Fighter Jet - Leader */}
                        <defs>
                          <linearGradient id="leaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={LEGEND_COLORS.GOLD} />
                            <stop offset="50%" stopColor={LEGEND_COLORS.SILVER} />
                            <stop offset="100%" stopColor={LEGEND_COLORS.ACCENT} />
                          </linearGradient>
                          <filter id="jetGlow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        
                        {/* Main Fuselage */}
                        <path
                          d="M10 35 L100 30 L120 35 L100 40 L10 35 Z"
                          fill="url(#leaderGradient)"
                          filter="url(#jetGlow)"
                        />
                        
                        {/* Delta Wings */}
                        <path
                          d="M30 35 L15 15 L45 25 L65 30 L30 35 Z"
                          fill={LEGEND_COLORS.ACCENT}
                          opacity="0.9"
                        />
                        <path
                          d="M30 35 L15 55 L45 45 L65 40 L30 35 Z"
                          fill={LEGEND_COLORS.ACCENT}
                          opacity="0.9"
                        />
                        
                        {/* Canopy */}
                        <ellipse
                          cx="80"
                          cy="35"
                          rx="15"
                          ry="8"
                          fill={LEGEND_COLORS.GLOW}
                          opacity="0.7"
                        />
                        
                        {/* Nose Cone */}
                        <circle
                          cx="120"
                          cy="35"
                          r="4"
                          fill={LEGEND_COLORS.GOLD}
                        />
                        
                        {/* Legendary Engines */}
                        <motion.circle
                          cx="20"
                          cy="30"
                          r="6"
                          fill={LEGEND_COLORS.GOLD}
                          animate={animationState.phase !== 'startup' ? { 
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 1, 0.8]
                          } : { scale: 1, opacity: 0.8 }}
                          transition={{ repeat: Infinity, duration: 0.2 }}
                        />
                        <motion.circle
                          cx="20"
                          cy="40"
                          r="6"
                          fill={LEGEND_COLORS.GOLD}
                          animate={animationState.phase !== 'startup' ? { 
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 1, 0.8]
                          } : { scale: 1, opacity: 0.8 }}
                          transition={{ repeat: Infinity, duration: 0.2 }}
                        />
                        
                        {/* Afterburner Effects */}
                        {(animationState.phase === 'takeoff' || animationState.phase === 'flight') && (
                          <>
                            <motion.ellipse
                              cx="5"
                              cy="30"
                              rx="12"
                              ry="3"
                              fill={LEGEND_COLORS.GOLD}
                              animate={{ 
                                opacity: [0.6, 1, 0.8, 1, 0.6], 
                                scaleX: [0.8, 1.2, 1, 1.3, 0.8] 
                              }}
                              transition={{ 
                                duration: 0.4, 
                                repeat: Infinity 
                              }}
                            />
                            <motion.ellipse
                              cx="5"
                              cy="40"
                              rx="12"
                              ry="3"
                              fill={LEGEND_COLORS.GOLD}
                              animate={{ 
                                opacity: [0.6, 1, 0.8, 1, 0.6], 
                                scaleX: [0.8, 1.2, 1, 1.3, 0.8] 
                              }}
                              transition={{ 
                                duration: 0.4, 
                                repeat: Infinity 
                              }}
                            />
                          </>
                        )}
                      </svg>
                    </motion.div>
                  ) : (
                    /* Wing Aircraft - Support Fighters */
                    <motion.div
                      style={{ scale: aircraft.size }}
                      animate={{
                        y: [0, -3, 0],
                        rotate: animationState.phase === 'flight' ? [-15, -12, -15] : 0
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: aircraft.delay * 0.5
                      }}
                    >
                      <svg width="100" height="50" viewBox="0 0 100 50" className="drop-shadow-lg">
                        {/* Support Fighter Design */}
                        <defs>
                          <linearGradient id={`supportGradient${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={LEGEND_COLORS.ACCENT} />
                            <stop offset="50%" stopColor={LEGEND_COLORS.PRIMARY} />
                            <stop offset="100%" stopColor={LEGEND_COLORS.SECONDARY} />
                          </linearGradient>
                        </defs>
                        
                        {/* Main Body */}
                        <path
                          d="M5 25 L75 22 L85 25 L75 28 L5 25 Z"
                          fill={`url(#supportGradient${index})`}
                        />
                        
                        {/* Wings */}
                        <path
                          d="M25 25 L15 12 L35 18 L50 22 L25 25 Z"
                          fill={LEGEND_COLORS.PRIMARY}
                          opacity="0.8"
                        />
                        <path
                          d="M25 25 L15 38 L35 32 L50 28 L25 25 Z"
                          fill={LEGEND_COLORS.PRIMARY}
                          opacity="0.8"
                        />
                        
                        {/* Nose */}
                        <circle
                          cx="85"
                          cy="25"
                          r="3"
                          fill={LEGEND_COLORS.ACCENT}
                        />
                        
                        {/* Engines */}
                        <motion.circle
                          cx="10"
                          cy="22"
                          r="4"
                          fill={LEGEND_COLORS.ACCENT}
                          animate={animationState.phase !== 'startup' ? { 
                            opacity: [0.6, 1, 0.6]
                          } : { opacity: 0.6 }}
                          transition={{ repeat: Infinity, duration: 0.3 }}
                        />
                        <motion.circle
                          cx="10"
                          cy="28"
                          r="4"
                          fill={LEGEND_COLORS.ACCENT}
                          animate={animationState.phase !== 'startup' ? { 
                            opacity: [0.6, 1, 0.6]
                          } : { opacity: 0.6 }}
                          transition={{ repeat: Infinity, duration: 0.3 }}
                        />
                        
                        {/* Afterburners */}
                        {(animationState.phase === 'takeoff' || animationState.phase === 'flight') && (
                          <>
                            <motion.ellipse
                              cx="2"
                              cy="22"
                              rx="8"
                              ry="2"
                              fill={LEGEND_COLORS.ACCENT}
                              animate={{ 
                                opacity: [0.5, 0.9, 0.5], 
                                scaleX: [0.7, 1.1, 0.7] 
                              }}
                              transition={{ 
                                duration: 0.3, 
                                repeat: Infinity 
                              }}
                            />
                            <motion.ellipse
                              cx="2"
                              cy="28"
                              rx="8"
                              ry="2"
                              fill={LEGEND_COLORS.ACCENT}
                              animate={{ 
                                opacity: [0.5, 0.9, 0.5], 
                                scaleX: [0.7, 1.1, 0.7] 
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
                  )}
                </motion.div>
              ))}
            </div>

            {/* Legendary Runway */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96">
              <div className="flex justify-center space-x-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${LEGEND_COLORS.GOLD} 0%, ${LEGEND_COLORS.ACCENT} 100%)`,
                      boxShadow: `0 0 15px ${LEGEND_COLORS.GLOW}80`
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.3, 0.8],
                      boxShadow: [
                        `0 0 10px ${LEGEND_COLORS.GLOW}60`,
                        `0 0 25px ${LEGEND_COLORS.GLOW}100`,
                        `0 0 10px ${LEGEND_COLORS.GLOW}60`
                      ]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Legendary HUD Interface */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              className="text-center font-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div 
                className="text-2xl mb-3 tracking-[0.3em] font-bold"
                style={{ 
                  color: LEGEND_COLORS.GOLD,
                  textShadow: `0 0 20px ${LEGEND_COLORS.GOLD}80`
                }}
                animate={{
                  textShadow: [
                    `0 0 20px ${LEGEND_COLORS.GOLD}80`,
                    `0 0 30px ${LEGEND_COLORS.GOLD}100`,
                    `0 0 20px ${LEGEND_COLORS.GOLD}80`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AEROPHILIA 2025
              </motion.div>
              
              <motion.div 
                className="text-sm mb-4 tracking-widest"
                style={{ color: LEGEND_COLORS.ACCENT }}
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                LEGENDARY SQUADRON INITIALIZING...
              </motion.div>
              
              {/* Futuristic Progress Bar */}
              <div className="relative">
                <div 
                  className="w-80 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: `${LEGEND_COLORS.DARK}80` }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${LEGEND_COLORS.GOLD} 0%, ${LEGEND_COLORS.ACCENT} 50%, ${LEGEND_COLORS.PRIMARY} 100%)`,
                      boxShadow: `0 0 15px ${LEGEND_COLORS.GLOW}80`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${animationState.progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                
                {/* Progress Indicators */}
                <div className="flex justify-between absolute -top-1 left-0 right-0">
                  {[25, 50, 75, 100].map((milestone) => (
                    <motion.div
                      key={milestone}
                      className="w-1 h-4 rounded-full"
                      style={{
                        backgroundColor: animationState.progress >= milestone 
                          ? LEGEND_COLORS.GOLD 
                          : `${LEGEND_COLORS.DARK}60`
                      }}
                      animate={animationState.progress >= milestone ? {
                        boxShadow: [
                          `0 0 5px ${LEGEND_COLORS.GOLD}60`,
                          `0 0 15px ${LEGEND_COLORS.GOLD}100`,
                          `0 0 5px ${LEGEND_COLORS.GOLD}60`
                        ]
                      } : {}}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 text-xs">
                <span style={{ color: LEGEND_COLORS.SILVER }}>
                  {animationState.phase.toUpperCase().replace('_', ' ')}
                </span>
                <span style={{ color: LEGEND_COLORS.ACCENT }}>
                  {Math.round(animationState.progress)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Legendary HUD Elements */}
          <div className="absolute top-8 left-8 font-mono text-xs z-20">
            <motion.div
              style={{ color: LEGEND_COLORS.ACCENT }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div>ALT: {animationState.phase === 'flight' ? '35,000' : '0000'} FT</div>
              <div>SPD: {animationState.phase === 'flight' ? '650' : animationState.phase === 'takeoff' ? '180' : '000'} KTS</div>
              <div>HDG: 090°</div>
              <div>FORMATION: DIAMOND</div>
            </motion.div>
          </div>

          <div className="absolute top-8 right-8 font-mono text-xs z-20">
            <motion.div
              style={{ color: LEGEND_COLORS.ACCENT }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div>FUEL: 100%</div>
              <div>ENG: NOMINAL</div>
              <div>NAV: ACTIVE</div>
              <div>SQUAD: 5/5</div>
            </motion.div>
          </div>

          {/* Celebration Effects */}
          {celebrationPhase > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: Math.random() > 0.5 ? LEGEND_COLORS.GOLD : LEGEND_COLORS.ACCENT,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{
                    duration: 1.5,
                    delay: Math.random() * 0.5,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* EPIC BOOM EFFECTS */}
          {boomPhase > 0 && (
            <motion.div 
              className="fixed inset-0 z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Phase 1: Building Tension */}
              {boomPhase >= 1 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-orange-500/30 via-red-500/20 to-transparent"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: boomPhase >= 2 ? [0, 1, 3] : [0, 0.5],
                    opacity: boomPhase >= 2 ? [0, 1, 0] : [0, 0.8]
                  }}
                  transition={{ 
                    duration: boomPhase >= 2 ? 0.3 : 0.5,
                    ease: "easeOut"
                  }}
                />
              )}

              {/* Phase 2: MASSIVE EXPLOSION */}
              {boomPhase >= 2 && (
                <>
                  {/* Core Explosion */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-white via-yellow-300 to-orange-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 4, 8],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {/* Shockwave Rings */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={`shockwave-${i}`}
                      className="absolute inset-0 border-4 border-white/60 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ 
                        scale: [0, 6, 12],
                        opacity: [1, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "easeOut" 
                      }}
                    />
                  ))}

                  {/* Explosion Particles */}
                  {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                      key={`explosion-particle-${i}`}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: `hsl(${Math.random() * 60 + 15}, 100%, ${50 + Math.random() * 50}%)`, // Hot colors
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * 1000,
                        y: (Math.random() - 0.5) * 1000,
                        rotate: Math.random() * 360
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                    />
                  ))}

                  {/* Dramatic Multi-Flash */}
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0, 0.6, 0, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.3,
                      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1]
                    }}
                  />

                  {/* Epic "BOOM!" Text */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.5, 1.2, 0],
                      opacity: [0, 1, 1, 0],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div 
                      className="text-8xl font-black text-white"
                      style={{
                        textShadow: '0 0 20px #ff4444, 0 0 40px #ff8800, 0 0 60px #ffff00',
                        WebkitTextStroke: '3px #000'
                      }}
                    >
                      BOOM!
                    </div>
                  </motion.div>
                </>
              )}

              {/* Phase 3: Afterglow & Smoke */}
              {boomPhase >= 3 && (
                <>
                  {/* Glowing Afterglow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-orange-400/40 via-red-500/20 to-transparent"
                    initial={{ scale: 8, opacity: 0 }}
                    animate={{ 
                      scale: [8, 12, 15],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  {/* Rising Smoke Clouds */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={`smoke-${i}`}
                      className="absolute w-8 h-8 rounded-full bg-gray-600/30"
                      style={{
                        left: `${45 + Math.random() * 10}%`,
                        top: '50%',
                      }}
                      initial={{ scale: 0, y: 0, opacity: 0.8 }}
                      animate={{ 
                        scale: [0, 1 + Math.random(), 2 + Math.random()],
                        y: [0, -200 - Math.random() * 200],
                        opacity: [0.8, 0.4, 0],
                        x: (Math.random() - 0.5) * 100
                      }}
                      transition={{ 
                        duration: 1.2,
                        delay: Math.random() * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  ))}

                  {/* Sparks and Embers */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={`ember-${i}`}
                      className="absolute w-1 h-1 rounded-full bg-orange-400"
                      style={{
                        left: `${40 + Math.random() * 20}%`,
                        top: `${40 + Math.random() * 20}%`,
                      }}
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ 
                        scale: [1, 0],
                        opacity: [1, 0],
                        y: Math.random() * -100,
                        x: (Math.random() - 0.5) * 50
                      }}
                      transition={{ 
                        duration: 0.8 + Math.random() * 0.4,
                        delay: Math.random() * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;