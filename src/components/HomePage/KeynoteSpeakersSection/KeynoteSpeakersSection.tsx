import { motion } from 'framer-motion';
import { KEYNOTE_SPEAKERS } from '../../../constants/eventCategories';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Award, Star } from 'lucide-react';
import type { KeynoteSpeakersSectionProps } from './KeynoteSpeakersSection.types';

const KeynoteSpeakersSection: React.FC<KeynoteSpeakersSectionProps> = ({ className }) => {
  return (
    <section className={`w-full py-24 relative overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-500/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-20 right-20 text-purple-400/20"
        animate={{ rotate: 360, y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <Mic size={120} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-20 text-blue-400/20"
        animate={{ rotate: -360, y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Award size={120} />
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
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Star className="text-purple-400/30" size={60} />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Keynote <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">Speakers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn from industry leaders and visionaries who are shaping the future of aerospace technology and innovation
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KEYNOTE_SPEAKERS.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:opacity-75 group-hover:blur-2xl transition-all duration-300 opacity-0"></div>
              
              <Card className="relative bg-gradient-to-b from-blue-900/20 to-purple-900/20 backdrop-blur-md border border-purple-500/20 hover:border-blue-400/40 rounded-2xl p-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20 overflow-hidden">
                <CardContent className="p-0">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.3) 1px, transparent_0)] bg-[length:30px_30px]"></div>
                  </div>

                  {/* Speaker Image Placeholder with animation */}
                  <motion.div 
                    className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <span className="text-4xl font-bold text-white z-10">
                      {speaker.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </motion.div>

                  {/* Speaker Info */}
                  <div className="text-center relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {speaker.name}
                    </h3>
                    <p className="text-blue-400 font-medium mb-3">
                      {speaker.title}
                    </p>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {speaker.bio}
                    </p>
                    
                    {/* Session Info */}
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 mb-4 border border-blue-500/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-blue-300 font-medium text-sm italic">
                        "{speaker.session}"
                      </p>
                    </motion.div>

                    {/* Expertise Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 justify-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {speaker.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-800/50 text-gray-200 rounded-full text-xs border border-gray-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent"
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