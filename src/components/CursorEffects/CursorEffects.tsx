import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { CursorEffectsProps, CursorPosition, TrailPoint } from './CursorEffects.type';

const CursorEffects: React.FC<CursorEffectsProps> = ({
  enabled = true,
  trailLength = 4, // Reduced from 8 for performance
  fadeSpeed = 200 // Increased for faster fade
}) => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const trailRef = useRef<TrailPoint[]>([]);
  const lastUpdateRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Throttled cursor update for better performance
  const throttledUpdateCursor = useCallback((e: MouseEvent) => {
    const now = Date.now();
    // Throttle to 60fps maximum
    if (now - lastUpdateRef.current < 16) return;
    
    lastUpdateRef.current = now;
    const newPosition = { x: e.clientX, y: e.clientY };
    setCursorPosition(newPosition);
    setIsMoving(true);

    // Clear existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Set moving to false after 150ms of no movement
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) setIsMoving(false);
    }, 150);

    // Simplified trail update - only add every 3rd point for performance
    if (trailRef.current.length === 0 || 
        Math.abs(newPosition.x - trailRef.current[0]?.x) > 8 || 
        Math.abs(newPosition.y - trailRef.current[0]?.y) > 8) {
      
      const newTrailPoint: TrailPoint = {
        x: newPosition.x,
        y: newPosition.y,
        opacity: 1,
        timestamp: now
      };

      trailRef.current = [newTrailPoint, ...trailRef.current.slice(0, trailLength - 1)];
      setTrail([...trailRef.current]);
    }
  }, [trailLength]);

  useEffect(() => {
    if (!enabled) return;

    let animationFrame: number;

    // Optimized trail update - runs at 30fps instead of 60fps
    const updateTrail = () => {
      const now = Date.now();
      let hasChanges = false;
      
      const updatedTrail = trailRef.current
        .map(point => {
          const newOpacity = Math.max(0, 1 - (now - point.timestamp) / fadeSpeed);
          if (newOpacity !== point.opacity) hasChanges = true;
          return { ...point, opacity: newOpacity };
        })
        .filter(point => point.opacity > 0.05); // Higher threshold for better performance
      
      if (hasChanges || updatedTrail.length !== trailRef.current.length) {
        trailRef.current = updatedTrail;
        setTrail([...trailRef.current]);
      }
      
      // Run at 30fps for better performance
      setTimeout(() => {
        animationFrame = requestAnimationFrame(updateTrail);
      }, 33);
    };

    document.addEventListener('mousemove', throttledUpdateCursor, { passive: true });
    animationFrame = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', throttledUpdateCursor);
      cancelAnimationFrame(animationFrame);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, trailLength, fadeSpeed, throttledUpdateCursor]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Optimized Main Cursor - reduced complexity */}
      <motion.div
        className="absolute w-5 h-5 rounded-full border border-cyan-400/80 bg-cyan-400/10" // Simplified styling
        style={{
          left: cursorPosition.x - 10,
          top: cursorPosition.y - 10,
          transform: `scale(${isMoving ? 1.1 : 1})`, // Direct transform for better performance
        }}
        transition={{ duration: 0.1 }} // Faster transition
      />

      {/* Optimized Center Dot - static styling */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-cyan-400 transition-opacity duration-100"
        style={{
          left: cursorPosition.x - 2,
          top: cursorPosition.y - 2,
        }}
        animate={{
          opacity: isMoving ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Optimized Trail - reduced elements and complexity */}
      {trail.map((point, index) => (
        <motion.div
          key={`${point.timestamp}-${index}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/60 transition-opacity duration-150"
          style={{
            left: point.x - 2,
            top: point.y - 2,
          }}
          animate={{
            opacity: point.opacity * 0.6 * (1 - index * 0.2),
            scale: 1 - index * 0.15,
          }}
          transition={{ duration: 0.15 }}
        />
      ))}

      {/* Simplified Glow Effect - only when moving */}
      {isMoving && (
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-cyan-400/20 blur-sm transition-opacity duration-200"
          style={{
            left: cursorPosition.x - 12,
            top: cursorPosition.y - 12,
          }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
};

export default CursorEffects;
