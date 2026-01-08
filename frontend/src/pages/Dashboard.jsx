import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTours } from '../features/tours/tourSlice';
import { Map } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import TourList from '../components/tours/TourList';
import CreateTourModal from '../components/tours/CreateTourModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tours, isLoading } = useSelector((state) => state.tours);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#0f172a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <DashboardHeader user={user} onOpenModal={() => setIsModalOpen(true)} />
        <DashboardStats tours={tours} />

        <div className="mb-6 flex items-center gap-2">
           <div className="p-2 bg-cyan-500/10 rounded-lg">
             <Map className="text-cyan-400" size={20} /> 
           </div>
           <h2 className="text-xl font-bold text-white">Your Tours</h2>
        </div>

        <TourList tours={tours} isLoading={isLoading} onOpenModal={() => setIsModalOpen(true)} />
      </div>

      <CreateTourModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;