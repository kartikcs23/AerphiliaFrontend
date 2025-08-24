import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Target, Calendar, Users, Trophy, MapPin, Plane, Cpu, Rocket, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { useState, useRef } from 'react';
import type { EventCategoriesSectionProps } from './EventCategoriesSection.types';

const EventCategoriesSection: React.FC<EventCategoriesSectionProps> = ({ className }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const eventDetails = [
    {
      id: 1,
      title: "Aeromodelling Championship",
      subtitle: "Where Engineering Meets Artistry",
      description: "Design, build, and fly your own aircraft models",
      fullDescription: "Join the ultimate aeromodelling competition where creativity meets engineering precision. Design and build radio-controlled aircraft that push the boundaries of innovation. Compete in various flight challenges including aerobatic performances, endurance flights, and precision landing contests.",
      extendedDetails: "This championship brings together the world's most talented aeromodelling enthusiasts to showcase their engineering prowess and creative vision. Participants will design custom RC aircraft optimized for specific flight challenges, incorporating advanced materials and cutting-edge control systems.",
      date: "March 15, 2025",
      duration: "3 Days",
      participants: "50+ Teams",
      prize: "₹1,50,000",
      location: "Outdoor Arena Complex",
      icon: <Plane className="w-20 h-20" />,
      gradient: "from-[#3ec6ff] to-[#0057b7]",
      accentColor: "#3ec6ff",
      requirements: ["RC Aircraft Design", "Basic Electronics", "CAD Knowledge", "Flight Control"],
      highlights: ["Live Flight Demo", "Expert Judging Panel", "Industry Mentors", "Media Coverage"],
      sponsors: ["AeroTech Industries", "FlightDynamics Corp", "RC Innovations"],
      schedule: [
        { time: "09:00 AM", event: "Registration & Technical Inspection" },
        { time: "11:00 AM", event: "Flight Challenges Begin" },
        { time: "02:00 PM", event: "Aerobatic Performances" },
        { time: "04:30 PM", event: "Final Results" }
      ]
    },
    {
      id: 2,
      title: "Robotics Competition",
      subtitle: "Building Tomorrow's Machines",
      description: "Create autonomous robots for complex challenges",
      fullDescription: "Push the boundaries of robotics engineering in this intensive competition. Teams design and build autonomous robots capable of navigating complex environments, solving intricate puzzles, and performing precision tasks.",
      extendedDetails: "The robotics competition challenges participants to create intelligent machines that can adapt to dynamic environments. Using advanced sensors, AI algorithms, and mechanical engineering principles, teams will compete in multiple categories including autonomous navigation, object manipulation, and collaborative robotics.",
      date: "March 16, 2025",
      duration: "2 Days",
      participants: "40+ Teams",
      prize: "₹2,00,000",
      location: "Indoor Tech Arena",
      icon: <Cpu className="w-20 h-20" />,
      gradient: "from-[#0057b7] to-[#3ec6ff]",
      accentColor: "#0057b7",
      requirements: ["Programming Skills", "Electronics Knowledge", "Mechanical Design", "AI/ML Basics"],
      highlights: ["Real-time Challenges", "Industry Workshops", "Tech Expo", "Networking Session"],
      sponsors: ["RoboTech Solutions", "AI Dynamics", "Future Robotics Inc"],
      schedule: [
        { time: "08:30 AM", event: "Setup & Calibration" },
        { time: "10:00 AM", event: "Autonomous Navigation" },
        { time: "01:00 PM", event: "Object Manipulation" },
        { time: "03:30 PM", event: "Final Challenge" }
      ]
    },
    {
      id: 3,
      title: "Innovation Showcase",
      subtitle: "Revolutionary Ideas Take Flight",
      description: "Present groundbreaking aerospace innovations",
      fullDescription: "Showcase revolutionary aerospace technologies and innovative solutions that could transform the industry. This platform celebrates breakthrough ideas, cutting-edge research, and visionary concepts that push the boundaries of what's possible in aerospace engineering.",
      extendedDetails: "The Innovation Showcase is where tomorrow's aerospace breakthroughs are unveiled today. Participants present original research, prototype demonstrations, and revolutionary concepts that address real-world aerospace challenges. From sustainable aviation fuels to next-generation propulsion systems, witness innovations that will shape the future of flight.",
      date: "March 17, 2025",
      duration: "1 Day",
      participants: "30+ Innovation Teams",
      prize: "₹2,00,000",
      location: "Innovation Hub Center",
      icon: <Rocket className="w-20 h-20" />,
      gradient: "from-[#0057b7] to-[#ff6f1a]",
      accentColor: "#0057b7",
      requirements: ["Working Prototype", "Research Documentation", "Technical Presentation", "Demo Setup"],
      highlights: ["Industry Expert Panel", "Investment Opportunities", "Patent Support", "Media Spotlight"],
      sponsors: ["AeroInnovate", "TechVentures", "Future Flight Foundation"],
      schedule: [
        { time: "09:00 AM", event: "Innovation Presentations" },
        { time: "11:30 AM", event: "Prototype Demonstrations" },
        { time: "02:00 PM", event: "Industry Panel Discussion" },
        { time: "04:00 PM", event: "Awards & Networking" }
      ]
    }
  ];

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
          animate={{
            x: [0, 200, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#ff6f1a]/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 80, 0],
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
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
            animate={{ 
              rotate: 360,
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Sparkles size={100} className="text-[#3ec6ff]/30" />
          </motion.div>
          <motion.div
            className="absolute -bottom-20 right-1/2 transform translate-x-1/2"
            animate={{ 
              rotate: -360,
              y: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Zap size={100} className="text-[#ff6f1a]/30" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Event <span className="bg-gradient-to-r from-[#3ec6ff] via-[#0057b7] to-[#ff6f1a] bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our legendary events, each designed to inspire innovation and challenge the best minds in aerospace, robotics, and coding.
          </p>
          
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#3ec6ff] to-[#ff6f1a] rounded-full mx-auto mt-8"
            animate={{
              width: [96, 128, 96],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Ultra Premium Event Cards Grid with Full-Width Hover */}
        <motion.div
          style={{ y: cardsY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {eventDetails.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative cursor-pointer"
            >
              {/* Normal Card View */}
              <motion.div
                className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-[500px] overflow-hidden shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{
                  background: `linear-gradient(135deg, ${event.gradient.replace('from-', '').replace('to-', ', ')})`,
                  backgroundOpacity: 0.1
                }}
              >
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3ec6ff]/10 via-transparent to-[#ff6f1a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.8) 1px, transparent_0)] bg-[length:50px_50px]"></div>
                </div>

                {/* Event Icon */}
                <motion.div 
                  className="flex justify-center mb-6"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${event.gradient.replace('from-', '').replace('to-', ', ')})`,
                      color: 'white'
                    }}
                  >
                    {event.icon}
                  </div>
                </motion.div>

                {/* Event Content */}
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-black text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[#ff6f1a] font-semibold mb-4 text-lg">
                    {event.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                      <Calendar className="w-5 h-5 text-[#3ec6ff] mx-auto mb-1" />
                      <p className="text-xs text-gray-300">{event.date}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                      <Trophy className="w-5 h-5 text-[#ff6f1a] mx-auto mb-1" />
                      <p className="text-xs text-gray-300">{event.prize}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                      <Users className="w-5 h-5 text-[#3ec6ff] mx-auto mb-1" />
                      <p className="text-xs text-gray-300">{event.participants}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                      <MapPin className="w-5 h-5 text-[#ff6f1a] mx-auto mb-1" />
                      <p className="text-xs text-gray-300">{event.location}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/events/${event.id}`}>
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-[#3ec6ff] to-[#ff6f1a] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#ff6f1a] to-[#3ec6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </Link>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                />
              </motion.div>

              {/* Full-Width Expanded Details */}
              <AnimatePresence>
                {hoveredCard === event.id && (
                  <motion.div
                    initial={{ opacity: 0, x: '100%', width: 0 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      width: '100vw',
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: '100%', 
                      width: 0,
                      transition: { duration: 0.4, ease: "easeIn" }
                    }}
                    className="fixed inset-0 z-50 bg-gradient-to-br from-black/95 via-[#0057b7]/20 to-black/95 backdrop-blur-2xl flex items-center justify-center p-8"
                    onClick={() => setHoveredCard(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { delay: 0.2, duration: 0.4 }
                      }}
                      className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Left Column - Event Details */}
                      <div>
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ 
                            y: 0, 
                            opacity: 1,
                            transition: { delay: 0.3, duration: 0.5 }
                          }}
                        >
                          <div className="flex items-center mb-6">
                            <div 
                              className="w-16 h-16 rounded-xl flex items-center justify-center mr-4"
                              style={{ 
                                background: `linear-gradient(135deg, ${event.gradient.replace('from-', '').replace('to-', ', ')})`,
                                color: 'white'
                              }}
                            >
                              {event.icon}
                            </div>
                            <div>
                              <h2 className="text-4xl font-black text-white">{event.title}</h2>
                              <p className="text-[#ff6f1a] font-semibold text-xl">{event.subtitle}</p>
                            </div>
                          </div>

                          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                            {event.fullDescription}
                          </p>

                          <p className="text-gray-400 mb-8">
                            {event.extendedDetails}
                          </p>

                          {/* Requirements */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-lg mb-3 text-[#3ec6ff]">Requirements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {event.requirements.map((req, i) => (
                                <span key={i} className="text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                  {req}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <h4 className="font-semibold text-lg mb-3 text-[#ff6f1a]">Highlights:</h4>
                            <div className="flex flex-wrap gap-2">
                              {event.highlights.map((highlight, i) => (
                                <span key={i} className="text-sm bg-[#ff6f1a]/20 px-3 py-1 rounded-full border border-[#ff6f1a]/30">
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Right Column - Schedule & Action */}
                      <div>
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ 
                            y: 0, 
                            opacity: 1,
                            transition: { delay: 0.4, duration: 0.5 }
                          }}
                        >
                          {/* Schedule */}
                          <div className="bg-white/5 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                            <h4 className="font-semibold text-xl mb-4 text-white flex items-center">
                              <Calendar className="mr-2" /> Event Schedule
                            </h4>
                            <div className="space-y-3">
                              {event.schedule.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                                  <span className="text-[#3ec6ff] font-medium">{item.time}</span>
                                  <span className="text-gray-300">{item.event}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Sponsors */}
                          <div className="mb-8">
                            <h4 className="font-semibold text-lg mb-3 text-white">Sponsors:</h4>
                            <div className="space-y-2">
                              {event.sponsors.map((sponsor, i) => (
                                <div key={i} className="text-gray-300 flex items-center">
                                  <Star className="w-4 h-4 text-[#ff6f1a] mr-2" fill="currentColor" />
                                  {sponsor}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <Link to={`/events/${event.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full py-4 bg-gradient-to-r from-[#ff6f1a] to-[#3ec6ff] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                            >
                              Register Now
                            </motion.button>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EventCategoriesSection;
