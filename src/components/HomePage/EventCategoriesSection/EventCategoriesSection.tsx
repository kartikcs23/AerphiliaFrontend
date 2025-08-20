import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EVENT_CATEGORIES } from '../../../constants/eventCategories';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap, Target } from 'lucide-react';
import type { EventCategoriesSectionProps } from './EventCategoriesSection.types';

const EventCategoriesSection: React.FC<EventCategoriesSectionProps> = ({ className }) => {
  return (
    <section className={`w-full py-24 relative overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent"></div>
      </div>

  <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        {/* Floating icons */}
        <motion.div
          className="absolute -top-10 -left-10 text-blue-400/20"
          animate={{ rotate: 360, y: [0, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={120} />
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -right-10 text-purple-400/20"
          animate={{ rotate: -360, y: [0, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Zap size={120} />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 relative"
        >
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Target className="text-blue-400/30" size={60} />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Event <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore diverse categories designed to challenge and inspire innovation across multiple domains of aerospace technology
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {EVENT_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:opacity-75 group-hover:blur-2xl transition-all duration-300 opacity-0"></div>
              
              <Link to={`/events?category=${category.id}`}>
                <Card className={`relative h-80 bg-gradient-to-br ${category.color} rounded-2xl overflow-hidden border border-blue-500/20 hover:border-cyan-400/40 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20`}>
                  <CardContent className="p-0 h-full">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.3) 1px, transparent_0)] bg-[length:20px_20px]"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-center items-center p-8 text-center">
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.7 }}
                        className="text-6xl mb-6 text-white/90"
                      >
                        {category.icon}
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-200 text-sm leading-relaxed mb-6">
                        {category.description}
                      </p>
                      
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "40%" }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                      ></motion.div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent"
                    />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategoriesSection;