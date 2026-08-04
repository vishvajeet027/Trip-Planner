import React from 'react';
import { Compass, Eye, MapPin, Calendar, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const HiddenGems = ({ onSelectDestination }) => {
  const gems = geminiService.getHiddenGems();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-2">
            <Compass className="w-4 h-4" />
            <span>Offbeat & Unexplored India</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">🎯 Hidden Gems Recommendation</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Discover serene, non-touristy destinations across India with low crowd levels and pristine nature.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gems.map((gem, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/40 hover:shadow-lg transition"
          >
            <div className="sm:w-2/5 h-44 sm:h-auto relative">
              <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-emerald-300 font-bold text-[10px]">
                {gem.crowdLevel} Crowd
              </div>
            </div>
            <div className="p-5 sm:w-3/5 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{gem.state} • {gem.category}</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{gem.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {gem.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-500" /> Best: {gem.bestSeason}
                </span>
                <button
                  onClick={() => onSelectDestination && onSelectDestination(gem.name)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
