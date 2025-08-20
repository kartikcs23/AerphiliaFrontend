import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CursorEffectsProps, CursorPosition, TrailPoint } from './CursorEffects.type';

const CursorEffects: React.FC<CursorEffectsProps> = ({
  enabled = true,
  trailLength = 8,
  fadeSpeed = 100
}) => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const trailRef = useRef<TrailPoint[]>([]);

  useEffect(() => {
    if (!enabled) return;

    let animationFrame: number;
    let timeout: NodeJS.Timeout;

    const updateCursor = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setCursorPosition(newPosition);
      setIsMoving(true);

      // Clear existing timeout
      clearTimeout(timeout);
      
      // Set moving to false after 100ms of no movement
      timeout = setTimeout(() => setIsMoving(false), 100);

      // Add new trail point
      const newTrailPoint: TrailPoint = {
        x: newPosition.x,
        y: newPosition.y,
        opacity: 1,
        timestamp: Date.now()
      };

      trailRef.current = [newTrailPoint, ...trailRef.current.slice(0, trailLength - 1)];
      setTrail([...trailRef.current]);
    };

    const updateTrail = () => {
      const now = Date.now();
      trailRef.current = trailRef.current
        .map(point => ({
          ...point,
          opacity: Math.max(0, 1 - (now - point.timestamp) / fadeSpeed)
        }))
        .filter(point => point.opacity > 0.01);
      
      setTrail([...trailRef.current]);
      animationFrame = requestAnimationFrame(updateTrail);
    };

    document.addEventListener('mousemove', updateCursor);
    animationFrame = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [enabled, trailLength, fadeSpeed]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main Cursor */}
      <motion.div
        className="absolute w-6 h-6 rounded-full border-2 border-cyan-400 bg-cyan-400/20 backdrop-blur-sm"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
        }}
        animate={{
          scale: isMoving ? 1.2 : 1,
          borderColor: isMoving ? '#06D6A0' : '#0EA5E9',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor Center Dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-cyan-400"
        style={{
          left: cursorPosition.x - 4,
          top: cursorPosition.y - 4,
        }}
        animate={{
          scale: isMoving ? 1.5 : 1,
          backgroundColor: isMoving ? '#06D6A0' : '#0EA5E9',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Contrail Trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={`${point.timestamp}-${index}`}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
            style={{
              left: point.x - 2,
              top: point.y - 2,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: point.opacity * 0.8,
              scale: 1 - (index * 0.1)
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </AnimatePresence>

      {/* Jet Engine Glow Effect */}
      {isMoving && (
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-sm"
          style={{
            left: cursorPosition.x - 16,
            top: cursorPosition.y - 16,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1.5 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

export default CursorEffects;
