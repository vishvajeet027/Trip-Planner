import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Building, Plane, Package } from 'lucide-react';
import citiesData from '../data/cities.json';

export const SearchBar = ({ defaultTab = 'hotels' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'hotels') {
      navigate(`/hotels?search=${encodeURIComponent(query)}&state=${encodeURIComponent(selectedState)}`);
    } else if (activeTab === 'flights') {
      navigate(`/flights?to=${encodeURIComponent(query)}`);
    } else if (activeTab === 'packages') {
      navigate(`/packages?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800/80">
      
      {/* Tabs Header */}
      <div className="flex items-center space-x-2 sm:space-x-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('hotels')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === 'hotels'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Indian Hotels</span>
        </button>

        <button
          onClick={() => setActiveTab('flights')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === 'flights'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Domestic Flights</span>
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            activeTab === 'packages'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Tour Packages</span>
        </button>
      </div>

      {/* Form inputs */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Destination Query */}
        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Indian Destination
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 absolute left-3.5 top-3 text-blue-600 dark:text-blue-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Jaipur, Goa, Munnar, Kashmir..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* State or Date */}
        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {activeTab === 'flights' ? 'Travel Date' : 'Filter by State'}
          </label>
          {activeTab === 'flights' ? (
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3.5 top-3 text-blue-600 dark:text-blue-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Indian States</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Goa">Goa</option>
              <option value="Kerala">Kerala</option>
              <option value="Jammu & Kashmir">Jammu & Kashmir</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Andaman & Nicobar">Andaman & Nicobar</option>
            </select>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Search className="w-5 h-5" />
            <span>Search {activeTab.toUpperCase()}</span>
          </button>
        </div>

      </form>

      {/* Quick City Chips */}
      <div className="mt-4 flex items-center space-x-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-semibold uppercase tracking-wider whitespace-nowrap">Popular:</span>
        {citiesData.slice(0, 5).map(city => (
          <button
            key={city.id}
            onClick={() => setQuery(city.name)}
            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors whitespace-nowrap"
          >
            {city.name}
          </button>
        ))}
      </div>

    </div>
  );
};
