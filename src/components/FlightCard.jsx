import React from 'react';
import { Plane, Clock, Luggage, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FlightCard = ({ flight, onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Airline Info */}
        <div className="flex items-center space-x-4 shrink-0 w-full lg:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-2xl border border-blue-200/50 dark:border-blue-800/50">
            {flight.logo}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {flight.airline}
            </h4>
            <span className="text-xs text-slate-400 font-medium">
              Flight {flight.flightNumber} • {flight.stops}
            </span>
          </div>
        </div>

        {/* Departure & Arrival Schedule */}
        <div className="flex items-center justify-between w-full lg:w-1/2 px-2">
          
          <div className="text-left">
            <span className="text-xl font-black text-slate-900 dark:text-white block">
              {flight.departureTime}
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
              {flight.fromCity}
            </span>
            <span className="text-[11px] text-slate-400 block max-w-[120px] truncate">
              {flight.fromAirport}
            </span>
          </div>

          <div className="flex flex-col items-center px-4">
            <span className="text-xs text-slate-400 font-semibold mb-1 flex items-center space-x-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{flight.duration}</span>
            </span>
            <div className="w-24 sm:w-32 h-[2px] bg-slate-300 dark:bg-slate-700 relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-600 absolute left-0" />
              <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-0.5 transform rotate-90" />
              <div className="w-2 h-2 rounded-full bg-blue-600 absolute right-0" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wider">
              {flight.stops}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xl font-black text-slate-900 dark:text-white block">
              {flight.arrivalTime}
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
              {flight.toCity}
            </span>
            <span className="text-[11px] text-slate-400 block max-w-[120px] truncate">
              {flight.toAirport}
            </span>
          </div>

        </div>

        {/* Price & Book */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="text-left lg:text-right">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block">
              ₹{flight.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center space-x-1 lg:justify-end">
              <Luggage className="w-3 h-3 text-slate-400" />
              <span>{flight.baggage}</span>
            </span>
          </div>

          <button
            onClick={() => onBook && onBook(flight)}
            className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center space-x-1"
          >
            <span>Book Flight</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
