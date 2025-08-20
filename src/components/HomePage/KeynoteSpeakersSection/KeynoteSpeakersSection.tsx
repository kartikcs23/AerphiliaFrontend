/**
 * Keynote Speakers Section for Aerophilia 2025
 * Showcase industry experts and thought leaders
 */

import { motion } from 'framer-motion';
import { KEYNOTE_SPEAKERS } from '../../../constants/eventCategories';
import type { KeynoteSpeakersSectionProps } from './KeynoteSpeakersSection.types';

const KeynoteSpeakersSection: React.FC<KeynoteSpeakersSectionProps> = ({ className }) => {
  return (
    <section className={`py-20 bg-gradient-to-b from-slate-950 to-black ${className}`}>
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
            Keynote <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Speakers</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Learn from industry leaders and visionaries who are shaping the future of technology
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KEYNOTE_SPEAKERS.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="bg-gradient-to-b from-blue-900/20 to-black/20 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 rounded-xl p-6 transition-all duration-300">
                {/* Speaker Image Placeholder */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {speaker.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Speaker Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {speaker.name}
                  </h3>
                  <p className="text-blue-400 font-medium mb-3">
                    {speaker.title}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {speaker.bio}
                  </p>
                  
                  {/* Session Info */}
                  <div className="bg-blue-500/10 rounded-lg p-3 mb-4">
                    <p className="text-blue-300 font-medium text-sm">
                      "{speaker.session}"
                    </p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {speaker.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakersSection;
