import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    FileText, Plus, Search, Trash2,
    Clock, CheckCircle, ChevronRight, Layout, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherMockTests = () => {
    const { mockTests, courses, questionBank, addMockTest } = useAppContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '', courseId: '', duration: 30, selectedTopic: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const group = questionBank.find(g => g.courseId === formData.courseId && g.topic === formData.selectedTopic);
        if (group) {
            addMockTest({
                title: formData.title,
                courseId: formData.courseId,
                duration: formData.duration,
                questions: group.questions
            });
            setShowAddModal(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Assessment Designer</h2>
                    <p className="text-slate-500 font-medium text-lg">Create timed mock tests using your existing question bank.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary py-4 px-8 flex items-center justify-center space-x-3 shadow-xl shadow-primary-200"
                >
                    <Plus size={24} />
                    <span className="text-lg font-black uppercase tracking-widest text-sm">Create Mock Test</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {mockTests.map((test, i) => {
                    const course = courses.find(c => c.id === test.courseId);
                    return (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[45px] border border-slate-100 shadow-sm p-10 group hover:shadow-2xl transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-orange-50 transition-colors"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                    <Layout size={32} />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{test.title}</h3>
                                    <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest bg-primary-50 inline-block px-3 py-1 rounded-full mb-8">
                                        {course?.title || 'General Course'}
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 mb-10">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Duration</span>
                                            <div className="flex items-center space-x-2 text-slate-900 font-bold">
                                                <Clock size={16} className="text-primary-600" />
                                                <span>{test.duration} Min</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Questions</span>
                                            <div className="flex items-center space-x-2 text-slate-900 font-bold">
                                                <FileText size={16} className="text-green-600" />
                                                <span>{test.questions.length} Items</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                                    <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-primary-600 transition-all">
                                        <Settings size={14} />
                                        Config
                                    </button>
                                    <button className="p-4 text-red-500 bg-red-50 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            onClick={() => setShowAddModal(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[50px] p-12 max-w-lg w-full shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-secondary-500"></div>
                            <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Configure Assessment</h3>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Test Title</label>
                                    <input
                                        type="text" required className="input-field py-4" placeholder="Weekly Assessment - Unit 1"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Select Course Context</label>
                                    <select
                                        required className="input-field py-4"
                                        value={formData.courseId}
                                        onChange={(e) => setFormData({ ...formData, courseId: e.target.value, selectedTopic: '' })}
                                    >
                                        <option value="">Choose Course...</option>
                                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Source Question Topic</label>
                                    <select
                                        required className="input-field py-4"
                                        value={formData.selectedTopic}
                                        onChange={(e) => setFormData({ ...formData, selectedTopic: e.target.value })}
                                        disabled={!formData.courseId}
                                    >
                                        <option value="">Choose Topic Group...</option>
                                        {questionBank
                                            .filter(g => g.courseId === formData.courseId)
                                            .map((g, i) => <option key={i} value={g.topic}>{g.topic} ({g.questions.length} Qs)</option>)
                                        }
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Allocated Time (Minutes)</label>
                                    <input
                                        type="number" required className="input-field py-4" min="5" max="300"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button" onClick={() => setShowAddModal(false)}
                                        className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-xs text-slate-400"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-secondary-500 transition-all shadow-xl shadow-slate-100"
                                    >
                                        Generate Test
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

export default TeacherMockTests;
