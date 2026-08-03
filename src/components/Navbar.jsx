import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useTrips } from '../contexts/TripContext';
import { 
  Sun, Moon, Heart, Compass, Menu, X, Sparkles, 
  ChevronDown, Hotel, Plane, Package, MapPin, Info, Mail, Luggage, Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { count: wishlistCount } = useWishlist();
  const { trips } = useTrips();
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const exploreRef = useRef(null);
  const accountRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setExploreOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setExploreOpen(false);
    setAccountOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const exploreLinks = [
    { name: 'Hotels', path: '/hotels', icon: Hotel, desc: 'Luxury stays & boutique resorts' },
    { name: 'Flights', path: '/flights', icon: Plane, desc: 'Domestic & international flights' },
    { name: 'Tour Packages', path: '/packages', icon: Package, desc: 'Curated holiday itineraries' },
  ];

  const secondaryLinks = [
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;
  const isExploreActive = exploreLinks.some(link => location.pathname === link.path);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                TravelAI
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold block -mt-1">
                India 🇮🇳
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            
            {/* Primary Link: Home */}
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            {/* Explore Dropdown (Hotels, Flights, Tour Packages) */}
            <div className="relative" ref={exploreRef}>
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                  isExploreActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Explore Stays & Travel</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              <AnimatePresence>
                {exploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/80 dark:border-slate-800 shadow-xl z-50 space-y-1"
                  >
                    {exploreLinks.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-start space-x-3 p-2.5 rounded-xl transition-colors ${
                            active
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block">{item.name}</span>
                            <span className="text-[10px] text-slate-400 leading-tight block">{item.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Planner */}
            <Link
              to="/custom-planner"
              className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                isActive('/custom-planner')
                  ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              Custom Planner
            </Link>

            {/* Account Dashboard Dropdown (My Trips & Wishlist) */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/my-trips') || isActive('/wishlist')
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>My Dashboard</span>
                {(trips.length > 0 || wishlistCount > 0) && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                )}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${accountOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/80 dark:border-slate-800 shadow-xl z-50 space-y-1"
                  >
                    <Link
                      to="/my-trips"
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive('/my-trips')
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Luggage className="w-4 h-4 text-blue-600" />
                        <span>My Saved Trips</span>
                      </div>
                      {trips.length > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-blue-600 text-white rounded-full">
                          {trips.length}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/wishlist"
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive('/wishlist')
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        <span>My Wishlist</span>
                      </div>
                      {wishlistCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-500 text-slate-950 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Secondary Links */}
            {secondaryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}

          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Primary Action Button: AI Trip Planner */}
            <Link
              to="/ai-planner"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>AI Trip Planner</span>
            </Link>

          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 backdrop-blur-xl"
          >
            <Link
              to="/ai-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Trip Planner</span>
            </Link>

            <div className="space-y-1 pt-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Home</Link>
              <Link to="/hotels" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Hotels</Link>
              <Link to="/flights" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Flights</Link>
              <Link to="/packages" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Tour Packages</Link>
              <Link to="/custom-planner" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Custom Planner</Link>
              <Link to="/my-trips" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">My Saved Trips ({trips.length})</Link>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Wishlist ({wishlistCount})</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">About Us</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

