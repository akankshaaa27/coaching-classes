import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { FileText, Clock, Play, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const MockTests = () => {
    const { mockTests, results, currentUser } = useAppContext();
    const navigate = useNavigate();

    const getTestStatus = (testId) => {
        const result = results.find(r => r.mockTestId === testId && r.studentId === currentUser.id);
        return result ? 'completed' : 'pending';
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Available Mock Tests</h2>
                    <p className="text-slate-500 font-medium">Test your knowledge with our curated assessment modules.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                    <Award className="text-secondary-500" size={20} />
                    <span className="text-sm font-bold text-slate-700">Total Attempts: {results.filter(r => r.studentId === currentUser.id).length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockTests.map((test, i) => {
                    const status = getTestStatus(test.id);
                    const result = results.find(r => r.mockTestId === test.id && r.studentId === currentUser.id);

                    return (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-2xl ${status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-primary-100 text-primary-600'}`}>
                                        <FileText size={24} />
                                    </div>
                                    {status === 'completed' ? (
                                        <span className="flex items-center space-x-1 text-xs font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                            <CheckCircle2 size={12} />
                                            <span>Completed</span>
                                        </span>
                                    ) : (
                                        <span className="text-xs font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                                            Available
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {test.title}
                                </h3>

                                <div className="flex items-center space-x-6 mb-8">
                                    <div className="flex items-center space-x-2 text-slate-500">
                                        <Clock size={16} />
                                        <span className="text-sm font-semibold">{test.duration} Mins</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-slate-500">
                                        <CheckCircle2 size={16} />
                                        <span className="text-sm font-semibold">{test.questions.length} Questions</span>
                                    </div>
                                </div>

                                {status === 'completed' ? (
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                            <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Score</span>
                                            <span className="text-xl font-black text-slate-900">{result.score} / {result.total}</span>
                                        </div>
                                        <button
                                            disabled
                                            className="w-full bg-slate-100 text-slate-400 py-3.5 rounded-xl font-bold cursor-not-allowed"
                                        >
                                            Already Attempted
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => navigate(`/dashboard/student/mock-test/${test.id}`)}
                                        className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-600 transition-all shadow-lg active:scale-95"
                                    >
                                        <Play size={18} fill="currentColor" />
                                        <span>Start Exam</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {mockTests.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Mock Tests Available</h3>
                    <p className="text-slate-500">Check back later for newly added assessment modules.</p>
                </div>
            )}
        </div>
    );
};

export default MockTests;
