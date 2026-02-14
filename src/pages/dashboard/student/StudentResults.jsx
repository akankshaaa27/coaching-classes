import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    BarChart3, TrendingUp, Award,
    Calendar, CheckCircle2, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const StudentResults = () => {
    const { results, mockTests, currentUser } = useAppContext();

    const studentResults = results.filter(r => r.studentId === currentUser.id);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Academic Analytics</h2>
                    <p className="text-slate-500 font-medium tracking-tight">Track your performance across all attempted mock assessments.</p>
                </div>
                <div className="bg-primary-600 p-4 rounded-2xl text-white shadow-lg shadow-primary-200 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Total Score</p>
                        <p className="text-2xl font-black leading-none">
                            {studentResults.reduce((acc, r) => acc + r.score, 0)} / {studentResults.reduce((acc, r) => acc + r.total, 0)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <TrendingUp size={32} className="text-blue-500 mb-4" />
                    <h4 className="text-slate-400 font-black uppercase tracking-widest text-xs mb-2">Performance Index</h4>
                    <p className="text-3xl font-black text-slate-900">
                        {studentResults.length > 0
                            ? `${Math.round((studentResults.reduce((acc, r) => acc + (r.score / r.total), 0) / studentResults.length) * 100)}%`
                            : 'N/A'}
                    </p>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <Award size={32} className="text-secondary-500 mb-4" />
                    <h4 className="text-slate-400 font-black uppercase tracking-widest text-xs mb-2">Highest Rank</h4>
                    <p className="text-3xl font-black text-slate-900">#04</p>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <CheckCircle2 size={32} className="text-green-500 mb-4" />
                    <h4 className="text-slate-400 font-black uppercase tracking-widest text-xs mb-2">Tests Completed</h4>
                    <p className="text-3xl font-black text-slate-900">{studentResults.length}</p>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <h3 className="text-xl font-bold text-slate-900">Recent Test History</h3>
                    <button className="text-sm font-bold text-primary-600 hover:text-primary-700">Download All Report</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Mock Test</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Attempt Date</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Score / Total</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Percentage</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {studentResults.map((res, i) => {
                                const test = mockTests.find(t => t.id === res.mockTestId);
                                const perc = Math.round((res.score / res.total) * 100);

                                return (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{test?.title || 'Unknown Test'}</p>
                                        </td>
                                        <td className="px-8 py-6 font-medium text-slate-500 flex items-center">
                                            <Calendar size={14} className="mr-2 opacity-40" />
                                            {res.date}
                                        </td>
                                        <td className="px-8 py-6 font-black text-slate-900">
                                            {res.score} / {res.total}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[100px]">
                                                    <div
                                                        className={`h-full rounded-full ${perc > 75 ? 'bg-green-500' : perc > 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                        style={{ width: `${perc}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`text-xs font-black ${perc > 75 ? 'text-green-600' : perc > 40 ? 'text-orange-600' : 'text-red-600'}`}>{perc}%</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-xl transition-all shadow-sm">
                                                <ChevronRight size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {studentResults.length === 0 && (
                        <div className="p-20 text-center text-slate-400">
                            <BarChart3 size={40} className="mx-auto mb-4 opacity-20" />
                            <p className="font-bold">No academic records found yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentResults;
