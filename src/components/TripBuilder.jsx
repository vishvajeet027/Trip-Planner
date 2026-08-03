import React, { useState } from 'react';
import { Plus, Trash2, Edit3, MoveUp, MoveDown, Save, Copy, Download, Hotel, MapPin, Bus, Clock, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { useTrips } from '../contexts/TripContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export const TripBuilder = ({ existingTrip = null, onSaved }) => {
  const { saveTrip } = useTrips();

  const [tripTitle, setTripTitle] = useState(existingTrip?.title || 'My Royal India Vacation');
  const [destination, setDestination] = useState(existingTrip?.destination || 'Jaipur');
  const [startDate, setStartDate] = useState(existingTrip?.startDate || '2026-10-01');
  const [budget, setBudget] = useState(existingTrip?.budget || 'Luxury');

  const [days, setDays] = useState(existingTrip?.days || [
    {
      dayNumber: 1,
      hotel: 'Taj Lake Palace',
      places: 'Lake Pichola, City Palace',
      activities: 'Boat Ride, Sunset Photography',
      transport: 'Private Cab',
      time: '09:00 AM',
      notes: 'Dress code: Smart Casuals for Evening Palace Dining'
    },
    {
      dayNumber: 2,
      hotel: 'The Leela Palace',
      places: 'Jag Mandir, Saheliyon Ki Bari',
      activities: 'Cultural Folk Dance Show',
      transport: 'Auto Rickshaw / Walk',
      time: '10:00 AM',
      notes: 'Try traditional Mewari Thali at Ambrai'
    }
  ]);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add Day
  const handleAddDay = () => {
    const nextDayNum = days.length + 1;
    setDays([
      ...days,
      {
        dayNumber: nextDayNum,
        hotel: '',
        places: '',
        activities: '',
        transport: 'Private Taxi',
        time: '09:00 AM',
        notes: ''
      }
    ]);
  };

  // Delete Day
  const handleDeleteDay = (index) => {
    if (days.length <= 1) return;
    const updated = days.filter((_, idx) => idx !== index).map((d, i) => ({ ...d, dayNumber: i + 1 }));
    setDays(updated);
  };

  // Reorder Day
  const handleMoveDay = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= days.length) return;
    const copy = [...days];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    // re-assign day numbers
    const updated = copy.map((d, i) => ({ ...d, dayNumber: i + 1 }));
    setDays(updated);
  };

  // Edit Field
  const handleDayChange = (index, field, value) => {
    const copy = [...days];
    copy[index][field] = value;
    setDays(copy);
  };

  // Save Trip to LocalStorage
  const handleSave = () => {
    setSaving(true);
    const tripObj = {
      id: existingTrip?.id || 'custom_trip_' + Date.now(),
      title: tripTitle,
      destination,
      startDate,
      budget,
      daysCount: days.length,
      days,
      isCustom: true
    };
    saveTrip(tripObj);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      if (onSaved) onSaved(tripObj);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  // Export to PDF
  const handleExportPDF = async () => {
    const element = document.getElementById('trip-export-container');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${tripTitle.replace(/\s+/g, '_')}_Itinerary.pdf`);
    } catch (e) {
      console.error('PDF Export Error', e);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header controls & Export */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-auto space-y-2">
          <input
            type="text"
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
            className="text-2xl font-black text-slate-900 dark:text-white bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 focus:outline-none focus:border-blue-500 w-full"
            placeholder="Trip Title..."
          />
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>📍 Destination: </span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-900 dark:text-white font-semibold focus:outline-none"
            />
            <span>Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-900 dark:text-white font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={handleExportPDF}
            className="flex-1 md:flex-none px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-transform hover:scale-105 active:scale-95"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Trip'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Days List Container (Export Target) */}
      <div id="trip-export-container" className="space-y-4 p-2 bg-slate-50 dark:bg-slate-950/40 rounded-3xl">
        {days.map((day, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4"
          >
            {/* Day Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <span className="w-9 h-9 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                  {day.dayNumber}
                </span>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Day {day.dayNumber} Itinerary
                </h4>
              </div>

              {/* Day Controls */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleMoveDay(index, -1)}
                  disabled={index === 0}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg disabled:opacity-30"
                  title="Move Up"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMoveDay(index, 1)}
                  disabled={index === days.length - 1}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg disabled:opacity-30"
                  title="Move Down"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteDay(index)}
                  disabled={days.length <= 1}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-lg disabled:opacity-30"
                  title="Delete Day"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-500 dark:text-slate-400 block mb-1 flex items-center space-x-1">
                  <Hotel className="w-3.5 h-3.5 text-blue-500" />
                  <span>Hotel Stay</span>
                </label>
                <input
                  type="text"
                  value={day.hotel}
                  onChange={(e) => handleDayChange(index, 'hotel', e.target.value)}
                  placeholder="e.g. Taj Rambagh Palace..."
                  className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-500 dark:text-slate-400 block mb-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Places to Visit</span>
                </label>
                <input
                  type="text"
                  value={day.places}
                  onChange={(e) => handleDayChange(index, 'places', e.target.value)}
                  placeholder="e.g. Amber Fort, Hawa Mahal..."
                  className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-500 dark:text-slate-400 block mb-1 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Planned Activities</span>
                </label>
                <input
                  type="text"
                  value={day.activities}
                  onChange={(e) => handleDayChange(index, 'activities', e.target.value)}
                  placeholder="e.g. Elephant Ride, Folk Dance..."
                  className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-500 dark:text-slate-400 block mb-1 flex items-center space-x-1">
                  <Bus className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Mode of Transport</span>
                </label>
                <input
                  type="text"
                  value={day.transport}
                  onChange={(e) => handleDayChange(index, 'transport', e.target.value)}
                  placeholder="e.g. Private SUV Cab..."
                  className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-semibold text-slate-500 dark:text-slate-400 block mb-1 flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-purple-500" />
                  <span>Notes & Reminders</span>
                </label>
                <input
                  type="text"
                  value={day.notes}
                  onChange={(e) => handleDayChange(index, 'notes', e.target.value)}
                  placeholder="e.g. Book entry tickets online in advance..."
                  className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Add Day Button */}
      <button
        onClick={handleAddDay}
        className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-600 dark:text-slate-300 hover:text-blue-600 rounded-3xl font-bold text-sm flex items-center justify-center space-x-2 transition-all hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
      >
        <Plus className="w-5 h-5" />
        <span>Add Another Day</span>
      </button>

    </div>
  );
};
