import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FlightCard } from '../components/FlightCard';
import { Modal } from '../components/Modal';
import { storageService } from '../services/storageService';
import flightsData from '../data/flights.json';
import { Plane, Calendar, Users, ArrowRightLeft, ShieldCheck, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Flights = () => {
  const [searchParams] = useSearchParams();
  const initialTo = searchParams.get('to') || '';

  const [fromCity, setFromCity] = useState('Delhi (DEL)');
  const [toCity, setToCity] = useState(initialTo || 'Goa (GOI)');
  const [departureDate, setDepartureDate] = useState('2026-09-15');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [selectedAirline, setSelectedAirline] = useState('');

  // Booking Modal
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState('12A');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Extract unique airlines
  const airlines = useMemo(() => {
    return Array.from(new Set(flightsData.map(f => f.airline)));
  }, []);

  // Filter flights matching Indian routes
  const availableFlights = useMemo(() => {
    return flightsData.filter(flight => {
      const matchesTo = !toCity || flight.toCity.toLowerCase().includes(toCity.toLowerCase().split(' ')[0]);
      const matchesAirline = !selectedAirline || flight.airline === selectedAirline;
      return matchesTo && matchesAirline;
    });
  }, [toCity, selectedAirline]);

  const handleConfirmFlight = (e) => {
    e.preventDefault();
    if (selectedFlight) {
      storageService.saveBooking({
        type: 'Flight Ticket',
        title: `${selectedFlight.airline} (${selectedFlight.flightNumber})`,
        city: selectedFlight.fromCity,
        state: selectedFlight.toCity,
        totalPrice: selectedFlight.price * passengers,
        details: `Route: ${selectedFlight.fromCity} ➔ ${selectedFlight.toCity} • Seat: ${selectedSeat} • Date: ${departureDate} • ${passengers} Passenger(s)`
      });
    }
    setBookingConfirmed(true);
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedFlight(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
          Indian Domestic Airways
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Domestic Flights Across India
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Search domestic flight options connecting Delhi, Mumbai, Bengaluru, Goa, Srinagar, Jaipur, Kochi, and Leh.
        </p>
      </div>

      {/* Flight Search Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">From Airport</label>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white font-semibold focus:outline-none"
            >
              <option value="Delhi (DEL)">Delhi (DEL)</option>
              <option value="Mumbai (BOM)">Mumbai (BOM)</option>
              <option value="Bengaluru (BLR)">Bengaluru (BLR)</option>
              <option value="Hyderabad (HYD)">Hyderabad (HYD)</option>
              <option value="Kolkata (CCU)">Kolkata (CCU)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">To Airport</label>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white font-semibold focus:outline-none"
            >
              <option value="">All Indian Airports</option>
              <option value="Goa (GOI)">Goa (GOI)</option>
              <option value="Jaipur (JAI)">Jaipur (JAI)</option>
              <option value="Srinagar (SXR)">Srinagar (SXR)</option>
              <option value="Kochi (COK)">Kochi (COK)</option>
              <option value="Leh (IXL)">Leh (IXL)</option>
              <option value="Udaipur (UDR)">Udaipur (UDR)</option>
              <option value="Port Blair (IXZ)">Port Blair (IXZ)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Departure Date</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Passengers</label>
            <input
              type="number"
              min="1"
              max="9"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Cabin Class</label>
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white font-semibold focus:outline-none"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

        </div>
      </div>

      {/* Airline Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter Airline:</span>
        <button
          onClick={() => setSelectedAirline('')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedAirline === ''
              ? 'bg-blue-600 text-white shadow'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          All Airlines
        </button>
        {airlines.map(airline => (
          <button
            key={airline}
            onClick={() => setSelectedAirline(airline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedAirline === airline
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {airline}
          </button>
        ))}
      </div>

      {/* Flight Results */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Available Flights ({availableFlights.length})
        </h3>

        {availableFlights.map(flight => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onBook={(f) => setSelectedFlight(f)}
          />
        ))}
      </div>

      {/* Demo Booking Modal */}
      <Modal
        isOpen={!!selectedFlight}
        onClose={() => setSelectedFlight(null)}
        title={selectedFlight ? `Book Flight: ${selectedFlight.airline} (${selectedFlight.flightNumber})` : ''}
      >
        {bookingConfirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">Boarding Pass Issued!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Seat {selectedSeat} reserved for {selectedFlight?.fromCity} to {selectedFlight?.toCity}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmFlight} className="space-y-4 text-xs font-semibold">
            {selectedFlight && (
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{selectedFlight.airline} • {selectedFlight.flightNumber}</span>
                    <span className="text-slate-500 block">{selectedFlight.departureTime} ➔ {selectedFlight.arrivalTime} ({selectedFlight.duration})</span>
                  </div>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                    ₹{(selectedFlight.price * passengers).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-500 block mb-1">Primary Passenger</label>
                <input
                  type="text"
                  defaultValue="Rohan Sharma"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Select Seat</label>
                <select
                  value={selectedSeat}
                  onChange={(e) => setSelectedSeat(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="12A">12A (Window)</option>
                  <option value="12B">12B (Middle)</option>
                  <option value="12C">12C (Aisle)</option>
                  <option value="14F">14F (Extra Legroom Window)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">{passengers} Passenger(s) • {travelClass}</span>
                <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                  ₹{(selectedFlight ? selectedFlight.price * passengers : 0).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25"
              >
                Confirm Flight Reservation
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
