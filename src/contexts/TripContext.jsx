import React, { createContext, useContext, useState } from 'react';
import { storageService } from '../services/storageService';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState(() => storageService.getTrips());
  const [bookings, setBookings] = useState(() => storageService.getBookings());
  const [activeTrip, setActiveTrip] = useState(null);

  const saveTrip = (trip) => {
    const updated = storageService.saveTrip(trip);
    setTrips(updated);
    return updated;
  };

  const deleteTrip = (tripId) => {
    const updated = storageService.deleteTrip(tripId);
    setTrips(updated);
    return updated;
  };

  const duplicateTrip = (tripId) => {
    const updated = storageService.duplicateTrip(tripId);
    setTrips(updated);
    return updated;
  };

  const saveBooking = (booking) => {
    const updated = storageService.saveBooking(booking);
    setBookings(updated);
    return updated;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    const updated = storageService.updateBookingStatus(bookingId, newStatus);
    setBookings(updated);
    return updated;
  };

  const deleteBooking = (bookingId) => {
    const updated = storageService.deleteBooking(bookingId);
    setBookings(updated);
    return updated;
  };

  return (
    <TripContext.Provider value={{ trips, activeTrip, setActiveTrip, saveTrip, deleteTrip, duplicateTrip, bookings, saveBooking, updateBookingStatus, deleteBooking }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => useContext(TripContext);

