import React, { useState } from 'react';
import { Star, MapPin, Heart, Sparkles, Map, X, ExternalLink } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { motion } from 'framer-motion';
import { Modal } from './Modal';

export const HotelCard = ({ hotel, onSelectBooking }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(hotel.id, 'hotel');
  const [showMapModal, setShowMapModal] = useState(false);

  const realMapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(`${hotel.name}, ${hotel.address}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name}, ${hotel.address}`)}`;

  return (
    <>
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
            
            <span className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md text-amber-400 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {hotel.category}
            </span>

            <button
              onClick={() => toggleWishlist(hotel, 'hotel')}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
                wishlisted ? 'bg-red-500 text-white' : 'bg-slate-950/60 text-white hover:bg-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-1.5 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hotel.rating}</span>
                <span className="text-slate-400">({hotel.reviewCount})</span>
              </div>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> {hotel.city}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                {hotel.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {hotel.description}
              </p>
            </div>

            {/* Amenities Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-lg"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Pricing & Actions */}
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Starting from</span>
            <span className="text-xl font-black text-blue-600 dark:text-blue-400">
              ₹{hotel.pricePerNight?.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400"> / night</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Map Location Modal Trigger */}
            <button
              onClick={() => setShowMapModal(true)}
              title="View Location Map"
              className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1"
            >
              <Map className="w-4 h-4 text-blue-600" />
            </button>

            {/* Booking Button */}
            <button
              onClick={() => onSelectBooking && onSelectBooking(hotel)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
            >
              Book Room
            </button>
          </div>
        </div>
      </motion.div>

      {/* Global Portal Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">📍 {hotel.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 flex items-center space-x-1.5 hover:bg-blue-700 transition"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setShowMapModal(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High Definition Map View */}
            <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
              <iframe
                title={hotel.name}
                src={realMapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
};
