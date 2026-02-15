import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    BookOpen, CheckCircle2,
    ChevronDown, ChevronUp, Layers,
    Target, Award, Book, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentSyllabus = () => {
    const { syllabus, courses, currentUser } = useAppContext();
    const [expandedSubject, setExpandedSubject] = useState(null);

    // Filter syllabus based on student's enrolled courses
    const studentSyllabus = syllabus.filter(s =>
        currentUser.enrolledCourses.includes(s.courseId)
    );

    const toggleSubject = (id) => {
        setExpandedSubject(expandedSubject === id ? null : id);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8">
                            <Zap size={14} className="text-secondary-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Learning Roadmap</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Curriculum</span>.
                        </h2>
                        <p className="text-slate-400 text-lg font-medium max-w-lg leading-relaxed">
                            Stay ahead of your studies by tracking every module and topic in your academic journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5">
                            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                <Layers size={24} />
                            </div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Subjects</p>
                            <p className="text-4xl font-black">{studentSyllabus.length}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5">
                            <div className="w-12 h-12 bg-secondary-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                <Target size={24} />
                            </div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Modules</p>
                            <p className="text-4xl font-black">
                                {studentSyllabus.reduce((acc, s) => acc + s.modules.length, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subject List */}
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                <AnimatePresence>
                    {studentSyllabus.map((subject, idx) => {
                        const course = courses.find(c => c.id === subject.courseId);
                        const isExpanded = expandedSubject === subject.id;

                        return (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 ${isExpanded ? 'ring-4 ring-primary-50 border-primary-200 shadow-2xl scale-[1.01]' : 'hover:shadow-xl'}`}
                            >
                                {/* Subject Header */}
                                <button
                                    onClick={() => toggleSubject(subject.id)}
                                    className="w-full text-left p-8 md:p-10 flex items-center justify-between group"
                                >
                                    <div className="flex items-center space-x-8">
                                        <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${isExpanded ? 'bg-primary-600 text-white rotate-6 rotate-y-12' : 'bg-slate-100 text-slate-400'}`}>
                                            <BookOpen size={36} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-secondary-500 uppercase tracking-[0.3em] mb-2">{course?.title || 'General'}</p>
                                            <h3 className="text-3xl font-black text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">{subject.subject}</h3>
                                        </div>
                                    </div>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </div>
                                </button>

                                {/* Modules List */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-slate-50 bg-slate-50/30 overflow-hidden"
                                        >
                                            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {subject.modules.map((module, mIdx) => (
                                                    <motion.div
                                                        key={mIdx}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: mIdx * 0.05 }}
                                                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group/module"
                                                    >
                                                        <div className="flex items-start justify-between mb-8">
                                                            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg">
                                                                {mIdx + 1}
                                                            </div>
                                                            <div className="flex items-center space-x-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                                <CheckCircle2 size={12} />
                                                                <span>Status Tracking</span>
                                                            </div>
                                                        </div>

                                                        <h4 className="text-xl font-bold text-slate-900 mb-6 leading-tight group-hover/module:text-primary-600 transition-colors">
                                                            {module.module}
                                                        </h4>

                                                        <div className="space-y-4">
                                                            {module.topics.map((topic, tIdx) => (
                                                                <div key={tIdx} className="flex items-center space-x-3 text-slate-500 group/topic cursor-pointer">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/topic:bg-primary-500 transition-colors"></div>
                                                                    <span className="text-sm font-medium group-hover/topic:text-slate-900 transition-colors">{topic}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover/module:opacity-100 transition-opacity">
                                                            <button className="flex items-center space-x-2 text-[10px] font-black uppercase text-primary-600 hover:text-primary-700">
                                                                <Zap size={14} />
                                                                <span>Quick Revision</span>
                                                            </button>
                                                            <div className="h-1 flex-grow mx-6 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className="w-1/3 h-full bg-primary-500"></div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {studentSyllabus.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Book size={40} className="text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Curriculum Pending</h3>
                        <p className="text-slate-500 max-w-xs mx-auto font-medium">The academic plan for your courses is currently being finalized.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentSyllabus;
