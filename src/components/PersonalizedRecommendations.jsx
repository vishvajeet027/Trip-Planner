import React from 'react';
import { Star, Sparkles, UserCheck, MapPin, ArrowRight, History } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { useTrips } from '../contexts/TripContext';

export const PersonalizedRecommendations = ({ onSelectDestination }) => {
  const { savedTrips } = useTrips();
  const profile = geminiService.getPersonalizedRecommendations(savedTrips);

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-purple-500/10 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>AI Hyper-Personalized Machine Engine</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">⭐ Recommendations Based on Previous Trips</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Analyzing your past trip history ({savedTrips.length} saved trips) to match your travel taste profile.
          </p>
        </div>
      </div>

      {/* Matched Profile Badge */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Your AI Travel Persona</span>
            <h4 className="text-base font-black text-slate-900 dark:text-white">{profile.matchedProfile}</h4>
          </div>
        </div>
        <span className="text-xs text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-full">
          High Preference Match
        </span>
      </div>

      {/* Recommended Destinations Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profile.recommendedDestinations.map((dest, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-4 hover:shadow-lg transition">
            <img src={dest.image} alt={dest.name} className="w-24 h-24 rounded-xl object-cover" />
            <div className="flex-1 space-y-2 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{dest.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{dest.reason}</p>
              </div>
              <button
                onClick={() => onSelectDestination && onSelectDestination(dest.name)}
                className="self-start text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
              >
                <span>Plan Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insider Advice */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
        <span><strong>AI Profile Tip:</strong> {profile.insiderTip}</span>
      </div>
    </div>
  );
};
