import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Sun, Thermometer, Sparkles } from 'lucide-react';
import { weatherService } from '../services/weatherService';

export const WeatherWidget = ({ cityName = 'Jaipur' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    weatherService.getWeatherByCity(cityName).then((data) => {
      if (isMounted) {
        setWeather(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [cityName]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
            Real-Time Weather
          </span>
          <h4 className="text-2xl font-black">{weather.city}</h4>
        </div>
        <span className="text-4xl">{weather.icon}</span>
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="text-5xl font-black tracking-tight">{weather.temp}°C</span>
        <span className="text-sm text-blue-100 font-medium">{weather.condition}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/20 text-xs">
        <div className="flex items-center space-x-1.5">
          <Droplets className="w-4 h-4 text-blue-200" />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Wind className="w-4 h-4 text-blue-200" />
          <span>Wind: {weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Cloud className="w-4 h-4 text-blue-200" />
          <span>Rain: {weather.rainChance}%</span>
        </div>
      </div>

      {weather.forecast && (
        <div className="pt-2 border-t border-white/20">
          <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider block mb-1.5">
            5-Day Forecast:
          </span>
          <div className="flex justify-between text-xs font-semibold">
            {weather.forecast.map((f, idx) => (
              <div key={idx} className="text-center bg-white/10 px-2 py-1 rounded-lg backdrop-blur-md">
                <span className="block text-[10px] text-blue-100">{f.day}</span>
                <span>{f.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
