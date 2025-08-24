import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Timer, Zap } from 'lucide-react';

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface ProCountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const ProCountdownTimer: React.FC<ProCountdownTimerProps> = ({ targetDate, className }) => {
  const [countdown, setCountdown] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [previousCountdown, setPreviousCountdown] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  // Calculate countdown without causing re-renders
  const calculateCountdown = (target: Date): CountdownData => {
    const now = new Date().getTime();
    const targetTime = target.getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  useEffect(() => {
    const updateCountdown = () => {
      const newCountdown = calculateCountdown(targetDate);
      setPreviousCountdown(countdown);
      setCountdown(newCountdown);
    };

    // Update immediately
    updateCountdown();
    
    // Update every second with stable timing
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]); // Stable dependency - only targetDate

  // Professional number display component
  const ProNumberDisplay = ({ 
    value, 
    label, 
    previousValue,
    icon: Icon 
  }: { 
    value: number; 
    label: string; 
    previousValue: number;
    icon: any;
  }) => {
    const hasChanged = value !== previousValue;
    
    return (
      <motion.div
        className="relative flex flex-col items-center group"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Professional Glow Effect */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-br from-[#3ec6ff]/20 via-[#0057b7]/15 to-[#1e40af]/10 rounded-3xl blur-xl"
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Responsive Main Container - Single Row Pro Design */}
        <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-[#3ec6ff]/30 rounded-2xl p-4 md:p-6 lg:p-8 min-w-[100px] md:min-w-[120px] lg:min-w-[140px] shadow-2xl shadow-[#0057b7]/20">
          
          {/* Corner Accent Lights */}
          <div className="absolute top-2 left-2 w-2 md:w-3 h-2 md:h-3 bg-[#3ec6ff] rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-2 right-2 w-1.5 md:w-2 h-1.5 md:h-2 bg-[#0057b7] rounded-full opacity-80 animate-pulse"></div>
          
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-2 md:mb-3"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#3ec6ff]" />
          </motion.div>
          
          {/* Professional Number Animation - No Text Blinking */}
          <div className="relative text-center overflow-hidden h-16 md:h-18 lg:h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${label}-${value}`}
                initial={hasChanged ? { 
                  y: 60, 
                  opacity: 0,
                  scale: 0.7
                } : {
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  scale: 1
                }}
                exit={hasChanged ? { 
                  y: -60, 
                  opacity: 0,
                  scale: 0.7
                } : {
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                }}
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-b from-white via-[#3ec6ff] to-white bg-clip-text text-transparent"
                style={{ 
                  transformStyle: 'preserve-3d',
                  textShadow: '0 0 30px rgba(62, 198, 255, 0.5)'
                }}
              >
                {value.toString().padStart(2, '0')}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Stable Label - Never Changes */}
          <div className="text-center mt-1 md:mt-2">
            <div className="text-xs md:text-sm font-bold text-[#3ec6ff] uppercase tracking-wider">
              {label}
            </div>
          </div>
          
          {/* Responsive Progress Bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-[#3ec6ff] to-transparent rounded-b-2xl"
            animate={{
              opacity: [0.3, 1, 0.3],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    );
  };

  if (countdown.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-gradient-to-br from-[#3ec6ff]/20 to-[#0057b7]/20 rounded-3xl border border-[#3ec6ff]/30"
      >
        <h3 className="text-3xl font-bold text-white mb-2">Event Has Started!</h3>
        <p className="text-[#3ec6ff] text-xl">Welcome to Aerophilia 2025</p>
      </motion.div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Professional Single Row Countdown Grid - All Devices */}
      <motion.div
        className="grid grid-cols-4 gap-3 md:gap-4 lg:gap-6 xl:gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.1
        }}
      >
        <ProNumberDisplay
          value={countdown.days}
          label="Days"
          previousValue={previousCountdown.days}
          icon={Calendar}
        />
        <ProNumberDisplay
          value={countdown.hours}
          label="Hours"
          previousValue={previousCountdown.hours}
          icon={Clock}
        />
        <ProNumberDisplay
          value={countdown.minutes}
          label="Minutes"
          previousValue={previousCountdown.minutes}
          icon={Timer}
        />
        <ProNumberDisplay
          value={countdown.seconds}
          label="Seconds"
          previousValue={previousCountdown.seconds}
          icon={Zap}
        />
      </motion.div>

      {/* Professional Separator Lines for Single Row */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical connecting lines between countdown units */}
        <motion.div
          className="absolute left-1/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#0057b7]/30 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute left-2/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#3ec6ff]/30 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute left-3/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#0057b7]/30 to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  );
};

export default ProCountdownTimer;
