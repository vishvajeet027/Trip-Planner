import React, { useState } from 'react';
import { Star, MapPin, Heart, Wifi, Coffee, Sparkles, Map, CheckCircle2 } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { motion } from 'framer-motion';

export const HotelCard = ({ hotel, onSelectBooking }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { isAdmin } = useAuth();
  const wishlisted = isWishlisted(hotel.id, 'hotel');
  const [showMapModal, setShowMapModal] = useState(false);

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
        {/* Image Container */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          
          {/* Category Tag */}
          <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
            {hotel.category}
          </span>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist({ ...hotel, type: 'hotel', title: hotel.name })}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-slate-900/60 text-white hover:bg-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Location Badge */}
          <div className="absolute bottom-3 left-4 text-white flex items-center space-x-1.5 text-xs font-semibold">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{hotel.city}, {hotel.state}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          
          {/* Header & Rating */}
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center space-x-1 bg-amber-500/10 px-2 py-0.5 rounded-lg text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{hotel.rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-md">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px] font-medium px-2 py-1 rounded-md">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Price & Book */}
      <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Starting from</span>
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            ₹{hotel.pricePerNight.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-slate-400"> / night</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Map Preview Modal Button */}
          {hotel.googleMapsEmbed && (
            <button
              onClick={() => setShowMapModal(!showMapModal)}
              title="View Location Map"
              className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Map className="w-4 h-4" />
            </button>
          )}

          {/* Booking Button */}
          <button
            onClick={() => onSelectBooking && onSelectBooking(hotel)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
          >
            Book Demo
          </button>
        </div>
      </div>

      {/* Map Embed Modal Popup */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-2xl w-full border border-slate-700 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>{hotel.name} Location</span>
              </h4>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-slate-400 hover:text-white text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800">
              <iframe
                title={hotel.name}
                src={hotel.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <p className="text-xs text-slate-400 font-medium">📍 {hotel.address}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
