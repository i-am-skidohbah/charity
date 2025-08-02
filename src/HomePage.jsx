// src/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Slideshow from './components/Slideshow';
import TogetherSection from './components/TogetherSection';
import CompassionSection from './components/CompassionSection';
import PopularCausesSection from './components/PopularCausesSection';
import InspirationSection from './components/InspirationSection';
import JoinUsSection from './components/JoinUsSection';
import JoinUsFooterSection from './components/JoinUsFooterSection';
import Footer from './components/Footer';

function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Firebase loading (replace with your actual Firebase data loading logic)
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-blue-800 font-bold text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-[Poppins]">
      {/* Top Blue Bar */}
      <div className="w-full h-8 rounded-b-xl" style={{ backgroundColor: '#1253a2' }} />

      {/* Navbar */}
      <Navbar />
      <div style={{ width: '100%' }}>
        {/* Slideshow Section */}
        <Slideshow />

        {/* Together Section */}
        <TogetherSection />

        {/* Compassion Section */}
        <CompassionSection />

        {/* Popular Causes Section */}
        <PopularCausesSection />

        {/* Inspiration Section */}
        <InspirationSection />
      </div>

      {/* Footer */}
      <JoinUsFooterSection />
    </div>
  );
}

export default HomePage;
