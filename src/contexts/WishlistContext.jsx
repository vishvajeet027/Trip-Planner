import React, { createContext, useContext, useState } from 'react';
import { storageService } from '../services/storageService';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => storageService.getWishlist());
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleWishlist = (item) => {
    const updated = storageService.toggleWishlist(item);
    setWishlist(updated);
    const exists = updated.some(w => w.id === item.id && w.type === item.type);
    showToast(exists ? `Added ${item.title || item.name} to Wishlist` : `Removed from Wishlist`);
  };

  const isWishlisted = (id, type) => {
    return wishlist.some(w => w.id === id && w.type === type);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, count: wishlist.length, toastMessage }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
