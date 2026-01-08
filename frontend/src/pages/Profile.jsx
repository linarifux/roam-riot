import React from 'react';
import { useSelector } from 'react-redux';
import { Mail, Calendar, Edit3, Camera, MapPin, User } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  // Safety check (though ProtectedRoute handles this)
  if (!user) return null;

  // Fallback for dates if createdAt isn't available
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently';

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#0f172a] relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
            
            {/* --- PROFILE HEADER SECTION --- */}
            <div className="relative mb-8">
                
                {/* 1. Cover Image */}
                <div className="h-48 md:h-80 rounded-2xl overflow-hidden bg-slate-800 relative group">
                    {user.coverImage ? (
                        <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center text-slate-600">
                            No Cover Image
                        </div>
                    )}
                    {/* Visual Edit Button */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <button className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
                        <Camera size={20} />
                    </button>
                </div>

                {/* 2. Avatar & Info Row */}
                <div className="px-4 md:px-10 pb-4 relative">
                    <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 md:-mt-16 gap-6">
                        
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0f172a] bg-slate-800 overflow-hidden shadow-2xl relative">
                                <img 
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=0D8ABC&color=fff`} 
                                    alt={user.fullName} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-2 right-2 p-1.5 bg-cyan-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit3 size={14} />
                            </button>
                        </div>

                        {/* Name & Actions */}
                        <div className="flex-1 w-full md:w-auto pt-2 md:pt-0">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{user.fullName}</h1>
                                    <p className="text-cyan-400 font-medium text-lg">@{user.username}</p>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <Button variant="outline" className="flex-1 md:flex-none justify-center">
                                        <Edit3 size={16} className="mr-2" /> Edit Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Column: Personal Info */}
                <div className="md:col-span-1 space-y-6">
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2">About</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4 text-slate-300 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:text-cyan-400 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Email</p>
                                    <p className="text-sm break-all">{user.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 text-slate-300 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:text-purple-400 transition-colors">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Joined</p>
                                    <p className="text-sm">{joinDate}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-slate-300 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:text-green-400 transition-colors">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Location</p>
                                    <p className="text-sm">Earth, Milky Way</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column: Stats / Placeholder */}
                <div className="md:col-span-2">
                    <GlassCard className="h-full min-h-[300px] flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-6">Activity Overview</h3>
                        <div className="flex-1 border-2 border-dashed border-slate-700/50 rounded-xl flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                <User size={32} className="text-slate-600" />
                            </div>
                            <h4 className="text-slate-300 font-medium mb-2">No recent activity</h4>
                            <p className="text-slate-500 text-sm max-w-md">
                                Once you start creating tours and adding memories, your profile stats will appear here.
                            </p>
                        </div>
                    </GlassCard>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Profile;