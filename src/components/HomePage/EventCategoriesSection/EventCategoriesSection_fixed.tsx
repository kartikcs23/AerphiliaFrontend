import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import type { EventCategoriesSectionProps } from './EventCategoriesSection.types';

const eventDetails = [
  // ...event objects here (copy from your original file)...
];

const EventCategoriesSection: React.FC<EventCategoriesSectionProps> = ({ className }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className={`w-full py-32 relative overflow-hidden ${className}`}>
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/5 via-[#0057b7]/10 to-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(62,198,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,111,26,0.1),transparent_50%)]"></div>
        {/* Ultra floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#3ec6ff]/20 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 200, 0], y: [0, -100, 0], scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#0057b7]/15 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, -150, 0], y: [0, 80, 0], scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        {/* Premium Header with Parallax */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 relative"
        >
          {/* Floating premium icons */}
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2"
            animate={{ rotate: 360, y: [0, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <Sparkles size={100} className="text-[#3ec6ff]/30" />
          </motion.div>
          <motion.div
            className="absolute -bottom-20 right-1/2 transform translate-x-1/2"
            animate={{ rotate: -360, y: [0, 20, 0], scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <Zap size={100} className="text-[#0057b7]/30" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Event <span className="bg-gradient-to-r from-[#3ec6ff] via-[#0057b7] to-[#0057b7] bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our legendary events, each designed to inspire innovation and challenge the best minds in aerospace, robotics, and coding.
          </p>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#3ec6ff] to-[#0057b7] rounded-full mx-auto mt-8"
            animate={{ width: [96, 128, 96], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        {/* TODO: Add event cards grid here using eventDetails */}
      </div>
    </section>
  );
};

export default EventCategoriesSection;

