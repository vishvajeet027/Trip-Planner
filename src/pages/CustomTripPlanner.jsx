import React, { useState } from 'react';
import { TripBuilder } from '../components/TripBuilder';
import { Sparkles, Calendar, MapPin, Download, Save } from 'lucide-react';

export const CustomTripPlanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
          Manual Itinerary Designer
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Custom Trip Planner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Craft your Indian vacation manually step-by-step. Add hotel stays, places to visit, activities, transport, reorder days, and export as PDF.
        </p>
      </div>

      <TripBuilder />

    </div>
  );
};
