import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export const MapWidget = ({ location = 'Jaipur, Rajasthan', title = 'Interactive Real-World Map' }) => {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const openMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
              {title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">📍 {location}</p>
          </div>
        </div>

        <a
          href={openMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Large Full Width Map Container */}
      <div className="w-full h-96 sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-inner">
        <iframe
          title={location}
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};
