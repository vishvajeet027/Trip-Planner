import React from 'react';
import { Clock, Calendar, CheckCircle2, Heart, Star, Compass, Tag } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { motion } from 'framer-motion';

export const PackageCard = ({ pkg, onBook }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(pkg.id, 'package');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all group flex flex-col justify-between"
    >
      <div>
        {/* Image & Region Header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Duration Badge */}
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-md">
            <Clock className="w-3.5 h-3.5" />
            <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
          </span>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist({ ...pkg, type: 'package', title: pkg.name })}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-slate-950/60 text-white hover:bg-slate-950'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Title & Region */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
              📍 {pkg.region} Tour
            </span>
            <h3 className="text-lg font-extrabold line-clamp-1 group-hover:text-amber-300 transition-colors">
              {pkg.name}
            </h3>
          </div>
        </div>

        {/* Details & Inclusions */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {pkg.description}
          </p>

          {/* Quick Inclusions */}
          <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-semibold">{pkg.includedHotel}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{pkg.meals}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{pkg.transportation}</span>
            </div>
          </div>

          {/* Highlights */}
          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                ⭐ Package Highlights:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                "{pkg.highlights[0]}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Pricing & Action */}
      <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block line-through">
            ₹{pkg.price.toLocaleString('en-IN')}
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              ₹{pkg.discountPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400"> / person</span>
          </div>
        </div>

        <button
          onClick={() => onBook && onBook(pkg)}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
        >
          Book Package
        </button>
      </div>
    </motion.div>
  );
};
