import { motion } from "framer-motion";
import { Clock } from "lucide-react";
// import { Zap, Cpu, Atom, Target, Shield, Crown, Flame, Eye } from "lucide-react";
import { useEffect, useState } from "react";

const ComingSoonPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Timer
  useEffect(() => {
    const launchDate = new Date("2025-10-01T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      if (distance <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-indigo-950">
      {/* Ultra Futuristic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[length:80px_80px]"
        />
        
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Energy particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Ultra Legend Main Content */}
      <motion.div 
        className="flex flex-col items-center justify-center gap-12 z-10 p-4 max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Legendary Icon Array */}
        {/* <motion.div 
          className="flex items-center justify-center gap-8 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {[Crown, Shield, Zap, Atom, Target, Cpu, Eye, Flame].map((Icon, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl border border-cyan-400/30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                boxShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.3)",
                  "0 0 40px rgba(0, 255, 255, 0.8)",
                  "0 0 20px rgba(0, 255, 255, 0.3)"
                ]
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-8 h-8 text-cyan-400" />
            </motion.div>
          ))}
        </motion.div> */}

        {/* Coming Soon Text */}
        <div className="relative mb-8">
          <motion.h1 
            className="text-[14rem] md:text-[22rem] lg:text-[32rem] xl:text-[40rem] font-black tracking-tighter leading-none"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          >
            {/* Legendary gradient text with multiple effects */}
            <span className="relative inline-block">
              {/* Main gradient text */}
              <motion.span 
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundImage: [
                    "linear-gradient(45deg, #00ffff, #0080ff, #8000ff)",
                    "linear-gradient(45deg, #ff00ff, #00ffff, #ffff00)",
                    "linear-gradient(45deg, #00ff00, #ff00ff, #0080ff)",
                    "linear-gradient(45deg, #00ffff, #0080ff, #8000ff)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                COMING
              </motion.span>
              
              {/* Glow effect */}
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent blur-md opacity-70"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                COMING
              </motion.span>
            </span>
          </motion.h1>

          <motion.h1 
            className="text-[14rem] md:text-[22rem] lg:text-[32rem] xl:text-[40rem] font-black tracking-tighter leading-none mt-4"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
          >
            <span className="relative inline-block">
              <motion.span 
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
                animate={{
                  backgroundImage: [
                    "linear-gradient(45deg, #ffff00, #ff8000, #ff0000)",
                    "linear-gradient(45deg, #ff0080, #ffff00, #00ff80)",
                    "linear-gradient(45deg, #8000ff, #ff0080, #ff8000)",
                    "linear-gradient(45deg, #ffff00, #ff8000, #ff0000)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                SOON
              </motion.span>
              
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent blur-md opacity-70"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                SOON
              </motion.span>
            </span>
          </motion.h1>

          {/* Epic text decorations */}
          {/* <motion.div
            className="absolute -top-8 -left-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="text-6xl">⚡</div>
          </motion.div> */}
          
          {/* <motion.div
            className="absolute -top-8 -right-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <div className="text-6xl">🚀</div>
          </motion.div> */}

          {/* <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-6xl">✨</div>
          </motion.div> */}
        </div>

        {/* Legendary subtitle with emojis */}
        {/* <motion.div
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-cyan-300 mb-8 flex items-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-4xl">🛸</span>
          <span>AEROPHILIA</span>
          <span className="text-4xl">2025</span>
          <span className="text-4xl">🌟</span>
        </motion.div> */}

        {/* Ultra Pro Countdown */}
        <motion.div
          className="relative p-8 bg-gradient-to-br from-black/50 via-cyan-900/20 to-purple-900/30 rounded-3xl backdrop-blur-xl border border-cyan-400/30 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {/* Legendary countdown header */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-12 h-12 text-cyan-400" />
            </motion.div>
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              LAUNCHING IN
            </span>
            {/* <div className="text-4xl">⏰</div> */}
          </motion.div>

          {/* Epic countdown numbers */}
          <div className="flex gap-6 justify-center">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div 
                key={unit}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-cyan-500/20 to-purple-600/20 p-6 rounded-2xl backdrop-blur-xl border border-cyan-400/30"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 255, 255, 0.3)",
                      "0 0 40px rgba(0, 255, 255, 0.6)",
                      "0 0 20px rgba(0, 255, 255, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <div className="text-4xl md:text-6xl font-mono font-black text-cyan-300 text-center mb-2">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-lg font-semibold text-cyan-400 uppercase tracking-wider text-center">
                    {unit}
                  </div>
                  
                  {/* Particle effects on each number */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      scale: [1, 1.5, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {/* <div className="text-2xl">💫</div> */}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Epic call to action */}
        {/* <motion.div
          className="text-xl md:text-2xl font-semibold text-cyan-300 flex items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-3xl">🎯</span>
          <span>GET READY FOR THE ULTIMATE TECH EXPERIENCE</span>
          <span className="text-3xl">🎯</span>
        </motion.div> */}

      </motion.div>
    </div>
  );
};

export default ComingSoonPage;
