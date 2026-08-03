import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { geminiService } from '../services/geminiService';
import { useTrips } from '../contexts/TripContext';
import { WeatherWidget } from '../components/WeatherWidget';
import { MapWidget } from '../components/MapWidget';
import { Sparkles, Calendar, MapPin, DollarSign, Users, Hotel, Compass, RefreshCw, Save, CheckCircle2, Download, Luggage, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export const AITripPlanner = () => {
  const [searchParams] = useSearchParams();
  const initialDest = searchParams.get('destination') || 'Jaipur';

  const { saveTrip } = useTrips();

  // Form State
  const [startCity, setStartCity] = useState('Delhi');
  const [destination, setDestination] = useState(initialDest);
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-04');
  const [budget, setBudget] = useState('Luxury');
  const [travelers, setTravelers] = useState(2);
  const [hotelType, setHotelType] = useState('Luxury Heritage');
  const [travelStyle, setTravelStyle] = useState('Culture & Heritage');

  // Generation State
  const [loading, setLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setGeneratedTrip(null);
    setSavedSuccess(false);

    try {
      const trip = await geminiService.generateTripItinerary({
        startCity,
        destination,
        startDate,
        endDate,
        budget,
        travelers,
        hotelType,
        travelStyle
      });
      setGeneratedTrip(trip);
      saveTrip(trip); // Automatically store in LocalStorage
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExplicit = () => {
    if (generatedTrip) {
      saveTrip(generatedTrip);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('ai-trip-pdf-content');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`AI_${destination}_Itinerary.pdf`);
    } catch (e) {
      console.error('Export Error', e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Gemini AI Smart Travel Engine</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          AI Indian Trip Planner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Enter your preferences to instantly generate a tailored day-by-day itinerary, hotel picks, expense summary, and local tips across India.
        </p>
      </div>

      {/* Preferences Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-6">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-semibold">
          
          {/* Starting City */}
          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">Starting City</label>
            <input
              type="text"
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              placeholder="e.g. Delhi, Mumbai..."
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">Destination City</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Jaipur, Goa, Munnar..."
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Start & End Dates */}
          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">Budget Level</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none"
            >
              <option value="Budget">Economy / Budget</option>
              <option value="Moderate">Moderate Comfortable</option>
              <option value="Luxury">Luxury Royal</option>
            </select>
          </div>

          {/* Travelers */}
          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">Travelers</label>
            <input
              type="number"
              min="1"
              max="12"
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none"
            />
          </div>

          {/* Hotel Type */}
          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">Hotel Style</label>
            <select
              value={hotelType}
              onChange={(e) => setHotelType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none"
            >
              <option value="Luxury Heritage">Luxury Heritage Haveli</option>
              <option value="Beach Resort">5-Star Beach Resort</option>
              <option value="Boutique Stay">Boutique Villa</option>
              <option value="Nature Resort">Eco Retreat</option>
            </select>
          </div>

          {/* Travel Style */}
          <div>
            <label className="text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">Travel Style</label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none"
            >
              <option value="Culture & Heritage">Culture & Heritage</option>
              <option value="Adventure & Sports">Adventure & Sports</option>
              <option value="Nature & Relaxation">Nature & Relaxation</option>
              <option value="Family Friendly">Family Friendly</option>
              <option value="Religious & Spiritual">Religious & Spiritual</option>
              <option value="Solo Discovery">Solo Discovery</option>
              <option value="Food & Culinary">Food & Culinary</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="sm:col-span-2 lg:col-span-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              <span>{loading ? 'Consulting Gemini AI...' : 'Generate Indian AI Itinerary'}</span>
            </button>
          </div>

        </form>
      </div>

      {/* AI Results Section */}
      {loading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-3xl animate-bounce">
            🤖
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Designing Your {destination} Experience...</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Structuring optimal day-wise plans, calculating Indian Rupee budget breakdown, and curating local dining spots.
          </p>
        </div>
      )}

      {generatedTrip && !loading && (
        <div className="space-y-8" id="ai-trip-pdf-content">
          
          {/* Action Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved in LocalStorage (`travelai_trips`)</span>
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {generatedTrip.title}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportPDF}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={handleGenerate}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-md shadow-amber-500/20"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          {/* Grid Layout (Itinerary Timeline & Widgets) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Day-wise Itinerary */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <span>Day-Wise Schedule</span>
              </h3>

              {generatedTrip.dayWiseItinerary?.map((day) => (
                <div
                  key={day.day}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      {day.title || `Day ${day.day}`}
                    </span>
                    <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-2.5 py-1 rounded-full">
                      Est. ₹{day.estimatedExpense?.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">🌅 Morning (09:00 AM)</span>
                      <p>{day.morning}</p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">☀️ Afternoon (01:00 PM)</span>
                      <p>{day.afternoon}</p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">🌙 Evening (06:30 PM)</span>
                      <p>{day.evening}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Col: Weather & Expenses & Tips */}
            <div className="space-y-6">
              
              {/* Weather Card */}
              <WeatherWidget cityName={destination} />

              {/* Expense Breakdown */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Estimated Budget Summary
                </h4>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  ₹{generatedTrip.estimatedExpenses?.total?.toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-slate-400 block -mt-2">
                  ₹{generatedTrip.estimatedExpenses?.perPerson?.toLocaleString('en-IN')} per traveler
                </span>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Accommodation:</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{generatedTrip.estimatedExpenses?.breakdown?.accommodation?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transport:</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{generatedTrip.estimatedExpenses?.breakdown?.transportation?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Food & Dining:</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{generatedTrip.estimatedExpenses?.breakdown?.foodAndDining?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Packing Essentials */}
              {generatedTrip.packingList && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                    <Luggage className="w-4 h-4 text-amber-500" />
                    <span>Packing Checklist</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {generatedTrip.packingList.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-blue-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Map */}
              <MapWidget location={`${destination}, India`} title="Destination Map" />

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
