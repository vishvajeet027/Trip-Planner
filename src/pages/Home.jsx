import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CityCard } from '../components/CityCard';
import { HotelCard } from '../components/HotelCard';
import { PackageCard } from '../components/PackageCard';
import citiesData from '../data/cities.json';
import hotelsData from '../data/hotels.json';
import packagesData from '../data/packages.json';
import { Sparkles, Compass, ShieldCheck, Award, Users, MapPin, ArrowRight, Star, Heart, Building, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_SLIDES = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80',
    tagline: '7th Wonder of the World & Eternal Symbol of Love'
  },
  {
    id: 'amber-fort',
    name: 'Amber Fort & Pink City',
    location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Royal Palaces, Sheesh Mahal & Historic Hill Forts'
  },
  {
    id: 'kerala-backwaters',
    name: 'Alleppey Backwaters',
    location: 'Kumarakom, Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Serene Houseboats, Palm Lagoons & Spice Gardens'
  },
  {
    id: 'dal-lake',
    name: 'Dal Lake & Houseboats',
    location: 'Srinagar, Kashmir',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Misty Snow Peaks, Floating Markets & Shikara Rides'
  },
  {
    id: 'goa-beaches',
    name: 'Vagator & Palolem Beaches',
    location: 'North & South Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=80',
    tagline: 'Sun-drenched Coastal Palms, Water Sports & Nightlife'
  },
  {
    id: 'varanasi-ghats',
    name: 'Kashi Vishwanath & Ganga Ghats',
    location: 'Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2000&q=80',
    tagline: 'World’s Oldest Spiritual City & Evening Ganga Aarti'
  }
];

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredCities = citiesData.filter(c => c.isFeatured).slice(0, 6);
  const featuredHotels = hotelsData.filter(h => h.isFeatured).slice(0, 4);
  const featuredPackages = packagesData.filter(p => p.isFeatured).slice(0, 3);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section with Live Auto-sliding Background Places */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        
        {/* Persistent Dark Base Container to prevent white flash */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          {HERO_SLIDES.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
              style={{ transitionProperty: 'opacity, transform' }}
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />
            </div>
          ))}
        </div>

        {/* Liquid Glass Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-blue-600/30 blur-3xl animate-pulse-glow pointer-events-none z-1" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-amber-500/25 blur-3xl animate-pulse-glow pointer-events-none z-1" />





        {/* Hero Central Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full liquid-glass text-amber-300 text-xs sm:text-sm font-bold shadow-2xl animate-liquid-float"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>✨ VoyageCraft AI • Exploring {slide.name}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-2xl"
          >
            Discover Extraordinary <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
              Incredible India
            </span>
          </motion.h1>

          <motion.p
            key={slide.tagline}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed drop-shadow"
          >
            {slide.tagline}.
          </motion.p>

          {/* Quick Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/hotels"
              className="px-6 py-3.5 liquid-glass-button text-white font-bold text-sm rounded-2xl flex items-center space-x-2"
            >
              <Building className="w-4 h-4" />
              <span>Explore Stays</span>
            </Link>

            <Link
              to="/ai-planner"
              className="px-7 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>AI Trip Suite</span>
            </Link>

            <Link
              to="/packages"
              className="px-6 py-3.5 liquid-glass text-white font-bold text-sm rounded-2xl flex items-center space-x-2 hover:bg-white/20 transition-all hover:scale-105"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>Tour Packages</span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Travel Statistics Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">100%</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Indian Destinations</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-amber-500">25+</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Historic Cities</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">50+</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Luxury Heritage Hotels</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-emerald-500">⚡ Gemini</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">AI Custom Itineraries</span>
          </div>
        </div>
      </section>

      {/* Featured Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-amber-500">
              Top Indian Destinations
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Explore Popular Travel Regions
            </h2>
          </div>
          <Link
            to="/ai-planner"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>Plan with AI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
              Luxury Havelis & Resorts
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Featured Royal Stays
            </h2>
          </div>
          <Link
            to="/hotels"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Hotels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-amber-500">
              All-Inclusive Holiday Packages
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Trending Indian Itineraries
            </h2>
          </div>
          <Link
            to="/packages"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

    </div>
  );
};
