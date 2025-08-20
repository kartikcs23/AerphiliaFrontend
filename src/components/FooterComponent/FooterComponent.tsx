/**
 * Footer Component for Aerophilia 2025
 * Elegant footer with aeroplane-themed design and social links
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Github
} from 'lucide-react';
import type { FooterComponentProps, FooterSection } from './FooterComponent.types';

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Events',
    links: [
      { label: 'Aeromodelling', href: '/events?category=aeromodelling' },
      { label: 'Robotics', href: '/events?category=robotics' },
      { label: 'Coding', href: '/events?category=coding' },
      { label: 'Innovation', href: '/events?category=innovation' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/aerophilia2025', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/aerophilia2025', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/aerophilia2025', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/aerophilia2025', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/teamchallengers', label: 'GitHub' },
];

const FooterComponent: React.FC<FooterComponentProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gradient-to-b from-black via-slate-950 to-black border-t border-blue-500/20 ${className}`}>
      {/* Animated airplane trail */}
      <div className="relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Plane className="h-8 w-8 text-blue-400" />
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Aerophilia 2025
                </span>
              </div>
              
              <p className="text-gray-400 text-sm max-w-md">
                Experience the future of technology through aeromodelling, robotics, and innovation. 
                Join us for the ultimate tech fest where dreams take flight.
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>info@aerophilia2025.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Sahyadri College, Mangalore</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {FOOTER_SECTIONS.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-1 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-blue-400 text-white"
                />
                <button className="px-4 py-1 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-r-md hover:from-blue-600 hover:to-cyan-600 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>© {currentYear} Aerophilia 2025. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Organized by Team Challengers</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>Made with ❤️ for tech enthusiasts</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-400"
            >
              ✈️
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterComponent;
