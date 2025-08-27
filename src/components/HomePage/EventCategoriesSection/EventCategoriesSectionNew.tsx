import { motion, AnimatePresence } from 'framer-motion';
import { useState,  useEffect } from 'react';
import { Wrench, Trophy, Eye, ArrowRight, Sparkles, Zap } from 'lucide-react';
import type { EventCategoriesSectionProps } from './EventCategoriesSection.types';

const EventCategoriesSection: React.FC<EventCategoriesSectionProps> = ({ className }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const eventCategories = [
    {
      id: 1,
      title: "Workshops",
      description: "Master cutting-edge aerospace technologies through hands-on learning experiences with industry experts and advanced simulation environments.",
      icon: Wrench,
      gradient: "from-cyan-400 via-blue-500 to-blue-600",
      glowColor: "cyan",
      details: {
        duration: "2-3 Days",
        participants: "Limited Seats",
        level: "Beginner to Advanced",
        focus: "Practical Skills"
      }
    },
    {
      id: 2,
      title: "Competitions",
      description: "Compete in legendary aerospace challenges that test your engineering prowess, innovation skills, and teamwork in high-stakes environments.",
      icon: Trophy,
      gradient: "from-purple-500 via-pink-500 to-red-500",
      glowColor: "purple",
      details: {
        duration: "3-5 Days", 
        participants: "Teams of 3-5",
        level: "Intermediate to Expert",
        focus: "Innovation & Performance"
      }
    },
    {
      id: 3,
      title: "Exhibitions", 
      description: "Explore groundbreaking aerospace innovations, cutting-edge technologies, and revolutionary concepts from global industry leaders.",
      icon: Eye,
      gradient: "from-emerald-400 via-teal-500 to-green-600",
      glowColor: "emerald",
      details: {
        duration: "Full Event",
        participants: "Open Access",
        level: "All Levels",
        focus: "Innovation Showcase"
      }
    }
  ];

  if (!isMounted) {
    return (
      <section className={`w-full py-20 relative overflow-hidden ${className}`}>
        <div className="min-h-[600px] bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
      </section>
    );
  }

  return (
    <section className={`w-full py-20 relative overflow-hidden ${className}`}>
      {/* Legendary Futuristic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
        
        {/* Animated geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 border border-cyan-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(62, 198, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(62, 198, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Legendary Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0, -1, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <span className="text-cyan-400 text-lg font-semibold tracking-wider">EVENT CATEGORIES</span>
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Legendary Path
            </span>
          </h2>

          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Embark on an extraordinary aerospace journey through immersive workshops, 
            competitive challenges, and groundbreaking exhibitions that will define the future of flight.
          </motion.p>
        </motion.div>

        {/* Legendary Event Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {eventCategories.map((category, index) => {
            const isHovered = hoveredCard === category.id;
            const isOtherHovered = hoveredCard !== null && hoveredCard !== category.id;
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.id}
                className="relative group"
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isOtherHovered ? 0.9 : isHovered ? 1.05 : 1,
                  z: isHovered ? 50 : 0
                }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                onHoverStart={() => setHoveredCard(category.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Legendary Glow Effect */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(45deg, 
                      ${category.glowColor === 'cyan' ? 'rgba(34, 211, 238, 0.4)' : 
                        category.glowColor === 'purple' ? 'rgba(168, 85, 247, 0.4)' : 
                        'rgba(52, 211, 153, 0.4)'} 0%, 
                      transparent 70%)`
                  }}
                  animate={isHovered ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.8, 0.4]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Main Card Container */}
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-8 overflow-hidden group-hover:border-white/40 transition-all duration-700">
                  
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(45deg, transparent, ${
                        category.glowColor === 'cyan' ? 'rgba(34, 211, 238, 0.3)' : 
                        category.glowColor === 'purple' ? 'rgba(168, 85, 247, 0.3)' : 
                        'rgba(52, 211, 153, 0.3)'
                      }, transparent)`,
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'subtract',
                      padding: '2px'
                    }}
                    animate={isHovered ? {
                      opacity: [0, 1, 0]
                    } : { opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  {/* Floating Corner Accents */}
                  <div className={`absolute top-4 left-4 w-3 h-3 rounded-full bg-${category.glowColor}-400 opacity-60 animate-pulse`} />
                  <div className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-${category.glowColor}-500 opacity-80 animate-pulse`} style={{ animationDelay: '0.5s' }} />

                  {/* Icon Section */}
                  <motion.div
                    className="flex justify-center mb-8"
                    animate={isHovered ? {
                      scale: [1, 1.1, 1],
                      rotateY: [0, 180, 360]
                    } : {
                      scale: 1,
                      rotateY: 0
                    }}
                    transition={{ 
                      duration: isHovered ? 2 : 0.5,
                      repeat: isHovered ? Infinity : 0
                    }}
                  >
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-2xl`}>
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="text-center space-y-6">
                    <motion.h3 
                      className="text-3xl font-bold text-white mb-4"
                      animate={isHovered ? {
                        backgroundImage: [
                          'linear-gradient(45deg, #ffffff, #22d3ee)',
                          'linear-gradient(45deg, #22d3ee, #a855f7)',
                          'linear-gradient(45deg, #a855f7, #34d399)',
                          'linear-gradient(45deg, #34d399, #ffffff)'
                        ]
                      } : {}}
                      style={{
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: isHovered ? 'transparent' : 'white'
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {category.title}
                    </motion.h3>

                    <motion.p 
                      className="text-slate-300 leading-relaxed"
                      animate={{
                        opacity: isOtherHovered ? 0.3 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {category.description}
                    </motion.p>

                    {/* Details Grid - Revealed on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="space-y-4 border-t border-white/20 pt-6 mt-6"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {Object.entries(category.details).map(([key, value]) => (
                              <motion.div
                                key={key}
                                className="space-y-1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <div className="text-slate-400 capitalize font-medium">{key}</div>
                                <div className="text-white font-semibold">{value}</div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Action Button */}
                          <motion.button
                            className={`w-full mt-6 py-4 px-6 rounded-xl bg-gradient-to-r ${category.gradient} text-white font-bold flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Explore {category.title}
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-cyan-400 text-lg font-semibold"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-6 h-6" />
            Ready to become a legend?
            <Zap className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventCategoriesSection;
