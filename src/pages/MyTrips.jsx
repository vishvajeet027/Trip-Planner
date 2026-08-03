import React, { useState, useEffect } from 'react';
import { useTrips } from '../contexts/TripContext';
import { TripBuilder } from '../components/TripBuilder';
import { storageService } from '../services/storageService';
import { MapPin, Calendar, Trash2, Copy, Eye, Download, Sparkles, Plus, Compass, CheckCircle2, Ticket, Building, Plane, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const MyTrips = () => {
  const { trips, deleteTrip, duplicateTrip, bookings, deleteBooking } = useTrips();
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' or 'bookings'
  const [activeEditingTrip, setActiveEditingTrip] = useState(null);

  const handleDeleteBooking = (bookingId) => {
    deleteBooking(bookingId);
  };

  const handleExportSingle = async (tripTitle, tripId) => {
    const el = document.getElementById(`trip-card-${tripId}`);
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${tripTitle.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
            LocalStorage Workspace
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            My Travel Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/custom-planner"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Trip</span>
          </Link>
          <Link
            to="/ai-planner"
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/25 flex items-center space-x-1.5 transition-transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Trip Planner</span>
          </Link>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveTab('trips')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center space-x-2 ${
            activeTab === 'trips'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Saved Trips & Plans ({trips.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center space-x-2 ${
            activeTab === 'bookings'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>My Bookings & Reservations ({bookings.length})</span>
        </button>
      </div>

      {/* Tab Content: Saved Trips */}
      {activeTab === 'trips' && (
        <div className="space-y-6">
          {activeEditingTrip && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-blue-500 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Editing Trip: {activeEditingTrip.title}</h3>
                <button
                  onClick={() => setActiveEditingTrip(null)}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Close Editor
                </button>
              </div>
              <TripBuilder existingTrip={activeEditingTrip} onSaved={() => setActiveEditingTrip(null)} />
            </div>
          )}

          {trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map(trip => (
                <div
                  key={trip.id}
                  id={`trip-card-${trip.id}`}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        trip.isAIGenerated
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      }`}>
                        {trip.isAIGenerated ? '✨ Gemini AI Trip' : '✍️ Custom Built'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {trip.daysCount || trip.days?.length || 3} Days
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1">
                      {trip.title}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <p className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>Destination: <strong className="text-slate-900 dark:text-white">{trip.destination}</strong></span>
                      </p>
                      {trip.startDate && (
                        <p className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-500" />
                          <span>Start Date: {trip.startDate}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setActiveEditingTrip(trip)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View / Edit</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => duplicateTrip(trip.id)}
                        title="Duplicate Trip"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleExportSingle(trip.title, trip.id)}
                        title="Export PDF"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteTrip(trip.id)}
                        title="Delete Trip"
                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mx-auto text-3xl">
                🧳
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Saved Trips Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Use the AI Trip Planner or Custom Planner to build your dream Indian holiday and save it locally!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Bookings & Reservations */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-4 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center space-x-1 ${
                        item.status === 'Confirmed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : item.status === 'Cancelled'
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>
                          {item.status === 'Confirmed' && 'Confirmed ✅'}
                          {item.status === 'Cancelled' && 'Cancelled ❌'}
                          {(!item.status || item.status === 'Pending') && 'Pending Approval ⏳'}
                        </span>
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {item.id}
                      </span>
                    </div>

                    <div className="flex items-start space-x-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0"
                        />
                      )}
                      <div>
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                          {item.type}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          📍 {item.city}, {item.state}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <p>{item.details}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Total Amount Paid</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        ₹{item.totalPrice?.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteBooking(item.id)}
                      className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Booking</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                🎟️
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Active Bookings</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore Hotels, Domestic Flights, or Tour Packages and confirm a demo reservation to see it listed here!
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
