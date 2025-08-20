/**
 * Partners Section for Aerophilia 2025
 * Showcase sponsors and partners
 */

import { motion } from 'framer-motion';
import { PARTNERS } from '../../../constants/eventCategories';
import type { PartnersSectionProps } from './PartnersSection.types';

const PartnersSection: React.FC<PartnersSectionProps> = ({ className }) => {
  return (
    <section className={`py-20 bg-black ${className}`}>
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
            Our <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Proud to be supported by industry leaders and innovative companies
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group"
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700 hover:border-blue-400/40 rounded-xl p-6 h-32 flex flex-col items-center justify-center transition-all duration-300">
                  {/* Partner Logo Placeholder */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-white font-bold text-lg">
                      {partner.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-medium text-sm text-center">
                    {partner.name}
                  </h3>
                  
                  <span className="text-blue-400 text-xs">
                    {partner.type}
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Interested in partnering with us?
          </p>
          <a
            href="mailto:partnerships@aerophilia2025.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-105"
          >
            Become a Partner
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
