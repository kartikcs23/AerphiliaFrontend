import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Plane, Calendar, MapPin, Users, Trophy, Sparkles, Zap } from 'lucide-react';
import { Button } from '../../ui/button';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import type { HeroSectionProps } from './HeroSection.types';

// Enhanced 3D Airplane Component
function Airplane() {
  const meshRef = useRef<any>(null);

  useEffect(() => {
    if (meshRef.current) {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.y += 0.01;
          meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
          meshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.5;
          meshRef.current.position.x = Math.cos(Date.now() * 0.001) * 0.3;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 0.2, 0.2]} />
      <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      <mesh position={[0, 0, 0.5]}>
        <coneGeometry args={[0.1, 0.3]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.05, 0.2]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>
      {/* Add engine glow */}
      <mesh position={[-0.9, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
      </mesh>
    </mesh>
  );
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Event details
  const eventDate = new Date('2025-03-15T09:00:00');
  const eventStats = [
    { icon: Calendar, label: 'March 15-17, 2025', description: '3 Days of Innovation' },
    { icon: MapPin, label: 'Sahyadri College', description: 'Mangalore, Karnataka' },
    { icon: Users, label: '500+ Participants', description: 'Tech Enthusiasts' },
    { icon: Trophy, label: '₹5L+ Prizes', description: 'Total Prize Pool' },
  ];

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity, scale }}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} color="#9333ea" intensity={0.8} />
          <Airplane />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true} 
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-950/40 to-black/60 z-10" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-15">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 text-blue-400/20 z-10"
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={100} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-purple-400/20 z-10"
        animate={{ rotate: -360, y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <Zap size={100} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12"
        >
          <motion.div
            animate={{ rotate: 360, y: [0, -10, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-8"
          >
            <Plane className="h-20 w-20 text-blue-400 mx-auto drop-shadow-lg" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
              AEROPHILIA
            </span>
            <br />
            <span className="text-white text-4xl md:text-6xl lg:text-7xl drop-shadow-md">2025</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Where Innovation Takes Flight • Aeromodelling • Robotics • Coding • Innovation
          </motion.p>
        </motion.div>

        {/* Event Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {eventStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-b from-blue-900/30 to-black/30 backdrop-blur-md border border-blue-500/30 rounded-xl p-5 md:p-6 relative overflow-hidden group"
            >
              {/* Hover effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <stat.icon className="h-10 w-10 text-blue-400 mx-auto mb-4 drop-shadow-md" />
              <h3 className="text-white font-semibold text-lg md:text-xl mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            Event Starts In
          </motion.h2>
          <CountdownTimer targetDate={eventDate} />
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link to="/events">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-10 py-6 text-lg font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 shadow-2xl shadow-blue-500/30 relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
              Explore Events
            </Button>
          </Link>
          
          <Link to="/register">
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-10 py-6 text-lg font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10"
            >
              Register Now
            </Button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-400 flex flex-col items-center"
          >
            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
            <div className="w-8 h-14 border-2 border-blue-400 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;