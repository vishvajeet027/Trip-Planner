import React from 'react';
import { Compass, Sparkles, ShieldCheck, Heart, Award, MapPin, Code2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-500">
          College Project Submission
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          About TravelAI India 🇮🇳
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          TravelAI India is a modern, frontend-only luxury travel planning platform crafted to showcase incredible Indian destinations, heritage hotels, domestic flights, and AI-driven itineraries powered by Google Gemini.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold">
            🇮🇳
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">100% Indian Focus</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Exclusively curated Indian states, heritage havelis, tea gardens, backwaters, and high mountain passes. Zero international clutter.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-500 flex items-center justify-center font-bold">
            🤖
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gemini AI Engine</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Generates day-wise custom itineraries, expense estimates, packing lists, and answers travel questions in real-time.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center font-bold">
            💾
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Client LocalStorage</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Zero backend server or database needed. All user trips, wishlist items, theme settings, and chat history persist locally.
          </p>
        </div>

      </div>

      {/* Tech Stack Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
        <h3 className="text-2xl font-black text-center text-amber-400">Technology Stack</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs font-semibold">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">React 18 & Vite</div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">Tailwind CSS</div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">Framer Motion</div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">Google Gemini API</div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">OpenWeather API</div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">Google Maps Embed</div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">jsPDF & html2canvas</div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">LocalStorage Sync</div>
        </div>
      </div>

    </div>
  );
};
