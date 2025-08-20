/**
 * Hero Section for Aerophilia 2025
 * Stunning landing section with 3D animations and dynamic content
 */

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Plane, Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { Button } from '../../ui/button';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import type { HeroSectionProps } from './HeroSection.types';

// 3D Airplane Component
function Airplane() {
  const meshRef = useRef<any>();

  useEffect(() => {
    if (meshRef.current) {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.y += 0.01;
          meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
          meshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.5;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 0.2, 0.2]} />
      <meshStandardMaterial color="#3b82f6" />
      <mesh position={[0, 0, 0.5]}>
        <coneGeometry args={[0.1, 0.3]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.05, 0.2]} />
        <meshStandardMaterial color="#3b82f6" />
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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
      style={{ y, opacity }}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} />
          <Airplane />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Plane className="h-16 w-16 text-blue-400 mx-auto" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              AEROPHILIA
            </span>
            <br />
            <span className="text-white">2025</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Where Innovation Takes Flight • Aeromodelling • Robotics • Coding • Innovation
          </motion.p>
        </motion.div>

        {/* Event Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12"
        >
          {eventStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-b from-blue-900/30 to-black/30 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4 md:p-6"
            >
              <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-sm md:text-base mb-1">
                {stat.label}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Event Starts In
          </h2>
          <CountdownTimer targetDate={eventDate} />
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/events">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-300 hover:scale-105"
            >
              Explore Events
            </Button>
          </Link>
          
          <Link to="/register">
            <Button 
              variant="outline"
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-3 text-lg font-semibold rounded-full transform transition-all duration-300 hover:scale-105"
            >
              Register Now
            </Button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-400"
          >
            <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-blue-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-15">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default HeroSection;
