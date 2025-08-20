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
  Github,
  Send,
  Heart
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
  <footer className={`w-full bg-gradient-to-b from-gray-950 via-black to-gray-950 border-t border-blue-500/30 backdrop-blur-xl shadow-2xl ${className}`}>
      {/* Animated airplane trail */}
      <div className="relative overflow-hidden h-1">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </motion.div>
        
        {/* Animated plane icon */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          initial={{ left: "-2rem" }}
          animate={{ left: "100%" }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Plane className="h-5 w-5 text-blue-400 rotate-90" />
        </motion.div>
      </div>

  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 rounded-2xl bg-gradient-to-br from-blue-900/30 via-black/40 to-cyan-900/20 p-8 shadow-xl backdrop-blur-md border border-blue-500/10"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg shadow-lg ring-2 ring-blue-400/30"
                >
                  <Plane className="h-7 w-7 text-white drop-shadow-lg" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                  Aerophilia 2025
                </span>
              </div>
              
              <p className="text-gray-300 text-base leading-relaxed max-w-md">
                Experience the future of technology through aeromodelling, robotics, and innovation. 
                Join us for the ultimate tech fest where dreams take flight and innovation soars to new heights.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 text-gray-300 group">
                  <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors shadow-md">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm">info@aerophilia2025.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 group">
                  <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors shadow-md">
                    <Phone className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 group">
                  <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors shadow-md">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm">Sahyadri College, Mangalore</span>
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
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 rounded-xl bg-gradient-to-br from-blue-900/10 via-black/10 to-cyan-900/10 p-6 shadow-md backdrop-blur border border-blue-500/5"
            >
              <h3 className="text-white font-semibold text-lg relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 drop-shadow">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group font-medium"
                    >
                      <span className="w-2 h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 mr-3 transition-all duration-300"></span>
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
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-blue-500/10 pt-12 pb-10 bg-gradient-to-br from-black/10 via-blue-900/10 to-cyan-900/10 rounded-xl shadow-md"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <span className="text-gray-300 font-medium min-w-[120px]">Follow our journey:</span>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4, boxShadow: '0 4px 24px #38bdf8' }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg transition-all duration-300 group shadow-md border border-blue-500/10"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white drop-shadow" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="w-full lg:max-w-md">
              <span className="text-gray-300 font-medium block mb-4">Stay updated with our latest news:</span>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 text-sm bg-gradient-to-br from-gray-800/80 to-blue-900/30 border border-blue-500/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 shadow-md"
                />
                <motion.button 
                  whileHover={{ scale: 1.08, background: 'linear-gradient(90deg,#2563eb,#06b6d4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-blue-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm bg-gradient-to-br from-black/10 via-blue-900/10 to-cyan-900/10 rounded-xl shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span>© {currentYear} Aerophilia 2025. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span>Organized by Team Challengers</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span>Crafted with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-red-500 flex items-center drop-shadow-lg"
            >
              <Heart className="h-4 w-4 fill-current" />
            </motion.div>
            <span>for the innovators of tomorrow</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterComponent;