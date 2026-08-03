import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart, Trash2, MapPin, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-red-500">
          Saved Destinations & Stays
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          My Wishlist ({wishlist.length})
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Your bookmarked Indian hotels, packages, and cities stored in LocalStorage.
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <div
              key={`${item.type}_${item.id}`}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-lg relative group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {item.type}
                  </span>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-md"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base line-clamp-1">
                    {item.title || item.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.city ? `${item.city}, ${item.state}` : item.region || "India"}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={item.type === 'hotel' ? '/hotels' : item.type === 'package' ? '/packages' : '/ai-planner'}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center mx-auto text-3xl">
            ❤️
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the heart icon on any hotel card or tour package to save it to your wishlist.
          </p>
        </div>
      )}

    </div>
  );
};
