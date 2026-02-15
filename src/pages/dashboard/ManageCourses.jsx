import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    BookOpen, Plus, Search, Edit2,
    Trash2, Clock, IndianRupee, ChevronRight,
    TrendingUp, Layers, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageCourses = () => {
    const { courses, addCourse, updateCourse, deleteCourse } = useAppContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', duration: '', fees: '', type: 'Regular' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addCourse(formData);
        setFormData({ title: '', description: '', duration: '', fees: '', type: 'Regular' });
        setShowAddModal(false);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Course Architecture</h2>
                    <p className="text-slate-500 font-medium text-lg">Define and manage the curriculum and pricing of your academic programs.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary py-4 px-8 flex items-center justify-center space-x-3 shadow-xl shadow-primary-200"
                >
                    <Plus size={24} />
                    <span className="text-lg font-black uppercase tracking-widest text-sm">Create New Program</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {courses.map((course, i) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[50px] border border-slate-100 shadow-sm p-10 group hover:shadow-2xl transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-primary-50 transition-colors"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-primary-600 mb-8 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-lg group-hover:rotate-6">
                                <BookOpen size={32} />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{course.title}</h3>
                            <p className="text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed">
                                {course.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Type</span>
                                    <div className="flex items-center space-x-2 text-slate-900 font-bold">
                                        <Layers size={16} className="text-secondary-500" />
                                        <span>{course.type || 'Regular'}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Duration</span>
                                    <div className="flex items-center space-x-2 text-slate-900 font-bold">
                                        <Clock size={16} className="text-primary-600" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Enrollment Fee</span>
                                    <div className="flex items-center space-x-2 text-slate-900 font-bold">
                                        <IndianRupee size={16} className="text-secondary-500" />
                                        <span>₹{course.fees}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                                <button className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-50 hover:text-primary-600 transition-all">
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCourse(course.id)}
                                    className="p-3 text-red-100 bg-red-500 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all shadow-lg shadow-red-100 active:scale-90"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Stats row can be added here */}
            <div className="bg-slate-900 rounded-[60px] p-12 lg:p-16 text-white grid grid-cols-1 md:grid-cols-3 gap-12 relative overflow-hidden">
                {[
                    { label: 'Total Enrolled', val: '4,502', icon: <TrendingUp size={32} />, color: 'text-blue-400' },
                    { label: 'Avg Rating', val: '4.8/5.0', icon: <Layers size={32} />, color: 'text-secondary-400' },
                    { label: 'Completion Rate', val: '92%', icon: <CheckCircle size={32} />, color: 'text-green-400' }
                ].map((stat, i) => (
                    <div key={i} className="flex items-center space-x-6 relative z-10 group">
                        <div className={`${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                            {stat.icon}
                        </div>
                        <div>
                            <h4 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-1">{stat.label}</h4>
                            <p className="text-3xl font-black">{stat.val}</p>
                        </div>
                    </div>
                ))}
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            onClick={() => setShowAddModal(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] md:rounded-[50px] w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            <div className="p-6 md:p-10 border-b border-slate-50 flex items-center justify-between shrink-0">
                                <h3 className="text-xl md:text-2xl font-black text-slate-900">Launch New Program</h3>
                                <button onClick={() => setShowAddModal(false)} className="p-2 md:p-3 hover:bg-slate-50 rounded-2xl transition-colors shrink-0">
                                    <X size={24} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
                                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Program Title</label>
                                        <input
                                            type="text" required className="input-field py-4" placeholder="e.g. JEE Masterclass 2025"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            required className="input-field py-4 min-h-[120px]" placeholder="Brief course overview..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                                            <input
                                                type="text" required className="input-field py-4" placeholder="6 Months"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Fees (₹)</label>
                                            <input
                                                type="number" required className="input-field py-4" placeholder="25000"
                                                value={formData.fees}
                                                onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                                        <select
                                            className="input-field py-4 font-bold"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="Regular">Regular</option>
                                            <option value="Crash">Crash</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                                        <button
                                            type="button" onClick={() => setShowAddModal(false)}
                                            className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] md:text-xs text-slate-400"
                                        >
                                            Discard
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary-600 transition-all shadow-xl shadow-slate-100"
                                        >
                                            Launch Program
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageCourses;
