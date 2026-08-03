import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Sparkles } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-4xl font-black">
          404
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Destination Not Found
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Looks like this travel route hasn't been mapped yet. Return to the home page or try our Gemini AI Planner!
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3 pt-2">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center space-x-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>

          <Link
            to="/ai-planner"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/25 flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Planner</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
