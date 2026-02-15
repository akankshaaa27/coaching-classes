import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    Book, Plus, Trash2, Edit2,
    Save, X, List, ChevronDown,
    ChevronUp, Search, GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageSyllabus = () => {
    const { courses, syllabus, addSyllabus, updateSyllabus, deleteSyllabus } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSyllabus, setEditingSyllabus] = useState(null);
    const [formData, setFormData] = useState({
        courseId: '',
        subject: '',
        modules: [{ module: '', topics: [''] }]
    });

    const handleAddModule = () => {
        setFormData({
            ...formData,
            modules: [...formData.modules, { module: '', topics: [''] }]
        });
    };

    const handleRemoveModule = (idx) => {
        const newModules = [...formData.modules];
        newModules.splice(idx, 1);
        setFormData({ ...formData, modules: newModules });
    };

    const handleAddTopic = (mIdx) => {
        const newModules = [...formData.modules];
        newModules[mIdx].topics.push('');
        setFormData({ ...formData, modules: newModules });
    };

    const handleTopicChange = (mIdx, tIdx, val) => {
        const newModules = [...formData.modules];
        newModules[mIdx].topics[tIdx] = val;
        setFormData({ ...formData, modules: newModules });
    };

    const handleModuleTitleChange = (mIdx, val) => {
        const newModules = [...formData.modules];
        newModules[mIdx].module = val;
        setFormData({ ...formData, modules: newModules });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSyllabus) {
            updateSyllabus(editingSyllabus.id, formData);
        } else {
            addSyllabus(formData);
        }
        setIsModalOpen(false);
        setEditingSyllabus(null);
        setFormData({ courseId: '', subject: '', modules: [{ module: '', topics: [''] }] });
    };

    const handleEdit = (s) => {
        setEditingSyllabus(s);
        setFormData(s);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900">Syllabus Management</h2>
                    <p className="text-slate-500 font-medium">Design and structure the academic curriculum for all courses.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary py-4 px-8 flex items-center justify-center space-x-3 shadow-xl shadow-primary-200"
                >
                    <Plus size={20} />
                    <span className="font-black uppercase tracking-widest text-xs">Create New Syllabus</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {syllabus.map((s) => {
                    const course = courses.find(c => c.id === s.courseId);
                    return (
                        <motion.div
                            key={s.id}
                            className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 group hover:shadow-xl transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 bg-primary-50 rounded-3xl flex items-center justify-center text-primary-600">
                                        <Book size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 leading-tight">{s.subject}</h3>
                                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">{course?.title || 'Unknown Course'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => handleEdit(s)}
                                        className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary-50 hover:text-primary-600 transition-all"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => deleteSyllabus(s.id)}
                                        className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center space-x-6">
                                <div className="flex -space-x-3">
                                    {s.modules.map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400">
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {s.modules.length} Modules defined
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] md:rounded-[50px] w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            <div className="p-6 md:p-10 border-b border-slate-50 flex items-center justify-between shrink-0 bg-slate-50/30">
                                <div>
                                    <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
                                        {editingSyllabus ? 'Edit Curriculum' : 'Design Curriculum'}
                                    </h3>
                                    <p className="text-slate-500 font-medium text-xs md:text-sm">Structure the modules and learning path.</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 md:p-4 hover:bg-white rounded-2xl transition-colors shadow-sm shrink-0">
                                    <X size={24} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
                                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Target Course</label>
                                            <select
                                                required className="input-field py-4 font-bold"
                                                value={formData.courseId}
                                                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                            >
                                                <option value="">Select Course...</option>
                                                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject Name</label>
                                            <input
                                                type="text" required className="input-field py-4" placeholder="e.g. Advanced Physics"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6 md:space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-black text-slate-900 flex items-center">
                                                <List size={20} className="mr-3 text-primary-600" />
                                                Curriculum Structure
                                            </h4>
                                            <button
                                                type="button" onClick={handleAddModule}
                                                className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline"
                                            >
                                                + Add Module
                                            </button>
                                        </div>

                                        {formData.modules.map((mod, mIdx) => (
                                            <div key={mIdx} className="p-6 md:p-8 rounded-[35px] bg-slate-50 border border-slate-100 space-y-6 relative group">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveModule(mIdx)}
                                                    className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                >
                                                    <X size={20} />
                                                </button>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Module {mIdx + 1} Title</label>
                                                    <input
                                                        type="text" required className="input-field py-3 bg-white" placeholder="Module Title"
                                                        value={mod.module}
                                                        onChange={(e) => handleModuleTitleChange(mIdx, e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Topics</label>
                                                        <button
                                                            type="button" onClick={() => handleAddTopic(mIdx)}
                                                            className="text-[10px] font-black text-primary-600 uppercase tracking-widest"
                                                        >
                                                            + Add Topic
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {mod.topics.map((topic, tIdx) => (
                                                            <input
                                                                key={tIdx}
                                                                type="text" required className="input-field py-3 bg-white text-sm" placeholder={`Topic ${tIdx + 1}`}
                                                                value={topic}
                                                                onChange={(e) => handleTopicChange(mIdx, tIdx, e.target.value)}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4 pt-4 md:pt-6">
                                        <button
                                            type="button" onClick={() => setIsModalOpen(false)}
                                            className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-xs text-slate-400 hover:bg-slate-50 transition-colors"
                                        >
                                            Discard Changes
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 px-6 rounded-2xl bg-primary-600 text-white font-black uppercase tracking-widest text-xs hover:bg-primary-700 transition-all shadow-xl shadow-primary-100"
                                        >
                                            Save Curriculum
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

export default ManageSyllabus;
