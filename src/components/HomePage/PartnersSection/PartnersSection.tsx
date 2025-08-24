import { motion } from 'framer-motion';
import { PARTNERS } from '../../../constants/eventCategories';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Award, TrendingUp } from 'lucide-react';
import type { PartnersSectionProps } from './PartnersSection.types';

const PartnersSection: React.FC<PartnersSectionProps> = ({ className }) => {
  return (
    <section className={`w-full py-24 relative overflow-hidden ${className}`}>
      {/* Ultra Premium Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3ec6ff]/8 via-[#0057b7]/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#0057b7]/8 via-[#0057b7]/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%, rgba(62,198,255,0.08), transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%, rgba(255,111,26,0.06), transparent_50%)]"></div>
      </div>

      {/* Ultra Premium Floating icons with enhanced animations */}
      <motion.div
        className="absolute top-20 left-20 text-[#3ec6ff]/30"
        animate={{ 
          rotate: 360, 
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Handshake size={140} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-[#0057b7]/30"
        animate={{ 
          rotate: -360, 
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <TrendingUp size={140} />
      </motion.div>

      {/* Premium background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-[#0057b7]/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

  <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Ultra Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 relative"
        >
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
            animate={{ 
              scale: [1, 1.4, 1], 
              rotate: [0, 15, -15, 0],
              opacity: [0.3, 0.9, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Award className="text-[#0057b7]/40" size={80} />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(62,198,255,0.4)",
                "0 0 40px rgba(255,111,26,0.3)",
                "0 0 20px rgba(62,198,255,0.4)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#3ec6ff] via-[#0057b7] to-[#0057b7] bg-clip-text text-transparent">
              Partners
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Proud to be supported by{" "}
            <span className="text-[#3ec6ff] font-semibold">industry leaders</span> and{" "}
            <span className="text-[#0057b7] font-semibold">innovative companies</span> driving the future of aerospace technology
          </motion.p>
          
          {/* Premium decorative line */}
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-[#3ec6ff] via-[#0057b7] to-[#0057b7] rounded-full mx-auto mt-8"
            animate={{
              width: [128, 200, 128],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Ultra Premium Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.12, 
                y: -8,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group relative"
            >
              {/* Ultra Premium Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/25 via-[#0057b7]/15 to-[#0057b7]/20 rounded-3xl blur-2xl group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 opacity-0 scale-110"></div>
              
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-[#3ec6ff]/50 rounded-3xl p-8 h-48 flex flex-col items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#3ec6ff]/25 overflow-hidden">
                  <CardContent className="p-0 flex flex-col items-center justify-center">
                    {/* Premium animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px, rgba(62,198,255,0.4) 1px, transparent_0)] bg-[length:35px_35px]"></div>
                    </div>

                    {/* Ultra Premium Partner Logo with enhanced animation */}
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-[#3ec6ff] via-[#0057b7] to-[#0057b7] rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden shadow-2xl"
                      whileHover={{ scale: 1.2, rotate: 8 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                        animate={{ x: ["-150%", "150%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/20 to-[#0057b7]/20 rounded-2xl"
                        animate={{
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                          scale: { duration: 4, repeat: Infinity }
                        }}
                      />
                      <span className="text-white font-black text-xl z-10 drop-shadow-lg">
                        {partner.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-white font-bold text-base text-center mb-2"
                      whileHover={{
                        color: "#3ec6ff",
                        textShadow: "0 0 15px rgba(62,198,255,0.5)"
                      }}
                    >
                      {partner.name}
                    </motion.h3>
                    
                    <motion.span 
                      className="text-[#0057b7] text-sm font-semibold px-3 py-1 bg-[#0057b7]/10 rounded-full border border-[#0057b7]/30"
                      whileHover={{
                        backgroundColor: "rgba(255,111,26,0.2)",
                        borderColor: "rgba(62,198,255,0.5)"
                      }}
                    >
                      {partner.type}
                    </motion.span>
                  </CardContent>

                  {/* Ultra Premium Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#3ec6ff]/15 via-transparent to-[#0057b7]/10 rounded-3xl"
                  />
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Ultra Premium Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-black text-white mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(62,198,255,0.3)",
                "0 0 30px rgba(255,111,26,0.2)",
                "0 0 20px rgba(62,198,255,0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Join Our{" "}
            <span className="text-[#3ec6ff]">Partnership</span>{" "}
            <span className="text-[#0057b7]">Network</span>
          </motion.h3>
          
          <p className="text-gray-300 mb-10 text-xl max-w-2xl mx-auto">
            Interested in partnering with us? Let's create something extraordinary together.
          </p>
          
          <motion.a
            href="mailto:partnerships@aerophilia2025.com"
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-[#3ec6ff] via-[#0057b7] to-[#0057b7] hover:from-[#0057b7] hover:via-[#3ec6ff] hover:to-[#0057b7] text-white font-black text-lg rounded-2xl transition-all duration-500 hover:scale-110 shadow-2xl shadow-[#3ec6ff]/40 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 25px 50px rgba(62,198,255,0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Ultra Premium Button shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0057b7]/20 to-[#3ec6ff]/20 rounded-2xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            />
            
            <span className="relative z-10 drop-shadow-lg">Become a Partner</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;

