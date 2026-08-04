import React from 'react';
import { Link } from 'react-router-dom';
import { CityCard } from '../components/CityCard';
import { HotelCard } from '../components/HotelCard';
import { PackageCard } from '../components/PackageCard';
import citiesData from '../data/cities.json';
import hotelsData from '../data/hotels.json';
import packagesData from '../data/packages.json';
import { Sparkles, Compass, ShieldCheck, Award, Users, MapPin, ArrowRight, Star, Heart, Building, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  const featuredCities = citiesData.filter(c => c.isFeatured).slice(0, 6);
  const featuredHotels = hotelsData.filter(h => h.isFeatured).slice(0, 4);
  const featuredPackages = packagesData.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
        {/* Background Image / Gradient Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80"
            alt="Taj Mahal India"
            className="w-full h-full object-cover brightness-[0.8] scale-105 transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-slate-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-bold shadow-2xl"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>AI-Powered Indian Travel Planning Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Discover Extraordinary <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
              Incredible India
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
          >
            From royal Rajasthani havelis and misty Kerala backwaters to snow-clad Kashmir peaks and sunny Goa shores. Planned exclusively with Gemini AI.
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
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-500/25 flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Building className="w-4 h-4" />
              <span>Explore Indian Hotels</span>
            </Link>

            <Link
              to="/ai-planner"
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm rounded-2xl shadow-xl shadow-amber-500/25 flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Trip Planner</span>
            </Link>

            <Link
              to="/packages"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Package className="w-4 h-4" />
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
            <span className="text-3xl sm:text-4xl font-black text-emerald-500">AI Instant</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Itinerary Generator</span>
          </div>
        </div>
      </section>

      {/* Popular Indian Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-amber-500 block">
              Top Indian Destinations
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Explore Popular Indian Cities
            </h2>
          </div>
          <Link
            to="/hotels"
            className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center space-x-1 hover:underline"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCities.map(city => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>

      {/* Featured Luxury Hotels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 block">
              Luxury & Heritage Stays
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Featured Indian Hotels & Resorts
            </h2>
          </div>
          <Link
            to="/hotels"
            className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center space-x-1 hover:underline"
          >
            <span>Browse All Hotels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Featured Tour Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-amber-500 block">
              Curated Experiences
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Top Selling Indian Tour Packages
            </h2>
          </div>
          <Link
            to="/packages"
            className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center space-x-1 hover:underline"
          >
            <span>Explore All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 block">
            Testimonials
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Loved by Travellers Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "The AI planner generated our 4-day Goa itinerary flawlessly! Picked the best luxury beach resort and top seafood joints!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                R
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Rohan Sharma</h4>
                <span className="text-xs text-slate-400">Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "Taj Lake Palace booking demo and custom trip builder saved us hours of planning. Exporting to PDF was a game changer!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                P
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Priya Nair</h4>
                <span className="text-xs text-slate-400">Bengaluru, India</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "100% focused on India! Loved seeing Kashmir, Ladakh, and Munnar without any international clutter. College submission perfection!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                A
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Aniket Verma</h4>
                <span className="text-xs text-slate-400">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
