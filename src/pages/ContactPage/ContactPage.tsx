import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, User, Building } from 'lucide-react';
import { Button } from '../../components/ui/button';
import type { ContactPageProps } from './ContactPage.types';

const ContactPage: React.FC<ContactPageProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: ''
    });
    
    setIsSubmitting(false);
    alert('Message sent successfully! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "contact@aerophilia2025.com",
      secondary: "registration@aerophilia2025.com",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "+91 98765 43210",
      secondary: "+91 87654 32109",
      color: "green"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "Sahyadri College of Engineering",
      secondary: "Mangalore, Karnataka 575007",
      color: "red"
    },
    {
      icon: Clock,
      title: "Office Hours",
      primary: "Mon - Fri: 9:00 AM - 6:00 PM",
      secondary: "Sat: 10:00 AM - 4:00 PM",
      color: "purple"
    }
  ];

  const departments = [
    { id: 'general', name: 'General Inquiry', icon: MessageCircle },
    { id: 'registration', name: 'Registration Support', icon: User },
    { id: 'technical', name: 'Technical Support', icon: Building },
    { id: 'sponsors', name: 'Sponsorship', icon: Building }
  ];

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
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            {...fadeInUp}
          >
            Get in touch with our team for any questions or support
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="w-full py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <info.icon className={`w-12 h-12 text-${info.color}-400 mb-4`} />
                <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                <p className="text-gray-300 text-sm mb-1">{info.primary}</p>
                <p className="text-gray-400 text-sm">{info.secondary}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="w-full py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      title="Select inquiry category"
                      required
                    >
                      <option value="">Select category</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Brief subject of your message"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="Write your detailed message here..."
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Find Us</h3>
                <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <p className="text-gray-300">Interactive Map</p>
                    <p className="text-sm text-gray-400">Sahyadri College of Engineering</p>
                  </div>
                </div>
              </div>

              {/* Departments */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Departments</h3>
                <div className="space-y-3">
                  {departments.map((dept) => (
                    <div key={dept.id} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <dept.icon className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{dept.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-700/50">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Include your registration number for faster support</li>
                  <li>• For urgent issues, call us directly</li>
                  <li>• Check our FAQ section before reaching out</li>
                  <li>• Allow 24-48 hours for email responses</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Quick answers to common questions about Aerophilia 2025
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg">
              View FAQ
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
