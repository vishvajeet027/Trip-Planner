// LocalStorage Service for TravelAI India
const KEYS = {
  USER: 'travelai_user',
  TRIPS: 'travelai_trips',
  WISHLIST: 'travelai_wishlist',
  BOOKINGS: 'travelai_bookings',
  RECENT_SEARCHES: 'travelai_recent_searches',
  THEME: 'travelai_theme',
  AI_HISTORY: 'travelai_ai_history',
  SETTINGS: 'travelai_settings',
  NOTIFICATIONS: 'travelai_notifications',
};

// Safe JSON Parse
const getJSON = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from LocalStorage`, e);
    return fallback;
  }
};

// Safe JSON Stringify
const setJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to LocalStorage`, e);
  }
};

export const storageService = {
  KEYS,
  // User Profile
  getUser: () => getJSON(KEYS.USER, { name: 'Traveller', email: 'guest@travelai.in', avatar: '' }),
  setUser: (user) => setJSON(KEYS.USER, user),

  // Trips (Custom & AI Generated)
  getTrips: () => getJSON(KEYS.TRIPS, []),
  saveTrip: (trip) => {
    const trips = getJSON(KEYS.TRIPS, []);
    const index = trips.findIndex(t => t.id === trip.id);
    if (index >= 0) {
      trips[index] = { ...trip, updatedAt: new Date().toISOString() };
    } else {
      trips.unshift({ ...trip, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    setJSON(KEYS.TRIPS, trips);
    return trips;
  },
  deleteTrip: (tripId) => {
    const trips = getJSON(KEYS.TRIPS, []);
    const updated = trips.filter(t => t.id !== tripId);
    setJSON(KEYS.TRIPS, updated);
    return updated;
  },
  duplicateTrip: (tripId) => {
    const trips = getJSON(KEYS.TRIPS, []);
    const target = trips.find(t => t.id === tripId);
    if (target) {
      const cloned = {
        ...target,
        id: 'trip_' + Date.now(),
        title: `${target.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      trips.unshift(cloned);
      setJSON(KEYS.TRIPS, trips);
    }
    return trips;
  },

  // Bookings (Hotels, Flights, Tour Packages)
  getBookings: () => getJSON(KEYS.BOOKINGS, [
    {
      id: 'BK-102938',
      title: 'Grand Palace Resort Goa',
      type: 'Hotel',
      date: '2026-09-10',
      price: 18500,
      userEmail: 'user@travelai.in',
      userName: 'Rahul Sharma',
      status: 'Pending',
      bookedAt: new Date().toISOString()
    },
    {
      id: 'BK-492019',
      title: 'IndiGo Flight DEL -> BOM',
      type: 'Flight',
      date: '2026-08-15',
      price: 5400,
      userEmail: 'user@travelai.in',
      userName: 'Rahul Sharma',
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    }
  ]),
  saveBooking: (booking) => {
    const bookings = getJSON(KEYS.BOOKINGS, []);
    const newBooking = {
      ...booking,
      id: booking.id || 'BK-' + Math.floor(100000 + Math.random() * 900000),
      status: booking.status || 'Confirmed',
      bookedAt: new Date().toISOString()
    };
    bookings.unshift(newBooking);
    setJSON(KEYS.BOOKINGS, bookings);
    return bookings;
  },
  updateBookingStatus: (bookingId, newStatus) => {
    const bookings = getJSON(KEYS.BOOKINGS, []);
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    setJSON(KEYS.BOOKINGS, updated);
    return updated;
  },
  deleteBooking: (bookingId) => {
    const bookings = getJSON(KEYS.BOOKINGS, []);
    const updated = bookings.filter(b => b.id !== bookingId);
    setJSON(KEYS.BOOKINGS, updated);
    return updated;
  },

  // Wishlist
  getWishlist: () => getJSON(KEYS.WISHLIST, []),
  toggleWishlist: (item) => {
    const wishlist = getJSON(KEYS.WISHLIST, []);
    const existsIndex = wishlist.findIndex(w => w.id === item.id && w.type === item.type);
    let updated;
    if (existsIndex >= 0) {
      updated = wishlist.filter((_, idx) => idx !== existsIndex);
    } else {
      updated = [{ ...item, addedAt: new Date().toISOString() }, ...wishlist];
    }
    setJSON(KEYS.WISHLIST, updated);
    return updated;
  },
  isWishlisted: (id, type) => {
    const wishlist = getJSON(KEYS.WISHLIST, []);
    return wishlist.some(w => w.id === id && w.type === type);
  },

  // Recent Searches
  getRecentSearches: () => getJSON(KEYS.RECENT_SEARCHES, []),
  addRecentSearch: (query) => {
    if (!query) return;
    let searches = getJSON(KEYS.RECENT_SEARCHES, []);
    searches = [query, ...searches.filter(s => s !== query)].slice(0, 8);
    setJSON(KEYS.RECENT_SEARCHES, searches);
    return searches;
  },
  clearRecentSearches: () => setJSON(KEYS.RECENT_SEARCHES, []),

  // Theme
  getTheme: () => localStorage.getItem(KEYS.THEME) || 'light',
  setTheme: (theme) => localStorage.setItem(KEYS.THEME, theme),

  // AI History
  getAIHistory: () => getJSON(KEYS.AI_HISTORY, []),
  saveAIConversation: (msg) => {
    const history = getJSON(KEYS.AI_HISTORY, []);
    history.push({ ...msg, timestamp: new Date().toISOString() });
    setJSON(KEYS.AI_HISTORY, history);
    return history;
  },
  clearAIHistory: () => setJSON(KEYS.AI_HISTORY, []),

  // Settings
  getSettings: () => getJSON(KEYS.SETTINGS, { currency: 'INR', unit: 'C', notificationsEnabled: true }),
  setSettings: (settings) => setJSON(KEYS.SETTINGS, settings)
};
