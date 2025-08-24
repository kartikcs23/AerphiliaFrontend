import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Plane, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import AerophiliaLogo from '../../assets/Aerophilia-white.svg';
import { useAuth } from "../../context/AuthContext";
import type { NavbarComponentProps, NavItem } from "./NavbarComponent.types";

// Legendary Aviation Color Palette
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

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const NavbarComponent: React.FC<NavbarComponentProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          isScrolled
            ? `bg-gradient-to-b from-black/90 via-black/80 to-transparent backdrop-blur-xl border-b shadow-2xl`
            : "bg-transparent"
        } ${className}`}
      style={{
        borderImage: isScrolled ? `linear-gradient(90deg, ${LEGEND_COLORS.ACCENT}80, ${LEGEND_COLORS.PRIMARY}60, ${LEGEND_COLORS.ACCENT}80) 1` : 'none',
        boxShadow: isScrolled ? `0 0 30px ${LEGEND_COLORS.GLOW}40, inset 0 1px 0 ${LEGEND_COLORS.PRIMARY}30` : 'none'
      }}
    >
      {/* Legendary Atmospheric Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particle Field */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, ${LEGEND_COLORS.ACCENT} 0%, transparent 100%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.5, 1.2, 0.8],
                opacity: [0.3, 0.8, 0.3],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Energy Grid */}
        {isScrolled && (
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(0deg, ${LEGEND_COLORS.PRIMARY}20 1px, transparent 1px), linear-gradient(90deg, ${LEGEND_COLORS.PRIMARY}20 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </div>

      {/* Legendary Scroll Progress Bar */}
      <motion.div
        className="h-1 origin-left fixed top-0 left-0 right-0 z-50"
        style={{ 
          scaleX,
          background: `linear-gradient(90deg, ${LEGEND_COLORS.ACCENT}, ${LEGEND_COLORS.PRIMARY}, ${LEGEND_COLORS.GOLD}, ${LEGEND_COLORS.PRIMARY}, ${LEGEND_COLORS.ACCENT})`,
          filter: `drop-shadow(0 0 8px ${LEGEND_COLORS.GLOW})`
        }}
      />

      {/* HUD Corner Elements */}
      <div className="absolute top-2 left-2 w-8 h-8">
        <div className="absolute top-0 left-0 w-4 h-1 bg-gradient-to-r from-transparent to-cyan-400 opacity-60" />
        <div className="absolute top-0 left-0 w-1 h-4 bg-gradient-to-b from-transparent to-cyan-400 opacity-60" />
      </div>
      <div className="absolute top-2 right-2 w-8 h-8">
        <div className="absolute top-0 right-0 w-4 h-1 bg-gradient-to-l from-transparent to-cyan-400 opacity-60" />
        <div className="absolute top-0 right-0 w-1 h-4 bg-gradient-to-b from-transparent to-cyan-400 opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Legendary Squadron Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            {/* Squadron Formation */}
            <div className="relative">
              {/* Main Aircraft */}
              <motion.div
                className="relative z-10"
                whileHover={{ 
                  scale: 1.1,
                  rotateZ: [0, -3, 3, 0],
                  x: [0, 8, -4, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                <Plane 
                  className="h-9 w-9 drop-shadow-lg" 
                  style={{ 
                    color: LEGEND_COLORS.ACCENT,
                    filter: `drop-shadow(0 0 12px ${LEGEND_COLORS.GLOW})`
                  }}
                />
              </motion.div>
              
              {/* Wing Aircraft Formation */}
              <motion.div
                className="absolute -top-1 -left-2 z-0"
                animate={{ 
                  x: [0, -3, 2, 0],
                  y: [0, 1, -1, 0],
                  rotate: [0, -2, 1, 0]
                }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
              >
                <Plane 
                  className="h-4 w-4 opacity-60" 
                  style={{ 
                    color: LEGEND_COLORS.SILVER,
                    filter: `drop-shadow(0 0 6px ${LEGEND_COLORS.PRIMARY})`
                  }}
                />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-2 z-0"
                animate={{ 
                  x: [0, 3, -2, 0],
                  y: [0, 1, -1, 0],
                  rotate: [0, 2, -1, 0]
                }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
              >
                <Plane 
                  className="h-4 w-4 opacity-60" 
                  style={{ 
                    color: LEGEND_COLORS.SILVER,
                    filter: `drop-shadow(0 0 6px ${LEGEND_COLORS.PRIMARY})`
                  }}
                />
              </motion.div>

              {/* Legendary Contrails */}
              <motion.div
                className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2"
                style={{
                  background: `linear-gradient(90deg, ${LEGEND_COLORS.ACCENT}80 0%, ${LEGEND_COLORS.PRIMARY}40 50%, transparent 100%)`,
                  filter: 'blur(1px)'
                }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3], 
                  scaleX: [0.7, 1.3, 0.8],
                  x: [0, -8, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Plasma Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${LEGEND_COLORS.GLOW}20 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            
            {/* Legendary Logo */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={AerophiliaLogo}
                alt="Aerophilia Logo"
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-18 max-w-[180px] transition-all duration-300"
                style={{ 
                  filter: `drop-shadow(0 0 15px ${LEGEND_COLORS.ACCENT}60) drop-shadow(0 0 30px ${LEGEND_COLORS.PRIMARY}30)`
                }}
              />
              {/* Holographic Border */}
              <motion.div
                className="absolute inset-0 rounded-lg border border-transparent"
                style={{
                  background: `linear-gradient(45deg, ${LEGEND_COLORS.ACCENT}30, transparent, ${LEGEND_COLORS.PRIMARY}30) border-box`,
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'exclude'
                }}
                animate={{
                  opacity: [0, 0.6, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </Link>

          {/* Legendary HUD Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.href}
                className="relative"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  to={item.href}
                  className={`relative px-6 py-3 text-lg font-black tracking-wider transition-all duration-300 group ${
                    location.pathname === item.href
                      ? "text-cyan-200"
                      : "text-gray-100 hover:text-cyan-100"
                  }`}
                >
                  {/* HUD Frame */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-cyan-400/40 transition-all duration-300" />
                  
                  {/* Background Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${LEGEND_COLORS.ACCENT}10, ${LEGEND_COLORS.PRIMARY}20, transparent)`
                    }}
                  />
                  
                  {/* Active State Indicator */}
                  {location.pathname === item.href && (
                    <>
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${LEGEND_COLORS.ACCENT}, ${LEGEND_COLORS.GOLD}, ${LEGEND_COLORS.ACCENT})`,
                          boxShadow: `0 0 8px ${LEGEND_COLORS.GLOW}60`
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                      {/* Active Background */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${LEGEND_COLORS.PRIMARY}15, ${LEGEND_COLORS.ACCENT}10, transparent)`,
                          border: `1px solid ${LEGEND_COLORS.ACCENT}30`
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                  
                  {/* Squadron Position Indicator */}
                  <motion.div
                    className="absolute -left-1 top-1/2 w-1 h-1 rounded-full transform -translate-y-1/2"
                    style={{
                      background: LEGEND_COLORS.ACCENT,
                      boxShadow: `0 0 4px ${LEGEND_COLORS.GLOW}`
                    }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover Effect Particles */}
                  <AnimatePresence>
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            background: LEGEND_COLORS.ACCENT,
                            top: `${20 + i * 20}%`,
                            right: `${10 + i * 15}%`
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                            x: [0, 10, 20]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Legendary User Command Center */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Button
                      size="sm"
                      className="relative rounded-full px-6 py-3 font-black text-lg text-white border-0 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${LEGEND_COLORS.ACCENT} 0%, ${LEGEND_COLORS.PRIMARY} 50%, ${LEGEND_COLORS.SECONDARY} 100%)`,
                        boxShadow: `0 0 20px ${LEGEND_COLORS.GLOW}40, inset 0 1px 0 ${LEGEND_COLORS.ACCENT}50`
                      }}
                    >
                      <User className="h-5 w-5 mr-3" />
                      {user?.firstName}
                      
                      {/* Holographic Shimmer */}
                      <motion.div
                        className="absolute inset-0 -skew-x-12 opacity-30"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${LEGEND_COLORS.ACCENT}60, transparent)`,
                        }}
                        animate={{
                          x: ['-200%', '200%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </Button>
                  </motion.div>
                </Link>
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={logout}
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-gray-100 hover:text-red-300 hover:bg-red-500/10 transition-all border border-red-400/20 hover:border-red-400/60"
                    style={{
                      background: `linear-gradient(135deg, transparent, ${LEGEND_COLORS.DARK}30)`,
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-lg font-bold text-gray-100 hover:text-cyan-100 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 border border-cyan-400/20 hover:border-cyan-400/60 transition-all px-6 py-3"
                    >
                      Login
                    </Button>
                  </motion.div>
                </Link>
                
                <Link to="/signup">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Button
                      size="sm"
                      className="relative rounded-full font-black text-lg text-white border-0 overflow-hidden px-8 py-3"
                      style={{
                        background: `linear-gradient(135deg, ${LEGEND_COLORS.PRIMARY} 0%, ${LEGEND_COLORS.ACCENT} 50%, ${LEGEND_COLORS.SECONDARY} 100%)`,
                        boxShadow: `0 0 25px ${LEGEND_COLORS.PRIMARY}40, inset 0 1px 0 ${LEGEND_COLORS.ACCENT}50`
                      }}
                    >
                      Register
                      
                      {/* Elite Glow Pulse */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${LEGEND_COLORS.PRIMARY}20 0%, transparent 70%)`,
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            )}
          </div>

          {/* Legendary Mobile Command Interface */}
          <div className="md:hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative text-gray-100 hover:text-cyan-100 p-3 rounded-lg border border-cyan-400/30 hover:border-cyan-400/70 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${LEGEND_COLORS.DARK}40, ${LEGEND_COLORS.PRIMARY}20, transparent)`,
                }}
              >
                {/* Icon Animation */}
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <X className="h-7 w-7" style={{ filter: `drop-shadow(0 0 6px ${LEGEND_COLORS.ACCENT})` }} />
                  ) : (
                    <Menu className="h-7 w-7" style={{ filter: `drop-shadow(0 0 6px ${LEGEND_COLORS.ACCENT})` }} />
                  )}
                </motion.div>
                
                {/* Pulse Ring */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-cyan-400/50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Legendary Mobile Command Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%", rotateY: 90 }}
            animate={{ opacity: 1, x: "0%", rotateY: 0 }}
            exit={{ opacity: 0, x: "100%", rotateY: 90 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:hidden fixed inset-y-0 right-0 w-full max-w-sm z-40 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${LEGEND_COLORS.DARK}95 0%, ${LEGEND_COLORS.SECONDARY}20 50%, ${LEGEND_COLORS.DARK}90 100%)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${LEGEND_COLORS.ACCENT}30`,
              boxShadow: `0 0 50px ${LEGEND_COLORS.GLOW}30, inset 0 1px 0 ${LEGEND_COLORS.ACCENT}20`
            }}
          >
            {/* Mobile Menu Background Effects */}
            <div className="absolute inset-0">
              {/* Particle Grid */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: LEGEND_COLORS.ACCENT,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              {/* Energy Waves */}
              <motion.div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: `repeating-linear-gradient(90deg, transparent, ${LEGEND_COLORS.PRIMARY}40 2px, transparent 4px)`
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '20px 0px'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            <div className="flex flex-col h-full pt-20 pb-6 px-6 relative z-10">
              {/* Squadron Status Display */}
              <motion.div 
                className="mb-6 p-3 rounded-lg border"
                style={{
                  background: `linear-gradient(135deg, ${LEGEND_COLORS.PRIMARY}10, transparent)`,
                  borderColor: `${LEGEND_COLORS.ACCENT}30`
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-sm font-bold text-gray-200 mb-2">NAVIGATION STATUS</div>
                <div className="text-cyan-300 font-mono text-lg font-black flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>SYSTEMS ONLINE</span>
                </div>
              </motion.div>

              <div className="flex-1 space-y-3">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50, rotateX: 45 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      rotateX: 0,
                      transition: { delay: index * 0.1 + 0.3, duration: 0.5 },
                    }}
                    className="relative"
                  >
                    <Link
                      to={item.href}
                      className={`group relative block px-6 py-5 text-xl font-black tracking-wider rounded-lg transition-all duration-300 ${
                        location.pathname === item.href
                          ? "text-cyan-200"
                          : "text-gray-100 hover:text-cyan-100"
                      }`}
                      style={{
                        background: location.pathname === item.href 
                          ? `linear-gradient(135deg, ${LEGEND_COLORS.ACCENT}20, ${LEGEND_COLORS.PRIMARY}15, transparent)`
                          : 'transparent',
                        border: location.pathname === item.href 
                          ? `1px solid ${LEGEND_COLORS.ACCENT}40`
                          : '1px solid transparent'
                      }}
                    >
                      {/* Squadron Leader Indicator */}
                      <motion.div
                        className="absolute left-2 top-1/2 w-1 h-6 rounded-full transform -translate-y-1/2"
                        style={{
                          background: location.pathname === item.href 
                            ? `linear-gradient(180deg, ${LEGEND_COLORS.GOLD}, ${LEGEND_COLORS.ACCENT})`
                            : `linear-gradient(180deg, ${LEGEND_COLORS.SILVER}40, transparent)`
                        }}
                        animate={{
                          height: location.pathname === item.href ? [6, 24, 6] : 6,
                          opacity: location.pathname === item.href ? [0.7, 1, 0.7] : [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                      
                      {/* Text */}
                      <span className="relative z-10 ml-4">{item.label}</span>
                      
                      {/* Hover Effect Trail */}
                      <motion.div
                        className="absolute right-2 top-1/2 w-8 h-0.5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(90deg, ${LEGEND_COLORS.ACCENT}, transparent)`
                        }}
                        animate={{
                          scaleX: [0, 1, 0],
                          x: [0, 10, 20]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Legendary Mobile User Command Center */}
              <motion.div 
                className="border-t pt-6 space-y-3"
                style={{ borderColor: `${LEGEND_COLORS.ACCENT}30` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="w-full rounded-full font-semibold text-white relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${LEGEND_COLORS.ACCENT} 0%, ${LEGEND_COLORS.PRIMARY} 50%, ${LEGEND_COLORS.SECONDARY} 100%)`,
                            boxShadow: `0 0 20px ${LEGEND_COLORS.GLOW}40`
                          }}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile Command
                          
                          {/* Command Pulse */}
                          <motion.div
                            className="absolute inset-0 rounded-full border"
                            style={{ borderColor: `${LEGEND_COLORS.ACCENT}60` }}
                            animate={{
                              scale: [1, 1.05, 1],
                              opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </Button>
                      </motion.div>
                    </Link>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={logout}
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-red-500/10 border border-red-400/30 hover:border-red-400/70 transition-all"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full text-gray-300 hover:text-white border border-cyan-400/30 hover:border-cyan-400/70 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all"
                        >
                          Access Control
                        </Button>
                      </motion.div>
                    </Link>
                    
                    <Link to="/signup">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                      >
                        <Button 
                          className="w-full rounded-full font-semibold text-white relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${LEGEND_COLORS.GOLD} 0%, ${LEGEND_COLORS.ACCENT} 50%, ${LEGEND_COLORS.PRIMARY} 100%)`,
                            boxShadow: `0 0 25px ${LEGEND_COLORS.GOLD}40`
                          }}
                        >
                          Join Squadron
                          
                          {/* Elite Badge Shimmer */}
                          <motion.div
                            className="absolute inset-0 -skew-x-12"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${LEGEND_COLORS.GOLD}40, transparent)`,
                            }}
                            animate={{
                              x: ['-200%', '200%']
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
                
                {/* Squadron Info Display */}
                <motion.div 
                  className="mt-4 p-3 rounded-lg text-center text-xs text-gray-500 border"
                  style={{
                    background: `linear-gradient(135deg, ${LEGEND_COLORS.DARK}60, transparent)`,
                    borderColor: `${LEGEND_COLORS.ACCENT}20`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="font-mono">AEROPHILIA 2025</div>
                  <div className="text-cyan-400">NAVIGATION SYSTEM ACTIVE</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavbarComponent;
