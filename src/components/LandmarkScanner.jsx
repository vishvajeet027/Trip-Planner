import React, { useState } from 'react';
import { Camera, Sparkles, MapPin, Clock, DollarSign, Star, CheckCircle, Info, Upload } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const LandmarkScanner = () => {
  const [selectedLandmark, setSelectedLandmark] = useState('Amber Fort');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const sampleLandmarks = [
    { name: 'Amber Fort', city: 'Jaipur', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80' },
    { name: 'Hawa Mahal', city: 'Jaipur', img: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=600&q=80' },
    { name: 'Lake Pichola Boat Ride', city: 'Udaipur', img: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f1c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Dal Lake & Houseboats', city: 'Srinagar', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleScan = async (name) => {
    setScanning(true);
    setSelectedLandmark(name);
    try {
      const data = await geminiService.recognizeLandmark(name);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Camera className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">📸 AI Visual Landmark Recognizer</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Scan or select a photo of any Indian heritage site, fort, or temple to get instant history, ticket fees & photo tips.</p>
        </div>
      </div>

      {/* Preset Pickers / Upload Simulation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sampleLandmarks.map((lm) => (
          <button
            key={lm.name}
            onClick={() => handleScan(lm.name)}
            className={`relative rounded-2xl overflow-hidden border-2 text-left transition-all ${
              selectedLandmark === lm.name
                ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]'
                : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={lm.img} alt={lm.name} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-2 flex flex-col justify-end">
              <span className="text-white text-xs font-bold truncate">{lm.name}</span>
              <span className="text-purple-300 text-[10px] font-medium">{lm.city}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Action Scanner button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-purple-50 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/30">
        <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-300">
          <Upload className="w-5 h-5 text-purple-500" />
          <span>Upload photo or select preset landmark above to trigger Gemini recognition</span>
        </div>
        <button
          onClick={() => handleScan(selectedLandmark)}
          disabled={scanning}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-purple-500/30 hover:scale-105 transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{scanning ? 'Analyzing Image with AI...' : `Scan ${selectedLandmark}`}</span>
        </button>
      </div>

      {/* Result Display */}
      {result && !scanning && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="md:col-span-1 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <img src={result.image} alt={result.landmarkName} className="w-full h-48 sm:h-full object-cover" />
          </div>
          <div className="md:col-span-2 space-y-4 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-[10px] font-bold uppercase mb-1">
                  {result.category}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{result.landmarkName}</h3>
                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-500" /> {result.location}, India
                </p>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-amber-500/10 text-amber-600 font-bold rounded-full">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{result.rating}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {result.historicalContext}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Entry Fee</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">{result.entryFee}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Timings</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">{result.timings}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> AI Insider Tips
              </h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-5 list-disc">
                {result.localTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
