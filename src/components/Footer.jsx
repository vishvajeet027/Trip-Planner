import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Send, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                TravelAI <span className="text-amber-400">India</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover India's magnificent palaces, pristine backwaters, snow-capped Himalayas, and sunny beaches with personalized AI-powered itineraries and luxury stays.
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 bg-slate-900 w-fit px-3 py-1.5 rounded-full border border-slate-800">
              <span>🇮🇳 100% Domestic Indian Travel Experience</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/hotels" className="hover:text-amber-400 transition-colors">Indian Hotels</Link></li>
              <li><Link to="/flights" className="hover:text-amber-400 transition-colors">Domestic Flights</Link></li>
              <li><Link to="/packages" className="hover:text-amber-400 transition-colors">Tour Packages</Link></li>
              <li><Link to="/ai-planner" className="hover:text-amber-400 transition-colors flex items-center space-x-1"><Sparkles className="w-3.5 h-3.5 text-amber-400" /><span>AI Trip Planner</span></Link></li>
            </ul>
          </div>

          {/* Top Regions */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base">Top Regions</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/hotels?state=Rajasthan" className="hover:text-amber-400 transition-colors">Rajasthan Palaces</Link></li>
              <li><Link to="/hotels?state=Goa" className="hover:text-amber-400 transition-colors">Goa Beaches</Link></li>
              <li><Link to="/hotels?state=Kerala" className="hover:text-amber-400 transition-colors">Kerala Backwaters</Link></li>
              <li><Link to="/hotels?state=Jammu+%26+Kashmir" className="hover:text-amber-400 transition-colors">Kashmir Valleys</Link></li>
              <li><Link to="/hotels?state=Himachal+Pradesh" className="hover:text-amber-400 transition-colors">Himachal Snow</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base">Travel Insights</h4>
            <p className="text-xs text-slate-400">Subscribe for curated Indian travel itineraries & secret hotel offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} TravelAI India. College Project Submission. Frontend Only.</p>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="flex items-center space-x-1 text-slate-400">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>for India</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
