import { motion } from 'framer-motion';
import { KEYNOTE_SPEAKERS } from '../../../constants/eventCategories';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Award, Star } from 'lucide-react';
import type { KeynoteSpeakersSectionProps } from './KeynoteSpeakersSection.types';

const KeynoteSpeakersSection: React.FC<KeynoteSpeakersSectionProps> = ({ className }) => {
  return (
    <section className={`w-full py-24 relative overflow-hidden ${className}`}>
      {/* Ultra Premium Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3ec6ff]/10 via-[#0057b7]/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#0057b7]/10 via-[#1e40af]/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%, rgba(62,198,255,0.1), transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%, rgba(0,87,183,0.08), transparent_50%)]"></div>
      </div>

      {/* Ultra Premium Floating icons with enhanced animations */}
      <motion.div
        className="absolute top-20 right-20 text-[#3ec6ff]/30"
        animate={{ 
          rotate: 360, 
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <Mic size={140} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-20 text-[#0057b7]/30"
        animate={{ 
          rotate: -360, 
          y: [0, -25, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Award size={140} />
      </motion.div>

      {/* Premium background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#3ec6ff]/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
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
              scale: [1, 1.3, 1], 
              rotate: [0, 20, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Star className="text-[#0057b7]/40" size={80} />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(62,198,255,0.5)",
                "0 0 40px rgba(255,111,26,0.3)",
                "0 0 20px rgba(62,198,255,0.5)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Keynote{" "}
            <span className="bg-gradient-to-r from-[#3ec6ff] via-[#0057b7] to-[#1e40af] bg-clip-text text-transparent">
              Speakers
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Learn from industry{" "}
            <span className="text-[#3ec6ff] font-semibold">visionaries</span> and{" "}
            <span className="text-[#3ec6ff] font-semibold">pioneers</span> who are shaping the future of aerospace technology and innovation
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

        {/* Ultra Premium Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KEYNOTE_SPEAKERS.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.08, 
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group relative"
            >
              {/* Ultra Premium Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/20 via-[#0057b7]/10 to-[#0057b7]/15 rounded-3xl blur-2xl group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 opacity-0 scale-110"></div>
              
              <Card className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-[#3ec6ff]/50 rounded-3xl p-8 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#3ec6ff]/20 overflow-hidden">
                <CardContent className="p-0">
                  {/* Premium animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px, rgba(62,198,255,0.4) 1px, transparent_0)] bg-[length:40px_40px]"></div>
                  </div>

                  {/* Ultra Premium Speaker Image with enhanced animation */}
                  <motion.div 
                    className="w-36 h-36 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#3ec6ff] via-[#0057b7] to-[#0057b7] flex items-center justify-center relative overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: ["-150%", "150%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/20 to-[#0057b7]/20 rounded-full"
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity }
                      }}
                    />
                    <span className="text-5xl font-black text-white z-10 drop-shadow-lg">
                      {speaker.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </motion.div>

                  {/* Ultra Premium Speaker Info */}
                  <div className="text-center relative z-10">
                    <motion.h3 
                      className="text-2xl font-black text-white mb-3"
                      whileHover={{
                        color: "#3ec6ff",
                        textShadow: "0 0 20px rgba(62,198,255,0.5)"
                      }}
                    >
                      {speaker.name}
                    </motion.h3>
                    <p className="text-[#0057b7] font-bold mb-4 text-lg">
                      {speaker.title}
                    </p>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                      {speaker.bio}
                    </p>
                    
                    {/* Premium Session Info */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#3ec6ff]/10 via-[#0057b7]/15 to-[#0057b7]/10 rounded-xl p-5 mb-6 border border-[#3ec6ff]/30 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: "rgba(62,198,255,0.6)",
                        boxShadow: "0 0 30px rgba(62,198,255,0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#3ec6ff] font-bold text-sm italic">
                        "{speaker.session}"
                      </p>
                    </motion.div>

                    {/* Ultra Premium Expertise Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-3 justify-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      {speaker.expertise.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-4 py-2 bg-gradient-to-r from-[#0057b7]/30 to-[#3ec6ff]/20 text-white rounded-full text-xs border border-[#3ec6ff]/40 backdrop-blur-sm font-semibold"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(62,198,255,0.3)",
                            borderColor: "rgba(255,111,26,0.6)"
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1 + skillIndex * 0.1 
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Ultra Premium Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#3ec6ff]/10 via-transparent to-[#0057b7]/5 rounded-3xl"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakersSection;

