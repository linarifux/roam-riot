import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import { Map, Compass, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-[float_10s_infinite]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] animate-[float_8s_infinite_reverse]" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Travel Agent
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Travel Smart. <br />
            <span className="text-gradient">Post Smarter.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
            Stop worrying about captions or budgets. We track your tours, manage your expenses, and auto-generate chaos-filled social posts.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/register">
                <Button size="lg" variant="primary">Start My Journey</Button>
            </Link>
            <Button size="lg" variant="outline">View Demo</Button>
          </div>
        </motion.div>

        {/* Right: Visual Showcase */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full max-w-lg"
        >
           <GlassCard className="relative z-10 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 border-t border-white/20">
              {/* Fake UI: Social Post Preview */}
              <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500" />
                 <div>
                    <div className="text-sm font-bold text-white">RoamRiot AI</div>
                    <div className="text-xs text-slate-500">Just now • Instagram</div>
                 </div>
              </div>
              <div className="h-48 bg-slate-800/50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                 <Map size={48} className="text-slate-600 group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60" />
                 <div className="absolute bottom-4 left-4 text-white font-medium">📍 Lost in Tokyo</div>
              </div>
              <div className="space-y-2">
                 <div className="text-sm text-slate-300">
                    "My wallet is crying but the sushi is worth it. 🍣 Day 3 of the Asia Tour! #RoamRiot #BrokeButHappy"
                 </div>
              </div>
           </GlassCard>
           
           {/* Floating Stat Card */}
           <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-xl flex items-center gap-3 animate-[float_6s_infinite] border border-white/5">
              <div className="bg-red-500/20 p-2 rounded-lg text-red-400">
                 <TrendingUp size={24} />
              </div>
              <div>
                 <p className="text-xs text-slate-400">Budget Used</p>
                 <p className="font-bold text-sm text-white">82% (Critical!)</p>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;