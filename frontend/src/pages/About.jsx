import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Heart, Zap, Globe, Users, Coffee } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#0f172a] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-[-100px] w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We Make Travel <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">Chaos</span> Beautiful.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            RoamRiot is a rebellion against boring spreadsheets and rigid itineraries. 
            We build tools for the modern wanderer who wants to plan less and live more.
          </p>
        </div>

        {/* The Mission */}
        <GlassCard className="p-8 md:p-12 mb-16 border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                It started with a missed train in Tokyo and a lost backpack in Peru. We realized that while the best travel memories often come from unplanned moments, the worst stress comes from bad logistics.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We built RoamRiot to handle the boring stuff—budgeting, itinerary tracking, and expense splitting—so you have the mental space to say "yes" to random adventures.
              </p>
            </div>
            <div className="shrink-0 p-6 bg-slate-800/50 rounded-2xl rotate-3 border border-white/5">
               <Globe size={80} className="text-cyan-400" />
            </div>
          </div>
        </GlassCard>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassCard className="p-6 text-center hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-400">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Adventure First</h3>
            <p className="text-slate-400 text-sm">
              Plans are great, but spontaneity is better. Our tools adapt to your changing schedule.
            </p>
          </GlassCard>

          <GlassCard className="p-6 text-center hover:border-cyan-500/30 transition-colors">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
            <p className="text-slate-400 text-sm">
              Share itineraries, split costs, and build memories with friends without the money talk awkwardness.
            </p>
          </GlassCard>

          <GlassCard className="p-6 text-center hover:border-pink-500/30 transition-colors">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-pink-400">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Simplicity</h3>
            <p className="text-slate-400 text-sm">
              We hate complex dashboards. We built the interface we wanted to use at 2 AM in a hostel.
            </p>
          </GlassCard>
        </div>

        {/* Team / Stats Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
            <div className="flex-1 bg-slate-900/50 rounded-2xl p-8 border border-white/5 flex items-center gap-6">
                <div className="p-4 bg-slate-800 rounded-full">
                    <Map className="text-slate-200" size={32} />
                </div>
                <div>
                    <h4 className="text-4xl font-bold text-white">150+</h4>
                    <p className="text-slate-400">Countries Explored</p>
                </div>
            </div>
            <div className="flex-1 bg-slate-900/50 rounded-2xl p-8 border border-white/5 flex items-center gap-6">
                <div className="p-4 bg-slate-800 rounded-full">
                    <Coffee className="text-slate-200" size={32} />
                </div>
                <div>
                    <h4 className="text-4xl font-bold text-white">∞</h4>
                    <p className="text-slate-400">Coffees Consumed</p>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to plan your next escape?</h2>
          <Link to="/register">
            <Button variant="primary" className="px-8 py-3 text-lg">
              Start Your Journey
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;