import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import {
    FileText, Clock, Play, CheckCircle2,
    Award, TrendingUp, Zap, Target,
    BarChart3, ChevronRight, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MockTests = () => {
    const { mockTests, results, currentUser } = useAppContext();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const getTestStatus = (testId) => {
        const result = results.find(r => r.mockTestId === testId && r.studentId === currentUser.id);
        return result ? 'completed' : 'pending';
    };

    const userResults = results.filter(r => r.studentId === currentUser.id);
    const avgScore = userResults.length > 0
        ? Math.round(userResults.reduce((acc, curr) => acc + (curr.score / curr.total * 100), 0) / userResults.length)
        : 0;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <Zap size={14} className="text-secondary-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Assessment Portal</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Potential</span>.
                        </h2>
                        <p className="text-slate-400 text-lg font-medium max-w-md">
                            High-fidelity mock examinations designed to simulate real-world testing environments.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5">
                            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center mb-4">
                                <Target size={20} />
                            </div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Tests Taken</p>
                            <p className="text-3xl font-black">{userResults.length}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5">
                            <div className="w-10 h-10 bg-secondary-500 rounded-xl flex items-center justify-center mb-4">
                                <TrendingUp size={20} />
                            </div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Avg Accuracy</p>
                            <p className="text-3xl font-black">{avgScore}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-none px-2">
                {['all', 'pending', 'completed'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-8 py-3.5 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                                ? 'bg-primary-600 text-white shadow-xl shadow-primary-200'
                                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 shadow-sm'
                            }`}
                    >
                        {cat} Tests
                    </button>
                ))}
            </div>

            {/* Test Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockTests
                    .filter(t => selectedCategory === 'all' || getTestStatus(t.id) === selectedCategory)
                    .map((test, i) => {
                        const status = getTestStatus(test.id);
                        const result = results.find(r => r.mockTestId === test.id && r.studentId === currentUser.id);
                        const scorePercentage = result ? Math.round((result.score / result.total) * 100) : 0;

                        return (
                            <motion.div
                                key={test.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 p-8 flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-primary-50 transition-colors"></div>

                                <div className="relative z-10 flex-grow">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-slate-900 text-white'
                                            }`}>
                                            <FileText size={28} />
                                        </div>
                                        {status === 'completed' && (
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                    <CheckCircle2 size={12} />
                                                    <span>Completed</span>
                                                </div>
                                                <p className="text-2xl font-black text-slate-900 mt-2">{scorePercentage}%</p>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                                        {test.title}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 mb-10">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Duration</span>
                                            <div className="flex items-center space-x-2 text-slate-900 font-bold">
                                                <Clock size={16} className="text-primary-600" />
                                                <span>{test.duration} MIN</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Items</span>
                                            <div className="flex items-center space-x-2 text-slate-900 font-bold">
                                                <BarChart3 size={16} className="text-secondary-500" />
                                                <span>{test.questions.length} Qs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 pt-8 border-t border-slate-50">
                                    {status === 'completed' ? (
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => navigate(`/dashboard/student/mock-test/${test.id}`)}
                                                className="flex-grow bg-slate-100 text-slate-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all flex items-center justify-center space-x-2"
                                            >
                                                <Info size={14} />
                                                <span>Review Analysis</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => navigate(`/dashboard/student/mock-test/${test.id}`)}
                                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-3 hover:bg-primary-600 transition-all shadow-xl shadow-slate-100 group-hover:shadow-primary-100 active:scale-95"
                                        >
                                            <span>Begin Assessment</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
            </div>

            {mockTests.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText size={40} className="text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No Assessments Published</h3>
                    <p className="text-slate-500 max-w-xs mx-auto font-medium">Your instructors haven't released any mock tests for your batches yet.</p>
                </div>
            )}
        </div>
    );
};

export default MockTests;
