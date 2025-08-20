/**
 * Event Categories Section for Aerophilia 2025
 * Showcase different event categories with animations
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EVENT_CATEGORIES } from '../../../constants/eventCategories';
import type { EventCategoriesSectionProps } from './EventCategoriesSection.types';

const EventCategoriesSection: React.FC<EventCategoriesSectionProps> = ({ className }) => {
  return (
    <section className={`py-20 bg-gradient-to-b from-black to-slate-950 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore diverse categories designed to challenge and inspire innovation across multiple domains
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENT_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Link to={`/events?category=${category.id}`}>
                <div className={`relative h-64 bg-gradient-to-br ${category.color} rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="text-6xl mb-4"
                    >
                      {category.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategoriesSection;
