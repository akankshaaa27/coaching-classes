import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    FileText, Plus, Search, Trash2,
    Clock, CheckCircle, ChevronRight, Layout, Settings,
    BarChart3, Users, Zap, TrendingUp, Info,
    AlertCircle, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherMockTests = () => {
    const { mockTests, courses, questionBank, addMockTest, results } = useAppContext();
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
            setFormData({ title: '', courseId: '', duration: 30, selectedTopic: '' });
        }
    };

    const getTestStats = (testId) => {
        const testResults = results.filter(r => r.mockTestId === testId);
        const attempts = testResults.length;
        const avgScore = attempts > 0
            ? Math.round(testResults.reduce((acc, r) => acc + (r.score / r.total * 100), 0) / attempts)
            : 0;
        return { attempts, avgScore };
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Header section */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-xl">
                    <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full mb-6">
                        <Zap size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Assessment Architect</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                        Design Precision <span className="text-orange-500">Assessments</span>.
                    </h2>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed">
                        Create high-fidelity mock tests using your automated question bank and monitor student performance in real-time.
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-orange-500 transition-all shadow-xl shadow-slate-200 hover:shadow-orange-100 active:scale-95"
                >
                    <Plus size={24} />
                    <span>Create New Test</span>
                </button>
            </div>

            {/* Grid of Tests */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockTests.map((test, i) => {
                    const course = courses.find(c => c.id === test.courseId);
                    const { attempts, avgScore } = getTestStats(test.id);

                    return (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 p-8 flex flex-col h-full"
                        >
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-orange-500">
                                        <Layout size={32} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">ID: {test.id.slice(-4)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-10">
                                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">{course?.title || 'General Course'}</p>
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-orange-500 transition-colors">{test.title}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-50">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-slate-400 mb-1">
                                            <Clock size={12} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Duration</span>
                                        </div>
                                        <p className="text-lg font-black text-slate-900">{test.duration} MIN</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-slate-400 mb-1">
                                            <FileText size={12} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Pool Size</span>
                                        </div>
                                        <p className="text-lg font-black text-slate-900">{test.questions.length} Items</p>
                                    </div>
                                </div>

                                {/* Stats Section */}
                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    <div className="bg-orange-50 p-6 rounded-[2rem] text-center border border-orange-100/50">
                                        <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 leading-none">Attempts</p>
                                        <p className="text-3xl font-black text-slate-900">{attempts}</p>
                                    </div>
                                    <div className="bg-slate-900 p-6 rounded-[2rem] text-center border border-slate-800 shadow-xl shadow-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Avg Score</p>
                                        <p className="text-3xl font-black text-white">{avgScore}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-8 border-t border-slate-50">
                                <button className="flex-grow bg-slate-50 text-slate-700 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:bg-slate-100 transition-all border border-slate-100">
                                    <Activity size={14} />
                                    <span>Analytics</span>
                                </button>
                                <button className="p-4 text-red-500 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={20} />
                                </button>
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
                            className="relative bg-white rounded-[4rem] p-12 max-w-xl w-full shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                            <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Configure Assessment</h3>
                            <p className="text-slate-400 font-medium mb-10">Set the parameters for your automated mock exam.</p>

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Assessment Title</label>
                                    <input
                                        type="text" required className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all font-bold text-slate-700"
                                        placeholder="e.g. Unit 4 Final Test"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Course Context</label>
                                        <select
                                            required className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all font-bold text-slate-700 appearance-none"
                                            value={formData.courseId}
                                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value, selectedTopic: '' })}
                                        >
                                            <option value="">Select Course</option>
                                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Allocated Time</label>
                                        <div className="relative">
                                            <input
                                                type="number" required className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all font-bold text-slate-700"
                                                min="5" max="300"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mins</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Intelligence Source (Topic Group)</label>
                                    <select
                                        required className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all font-bold text-slate-700 appearance-none"
                                        value={formData.selectedTopic}
                                        onChange={(e) => setFormData({ ...formData, selectedTopic: e.target.value })}
                                        disabled={!formData.courseId}
                                    >
                                        <option value="">Select Question Pool...</option>
                                        {questionBank
                                            .filter(g => g.courseId === formData.courseId)
                                            .map((g, i) => <option key={i} value={g.topic}>{g.topic} ({g.questions.length} Items)</option>)
                                        }
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button" onClick={() => setShowAddModal(false)}
                                        className="flex-1 py-5 px-6 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] text-slate-400 hover:bg-slate-50 transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-5 px-6 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-orange-500 transition-all shadow-xl shadow-slate-100 hover:shadow-orange-100"
                                    >
                                        Build Assessment
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
