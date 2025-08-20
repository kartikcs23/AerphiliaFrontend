import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, School, Calendar, Trophy, Settings, Edit, Download, Upload, Check, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import type { ProfilePageProps } from './ProfilePage.types';

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    firstName: 'Arjun',
    lastName: 'Kumar',
    email: 'arjun.kumar@example.com',
    phone: '+91 98765 43210',
    college: 'Sahyadri College of Engineering',
    course: 'Aeronautical Engineering',
    year: '3rd Year',
    rollNumber: 'AE2021045',
    registrationDate: '2025-02-15',
    avatar: null
  };

  const registeredEvents = [
    {
      id: 1,
      name: 'Aeromodelling Championship',
      date: 'March 15, 2025',
      status: 'confirmed',
      price: 500,
      category: 'Technical'
    },
    {
      id: 2,
      name: 'Drone Racing Circuit',
      date: 'March 16, 2025',
      status: 'pending',
      price: 300,
      category: 'Competition'
    },
    {
      id: 3,
      name: 'Aircraft Design Challenge',
      date: 'March 17, 2025',
      status: 'confirmed',
      price: 400,
      category: 'Design'
    }
  ];

  const achievements = [
    { name: 'Early Bird Registration', icon: Trophy, date: '2025-02-15' },
    { name: 'Multi-Event Participant', icon: Star, date: '2025-02-16' },
    { name: 'Profile Complete', icon: Check, date: '2025-02-17' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'events', name: 'My Events', icon: Calendar },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Info Card */}
              <div className="lg:col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Personal Information</h3>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'First Name', value: user.firstName, icon: User },
                    { label: 'Last Name', value: user.lastName, icon: User },
                    { label: 'Email', value: user.email, icon: Mail },
                    { label: 'Phone', value: user.phone, icon: Phone },
                    { label: 'College', value: user.college, icon: School },
                    { label: 'Course', value: user.course, icon: School }
                  ].map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        {field.label}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          title={`Edit ${field.label}`}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-white">
                          <field.icon className="w-4 h-4 text-gray-400" />
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-700/50">
                <h3 className="text-xl font-bold mb-6 text-blue-400">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">3</div>
                    <div className="text-sm text-gray-400">Events Registered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">₹1,200</div>
                    <div className="text-sm text-gray-400">Total Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">3</div>
                    <div className="text-sm text-gray-400">Achievements</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Registered for Aircraft Design Challenge', time: '2 hours ago', type: 'success' },
                  { action: 'Updated profile information', time: '1 day ago', type: 'info' },
                  { action: 'Downloaded event guidelines', time: '2 days ago', type: 'normal' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-400' :
                      activity.type === 'info' ? 'bg-blue-400' : 'bg-gray-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-white">{activity.action}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'events':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">My Registered Events</h3>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Tickets
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:bg-gray-700/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {event.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-400">{event.category}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2">{event.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">{event.date}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-bold">₹{event.price}</span>
                    <Button size="sm" variant="outline" className="bg-transparent border-gray-600 text-gray-300">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-700/50">
              <h4 className="text-lg font-bold mb-4 text-blue-400">Event Guidelines</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Arrive 30 minutes before your event starts</li>
                <li>• Bring valid ID and registration confirmation</li>
                <li>• Check event-specific requirements beforehand</li>
                <li>• Contact support for any last-minute changes</li>
              </ul>
            </div>
          </motion.div>
        );

      case 'achievements':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <h3 className="text-2xl font-bold">Achievements & Badges</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-center hover:bg-gray-700/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <achievement.icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">{achievement.name}</h4>
                  <p className="text-sm text-gray-400">Earned on {achievement.date}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold mb-4">Progress Tracking</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Event Participation</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <h3 className="text-2xl font-bold">Account Settings</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-lg font-bold mb-4">Notifications</h4>
                  <div className="space-y-3">
                    {[
                      'Email notifications for event updates',
                      'SMS alerts for registration confirmations',
                      'Push notifications for announcements'
                    ].map((setting, index) => (
                      <label key={index} className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-400 rounded" />
                        <span className="text-sm text-gray-300">{setting}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-lg font-bold mb-4">Privacy</h4>
                  <div className="space-y-3">
                    {[
                      'Make profile visible to other participants',
                      'Allow team formation requests',
                      'Share achievement badges publicly'
                    ].map((setting, index) => (
                      <label key={index} className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked={index !== 2} className="w-4 h-4 text-blue-400 rounded" />
                        <span className="text-sm text-gray-300">{setting}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-lg font-bold mb-4">Account Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Preferences
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent border-red-600 text-red-400 hover:bg-red-900/20">
                      Delete Account
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-700/50">
                  <h4 className="text-lg font-bold mb-4 text-blue-400">Need Help?</h4>
                  <p className="text-sm text-gray-300 mb-4">
                    Have questions about your account or need assistance with settings?
                  </p>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-w-screen min-h-screen bg-black text-white ${className}`}>
      {/* Header */}
      <section className="w-full bg-gray-900/50 py-8">
        <div className="w-full px-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-400">{user.course} • {user.college}</p>
              <p className="text-sm text-blue-400">Registered since {user.registrationDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full bg-gray-800/30 py-4">
        <div className="w-full px-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 text-white' 
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
        <div className="w-full px-6">
          {renderTabContent()}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
