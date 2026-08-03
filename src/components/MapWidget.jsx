import React from 'react';
import { MapPin } from 'lucide-react';

export const MapWidget = ({ location = 'Jaipur, Rajasthan', title = 'Interactive Map' }) => {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.1102!2d75.8085!3d26.8953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db42125555555%3A0x6000000000000000!2s${encodeURIComponent(location)}!5e0!3m2!1sen!2sin!4v1700000000000`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
      <div className="flex items-center space-x-2">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
          {title} - {location}
        </h4>
      </div>
      <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <iframe
          title={location}
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
    </div>
  );
};
