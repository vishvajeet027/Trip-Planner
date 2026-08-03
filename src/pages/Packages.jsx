import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PackageCard } from '../components/PackageCard';
import { Modal } from '../components/Modal';
import { storageService } from '../services/storageService';
import packagesData from '../data/packages.json';
import { Package, MapPin, CheckCircle2, Star, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Packages = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedRegion, setSelectedRegion] = useState('');

  // Selected Booking Modal
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [booked, setBooked] = useState(false);

  const filteredPackages = useMemo(() => {
    return packagesData.filter(pkg => {
      const matchesSearch = searchQuery === '' ||
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === '' || pkg.region.toLowerCase() === selectedRegion.toLowerCase();
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const handleConfirmPackage = (e) => {
    e.preventDefault();
    if (selectedPkg) {
      storageService.saveBooking({
        type: 'Tour Package',
        title: selectedPkg.name,
        city: selectedPkg.region,
        state: 'India',
        image: selectedPkg.image,
        totalPrice: selectedPkg.discountPrice,
        details: `${selectedPkg.durationDays} Days / ${selectedPkg.durationNights} Nights • ${selectedPkg.meals}`
      });
    }
    setBooked(true);
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setBooked(false);
      setSelectedPkg(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-500">
          All-Inclusive Curated Holidays
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Handcrafted Indian Tour Packages
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Discover luxury packages across Goa beaches, Rajasthan forts, Kerala houseboats, Kashmir snow valleys, and Andaman reefs.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter Region:</span>
        {['', 'Goa', 'Rajasthan', 'Kerala', 'Kashmir', 'Himachal Pradesh', 'Ladakh', 'Andaman'].map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedRegion === reg
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
            }`}
          >
            {reg === '' ? 'All Regions' : reg}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map(pkg => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onBook={(p) => setSelectedPkg(p)}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedPkg}
        onClose={() => setSelectedPkg(null)}
        title={selectedPkg ? `Book Package: ${selectedPkg.name}` : ''}
      >
        {booked ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">Tour Reserved!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your demo reservation for {selectedPkg?.name} ({selectedPkg?.durationDays} Days) has been saved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmPackage} className="space-y-4 text-xs">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block text-sm">{selectedPkg?.name}</span>
                <span className="text-slate-500">📍 {selectedPkg?.region} • {selectedPkg?.durationDays} Days</span>
              </div>
              <span className="text-xl font-black text-amber-500">₹{selectedPkg?.discountPrice.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-slate-500 block">Traveller Full Name</label>
              <input
                type="text"
                defaultValue="Rohan Sharma"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25"
              >
                Confirm Tour Booking
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
