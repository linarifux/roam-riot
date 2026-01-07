import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTour } from '../../features/tours/tourSlice';
import { X, Upload, Calendar } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import Input from '../common/Input';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTourModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.tours);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    budgetLimit: '',
  });
  const [coverImage, setCoverImage] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    data.append('budgetLimit', formData.budgetLimit);
    if (coverImage) data.append('coverImage', coverImage);

    dispatch(createTour(data)).then((res) => {
      if (!res.error) {
        setFormData({ title: '', description: '', startDate: '', endDate: '', budgetLimit: '' });
        setCoverImage(null);
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-lg"
        >
          <GlassCard className="relative border-t border-white/20">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
                <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Plan New Adventure</h2>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <Input 
                label="Trip Title" 
                name="title" 
                value={formData.title} 
                onChange={onChange} 
                placeholder="e.g., Euro Summer 2026" 
                required 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input 
                    label="Start Date" 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={onChange} 
                    required 
                />
                <Input 
                    label="End Date" 
                    type="date" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={onChange} 
                />
              </div>

              <Input 
                label="Budget Limit ($)" 
                type="number" 
                name="budgetLimit" 
                value={formData.budgetLimit} 
                onChange={onChange} 
                placeholder="2000" 
              />

              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <label className="flex items-center gap-3 cursor-pointer">
                      <Upload className="text-cyan-400" />
                      <span className="text-slate-300 text-sm">
                          {coverImage ? coverImage.name : "Upload Cover Image"}
                      </span>
                      <input type="file" onChange={handleFile} className="hidden" accept="image/*" />
                  </label>
              </div>

              <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                Create Tour
              </Button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateTourModal;