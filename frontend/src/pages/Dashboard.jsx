import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTours } from '../features/tours/tourSlice';
import { Plus, Map, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import CreateTourModal from '../components/tours/CreateTourModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tours, isLoading, isError, message } = useSelector((state) => state.tours);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  // Calculate simple stats
  const activeTours = tours.filter(t => t.status === 'Ongoing' || t.status === 'Planned').length;
  const totalBudget = tours.reduce((acc, curr) => acc + (curr.budgetLimit || 0), 0);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Hello, <span className="text-gradient">{user?.fullName || 'Traveller'}</span> 👋
            </h1>
            <p className="text-slate-400">Ready for your next chaotic adventure?</p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Tour
          </Button>
        </div>

        {/* Stats Grid */}
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

        {/* Tours List */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Map className="text-cyan-400" size={20} /> Your Tours
        </h2>

        {isLoading ? (
            <div className="text-center text-slate-500 py-10">Loading your adventures...</div>
        ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                    <GlassCard key={tour._id} className="hover:border-cyan-500/30 transition-colors group cursor-pointer">
                        <div className="h-40 bg-slate-800 rounded-lg mb-4 overflow-hidden relative">
                            {tour.coverImage ? (
                                <img src={tour.coverImage} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs text-white font-medium">
                                {tour.status}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{tour.title}</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{tour.description || "No description provided."}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-3">
                            <span>${tour.budgetLimit} Budget</span>
                            <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform">
                                View Details <ArrowRight size={12} />
                            </span>
                        </div>
                    </GlassCard>
                ))}
            </div>
        ) : (
            <div className="border border-dashed border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                    <Map size={32} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No tours found</h3>
                <p className="text-slate-400 max-w-sm mb-6">
                    You haven't planned any trips yet.
                </p>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>Plan a Trip</Button>
            </div>
        )}
      </div>

      <CreateTourModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;