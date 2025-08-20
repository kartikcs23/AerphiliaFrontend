import { motion } from 'framer-motion';
import { PARTNERS } from '../../../constants/eventCategories';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Award, TrendingUp } from 'lucide-react';
import type { PartnersSectionProps } from './PartnersSection.types';

const PartnersSection: React.FC<PartnersSectionProps> = ({ className }) => {
  return (
    <section className={`w-full py-24 relative overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-20 left-20 text-cyan-400/20"
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Handshake size={120} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-blue-400/20"
        animate={{ rotate: -360, y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <TrendingUp size={120} />
      </motion.div>

  <div className="w-full px-4 sm:px-6 lg:px-8">
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
            <Award className="text-cyan-400/30" size={60} />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Proud to be supported by industry leaders and innovative companies driving the future of aerospace technology
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:opacity-75 group-hover:blur-2xl transition-all duration-300 opacity-0"></div>
              
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="relative bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-md border border-gray-700 hover:border-cyan-400/40 rounded-2xl p-6 h-40 flex flex-col items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 overflow-hidden">
                  <CardContent className="p-0 flex flex-col items-center justify-center">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.3) 1px, transparent_0)] bg-[length:25px_25px]"></div>
                    </div>

                    {/* Partner Logo Placeholder with animation */}
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-3 relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <span className="text-white font-bold text-lg z-10">
                        {partner.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-white font-medium text-sm text-center mb-1">
                      {partner.name}
                    </h3>
                    
                    <span className="text-cyan-400 text-xs">
                      {partner.type}
                    </span>
                  </CardContent>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 via-transparent to-transparent"
                  />
                </Card>
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
          className="text-center"
        >
          <p className="text-gray-300 mb-8 text-lg">
            Interested in partnering with us?
          </p>
          <motion.a
            href="mailto:partnerships@aerophilia2025.com"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl shadow-blue-500/30 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
            Become a Partner
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;