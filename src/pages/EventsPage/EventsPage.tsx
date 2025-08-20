/**
 * Events Page for Aerophilia 2025
 * Display all events with filtering and search
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, MapPin, Users, Trophy, Rocket, Plane, Cog, Brain, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import type { EventsPageProps } from './EventsPage.types';

const EventsPage: React.FC<EventsPageProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const eventCategories = [
    { id: 'all', name: 'All Events', icon: Trophy },
    { id: 'technical', name: 'Technical', icon: Cog },
    { id: 'design', name: 'Design', icon: Brain },
    { id: 'innovation', name: 'Innovation', icon: Rocket },
    { id: 'competition', name: 'Competition', icon: Target }
  ];

  const events = [
    {
      id: 1,
      title: "Aeromodelling Championship",
      category: "technical",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Ground",
      participants: "4 per team",
      prize: "₹50,000",
      description: "Design and build radio-controlled aircraft that showcase innovation in aerodynamics and flight performance.",
      icon: Plane,
      color: "blue"
    },
    {
      id: 2,
      title: "Drone Racing Circuit",
      category: "competition",
      date: "March 16, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Stadium",
      participants: "Individual",
      prize: "₹30,000",
      description: "High-speed drone racing through challenging obstacle courses testing pilot skills and drone agility.",
      icon: Rocket,
      color: "red"
    },
    {
      id: 3,
      title: "Aircraft Design Challenge",
      category: "design",
      date: "March 17, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Design Lab",
      participants: "3 per team",
      prize: "₹40,000",
      description: "Create innovative aircraft designs using CAD software and present your revolutionary aviation concepts.",
      icon: Brain,
      color: "green"
    },
    {
      id: 4,
      title: "Flight Simulation Challenge",
      category: "technical",
      date: "March 15, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Simulation Center",
      participants: "Individual",
      prize: "₹25,000",
      description: "Master complex flight scenarios in advanced simulators testing navigation and emergency response skills.",
      icon: Target,
      color: "purple"
    },
    {
      id: 5,
      title: "Aviation Innovation Pitch",
      category: "innovation",
      date: "March 16, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Auditorium",
      participants: "5 per team",
      prize: "₹60,000",
      description: "Present groundbreaking aviation solutions to industry experts and investors for future implementation.",
      icon: Cog,
      color: "orange"
    },
    {
      id: 6,
      title: "Paper Plane Olympics",
      category: "competition",
      date: "March 17, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Hall A",
      participants: "Individual",
      prize: "₹15,000",
      description: "Classic paper airplane contest with distance, accuracy, and design creativity categories.",
      icon: Plane,
      color: "cyan"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`w-full min-h-screen bg-black text-white ${className}`}>
      {/* Hero Section */}
      <section className="w-full h-96 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-900/30 to-black">
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            {...fadeInUp}
          >
            Events 2025
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            {...fadeInUp}
          >
            Discover exciting aviation competitions and technical challenges
          </motion.p>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="w-full py-12 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="flex flex-col lg:flex-row gap-6 items-center justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {eventCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="w-full py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredEvents.map((event) => (
              <motion.div 
                key={event.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:bg-gray-700/50 transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <event.icon className={`w-8 h-8 text-${event.color}-400`} />
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-${event.color}-500/20 text-${event.color}-400 uppercase tracking-wider`}>
                      {event.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-green-400" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-red-400" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4 text-purple-400" />
                      {event.participants}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-400">
                      Prize: {event.prize}
                    </div>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      size="sm"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Filter className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Events Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take Flight?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of aviation enthusiasts in the ultimate technical challenge
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg">
              Register for All Events
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
