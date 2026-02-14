import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    FileText, Upload, Trash2, Book,
    Search, Filter, Plus, FileCode, FileUp, MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherMaterials = () => {
    const { materials, courses, addMaterial, deleteMaterial } = useAppContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMaterial, setNewMaterial] = useState({ title: '', courseId: '', type: 'PDF' });

    const handleAdd = (e) => {
        e.preventDefault();
        if (newMaterial.title && newMaterial.courseId) {
            addMaterial(newMaterial);
            setNewMaterial({ title: '', courseId: '', type: 'PDF' });
            setShowAddModal(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Study Materials</h2>
                    <p className="text-slate-500 font-medium">Upload and manage educational resources for your students.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary py-3 px-6 flex items-center justify-center space-x-2"
                >
                    <Plus size={20} />
                    <span>Upload Material</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {materials.map((m, i) => {
                    const course = courses.find(c => c.id === m.courseId);
                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 group hover:shadow-xl transition-all"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                                    <FileText size={28} />
                                </div>
                                <button
                                    onClick={() => deleteMaterial(m.id)}
                                    className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{m.title}</h3>
                            <p className="text-xs font-black text-primary-600 uppercase tracking-widest bg-primary-50 inline-block px-3 py-1 rounded-full mb-4">
                                {course?.title || 'General'}
                            </p>

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-slate-400">
                                    <FileCode size={14} />
                                    <span className="text-xs font-bold uppercase">{m.type}</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase letter tracking-tighter">
                                    Added: {m.uploadDate}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowAddModal(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Upload New Material</h3>
                            <form onSubmit={handleAdd} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        placeholder="e.g. Chapter 1 Notes"
                                        value={newMaterial.title}
                                        onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Select Course</label>
                                    <select
                                        required
                                        className="input-field"
                                        value={newMaterial.courseId}
                                        onChange={(e) => setNewMaterial({ ...newMaterial, courseId: e.target.value })}
                                    >
                                        <option value="">Choose Course...</option>
                                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Material Type</label>
                                    <select
                                        className="input-field"
                                        value={newMaterial.type}
                                        onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                                    >
                                        <option value="PDF">PDF Document</option>
                                        <option value="Video">Video Link</option>
                                        <option value="Doc">Word Document</option>
                                    </select>
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 py-3 px-6 rounded-xl border-2 border-slate-100 font-bold text-slate-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-bold"
                                    >
                                        Upload Now
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeacherMaterials;
