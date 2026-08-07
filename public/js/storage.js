/**
 * LocalStorage Storage Manager
 * Safely persists generated trip itineraries without requiring an external database.
 */

class StorageManager {
  constructor() {
    this.STORAGE_KEY = 'ai_trip_planner_saved_trips';
  }

  /**
   * Retrieves all saved trips from browser localStorage.
   * @returns {Array} Array of saved trip objects
   */
  getSavedTrips() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
      return [];
    }
  }

  /**
   * Saves a new generated trip to localStorage.
   * @param {Object} tripObj 
   * @returns {boolean} Success status
   */
  saveTrip(tripObj) {
    try {
      const trips = this.getSavedTrips();
      // Add unique ID and timestamp
      const newTrip = {
        id: 'trip_' + Date.now(),
        createdAt: new Date().toISOString(),
        ...tripObj
      };
      trips.unshift(newTrip); // latest first
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trips));
      return true;
    } catch (e) {
      console.error('Failed to save trip to localStorage:', e);
      return false;
    }
  }

  /**
   * Deletes a trip by ID.
   * @param {string} tripId 
   */
  deleteTrip(tripId) {
    try {
      let trips = this.getSavedTrips();
      trips = trips.filter(t => t.id !== tripId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trips));
      return true;
    } catch (e) {
      console.error('Failed to delete trip:', e);
      return false;
    }
  }
}

window.storageManager = new StorageManager();
