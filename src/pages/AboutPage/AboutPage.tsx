import { motion } from 'framer-motion';
import { Plane, Calendar, MapPin, Users, Award, Clock } from 'lucide-react';
import type { AboutPageProps } from './AboutPage.types';

const AboutPage: React.FC<AboutPageProps> = ({ className }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`w-full min-h-screen bg-black text-white ${className}`}>
      {/* Hero Section */}
      <section className="w-full h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black"></div>
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="mb-8" {...fadeInUp}>
            <Plane className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          </motion.div>
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            {...fadeInUp}
          >
            Aerophilia 2025
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            {...fadeInUp}
          >
            India's Premier Aviation Excellence Summit
          </motion.p>
        </motion.div>
      </section>

      {/* Event Details Section */}
      <section className="w-full py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
            >
              Event <span className="text-blue-400">Overview</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-400 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Join us for an extraordinary journey through the world of aviation, where innovation meets excellence.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Calendar, title: "Event Date", desc: "March 15-17, 2025", color: "blue" },
              { icon: MapPin, title: "Location", desc: "Sahyadri College of Engineering", color: "cyan" },
              { icon: Users, title: "Expected Participants", desc: "2000+ Aviation Enthusiasts", color: "green" },
              { icon: Award, title: "Competitions", desc: "15+ Technical Events", color: "purple" },
              { icon: Clock, title: "Duration", desc: "3 Days of Excellence", color: "pink" },
              { icon: Plane, title: "Theme", desc: "Future of Aviation", color: "orange" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-700/50 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className={`w-12 h-12 text-${item.color}-400 mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold mb-6 text-blue-400">Our Vision</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                To create India's most comprehensive aviation platform that bridges the gap between academic excellence and industry innovation, fostering the next generation of aviation professionals.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Promote aviation awareness among students</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Connect industry experts with future talent</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Showcase cutting-edge aviation technology</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold mb-6 text-cyan-400">Our Mission</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                To organize world-class aviation events that inspire innovation, encourage technical excellence, and create lasting connections within the aviation community.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Deliver exceptional educational experiences</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Foster innovation and creativity</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Build a sustainable aviation ecosystem</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { number: "2000+", label: "Participants" },
              { number: "15+", label: "Events" },
              { number: "50+", label: "Speakers" },
              { number: "3", label: "Days" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
