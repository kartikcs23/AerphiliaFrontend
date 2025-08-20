import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, MessageCircle, UserPlus, Star, MapPin, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import type { TeamMakingPageProps } from './TeamMakingPage.types';

const TeamMakingPage: React.FC<TeamMakingPageProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('find-teams');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('all');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // const staggerContainer = {
  //   initial: {},
  //   animate: {
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // };

  const events = [
    'Aeromodelling Championship',
    'Drone Racing Circuit',
    'Aircraft Design Challenge',
    'Flight Simulation Challenge',
    'Aviation Innovation Pitch'
  ];

  const availableTeams = [
    {
      id: 1,
      name: 'Sky Innovators',
      event: 'Aeromodelling Championship',
      members: 2,
      maxMembers: 4,
      description: 'Looking for experienced aeromodellers with CAD skills',
      skills: ['CAD Design', 'Aerodynamics', 'Electronics'],
      leader: 'Rahul Sharma',
      college: 'MIT Manipal',
      rating: 4.8,
      verified: true
    },
    {
      id: 2,
      name: 'Drone Masters',
      event: 'Drone Racing Circuit',
      members: 1,
      maxMembers: 2,
      description: 'Seeking drone pilot with racing experience',
      skills: ['Drone Racing', 'FPV Flying', 'Hardware'],
      leader: 'Priya Patel',
      college: 'BITS Pilani',
      rating: 4.9,
      verified: true
    },
    {
      id: 3,
      name: 'Design Eagles',
      event: 'Aircraft Design Challenge',
      members: 2,
      maxMembers: 3,
      description: 'Need creative designer for innovative aircraft concepts',
      skills: ['CATIA', 'ANSYS', 'Innovation'],
      leader: 'Amit Kumar',
      college: 'IIT Bombay',
      rating: 4.7,
      verified: false
    }
  ];

  const individualParticipants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      college: 'VIT Chennai',
      course: 'Aerospace Engineering',
      year: '3rd Year',
      skills: ['Python', 'MATLAB', 'Simulation'],
      interests: ['Flight Simulation Challenge', 'Aircraft Design Challenge'],
      rating: 4.6,
      verified: true,
      bio: 'Passionate about flight dynamics and simulation. Looking for innovative team to work with.'
    },
    {
      id: 2,
      name: 'Karthik Reddy',
      college: 'Anna University',
      course: 'Mechanical Engineering',
      year: '4th Year',
      skills: ['CAD', 'Manufacturing', 'Project Management'],
      interests: ['Aeromodelling Championship', 'Aviation Innovation Pitch'],
      rating: 4.8,
      verified: true,
      bio: 'Team leader with 3+ years of aeromodelling experience. Let\'s build something amazing!'
    },
    {
      id: 3,
      name: 'Ananya Gupta',
      college: 'Sahyadri College',
      course: 'Computer Science',
      year: '2nd Year',
      skills: ['Programming', 'AI/ML', 'Data Analysis'],
      interests: ['Aviation Innovation Pitch', 'Flight Simulation Challenge'],
      rating: 4.5,
      verified: false,
      bio: 'Tech enthusiast interested in applying AI to aviation challenges.'
    }
  ];

  const myTeams = [
    {
      id: 1,
      name: 'Aeronauts United',
      event: 'Aeromodelling Championship',
      members: ['You', 'Alex Chen', 'Maria Santos'],
      status: 'active',
      lastActivity: '2 hours ago'
    }
  ];

  const tabs = [
    { id: 'find-teams', name: 'Find Teams', icon: Users },
    { id: 'find-members', name: 'Find Members', icon: UserPlus },
    { id: 'my-teams', name: 'My Teams', icon: Star },
    { id: 'create-team', name: 'Create Team', icon: Plus }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'find-teams':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTeams.map((team) => (
                <motion.div
                  key={team.id}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:bg-gray-700/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{team.name}</h3>
                    {team.verified && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-blue-400 mb-2">{team.event}</div>
                  <div className="text-sm text-gray-400 mb-4">
                    {team.members}/{team.maxMembers} members • Led by {team.leader}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{team.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{team.college}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-yellow-400">★ {team.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent border-gray-600 text-gray-300">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'find-members':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {individualParticipants.map((participant) => (
                <motion.div
                  key={participant.id}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:bg-gray-700/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{participant.name}</h3>
                        {participant.verified && (
                          <Star className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {participant.course} • {participant.year}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{participant.college}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{participant.bio}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {participant.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Interested in:</div>
                    <div className="space-y-1">
                      {participant.interests.map((interest, index) => (
                        <div key={index} className="text-xs text-gray-400">• {interest}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-yellow-400">★ {participant.rating}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent border-gray-600 text-gray-300">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'my-teams':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            {myTeams.length > 0 ? (
              <div className="space-y-4">
                {myTeams.map((team) => (
                  <div key={team.id} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{team.name}</h3>
                        <div className="text-blue-400">{team.event}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          team.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {team.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{team.members.join(', ')}</span>
                      </div>
                      <div className="text-sm text-gray-500">Last activity: {team.lastActivity}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Team Chat
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent border-gray-600 text-gray-300">
                        Manage Team
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Teams Yet</h3>
                <p className="text-gray-500 mb-6">Join a team or create your own to get started</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Team
                </Button>
              </div>
            )}
          </motion.div>
        );

      case 'create-team':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-center">Create New Team</h3>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter a creative team name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Event</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      title="Select event for your team"
                    >
                      <option value="">Select an event</option>
                      {events.map((event, index) => (
                        <option key={index} value={event}>{event}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Team Size</label>
                      <select
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        title="Select maximum team size"
                      >
                        <option value="2">2 members</option>
                        <option value="3">3 members</option>
                        <option value="4">4 members</option>
                        <option value="5">5 members</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Privacy</label>
                      <select
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        title="Select team privacy setting"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Description</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      placeholder="Describe your team's goals, required skills, and what you're looking for in team members..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Skills (comma-separated)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="e.g., CAD, Programming, Electronics, Project Management"
                    />
                  </div>
                  
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Team
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
  <div className={`w-full min-w-screen min-h-screen bg-black text-white ${className}`}>
      {/* Hero Section */}
      <section className="w-full h-96 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-black">
        <motion.div 
          className="relative z-10 w-full px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent"
            {...fadeInUp}
          >
            Team Making
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            {...fadeInUp}
          >
            Connect, collaborate, and create amazing teams for Aerophilia 2025
          </motion.p>
        </motion.div>
      </section>

      {/* Search and Filter */}
      <section className="w-full py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search teams or members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                title="Filter by event"
              >
                <option value="all">All Events</option>
                {events.map((event, index) => (
                  <option key={index} value={event}>{event}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full bg-gray-800/30 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-6">
          {renderTabContent()}
        </div>
      </section>
    </div>
  );
};

export default TeamMakingPage;
