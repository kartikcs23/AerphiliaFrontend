import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCountdown } from '../../../utils/formatters';
import { APP_MESSAGES } from '../../../constants/appMessages';
import { Rocket, Star, Sparkles, Zap } from 'lucide-react';
import type { CountdownData } from './HeroSection.types';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const [countdown, setCountdown] = useState<CountdownData>({
    days: 60,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [isFlipping, setIsFlipping] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const updateCountdown = () => {
      const newCountdown = formatCountdown(targetDate);
      
      // Detect changes for flip animation
      const changes: { [key: string]: boolean } = {};
      if (newCountdown.days !== countdown.days) changes.days = true;
      if (newCountdown.hours !== countdown.hours) changes.hours = true;
      if (newCountdown.minutes !== countdown.minutes) changes.minutes = true;
      if (newCountdown.seconds !== countdown.seconds) changes.seconds = true;
      
      setIsFlipping(changes);
      setCountdown(newCountdown);
      
      // Reset flip animation after a short delay
      setTimeout(() => setIsFlipping({}), 600);
    };

    // Update immediately
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate, countdown]);

  // Premium number display component
  const NumberDisplay = ({ value, label, isActive }: { value: number; label: string; isActive?: boolean }) => (
    <motion.div
      className="relative flex flex-col items-center"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/30 to-[#ff6f1a]/20 rounded-2xl blur-xl"
        animate={{
          opacity: isActive ? [0.5, 1, 0.5] : 0.3,
          scale: isActive ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Main container */}
      <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 min-w-[120px]">
        {/* Premium background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/10 to-[#ff6f1a]/5 rounded-2xl"></div>
        
        {/* Animated number */}
        <div className="relative text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ 
                rotateX: isFlipping[label.toLowerCase()] ? 90 : 0, 
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                rotateX: 0, 
                opacity: 1,
                scale: 1
              }}
              exit={{ 
                rotateX: -90, 
                opacity: 0,
                scale: 0.8
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-4xl lg:text-5xl font-black text-white"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {value.toString().padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
          
          {/* Label */}
          <motion.div
            className="text-sm font-semibold text-white/80 mt-2 uppercase tracking-wider"
            animate={{
              color: isActive ? "#3ec6ff" : "rgba(255,255,255,0.8)"
            }}
          >
            {label}
          </motion.div>
        </div>

        {/* Floating particles for active numbers */}
        {isActive && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#3ec6ff] rounded-full"
                initial={{ 
                  x: '50%', 
                  y: '50%',
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  if (countdown.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-12 ${className}`}
      >
        {/* Premium launched state */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="relative">
            <Rocket className="h-24 w-24 text-[#3ec6ff] mx-auto" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <Sparkles className="h-24 w-24 text-[#ff6f1a] mx-auto" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-5xl font-black text-transparent bg-gradient-to-r from-[#3ec6ff] to-[#ff6f1a] bg-clip-text mb-4"
          animate={{
            backgroundPosition: ['0%', '100%', '0%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Event Has Launched!
        </motion.h2>
        
        <p className="text-xl text-white/80 font-light">
          The future of aerospace innovation is here!
        </p>
      </motion.div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Premium Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex items-center justify-center space-x-3 mb-4"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="text-[#ff6f1a] w-6 h-6" fill="currentColor" />
          <h3 className="text-2xl font-bold text-white">Event Launches In</h3>
          <Star className="text-[#ff6f1a] w-6 h-6" fill="currentColor" />
        </motion.div>
        
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-[#3ec6ff] to-[#ff6f1a] rounded-full mx-auto"
          animate={{
            width: [96, 128, 96],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Premium Countdown Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <NumberDisplay 
          value={countdown.days} 
          label="Days" 
          isActive={countdown.days > 0}
        />
        <NumberDisplay 
          value={countdown.hours} 
          label="Hours" 
          isActive={countdown.hours !== countdown.hours}
        />
        <NumberDisplay 
          value={countdown.minutes} 
          label="Minutes" 
          isActive={countdown.minutes !== countdown.minutes}
        />
        <NumberDisplay 
          value={countdown.seconds} 
          label="Seconds" 
          isActive={true} // Always active for seconds
        />
      </div>

      {/* Premium bottom decoration */}
      <motion.div
        className="flex justify-center mt-8 space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-[#3ec6ff] to-[#ff6f1a] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
