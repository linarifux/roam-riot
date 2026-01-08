import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import { ArrowRight } from 'lucide-react';

const TourCard = ({ tour }) => {
  return (
    <Link to={`/tours/${tour._id}`}>
      <GlassCard className="hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer h-full flex flex-col">
        <div className="h-48 bg-slate-800 rounded-lg mb-4 overflow-hidden relative">
          {tour.coverImage ? (
            <img 
              src={tour.coverImage} 
              alt={tour.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 font-medium">
              No Cover Image
            </div>
          )}
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs text-white font-medium border border-white/10">
            {tour.status}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {tour.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 grow">
          {tour.description || "No description provided."}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-4 mt-auto">
          <span className="font-mono text-cyan-400/80">${tour.budgetLimit.toLocaleString()} Budget</span>
          <span className="flex items-center gap-1 text-slate-300 group-hover:translate-x-1 transition-transform">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </GlassCard>
    </Link>
  );
};

export default TourCard;