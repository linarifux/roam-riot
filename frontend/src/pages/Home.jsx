import React from 'react';
import { useSelector } from 'react-redux';

// Components for Guest View
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';

// Components for Logged In View
import Dashboard from './Dashboard'; 

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  // 1. If Logged In -> Show Dashboard
  if (user) {
    return <Dashboard />;
  }

  // 2. If Guest -> Show Landing Page
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <HeroSection />
      <FeaturesSection />
      
      {/* Decorative Strip */}
      <div className="w-full h-2 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
    </div>
  );
};

export default Home;