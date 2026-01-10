import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTour, getTours, reset } from '../features/tours/tourSlice'; // Added getTours
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tours, isLoading, isSuccess } = useSelector((state) => state.tours);
  const existingTour = tours.find((t) => t._id === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetLimit: 0,
    startDate: '',
    endDate: '',
    status: 'Planned',
    isPublic: false,
    isDraft: false,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 1. Refresh Logic: Fetch tours if they aren't loaded (e.g. page refresh)
  useEffect(() => {
    if (!existingTour && !isLoading) {
      dispatch(getTours());
    }
  }, [dispatch, existingTour, isLoading]);

  // 2. Populate form when tour data is available
  useEffect(() => {
    if (existingTour) {
      setFormData({
        title: existingTour.title || '',
        description: existingTour.description || '',
        budgetLimit: existingTour.budgetLimit || 0,
        startDate: existingTour.startDate ? existingTour.startDate.split('T')[0] : '',
        endDate: existingTour.endDate ? existingTour.endDate.split('T')[0] : '',
        status: existingTour.status || 'Planned',
        isPublic: existingTour.isPublic || false,
        isDraft: existingTour.isDraft || false,
      });
      setPreview(existingTour.coverImage);
    }
  }, [existingTour]);

  // 3. Handle Success Redirect
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate(`/tours/${id}`);
    }
  }, [isSuccess, navigate, id, dispatch]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('budgetLimit', formData.budgetLimit);
    data.append('status', formData.status);
    data.append('isPublic', formData.isPublic);
    data.append('isDraft', formData.isDraft);
    
    // Only append dates if they exist
    if (formData.endDate) data.append('endDate', formData.endDate);
    
    // Only append image if a new one was selected
    if (coverImage) {
      data.append('coverImage', coverImage);
    }

    dispatch(updateTour({ id, tourData: data }));
  };

  if (isLoading) return <LoadingSpinner />;

  if (!existingTour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Tour not found</h2>
            <Link to="/dashboard" className="text-cyan-400 hover:underline">Go Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#0f172a]">
      <div className="container mx-auto max-w-3xl">
        <Link to={`/tours/${id}`} className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Cancel & Back
        </Link>

        <GlassCard className="p-8 border-t border-white/10">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            Edit Tour Details
          </h1>

          <form onSubmit={onSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div className="relative h-48 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 group">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <ImageIcon size={32} />
                </div>
              )}
              
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                  Change Cover Image
                </span>
                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Tour Title"
                name="title"
                value={formData.title}
                onChange={onChange}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                rows="4"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 resize-none"
                placeholder="What's the plan?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Budget Limit ($)"
                type="number"
                name="budgetLimit"
                value={formData.budgetLimit}
                onChange={onChange}
              />
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={onChange}
                disabled // Usually start date isn't easily changeable if logic depends on it
              />
              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={onChange}
              />
            </div>

            {/* Toggles */}
            <div className="flex gap-8 border-t border-white/10 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isPublic" 
                  checked={formData.isPublic} 
                  onChange={onChange}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500/50"
                />
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">Make Public</span>
                  <span className="text-slate-500 text-xs">Visible to community</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isDraft" 
                  checked={formData.isDraft} 
                  onChange={onChange}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500/50"
                />
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">Draft Mode</span>
                  <span className="text-slate-500 text-xs">Hidden from your active list</span>
                </div>
              </label>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" variant="primary" className="px-8" isLoading={isLoading}>
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>

          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default EditTour;