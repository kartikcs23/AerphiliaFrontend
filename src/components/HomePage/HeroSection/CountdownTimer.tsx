import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatCountdown } from '../../../utils/formatters';
import { APP_MESSAGES } from '../../../constants/appMessages';
import { Rocket } from 'lucide-react';
import type { CountdownData } from './HeroSection.types';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const [countdown, setCountdown] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(formatCountdown(targetDate));
    };

    // Update immediately
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  if (countdown.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-8 ${className}`}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-4"
        >
          <Rocket className="h-16 w-16 text-blue-400 mx-auto" />
        </motion.div>
        <h2 className="text-4xl font-bold text-blue-400 mb-2">
          {APP_MESSAGES.COUNTDOWN.EVENT_STARTED}
        </h2>
        <p className="text-gray-300">The innovation has taken flight!</p>
      </motion.div>
    );
  }

  const timeUnits = [
    { value: countdown.days, label: APP_MESSAGES.COUNTDOWN.DAYS },
    { value: countdown.hours, label: APP_MESSAGES.COUNTDOWN.HOURS },
    { value: countdown.minutes, label: APP_MESSAGES.COUNTDOWN.MINUTES },
    { value: countdown.seconds, label: APP_MESSAGES.COUNTDOWN.SECONDS },
  ];

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center relative"
          >
            {/* Floating animation container */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
            >
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="bg-gradient-to-b from-blue-900/30 to-black/50 backdrop-blur-md border border-blue-500/30 rounded-xl p-5 md:p-6 relative overflow-hidden">
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                  />
                  
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                  <span className="block text-sm md:text-base text-blue-300 uppercase tracking-wider mt-2 font-medium">
                    {unit.label}
                  </span>
                </div>
                
                {/* Glowing effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Rocket progress indicator */}
      <motion.div 
        className="mt-10 w-full bg-blue-900/30 rounded-full h-2"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full relative"
          initial={{ width: "0%" }}
          animate={{ width: `${(1 - (countdown.days / 100)) * 100}%` }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <motion.div
            className="absolute -right-3 -top-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className="h-6 w-6 text-cyan-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;