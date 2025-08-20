import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Plane, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import type { NavbarComponentProps, NavItem } from "./NavbarComponent.types";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const NavbarComponent: React.FC<NavbarComponentProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${
          isScrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
            : "bg-transparent"
        } ${className}`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-pink-500 origin-left fixed top-0 left-0 right-0 z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with airplane animation */}
          <Link to="/" className="flex items-center space-x-2 group relative">
            <motion.div
              whileHover={{ x: [0, 6, -3, 0], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="relative"
            >
              <Plane className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_10px_cyan]" />
              {/* Jet trail effect */}
              <motion.div
                className="absolute -right-3 top-1/2 w-10 h-[2px] bg-cyan-300/70 blur-sm"
                animate={{ opacity: [0, 1, 0], x: [0, -20] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
              Aerophilia 2025
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    location.pathname === item.href
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-300"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_cyan]"
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <Link to="/profile">
                  <Button
                    size="sm"
                    className="rounded-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_cyan] hover:shadow-[0_0_20px_cyan]"
                  >
                    <User className="h-4 w-4 mr-1" />
                    {user?.firstName}
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_cyan] hover:from-cyan-600 hover:to-blue-700"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyan-400"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
          >
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              <div className="flex-1 space-y-5">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 },
                    }}
                  >
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 text-lg font-semibold rounded-lg transition-all ${
                        location.pathname === item.href
                          ? "text-cyan-400 bg-cyan-500/10 shadow-[0_0_10px_cyan]"
                          : "text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile User Actions */}
              <div className="border-t border-gray-800 pt-6 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <Button className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_cyan]">
                        <User className="h-4 w-4 mr-2" /> Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={logout}
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="w-full text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_cyan]">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavbarComponent;
