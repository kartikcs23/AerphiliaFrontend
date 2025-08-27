"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane } from "lucide-react";

type TimelineEvent = {
  year: string;
  text: string;
  description: string;
};

const events: TimelineEvent[] = [
  { year: "1971", text: "The Beginning", description: "Mood Indigo executed with a budget of INR 5000" },
  { year: "1981", text: "Musical Legends", description: "Performance by Asha Bhosale and R D Burman, stalwarts of music during the 80s" },
  { year: "2008", text: "International Debut", description: "First International Nite: Ensiferum Concert" },
  { year: "2009", text: "Progressive Rock", description: "Porcupine Tree performed in India for the first time at Mood Indigo" },
  { year: "2010", text: "Cultural Innovation", description: "India's first ever sumo-wrestling match held at Mood Indigo" },
  { year: "2011", text: "World Record", description: "Limca book of world records for most number of International Artists in any college fest" },
  { year: "2012", text: "Pop Rock Era", description: "Simple Plan Concert" },
  { year: "2014", text: "Electronic Dance", description: "Sander Van Doorn Concert, EDM Nite" },
  { year: "2016", text: "Government Recognition", description: "Transform Maharashtra launched by Hon. CM Devendra Fadnavis" },
  { year: "2019", text: "Magic Moments", description: "MAGIC! performed for the first time in India" },
];

// Enhanced utility for ultra-responsive zigzag points with smart positioning
function useZigzagPoints(eventCount: number, width: number, height: number, edgeMargin: number, eventPadding: number) {
  const points = [];
  const steps = eventCount + 1; // add extra pt at start and one at end
  const yGap = height / (steps - 1);
  let side = true;
  
  // Ultra-responsive calculations with device detection
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  // Device-specific adaptive margins with generous safe zones
  const adaptiveEdgeMargin = isMobile ? Math.max(edgeMargin, 30) : 
                            isTablet ? Math.max(edgeMargin, 50) : 
                            Math.max(edgeMargin, 70);
  
  // Ultra-responsive event card width consideration
  const cardWidth = isMobile ? 260 : isTablet ? 320 : 380;
  const safeZone = (cardWidth / 2) + adaptiveEdgeMargin + 20; // Extra 20px buffer
  
  // Ensure we never go beyond screen boundaries
  const minX = safeZone;
  const maxX = width - safeZone;
  
  for (let i = 0; i < steps; i++) {
    let x;
    if (i === 0 || i === steps - 1) {
      // Start and end points at center
      x = width / 2;
    } else {
      // Calculate zigzag with ultra-safe boundaries
      if (side) {
        x = Math.max(minX, adaptiveEdgeMargin + eventPadding);
      } else {
        x = Math.min(maxX, width - (adaptiveEdgeMargin + eventPadding));
      }
      side = !side;
    }
    
    // Final safety check to ensure x is within bounds
    x = Math.max(minX, Math.min(maxX, x));
    
    points.push({ x, y: i * yGap });
  }
  return points;
}

export default function TravellingAir() {
  // Ultra-responsive container size with proper initialization
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 1600 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
    function handleResize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Ensure minimum dimensions with device-specific minimums
        const minWidth = window.innerWidth < 768 ? 320 : window.innerWidth < 1024 ? 768 : 1024;
        const minHeight = window.innerWidth < 768 ? 1200 : window.innerWidth < 1024 ? 1400 : 1600;
        
        setContainerSize({
          width: Math.max(rect.width, minWidth),
          height: Math.max(rect.height, minHeight),
        });
      }
    }
    
    // Initial size calculation
    handleResize();
    
    // Ultra-smooth debounced resize handler for performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150); // Slightly longer for stability
    };
    
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Ultra-responsive breakpoint detection
  const isMobile = containerSize.width < 768;
  const isTablet = containerSize.width >= 768 && containerSize.width < 1024;
  
  // Device-specific adaptive values with generous margins
  const edgeMargin = isMobile ? 30 : isTablet ? 50 : 70;
  const eventPadding = isMobile ? 50 : isTablet ? 70 : 90;
  const minHeight = isMobile ? 1200 : isTablet ? 1400 : 1800;

  // Only use scroll hook when mounted to prevent hydration errors
  const { scrollYProgress } = useScroll(
    isMounted
      ? {
          target: containerRef,
          offset: ["start end", "end start"]
        }
      : undefined
  );

  // Calculate smooth points with enhanced responsiveness
  const zigzagPoints = useZigzagPoints(
    events.length,
    containerSize.width,
    Math.max(containerSize.height, minHeight),
    edgeMargin,
    eventPadding,
  );

  // Enhanced SVG path with ultra-smooth curves and device optimization
  function getSVGPath(points: { x: number; y: number }[]) {
    if (points.length < 2) return "";
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      // Device-specific curve intensity for optimal viewing
      const curveIntensity = isMobile ? 0.15 : isTablet ? 0.25 : 0.35;
      const cpx = prev.x + (curr.x - prev.x) * curveIntensity;
      d += ` C${cpx},${prev.y} ${curr.x - (curr.x - prev.x) * curveIntensity},${curr.y} ${curr.x},${curr.y}`;
    }
    return d;
  }

  // Interpolate airplane position and angle
  function getPlanePosition(progress: number) {
    // Progress covers range 0 (start empty) to events.length (end empty)
    const total = events.length + 1;
    const p = progress * total;
    const seg = Math.floor(p);
    const segProgress = p - seg;
    if (seg >= total - 1) {
      const last = zigzagPoints[total - 1];
      return { x: last.x, y: last.y, angle: 0 };
    }
    const start = zigzagPoints[seg];
    const end = zigzagPoints[seg + 1];
    const x = start.x + (end.x - start.x) * segProgress;
    const y = start.y + (end.y - start.y) * segProgress;

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return { x, y, angle };
  }

  // Animate plane props
  const airplaneX = useTransform(scrollYProgress, p => `${getPlanePosition(p).x}px`);
  const airplaneY = useTransform(scrollYProgress, p => `${getPlanePosition(p).y}px`);
  const airplaneAngle = useTransform(scrollYProgress, p => getPlanePosition(p).angle);

  // Reveal events after each passes
  const [revealedEvents, setRevealedEvents] = useState<Set<number>>(new Set());
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const newRevealed = new Set<number>();
      // reveal event i after plane passes its pt (segment i+1)
      const t = progress * (events.length + 1);
      events.forEach((_, i) => {
        if (t >= i + 1 - 0.17) newRevealed.add(i);
      });
      setRevealedEvents(newRevealed);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Optimized ultra-responsive particles with reduced counts for performance
  const particleCount = isMobile ? 2 : isTablet ? 4 : 6; // Reduced from 4/8/12
  const particles = Array.from({ length: particleCount }, () => ({
    left: Math.random() * 85 + 7.5, // Keep within safe bounds (7.5% - 92.5%)
    delay: Math.random() * 6,
    size: Math.random() * (isMobile ? 4 : isTablet ? 6 : 8) + (isMobile ? 3 : isTablet ? 4 : 6),
    opacity: Math.random() * 0.2 + 0.1,
  }));

  // Prevent hydration mismatch with responsive loading state
  if (!isMounted) {
    return (
      <div className={`w-full bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden ${
        typeof window !== 'undefined' && window.innerWidth < 768 ? 'min-h-[1200px]' : 
        typeof window !== 'undefined' && window.innerWidth < 1024 ? 'min-h-[1400px]' : 
        'min-h-[1800px]'
      }`} />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden ${
        isMobile ? 'min-h-[1200px]' : isTablet ? 'min-h-[1400px]' : 'min-h-[1800px]'
      } relative`}
    >
      {/* Ultra-Responsive Header */}
      <div className={`sticky top-0 z-50 text-center bg-gradient-to-b from-slate-950/95 to-transparent backdrop-blur-lg shadow-lg ${
        isMobile ? 'pt-8 pb-4' : isTablet ? 'pt-10 pb-5' : 'pt-12 pb-6'
      }`}>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`font-bold text-cyan-300 drop-shadow-lg ${
            isMobile ? 'text-lg px-4' : isTablet ? 'text-xl px-6' : 'text-2xl px-8'
          }`}
        >
          Follow the airplane’s journey through time ✈️
        </motion.p>
      </div>

      {/* Enhanced particles with responsive positioning */}
      {particles.map((p, i) => {
        const particleSize = `${p.size}px`;
        return (
          <motion.div
            key={i}
            className="absolute z-0"
            style={{ 
              left: `${p.left}%`, 
              top: `${Math.random() * 100}%`,
              width: particleSize,
              height: particleSize
            }}
            initial={{ y: 0, opacity: p.opacity }}
            animate={{ y: isMobile ? -800 : -1600, opacity: 0 }}
            transition={{ duration: isMobile ? 8 : 10, delay: p.delay, repeat: Infinity }} // Slower animation for performance
          >
            <div className="rounded-full bg-cyan-400 blur-xl w-full h-full" />
          </motion.div>
        );
      })}

      {/* Enhanced Zig-zag SVG Path */}
      <svg
        className="absolute z-10 pointer-events-none top-0 left-0"
        width={containerSize.width}
        height={containerSize.height || minHeight}
        viewBox={`0 0 ${containerSize.width} ${containerSize.height || minHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="zigzagGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          {/* Glow effect filter */}
          <filter id="glow" width="170%" height="170%" x="-35%" y="-35%">
            <feGaussianBlur stdDeviation="10" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={getSVGPath(zigzagPoints)}
          stroke="url(#zigzagGradient)"
          strokeWidth="6" // Reduced from 8
          fill="none"
          filter="url(#glow)"
          strokeDasharray="20 36"
          animate={{ strokeDashoffset: [0, -110] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }} // Slower animation for performance
        />
        {/* Event dots (skip first and last dummy points) */}
        {zigzagPoints.map((pt, idx) =>
          (idx > 0 && idx < zigzagPoints.length - 1) && (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={15}
              fill="url(#zigzagGradient)"
              opacity="0.55"
              filter="url(#glow)"
            />
          )
        )}
      </svg>

      {/* Airplane */}
      <motion.div
        className="absolute z-30"
        style={{
          left: airplaneX,
          top: airplaneY,
          rotate: airplaneAngle,
          x: "-50%",
          y: "-50%",
        }}
      >
        <motion.div
          style={{
            filter: "drop-shadow(0 0 18px #59fff7) drop-shadow(0px 8px 16px #18175777)", // Reduced glow
            background: 'rgba(24,208,255,0.06)', // Reduced opacity
            borderRadius: 50
          }}
          animate={{
            y: [0, -15, 0], rotate: [-3, 6, -3], // Reduced movement and rotation
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} // Slower animation
        >
          <Plane size={56} className="text-cyan-300" /> {/* Smaller size */}
        </motion.div>
      </motion.div>

      {/* Timeline Events (skip first and last dummy points) */}
      {zigzagPoints.map((point, i) => {
        // skip dummy points
        if (i === 0 || i === zigzagPoints.length - 1) return null;
        const eventIdx = i - 1;
        const event = events[eventIdx];
        const isRevealed = revealedEvents.has(eventIdx);
        const isLeft = point.x < containerSize.width / 2;

        return (
          <motion.div
            key={i}
            className="absolute z-40 w-[95vw] max-w-[400px]"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto"
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.2, delay: 0.3 + eventIdx * 0.08 }} // Slightly slower for performance
          >
            <div
              className={`relative rounded-3xl bg-gradient-to-br from-indigo-900/90 to-slate-950/85 
                border border-cyan-300/20 shadow-2xl backdrop-blur-2xl transition-all duration-700
                ${isMobile ? 'p-4' : isTablet ? 'p-5' : 'p-6'}
                ${isLeft ? "text-left" : "text-right"}
                drop-shadow-[0_4px_28px_rgba(63,192,243,0.26)] 
                shadow-[0_4px_28px_rgba(63,192,243,0.26),0_2px_10px_rgba(45,24,107,0.09)]`}
            >
              <h3 className={`text-cyan-300 font-bold drop-shadow-lg tracking-widest mb-2
                ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-2xl'}`}>
                {event.year}
              </h3>
              <p className={`text-white font-semibold mb-2
                ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'}`}>
                {event.text}
              </p>
              <p className={`text-cyan-100 leading-relaxed
                ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base'}`}>
                {event.description}
              </p>
              <span className="pointer-events-none absolute -z-10 inset-0 rounded-2xl bg-cyan-200/10 blur-2xl" />
            </div>
          </motion.div>
        );
      })}

      {/* Scroll Hint */}
      <motion.div
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 text-center"
        animate={{ opacity: [1, 0.3, 1], y: [0, 18, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-cyan-300">
          <div className="text-base md:text-lg mb-1">Scroll to begin the journey</div>
          <div className="text-3xl md:text-4xl">↓</div>
        </div>
      </motion.div>
    </div>
  );
}
