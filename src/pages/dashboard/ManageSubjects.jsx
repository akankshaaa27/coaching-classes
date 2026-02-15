import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    Book, Plus, Trash2, Edit2,
    Layers, Search, AlertCircle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageSubjects = () => {
    const { courses, subjects, addSubject, updateSubject, deleteSubject } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [courseFilter, setCourseFilter] = useState('all');

    const [formData, setFormData] = useState({
        name: '',
        courseId: courses[0]?.id || ''
    });

    const filteredSubjects = subjects.filter(sub => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = courseFilter === 'all' || sub.courseId === courseFilter;
        return matchesSearch && matchesCourse;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSubject) {
            updateSubject(editingSubject.id, formData);
        } else {
            addSubject(formData);
        }
        closeModal();
    };

    const openEdit = (sub) => {
        setEditingSubject(sub);
        setFormData({ name: sub.name, courseId: sub.courseId });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSubject(null);
        setFormData({ name: '', courseId: courses[0]?.id || '' });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Subject Library</h2>
                    <p className="text-slate-500 font-medium text-lg">Map academic subjects to their respective courses.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary py-4 px-8 flex items-center justify-center space-x-3 shadow-xl shadow-primary-200"
                >
                    <Plus size={24} />
                    <span className="font-black uppercase tracking-widest text-sm">Add New Subject</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search subjects..."
                        className="input-field pl-12 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            className="input-field pl-12 bg-slate-50 border-transparent appearance-none"
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                        >
                            <option value="all">All Courses</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSubjects.map((sub, i) => {
                    const course = courses.find(c => c.id === sub.courseId);
                    return (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                    <Book size={24} />
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(sub)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => deleteSubject(sub.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{sub.name}</h3>
                            <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                                <Layers size={12} className="mr-1.5 text-secondary-500" />
                                {course?.title || 'Unknown Course'}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredSubjects.length === 0 && (
                <div className="p-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                    <AlertCircle size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-bold">No subjects found matching your filters</p>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            onClick={closeModal}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] md:rounded-[40px] flex flex-col max-h-[90vh] overflow-hidden max-w-md w-full shadow-2xl"
                        >
                            <div className="p-6 md:p-10 border-b border-slate-50 flex items-center justify-between shrink-0">
                                <h3 className="text-xl md:text-2xl font-black text-slate-900">
                                    {editingSubject ? 'Update Subject' : 'Add New Subject'}
                                </h3>
                                <button onClick={closeModal} className="p-2 md:p-3 hover:bg-slate-50 rounded-2xl transition-colors shrink-0">
                                    <X size={24} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject Name</label>
                                        <input
                                            type="text" required className="input-field py-4" placeholder="e.g. Molecular Biology"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assign to Course</label>
                                        <select
                                            className="input-field py-4 font-bold"
                                            value={formData.courseId}
                                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                            required
                                        >
                                            <option value="" disabled>Select Course</option>
                                            {courses.map(c => (
                                                <option key={c.id} value={c.id}>{c.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                                        <button
                                            type="button" onClick={closeModal}
                                            className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-xs text-slate-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 px-6 rounded-2xl bg-primary-600 text-white font-black uppercase tracking-widest text-xs hover:shadow-lg shadow-primary-200 transition-all"
                                        >
                                            {editingSubject ? 'Update' : 'Create'}
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

export default ManageSubjects;
