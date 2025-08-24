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

  // Responsive screen size detection
  const [screenSize, setScreenSize] = useState({ width: 1200 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth });
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
//   const isDesktop = screenSize.width >= 1024;

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

  // Professional number display component with ultra-responsive design
  const ProNumberDisplay = ({ 
    value, 
    label, 
    previousValue,
    icon: Icon,
    rotate = false
  }: { 
    value: number; 
    label: string; 
    previousValue: number;
    icon: any;
    rotate?: boolean;
  }) => {
    const hasChanged = value !== previousValue;
    
    return (
      <motion.div
        className="relative flex flex-col items-center group"
        whileHover={{ 
          y: isMobile ? -4 : isTablet ? -6 : -8, 
          scale: isMobile ? 1.01 : 1.02 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Professional Glow Effect - Responsive */}
        <motion.div
          className={`absolute rounded-3xl blur-xl ${
            isMobile ? '-inset-1' : isTablet ? '-inset-1.5' : '-inset-2'
          }`}
          style={{
            background: 'linear-gradient(45deg, rgba(62,198,255,0.2) 0%, rgba(0,87,183,0.15) 50%, rgba(30,64,175,0.1) 100%)'
          }}
          initial={{ opacity: 0.4, scale: 1 }}
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
        
        {/* Ultra Responsive Main Container */}
        <div className={`relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-[#3ec6ff]/30 rounded-2xl shadow-2xl shadow-[#0057b7]/20 ${
          isMobile ? 'p-2 min-w-[70px] max-w-[80px]' : 
          isTablet ? 'p-3 min-w-[90px] max-w-[110px]' : 
          'p-4 md:p-6 lg:p-8 min-w-[100px] md:min-w-[120px] lg:min-w-[140px]'
        }`}>
          
          {/* Corner Accent Lights - Responsive */}
          <div className={`absolute bg-[#3ec6ff] rounded-full opacity-60 animate-pulse ${
            isMobile ? 'top-1 left-1 w-1.5 h-1.5' : 
            isTablet ? 'top-1.5 left-1.5 w-2 h-2' : 
            'top-2 left-2 w-2 md:w-3 h-2 md:h-3'
          }`}></div>
          <div className={`absolute bg-[#0057b7] rounded-full opacity-80 animate-pulse ${
            isMobile ? 'bottom-1 right-1 w-1 h-1' : 
            isTablet ? 'bottom-1.5 right-1.5 w-1.5 h-1.5' : 
            'bottom-2 right-2 w-1.5 md:w-2 h-1.5 md:h-2'
          }`}></div>
          
          {/* Icon - Responsive */}
          <motion.div
            className={`flex justify-center ${
              isMobile ? 'mb-1' : isTablet ? 'mb-2' : 'mb-2 md:mb-3'
            }`}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Icon className={`text-[#3ec6ff] ${
              isMobile ? 'w-3 h-3' : 
              isTablet ? 'w-4 h-4' : 
              'w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'
            }`} />
          </motion.div>
          
          {/* Ultra Responsive Number Animation */}
          <div className={`relative text-center overflow-hidden flex items-center justify-center ${
            isMobile ? 'h-8' : 
            isTablet ? 'h-12' : 
            'h-16 md:h-18 lg:h-20'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${label}-${value}`}
                initial={hasChanged ? { 
                  y: isMobile ? 40 : 60, 
                  opacity: 0,
                  scale: 0.7,
                  rotateY: rotate ? 180 : 0
                } : {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotateY: 0
                }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  scale: 1,
                  rotateY: rotate && hasChanged ? [180, 0] : 0
                }}
                exit={hasChanged ? { 
                  y: isMobile ? -40 : -60, 
                  opacity: 0,
                  scale: 0.7,
                  rotateY: rotate ? -180 : 0
                } : {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotateY: 0
                }}
                transition={{ 
                  duration: rotate && hasChanged ? 0.8 : 0.6, 
                  ease: rotate && hasChanged ? [0.25, 0.8, 0.25, 1] : [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: rotate && hasChanged ? 150 : 200,
                  damping: 25
                }}
                className={`font-black bg-gradient-to-b from-white via-[#3ec6ff] to-white bg-clip-text text-transparent ${
                  isMobile ? 'text-lg' : 
                  isTablet ? 'text-2xl' : 
                  'text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  textShadow: isMobile ? '0 0 15px rgba(62, 198, 255, 0.3)' : '0 0 30px rgba(62, 198, 255, 0.5)'
                }}
              >
                {value.toString().padStart(2, '0')}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Responsive Label */}
          <div className={`text-center ${
            isMobile ? 'mt-0.5' : isTablet ? 'mt-1' : 'mt-1 md:mt-2'
          }`}>
            <div className={`font-bold text-[#3ec6ff] uppercase tracking-wider ${
              isMobile ? 'text-[0.65rem]' : 
              isTablet ? 'text-xs' : 
              'text-xs md:text-sm'
            }`}>
              {label}
            </div>
          </div>
          
          {/* Responsive Progress Bar */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-[#3ec6ff] to-transparent rounded-b-2xl ${
              isMobile ? 'h-0.5' : 'h-0.5 md:h-1'
            }`}
            initial={{ opacity: 0.3, scaleX: 0.8 }}
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

  // Prevent hydration mismatch
  if (!isMounted) {
    return <div className="relative min-h-[120px] flex items-center justify-center" />;
  }

  if (countdown.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center bg-gradient-to-br from-[#3ec6ff]/20 to-[#0057b7]/20 rounded-3xl border border-[#3ec6ff]/30 ${
          isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8'
        }`}
      >
        <h3 className={`font-bold text-white mb-2 ${
          isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'
        }`}>Event Has Started!</h3>
        <p className={`text-[#3ec6ff] ${
          isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-xl'
        }`}>Welcome to Aerophilia 2025</p>
      </motion.div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Professional Ultra-Responsive Countdown Grid */}
      <motion.div
        className={`grid grid-cols-4 max-w-5xl mx-auto ${
          isMobile ? 'gap-1.5' : 
          isTablet ? 'gap-3' : 
          'gap-3 md:gap-4 lg:gap-6 xl:gap-8'
        }`}
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
          rotate={true}
        />
      </motion.div>

      {/* Professional Responsive Separator Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical connecting lines between countdown units - Responsive opacity */}
        <motion.div
          className={`absolute left-1/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#0057b7]/30 to-transparent ${
            isMobile ? 'opacity-30' : 'opacity-100'
          }`}
          initial={{ opacity: 0.3, scaleY: 0.6 }}
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
          className={`absolute left-2/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#3ec6ff]/30 to-transparent ${
            isMobile ? 'opacity-30' : 'opacity-100'
          }`}
          initial={{ opacity: 0.3, scaleY: 0.6 }}
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
          className={`absolute left-3/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#0057b7]/30 to-transparent ${
            isMobile ? 'opacity-30' : 'opacity-100'
          }`}
          initial={{ opacity: 0.3, scaleY: 0.6 }}
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
