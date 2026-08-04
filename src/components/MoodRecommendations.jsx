import React, { useState } from 'react';
import { Smile, Sparkles, Heart, Zap, Shield, Flame, Compass, ArrowRight } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const MoodRecommendations = ({ onSelectDestination }) => {
  const [activeMood, setActiveMood] = useState('Relaxed');

  const moods = [
    { id: 'Relaxed', label: 'Relaxed & Calm', icon: Smile, color: 'from-teal-500 to-emerald-500' },
    { id: 'Adventure', label: 'Thrill & Adventure', icon: Zap, color: 'from-amber-500 to-orange-500' },
    { id: 'Spiritual', label: 'Spiritual & Serene', icon: Shield, color: 'from-purple-500 to-indigo-500' },
    { id: 'Heritage', label: 'Royal & Heritage', icon: Compass, color: 'from-blue-500 to-cyan-500' },
    { id: 'Romantic', label: 'Romantic Escapes', icon: Heart, color: 'from-rose-500 to-pink-500' },
    { id: 'Party', label: 'Nightlife & Beach Party', icon: Flame, color: 'from-fuchsia-500 to-rose-500' }
  ];

  const recommendations = geminiService.getDestinationsByMood(activeMood);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-bold text-xs mb-2">
          <Smile className="w-4 h-4" />
          <span>Vibe Matching AI Engine</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">😊 Mood-Based Destination Finder</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Select how you feel today and let AI curate matching Indian destinations and curated stay experiences.</p>
      </div>

      {/* Mood Selector Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {moods.map((m) => {
          const Icon = m.icon;
          const isActive = activeMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMood(m.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all ${
                isActive
                  ? `bg-gradient-to-r ${m.color} text-white shadow-lg shadow-rose-500/20 scale-105`
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recommendations Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {recommendations.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:shadow-2xl transition duration-300"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {item.state}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-black text-white">{item.name}</h3>
                <p className="text-xs text-rose-300 font-semibold">{item.tag}</p>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {item.desc}
              </p>

              <button
                onClick={() => onSelectDestination && onSelectDestination(item.name)}
                className="w-full py-2.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs hover:bg-rose-600 dark:hover:bg-rose-500 dark:hover:text-white transition flex items-center justify-center space-x-2"
              >
                <span>Plan Trip to {item.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
