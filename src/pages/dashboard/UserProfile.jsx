import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    User, Mail, Phone, Lock,
    MapPin, Camera, Save, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = () => {
    const { currentUser, updateProfile } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '',
        address: currentUser.address || ''
    });

    const handleSave = (e) => {
        e.preventDefault();
        updateProfile(currentUser.id, formData);
        setIsEditing(false);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                    <div className="w-48 h-48 bg-primary-600 rounded-[60px] flex items-center justify-center text-7xl font-black text-white shadow-2xl border-8 border-white group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                        {currentUser.name.charAt(0)}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-14 h-14 bg-secondary-500 text-white rounded-3xl flex items-center justify-center shadow-xl border-4 border-white hover:scale-110 transition-transform">
                        <Camera size={24} />
                    </button>
                </div>
                <div className="text-center md:text-left space-y-2">
                    <h2 className="text-5xl font-black text-slate-900 leading-none">{currentUser.name}</h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <span className="bg-primary-50 text-primary-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary-100 flex items-center">
                            <ShieldCheck size={14} className="mr-2" />
                            Student ID: AC-{currentUser.id}
                        </span>
                        <span className="text-slate-400 font-bold text-sm">• Joined Feb 2024</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSave} className="bg-white p-10 lg:p-14 rounded-[50px] border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center justify-between pb-8 border-b border-slate-50">
                            <h3 className="text-2xl font-bold text-slate-900">Personal Information</h3>
                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="bg-slate-50 text-primary-600 px-6 py-2.5 rounded-xl font-bold hover:bg-primary-50 transition-colors"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="text-slate-400 font-bold hover:text-slate-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg shadow-primary-100 transition-all"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        disabled={!isEditing}
                                        type="text"
                                        className={`input-field pl-12 py-4 ${!isEditing ? 'bg-slate-50/50 border-transparent cursor-not-allowed opacity-80' : ''}`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        disabled={!isEditing}
                                        type="email"
                                        className={`input-field pl-12 py-4 ${!isEditing ? 'bg-slate-50/50 border-transparent cursor-not-allowed opacity-80' : ''}`}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        disabled={!isEditing}
                                        type="tel"
                                        className={`input-field pl-12 py-4 ${!isEditing ? 'bg-slate-50/50 border-transparent cursor-not-allowed opacity-80' : ''}`}
                                        placeholder="+91 00000 00000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        disabled={!isEditing}
                                        type="text"
                                        className={`input-field pl-12 py-4 ${!isEditing ? 'bg-slate-50/50 border-transparent cursor-not-allowed opacity-80' : ''}`}
                                        placeholder="Pune, India"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="bg-white p-10 lg:p-14 rounded-[50px] border border-slate-100 shadow-sm group">
                        <div className="flex items-center space-x-4 mb-10">
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 group-hover:rotate-6 transition-transform">
                                <Lock size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Privacy</h3>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                            <div>
                                <h4 className="font-bold text-slate-900 leading-none mb-2">Change Password</h4>
                                <p className="text-sm text-slate-500 font-medium tracking-tight">Ensure your account is using a long, random password to stay secure.</p>
                            </div>
                            <button className="bg-white border-2 border-slate-100 px-6 py-3 rounded-xl font-bold text-slate-600 hover:border-slate-200 transition-colors">
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 p-10 rounded-[50px] text-white relative overflow-hidden h-full flex flex-col justify-center">
                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
                                <ShieldCheck size={40} className="text-primary-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Account Status</h3>
                            <div className="inline-block px-6 py-2 bg-green-500/20 text-green-400 rounded-full font-black uppercase tracking-widest text-[10px] border border-green-500/30">
                                Verified Member
                            </div>
                            <p className="mt-8 text-slate-400 font-medium leading-relaxed">
                                Your account is fully secured and verified. You have access to all premium features.
                            </p>
                        </div>
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
