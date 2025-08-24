"use client";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

interface ZigZagAirplaneProps {
  speed?: "slow" | "medium" | "fast";
  size?: "small" | "medium" | "large";
  trail?: boolean;
  className?: string;
}

const ZigZagAirplane: React.FC<ZigZagAirplaneProps> = ({
  speed = "medium",
  size = "medium",
  trail = true,
  className = "",
}) => {
  // Speed configurations
  const speedConfig = {
    slow: 20,
    medium: 15,
    fast: 10,
  };

  // Size configurations
  const sizeConfig = {
    small: 24,
    medium: 32,
    large: 48,
  };

  const duration = speedConfig[speed];
  const iconSize = sizeConfig[size];

  // Define zig-zag path animation
  const zigzagAnimation = {
    x: [
      "10%", "80%", "20%", "90%", "15%", "85%", "25%", "75%", "10%"
    ],
    y: [
      "5%", "20%", "35%", "50%", "65%", "80%", "95%", "110%", "125%"
    ],
    rotate: [
      15, -15, 15, -15, 15, -15, 15, -15, 15
    ],
  };

  const zigzagTransition = {
    duration,
    ease: [0.4, 0, 0.2, 1] as const,
    repeat: Infinity,
    repeatDelay: 1,
  };

  // Trail animation with slight delay
  const trailAnimation = {
    ...zigzagAnimation,
    opacity: [0.3, 0.2, 0.3, 0.2, 0.3, 0.2, 0.3, 0.2, 0.3],
  };

  const trailTransition = {
    ...zigzagTransition,
    delay: 0.1,
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-white" />
      
      {/* Motion trail effects */}
      {trail && (
        <>
          {/* Trail 1 - Most faded */}
          <motion.div
            className="absolute z-10"
            animate={trailAnimation}
            transition={{ ...trailTransition, delay: 0.2 }}
            style={{
              filter: "blur(1px)",
            }}
          >
            <Plane 
              size={iconSize * 0.8} 
              className="text-blue-300/30 drop-shadow-lg" 
            />
          </motion.div>
          
          {/* Trail 2 - Medium fade */}
          <motion.div
            className="absolute z-20"
            animate={trailAnimation}
            transition={{ ...trailTransition, delay: 0.1 }}
            style={{
              filter: "blur(0.5px)",
            }}
          >
            <Plane 
              size={iconSize * 0.9} 
              className="text-blue-400/50 drop-shadow-lg" 
            />
          </motion.div>
        </>
      )}

      {/* Main airplane */}
      <motion.div
        className="absolute z-30"
        animate={zigzagAnimation}
        transition={zigzagTransition}
      >
        <motion.div
          animate={{
            y: [0, -2, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1] as const,
          }}
        >
          <Plane 
            size={iconSize} 
            className="text-blue-600 drop-shadow-xl filter brightness-110" 
          />
        </motion.div>
      </motion.div>

      {/* Futuristic glow effects */}
      <motion.div
        className="absolute z-20"
        animate={zigzagAnimation}
        transition={zigzagTransition}
      >
        <div 
          className={`w-16 h-16 bg-blue-400/20 rounded-full blur-xl -ml-2 -mt-2`}
        />
      </motion.div>

      {/* Additional atmospheric particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            animate={{
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              y: [
                `${Math.random() * 100}%`,
                `${(Math.random() * 100) + 20}%`,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: duration * 0.8,
              repeat: Infinity,
              delay: i * 2,
              ease: [0.4, 0, 0.2, 1] as const,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ZigZagAirplane;
