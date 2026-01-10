import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTours } from '../features/tours/tourSlice'; // Import getTours for refresh handling
import { ArrowLeft, Calendar, DollarSign, MapPin, Edit3 } from 'lucide-react';
import Button from '../components/common/Button';
import GlassCard from '../components/common/GlassCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Tabs = ({ active, setActive }) => (
  <div className="flex gap-4 border-b border-white/10 mb-8">
    {['Overview', 'Memories', 'Expenses'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActive(tab)}
        className={`pb-3 text-sm font-medium transition-colors relative ${active === tab ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
          }`}
      >
        {tab}
        {active === tab && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        )}
      </button>
    ))}
  </div>
);

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tours, isLoading } = useSelector((state) => state.tours);
  const [activeTab, setActiveTab] = useState('Overview');

  // Find the tour from Redux state
  const tour = tours.find((t) => t._id === id);

  // Refresh Logic: If tours aren't loaded yet (e.g., page refresh), fetch them.
  useEffect(() => {
    if (!tour && !isLoading) {
      dispatch(getTours());
    }
  }, [dispatch, tour, isLoading]);

  if (isLoading) return <LoadingSpinner />;

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0f172a]">
        <h2 className="text-2xl font-bold mb-4">Tour not found</h2>
        <Link to="/"><Button variant="primary">Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#0f172a] text-white">

      {/* 1. Header & Cover Image */}
      <div className="container mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>

        {/* Fixed typos: h-75 -> h-[300px], h-100 -> h-[400px], bg-linear -> bg-gradient */}
        <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 group">
          {tour.coverImage ? (
            <img src={tour.coverImage} alt={tour.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Cover Image</div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />

          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
            <div className="flex justify-between items-end">
              <div>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                  {tour.status}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tour.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-purple-400" /> {new Date(tour.startDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-green-400" /> Budget: ${tour.budgetLimit.toLocaleString()}</span>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                onClick={() => navigate(`/tours/${id}/edit`)}
                variant="outline">
                <Edit3 size={14} className="mr-2" /> Edit Tour
              </Button>
            </div>
          </div>
        </div>

        {/* 2. Content Tabs */}
        <Tabs active={activeTab} setActive={setActiveTab} />

        {/* 3. Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'Overview' && (
              <GlassCard>
                <h3 className="text-xl font-bold mb-4">About this Trip</h3>
                <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {tour.description || "No description provided for this chaotic adventure."}
                </p>
              </GlassCard>
            )}

            {activeTab === 'Memories' && (
              <div className="p-12 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                <p>Memories gallery coming soon...</p>
                <Button variant="outline" className="mt-4">Upload Photos</Button>
              </div>
            )}

            {activeTab === 'Expenses' && (
              <div className="p-12 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-500">
                <p>Expense tracking coming soon...</p>
                <Button variant="outline" className="mt-4">Add Expense</Button>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                Locations
              </h3>
              <div className="space-y-4">
                {tour.locations && tour.locations.length > 0 ? (
                  tour.locations.map((loc, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <MapPin className="text-cyan-400 mt-1 shrink-0" size={16} />
                      <span className="text-slate-300">{typeof loc === 'string' ? loc : loc.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 italic text-sm">No locations added yet.</div>
                )}
              </div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <h3 className="text-lg font-bold text-white mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="primary" className="w-full justify-center">Add Memory 📸</Button>
                <Button variant="outline" className="w-full justify-center">Add Expense 💸</Button>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourDetails;