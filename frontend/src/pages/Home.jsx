import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <HeroSection />
      <FeaturesSection />
      
      {/* Random Memory Strip (Placeholder for future dynamic content) */}
      <div className="w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
      
    </div>
  );
};

export default Home;