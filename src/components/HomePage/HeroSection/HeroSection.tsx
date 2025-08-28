import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import { Calendar, MapPin, Users, Trophy, Sparkles, Zap, ArrowRight, Play, ChevronDown } from 'lucide-react';
import AerophiliaLogo from '../../../assets/Aerophilia-white.svg';
import { Link } from 'react-router-dom';
import type { HeroSectionProps } from './HeroSection.types';

// Ultra Premium 3D Airplane Component - Optimized
function UltraPremiumAirplane() {
  const meshRef = useRef<any>(null);
  const propellerRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (meshRef.current) {
      let animationId: number;
      let lastTime = 0;
      
      const animate = (currentTime: number) => {
        // Throttle animation to 20fps instead of 30fps for maximum performance
        if (currentTime - lastTime >= 50) {
          if (meshRef.current) {
            const time = currentTime * 0.001;
            meshRef.current.rotation.y += hovered ? 0.015 : 0.006; // Reduced rotation speed
            meshRef.current.rotation.x = Math.sin(time) * 0.1; // Reduced amplitude
            meshRef.current.position.y = Math.sin(time * 1.5) * 0.6; // Reduced movement
            meshRef.current.position.x = Math.cos(time * 0.8) * 0.3; // Reduced movement
            meshRef.current.position.z = Math.sin(time * 1.2) * 0.2; // Reduced movement
          }
          
          // Update propeller rotation
          if (propellerRef.current) {
            propellerRef.current.rotation.z = currentTime * 0.005; // Reduced from 0.01
          }
          
          lastTime = currentTime;
        }
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(animationId);
    }
  }, [hovered]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        {/* Main Fuselage */}
        <cylinderGeometry args={[0.15, 0.1, 3, 16]} />
        <MeshWobbleMaterial 
          color="#3ec6ff" 
          emissive="#3ec6ff" 
          emissiveIntensity={0.2} // Reduced from 0.3
          factor={0.05}           // Reduced from 0.1
          speed={1.5}             // Reduced from 2
        />
        
        {/* Wings */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.1, 0.8]} />
          <MeshWobbleMaterial 
            color="#0057b7" 
            emissive="#0057b7" 
            emissiveIntensity={0.15} // Reduced from 0.2
            factor={0.03}            // Reduced from 0.05
            speed={1.2}              // Reduced from 1.5
          />
        </mesh>
        
        {/* Tail */}
        <mesh position={[0, 0.3, -1.2]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.1]} />
          <MeshWobbleMaterial 
            color="#0057b7" 
            emissive="#0057b7" 
            emissiveIntensity={0.25} // Reduced from 0.4
            factor={0.05}            // Reduced from 0.08
            speed={1.4}              // Reduced from 1.8
          />
        </mesh>
        
        {/* Engine Glow Effects */}
        <mesh position={[0, 0, 1.5]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={hovered ? 1.5 : 0.8} // Reduced intensity
            transparent
            opacity={0.7} // Reduced from 0.8
          />
        </mesh>
        
        {/* Optimized Propeller with controlled rotation */}
        <mesh ref={propellerRef} position={[0, 0, 1.6]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
        </mesh>
      </mesh>
    </Float>
  );
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Optimized scroll transforms with reduced stiffness for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50, // Reduced from 100
    damping: 25,   // Reduced from 30
    restDelta: 0.001
  });

  // Reduced transform ranges for better performance
  const y = useTransform(smoothProgress, [0, 1], ["0%", "20%"]); // Reduced from 30%
  const opacity = useTransform(smoothProgress, [0, 1], [1, 0.5]); // Less dramatic opacity change
  const titleY = useTransform(smoothProgress, [0, 1], [0, -60]); // Reduced from -100
  const contentY = useTransform(smoothProgress, [0, 1], [0, -50]); // Reduced from -80

  // Throttled mouse tracking for better performance
  useEffect(() => {
    let lastCall = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall >= 16) { // ~60fps throttling
        setMousePosition({ 
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1
        });
        lastCall = now;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Memoized event details with enhanced data to avoid recreation on each render
  const eventStats = useMemo(() => [
    { 
      icon: Calendar, 
      label: 'November 5-7, 2025', 
      description: '3 Days of Pure Innovation',
      gradient: 'from-[#3ec6ff] to-[#0057b7]'
    },
    { 
      icon: MapPin, 
      label: 'Sahyadri College', 
      description: 'Mangalore, Karnataka',
      gradient: 'from-[#0057b7] to-[#1e40af]'
    },
    { 
      icon: Users, 
      label: '500+ Participants', 
      description: 'Elite Tech Innovators',
      gradient: 'from-[#1e40af] to-[#3ec6ff]'
    },
    { 
      icon: Trophy, 
      label: '₹5L+ Prize Pool', 
      description: 'Life-Changing Rewards',
      gradient: 'from-[#3ec6ff] to-[#0057b7]'
    },
  ], []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity }}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Optimized 3D Background with reduced complexity */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]} // Limit pixel ratio for better performance
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#3ec6ff" />
          <pointLight position={[-10, -10, -10]} color="#0057b7" intensity={1} />
          
          <UltraPremiumAirplane />
          
          <Stars 
            radius={120}   // Further reduced from 150
            depth={30}     // Further reduced from 50
            count={1500}   // Further reduced from 3000 for maximum performance
            factor={3}     // Further reduced from 4
            saturation={0.3} // Further reduced from 0.4
            fade 
            speed={1.5}    // Further reduced from 2
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true} 
            autoRotate={true}
            autoRotateSpeed={0.1} // Further reduced from 0.2
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>

      {/* Dynamic Gradient Overlays */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/20 via-transparent to-[#0057b7]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(62,198,255,0.3),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,111,26,0.2),transparent_60%)]"></div>
      </div>

      {/* Optimized Floating Elements with reduced movement */}
      <motion.div
        className="absolute top-20 left-20 text-[#3ec6ff]/30"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1], // Reduced from 1.2
          x: mousePosition.x * 30, // Reduced from 50
          y: mousePosition.y * 20  // Reduced from 30
        }}
        transition={{ 
          rotate: { duration: 40, repeat: Infinity, ease: "linear" }, // Slower rotation
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }  // Slower scaling
        }}
      >
        <Sparkles size={100} /> {/* Reduced from 120 */}
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 text-[#0057b7]/40"
        animate={{ 
          rotate: -360,
          scale: [1.05, 1, 1.05], // Reduced from 1.1
          x: mousePosition.x * -30, // Reduced from -40
          y: mousePosition.y * -20  // Reduced from -25
        }}
        transition={{ 
          rotate: { duration: 35, repeat: Infinity, ease: "linear" }, // Slower rotation
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }  // Slower scaling
        }}
      >
        <Zap size={80} /> {/* Reduced from 100 */}
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Column - Hero Content */}
          <motion.div 
            style={{ y: titleY }}
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Reduced from 1.5
          >
            {/* Premium Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }} // Reduced from 1.2
              className="flex items-center space-x-4 mb-8"
            >
              <motion.img 
                src={AerophiliaLogo} 
                alt="Aerophilia Logo" 
                className="h-16 w-auto"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="h-12 w-0.5 bg-gradient-to-b from-[#3ec6ff] to-[#0057b7]"></div>
              <div className="text-white/80 font-light">
              </div>
            </motion.div>

            {/* Hero Title */}
            <motion.h1 
              className="text-6xl lg:text-8xl font-black leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }} // Reduced from 1.5
            >
              <motion.span 
                className="bg-gradient-to-r from-[#3ec6ff] via-white to-[#0057b7] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                2025
              </motion.span>
              {/* <br />
              <motion.span 
                className="text-white/90 text-4xl lg:text-6xl font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                2025
              </motion.span> */}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-2xl lg:text-3xl text-white/80 font-light leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              Where <span className="text-[#3ec6ff] font-semibold">Innovation Takes Flight</span> 
              <br />
              Join the ultimate aerospace technology championship
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 pt-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px -12px rgba(62, 198, 255, 0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-6 bg-gradient-to-r from-[#3ec6ff] to-[#0057b7] text-white font-bold text-xl rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0057b7] to-[#3ec6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-3">
                    <span>Register Now</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoPlaying(true)}
                className="group px-12 py-6 border-2 border-white/30 text-white font-semibold text-xl rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 flex items-center space-x-3"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Promo</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Event Info */}
          <motion.div 
            style={{ y: contentY }}
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} // Reduced from 1.5
          >
            {/* Premium Event Stats */}
            <div className="grid grid-cols-2 gap-6">
              {eventStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 1 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10
                  }}
                  className="group relative p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl cursor-pointer overflow-hidden"
                >
                  {/* Premium glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-3 bg-gradient-to-br ${stat.gradient} rounded-xl mb-4`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#3ec6ff] transition-colors duration-300">
                      {stat.label}
                    </h4>
                    <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Premium Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-[#3ec6ff]/20 to-[#0057b7]/20 rounded-3xl border border-white/20 backdrop-blur-xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white text-center">
                <Play className="w-24 h-24 mx-auto mb-4 text-[#3ec6ff]" />
                <h3 className="text-2xl font-bold mb-2">Aerophilia 2025 Promo</h3>
                <p className="text-white/70">Coming Soon...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center text-white/70 cursor-pointer">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;

