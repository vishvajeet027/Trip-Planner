import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CityCard = ({ city }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all group flex flex-col justify-between"
    >
      <div>
        <div className="relative h-56 overflow-hidden">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <span className="absolute top-4 left-4 bg-amber-500/90 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {city.state}
          </span>

          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{city.rating}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-black group-hover:text-amber-300 transition-colors">
              {city.name}
            </h3>
            <p className="text-xs text-slate-300 line-clamp-1 italic font-medium">
              "{city.tagline}"
            </p>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Famous Attractions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {city.famousFor.map((item, idx) => (
              <span
                key={idx}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-lg"
              >
                📍 {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 block">Avg Budget / Day</span>
          <span className="text-lg font-black text-blue-600 dark:text-blue-400">
            ₹{city.avgBudgetPerDay.toLocaleString('en-IN')}
          </span>
        </div>

        <Link
          to={`/hotels?search=${encodeURIComponent(city.name)}`}
          className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all group-hover:translate-x-1"
        >
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
};
