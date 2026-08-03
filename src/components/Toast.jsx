import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = () => {
  const { toastMessage } = useWishlist();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border border-slate-700/80 flex items-center space-x-3 text-sm font-semibold"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
