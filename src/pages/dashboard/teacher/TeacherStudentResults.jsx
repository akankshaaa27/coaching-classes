import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    BarChart3, Users, FileText,
    Search, Filter, TrendingUp, Award, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherStudentResults = () => {
    const { results, mockTests, users } = useAppContext();

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Student Performance</h2>
                    <p className="text-slate-500 font-medium text-lg">Monitor test scores and overall academic progress of your batches.</p>
                </div>
                <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-lg">Mock Tests</button>
                    <button className="px-6 py-2.5 rounded-xl text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600">Daily Quiz</button>
                </div>
            </div>

            <div className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-10 border-b border-slate-50 bg-slate-50/20 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-grow max-w-md relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by student name..."
                            className="input-field pl-12 py-4 bg-white border-transparent shadow-sm group-hover:shadow-md transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <select className="input-field py-4 bg-white border-transparent shadow-sm appearance-none pr-10">
                            <option>Filter by Mock Test</option>
                            {mockTests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                                <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Assessment</th>
                                <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Score</th>
                                <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Perf %</th>
                                <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Attempt Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {results.map((res, i) => {
                                const student = users.find(u => u.id === res.studentId);
                                const test = mockTests.find(t => t.id === res.mockTestId);
                                const perc = Math.round((res.score / res.total) * 100);

                                return (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="px-10 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-black text-xs border border-primary-50">
                                                    {student?.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{student?.name || 'Unknown'}</p>
                                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mt-1">ID: S-{res.studentId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="font-bold text-slate-700">{test?.title || 'Unknown Test'}</p>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="font-black text-slate-900 text-lg">{res.score}</span>
                                            <span className="text-slate-300 font-bold ml-1">/ {res.total}</span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${perc > 80 ? 'bg-green-500' : perc > 50 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                        style={{ width: `${perc}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`text-xs font-black ${perc > 80 ? 'text-green-600' : perc > 50 ? 'text-orange-600' : 'text-red-600'}`}>
                                                    {perc}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center text-slate-400 font-bold text-sm">
                                                <Clock size={16} className="mr-2 opacity-30" />
                                                {res.date}
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {results.length === 0 && (
                        <div className="p-20 text-center">
                            <FileText size={48} className="mx-auto text-slate-100 mb-4" />
                            <p className="text-slate-400 font-bold text-lg">No assessment data available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherStudentResults;
