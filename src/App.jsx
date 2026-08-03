import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { TripProvider } from './contexts/TripContext';

// Components & Layout
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { Toast } from './components/Toast';
import { Breadcrumb } from './components/Breadcrumb';
import { BackToTop } from './components/BackToTop';

// Pages
import { Home } from './pages/Home';
import { Hotels } from './pages/Hotels';
import { Flights } from './pages/Flights';
import { Packages } from './pages/Packages';
import { AITripPlanner } from './pages/AITripPlanner';
import { CustomTripPlanner } from './pages/CustomTripPlanner';
import { MyTrips } from './pages/MyTrips';
import { Wishlist } from './pages/Wishlist';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <TripProvider>
          <Router>
            <div className="min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white">
              
              {/* Sticky Navbar */}
              <Navbar />

              {/* Dynamic Breadcrumbs */}
              <Breadcrumb />

              {/* Page Viewport */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/flights" element={<Flights />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/ai-planner" element={<AITripPlanner />} />
                  <Route path="/custom-planner" element={<CustomTripPlanner />} />
                  <Route path="/my-trips" element={<MyTrips />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Global Floating Controls */}
              <AIChat />
              <Toast />
              <BackToTop />

              {/* Footer */}
              <Footer />

            </div>
          </Router>
        </TripProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
