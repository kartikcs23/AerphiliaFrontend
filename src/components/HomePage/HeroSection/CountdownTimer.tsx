/**
 * Countdown Timer Component for Aerophilia 2025
 * Real-time countdown with stunning animations
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatCountdown } from '../../../utils/formatters';
import { APP_MESSAGES } from '../../../constants/appMessages';
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
        <h2 className="text-4xl font-bold text-blue-400 mb-2">
          {APP_MESSAGES.COUNTDOWN.EVENT_STARTED}
        </h2>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <motion.div
              key={unit.value} // Key changes trigger animation
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-b from-blue-900/50 to-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 md:p-6">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="block text-xs md:text-sm text-blue-300 uppercase tracking-wider mt-1">
                  {unit.label}
                </span>
              </div>
              
              {/* Glowing effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent rounded-lg"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
