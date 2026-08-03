import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
          Get in Touch
        </span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Contact TravelAI India
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Have questions about Indian destinations or custom itineraries? Send us a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Send Us a Message</h3>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl space-y-3 border border-emerald-500/20">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">Message Sent Successfully!</h4>
              <p className="text-xs text-slate-500">Thank you for reaching out to TravelAI India team. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="text-slate-500 dark:text-slate-400 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rohan Sharma"
                  className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-500 dark:text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="rohan@example.com"
                  className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-500 dark:text-slate-400 block mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Ask about hotels, customized packages, or college submission details..."
                  className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4 text-xs">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Headquarters India</h3>
            
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Connaught Place, New Delhi, 110001, India</span>
            </div>
            
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
              <Mail className="w-5 h-5 text-blue-500 shrink-0" />
              <span>support@travelai.in</span>
            </div>

            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
              <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>+91 (011) 2345-6789</span>
            </div>
          </div>

          <div className="h-64 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
            <iframe
              title="India HQ Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9961!2d77.2167!3d28.6328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
