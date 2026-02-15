import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    BarChart3, FileText,
    Search, Filter, TrendingUp, Award, Clock,
    Download, ArrowUpRight, ArrowDownRight,
    Target, ChevronRight, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherStudentResults = () => {
    const { results, mockTests, users } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTest, setSelectedTest] = useState('All');

    // Filter results based on search and test selection
    const filteredResults = results.filter(res => {
        const student = users.find(u => u.id === res.studentId);
        const test = mockTests.find(t => t.id === res.mockTestId);

        const matchesSearch = student?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTest = selectedTest === 'All' || res.mockTestId === selectedTest;

        return matchesSearch && matchesTest;
    });

    // Calculate aggregated stats
    const avgPercentage = results.length > 0
        ? Math.round(results.reduce((acc, r) => acc + (r.score / r.total * 100), 0) / results.length)
        : 0;

    const topPerforming = filteredResults.filter(r => (r.score / r.total) > 0.8).length;
    const totalAttempts = filteredResults.length;

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Analytics Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mb-6">
                                <TrendingUp size={12} className="text-secondary-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">System Analytics</span>
                            </div>
                            <h2 className="text-3xl font-black tracking-tight leading-tight">
                                Overall Class <span className="text-primary-400">Benchmarking</span>.
                            </h2>
                        </div>
                        <div className="mt-8 flex items-end justify-between">
                            <div className="space-y-1">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Average Accuracy</p>
                                <p className="text-5xl font-black text-white">{avgPercentage}%</p>
                            </div>
                            <div className="bg-primary-500/20 p-4 rounded-3xl border border-primary-500/20">
                                <BarChart3 size={32} className="text-primary-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Award size={28} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">High Achievers</p>
                        <div className="flex items-center space-x-3">
                            <p className="text-4xl font-black text-slate-900">{topPerforming}</p>
                            <div className="flex items-center text-green-500 text-xs font-black">
                                <ArrowUpRight size={14} />
                                <span>12%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Activity size={28} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Assessments</p>
                        <div className="flex items-center space-x-3">
                            <p className="text-4xl font-black text-slate-900">{totalAttempts}</p>
                            <div className="flex items-center text-slate-300 text-xs font-black">
                                <ArrowDownRight size={14} />
                                <span>2.4k</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table & Filters Section */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 md:p-12 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex-grow max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search student name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border-transparent rounded-[2rem] focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all font-medium text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <Filter size={20} className="text-slate-400" />
                        </div>
                        <select
                            value={selectedTest}
                            onChange={(e) => setSelectedTest(e.target.value)}
                            className="bg-white border-2 border-slate-50 px-8 py-5 rounded-[2rem] font-bold text-slate-700 focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all appearance-none min-w-[240px]"
                        >
                            <option value="All">All Assessments</option>
                            {mockTests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                        <button className="bg-slate-900 text-white p-5 rounded-[2rem] hover:bg-primary-600 transition-all shadow-lg active:scale-95">
                            <Download size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student Profile</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Assessment Context</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Raw Score</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance Index</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Submission</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <AnimatePresence>
                                {filteredResults.map((res, i) => {
                                    const student = users.find(u => u.id === res.studentId);
                                    const test = mockTests.find(t => t.id === res.mockTestId);
                                    const perc = Math.round((res.score / res.total) * 100);

                                    return (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-slate-50 group cursor-default transition-all"
                                        >
                                            <td className="px-10 py-8">
                                                <div className="flex items-center space-x-5">
                                                    <div className="relative">
                                                        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform">
                                                            {student?.name.charAt(0)}
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-lg tracking-tight group-hover:text-primary-600 transition-colors uppercase">{student?.name || 'Unknown'}</p>
                                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mt-1.5 flex items-center">
                                                            <Target size={10} className="mr-1.5" />
                                                            ID: S-{res.studentId.slice(-4).toUpperCase()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="space-y-1.5">
                                                    <p className="font-bold text-slate-700 leading-tight">{test?.title || 'System Assessment'}</p>
                                                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-400 rounded text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{(test?.duration) || 0} MINS ALLOTTED</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-baseline space-x-1">
                                                    <span className="font-black text-slate-900 text-2xl">{res.score}</span>
                                                    <span className="text-slate-300 font-bold text-sm">/ {res.total}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center space-x-6">
                                                    <div className="flex-grow min-w-[120px]">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${perc > 80 ? 'text-green-600' : perc > 50 ? 'text-orange-600' : 'text-red-600'}`}>
                                                                {perc > 80 ? 'Exceptional' : perc > 50 ? 'Developing' : 'Critical'}
                                                            </span>
                                                            <span className="text-xs font-black text-slate-400">{perc}%</span>
                                                        </div>
                                                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-50">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${perc}%` }}
                                                                className={`h-full rounded-full shadow-sm ${perc > 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : perc > 50 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                                                            ></motion.div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center space-x-3 text-slate-400">
                                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-primary-50 group-hover:border-primary-100 group-hover:text-primary-600 transition-all">
                                                        <Clock size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-700">{res.date}</p>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Timestamp</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredResults.length === 0 && (
                        <div className="p-32 text-center bg-slate-50/30">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-slate-100">
                                <Search size={40} className="text-slate-100" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">No Matching Data</h3>
                            <p className="text-slate-400 max-w-xs mx-auto font-medium">We couldn't find any results matching your current filtering criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherStudentResults;
