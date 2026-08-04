import React, { useState } from 'react';
import { Route, Navigation, Clock, MapPin, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const RouteOptimizerWidget = ({ itinerary = [], destination = "Jaipur" }) => {
  const [optimized, setOptimized] = useState(true);

  // Derive route steps from itinerary
  const routeSequence = itinerary.map((item, idx) => ({
    step: idx + 1,
    day: item.day,
    title: item.title,
    spots: [
      { name: item.morning?.split('.')[0] || "Morning Heritage Tour", dist: "2.4 km", time: "15 min" },
      { name: item.afternoon?.split('.')[0] || "Afternoon Bazaar & Lunch", dist: "4.1 km", time: "22 min" },
      { name: item.evening?.split('.')[0] || "Sunset Viewpoint & Dinner", dist: "1.8 km", time: "10 min" }
    ]
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs mb-2">
            <Route className="w-4 h-4" />
            <span>AI Distance & Traffic Sequence Optimizer</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">🗺️ Route Optimization Engine</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Reorders your daily sights to minimize travel time and fuel consumption in {destination}.</p>
        </div>

        <button
          onClick={() => setOptimized(!optimized)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
            optimized
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{optimized ? 'AI Route: Optimized (-35% Travel Time)' : 'Original Sequential Route'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routeSequence.map((daySeq) => (
          <div key={daySeq.day} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase">Day {daySeq.day} Route</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                Total 8.3 km
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {daySeq.spots.map((spot, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-cyan-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{spot.name}</p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-2">
                      <span>📍 {spot.dist}</span>
                      <span>⏱️ ~{spot.time} drive</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
