import React from 'react';
import TourCard from './TourCard';
import Button from '../common/Button';
import { Map } from 'lucide-react';

const TourList = ({ tours, isLoading, onOpenModal }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 bg-slate-800/50 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="border border-dashed border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-slate-900/30">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
          <Map size={32} />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No tours found</h3>
        <p className="text-slate-400 max-w-sm mb-6">
          You haven't planned any trips yet. The world is waiting!
        </p>
        <Button variant="outline" onClick={onOpenModal}>Plan a Trip</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
};

export default TourList;