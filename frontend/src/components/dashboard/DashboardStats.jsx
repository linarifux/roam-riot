import React from 'react';
import GlassCard from '../common/GlassCard';
import { Map, TrendingUp, Calendar } from 'lucide-react';

const DashboardStats = ({ tours }) => {
  const activeTours = tours.filter(t => t.status === 'Ongoing' || t.status === 'Planned').length;
  const totalBudget = tours.reduce((acc, curr) => acc + (curr.budgetLimit || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <GlassCard className="flex items-center gap-4">
        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400"><Map size={24} /></div>
        <div>
          <p className="text-slate-400 text-sm">Total Planned Tours</p>
          <p className="text-2xl font-bold text-white">{tours.length}</p>
        </div>
      </GlassCard>
      <GlassCard className="flex items-center gap-4">
        <div className="p-3 bg-green-500/20 rounded-lg text-green-400"><TrendingUp size={24} /></div>
        <div>
          <p className="text-slate-400 text-sm">Total Budget Cap</p>
          <p className="text-2xl font-bold text-white">${totalBudget.toLocaleString()}</p>
        </div>
      </GlassCard>
      <GlassCard className="flex items-center gap-4">
        <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400"><Calendar size={24} /></div>
        <div>
          <p className="text-slate-400 text-sm">Active Trips</p>
          <p className="text-2xl font-bold text-white">{activeTours}</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default DashboardStats;