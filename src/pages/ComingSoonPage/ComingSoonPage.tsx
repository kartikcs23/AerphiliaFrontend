import { motion } from 'framer-motion';
import { Rocket, Clock, Star, Sparkles, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

const ComingSoonPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [email, setEmail] = useState('');

  // Set up canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Particle animation
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Create particles
    type Particle = {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      direction: number;
      color: string;
    };
    
    const particles: Particle[] = [];
    const particleCount = 200;
    const colors = ['#60a5fa', '#8b5cf6', '#ec4899', '#f0abfc'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        direction: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Move particle
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen min-w-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-950 to-purple-950 text-white relative overflow-hidden">
      {/* Animated background with particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Enhanced animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-blue-950/30 to-purple-950/20"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-200"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Star size={Math.random() * 10 + 5} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-8 z-10 p-4 max-w-4xl mx-auto"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <Rocket className="w-24 h-24 text-blue-400" />
          <motion.div 
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" fill="currentColor" />
          </motion.div>
        </motion.div>
        
        {/* Animated Coming Soon Text with Cutting Effect */}
        <div className="relative" ref={textRef}>
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black text-center mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-100">
                Coming Soon
              </span>
              <span className="text-white opacity-10 blur-md">Coming Soon</span>
            </span>
          </motion.h1>
          
          {/* Cutting effect elements */}
          <motion.div 
            className="absolute top-1/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-2/3 right-0 w-1/2 h-1 bg-gradient-to-l from-transparent via-pink-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-1/2 -left-4 w-3 h-16 bg-blue-400 rounded-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-4 w-3 h-12 bg-pink-400 rounded-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl text-center mb-8 leading-relaxed">
            We're crafting something <span className="text-blue-300 font-semibold">extraordinary</span>. 
            A revolutionary experience that will change the way you think about technology.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-4 p-4 bg-black/30 rounded-xl backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-8 h-8 text-purple-400" />
          </motion.div>
          <span className="text-lg md:text-xl font-semibold text-blue-300">Launching in</span>
          <div className="flex gap-2">
            <div className="bg-blue-900/70 px-3 py-1 rounded-lg text-blue-200 font-mono">14</div>
            <div className="bg-purple-900/70 px-3 py-1 rounded-lg text-purple-200 font-mono">08</div>
            <div className="bg-pink-900/70 px-3 py-1 rounded-lg text-pink-200 font-mono">23</div>
          </div>
        </motion.div>
        
        {/* Email notification form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="w-full max-w-md mt-6"
        >
          <p className="text-gray-400 text-center mb-4">Get notified when we launch</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Notify Me
            </motion.button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Link 
            to="/" 
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 hover:from-blue-500/40 hover:to-purple-500/40 text-white font-bold shadow-lg transition-all duration-300 flex items-center gap-2 border border-white/10 backdrop-blur-sm"
          >
            <span>←</span>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;