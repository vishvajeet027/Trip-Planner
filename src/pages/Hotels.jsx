import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HotelCard } from '../components/HotelCard';
import { Modal } from '../components/Modal';
import { storageService } from '../services/storageService';
import hotelsData from '../data/hotels.json';
import statesData from '../data/states.json';
import { Search, Filter, SlidersHorizontal, MapPin, CheckCircle2, Calendar, Users, Star, LayoutGrid, List, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Hotels = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialState = searchParams.get('state') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenity, setSelectedAmenity] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Booking Modal State
  const [bookingHotel, setBookingHotel] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [checkIn, setCheckIn] = useState('2026-10-10');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(hotelsData.map(h => h.category));
    return Array.from(set);
  }, []);

  // Filtered Hotels
  const filteredHotels = useMemo(() => {
    return hotelsData.filter(hotel => {
      const matchesQuery = searchQuery === '' || 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState = selectedState === '' || hotel.state.toLowerCase() === selectedState.toLowerCase();
      const matchesCategory = selectedCategory === '' || hotel.category === selectedCategory;
      const matchesPrice = hotel.pricePerNight <= maxPrice;
      const matchesRating = hotel.rating >= minRating;
      const matchesAmenity = selectedAmenity === '' || hotel.amenities.includes(selectedAmenity);

      return matchesQuery && matchesState && matchesCategory && matchesPrice && matchesRating && matchesAmenity;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-high') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedState, selectedCategory, maxPrice, minRating, selectedAmenity, sortBy]);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (bookingHotel) {
      storageService.saveBooking({
        type: 'Hotel Reservation',
        title: bookingHotel.name,
        city: bookingHotel.city,
        state: bookingHotel.state,
        image: bookingHotel.image,
        totalPrice: bookingHotel.pricePerNight * nights,
        details: `${nights} Night(s) • ${guests} Guest(s) • Check-in: ${checkIn}`
      });
    }
    setBookingConfirmed(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingHotel(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400 flex items-center space-x-1.5">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span>Luxury & Heritage Stays Across India</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Indian Hotels & Resorts Directory
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
            Explore 5-star royal palaces, beachfront villas, tea garden resorts, and Himalayan wellness retreats.
          </p>
        </div>

        {/* View Mode Toggle & Sort */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow' : 'text-slate-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow' : 'text-slate-400'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-bold focus:outline-none"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Layout: Sidebar Filter + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Filters</span>
            </h3>
            {(searchQuery || selectedState || selectedCategory || maxPrice < 50000 || minRating > 0) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedState('');
                  setSelectedCategory('');
                  setMaxPrice(50000);
                  setMinRating(0);
                  setSelectedAmenity('');
                }}
                className="text-[11px] font-bold text-amber-500 hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* State Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Indian State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="">All States</option>
              {statesData.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Hotel Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-500">Max Price / Night</span>
              <span className="text-blue-600 dark:text-blue-400">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="2500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Rating Rating Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Minimum Rating
            </label>
            <div className="flex items-center space-x-1">
              {[0, 4.5, 4.8, 4.9].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    minRating === r
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Hotels Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span>Showing <strong className="text-slate-900 dark:text-white">{filteredHotels.length}</strong> Hotels in India</span>
          </div>

          {filteredHotels.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {filteredHotels.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onSelectBooking={(h) => setBookingHotel(h)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-3xl">
                🏨
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Hotels Match Filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing some filters or searching for another Indian city like Jaipur, Goa, Udaipur, or Munnar.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Demo Booking Modal */}
      <Modal
        isOpen={!!bookingHotel}
        onClose={() => setBookingHotel(null)}
        title={bookingHotel ? `Book ${bookingHotel.name}` : ''}
      >
        {bookingConfirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">Demo Reservation Confirmed!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your stay at {bookingHotel?.name} ({nights} Nights, {guests} Guests) total ₹{(bookingHotel?.pricePerNight * nights).toLocaleString('en-IN')} confirmed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs font-semibold">
            {bookingHotel && (
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{bookingHotel.name}</h4>
                    <span className="text-slate-500">📍 {bookingHotel.city}, {bookingHotel.state}</span>
                  </div>
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">₹{bookingHotel.pricePerNight.toLocaleString('en-IN')}/night</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-500 block mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Nights</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Guests</label>
              <input
                type="number"
                min="1"
                max="6"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Demo Fare</span>
                <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                  ₹{(bookingHotel ? bookingHotel.pricePerNight * nights : 0).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25"
              >
                Confirm Demo Stay
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
