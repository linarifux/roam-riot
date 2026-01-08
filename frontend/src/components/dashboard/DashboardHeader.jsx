import React from 'react';
import Button from '../common/Button';
import { Plus } from 'lucide-react';

const DashboardHeader = ({ user, onOpenModal }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Hello, <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">{user?.fullName || 'Traveller'}</span> 👋
        </h1>
        <p className="text-slate-400">Ready for your next chaotic adventure?</p>
      </div>
      <Button variant="primary" onClick={onOpenModal}>
        <Plus className="w-4 h-4 mr-2" />
        Create New Tour
      </Button>
    </div>
  );
};

export default DashboardHeader;