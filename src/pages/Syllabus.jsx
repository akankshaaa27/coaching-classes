import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, CheckCircle2, ChevronRight, Download, Search, Layout } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Syllabus = () => {
    const { courses, syllabus } = useAppContext();
    const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id);

    const activeCourse = courses.find(c => c.id === selectedCourse);
    const activeSyllabus = syllabus.filter(s => s.courseId === selectedCourse);

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full mb-6 font-bold text-xs uppercase tracking-widest">
                        <Book size={16} />
                        <span>Curriculum 2024</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Academic <span className="text-primary-600">Syllabus</span></h1>
                    <p className="text-lg text-slate-500 font-medium">Explore the comprehensive curriculum designed by experts to help you excel in competitive exams.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Course Sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 ml-2">Select Program</h3>
                            <div className="space-y-2">
                                {courses.map((course) => (
                                    <button
                                        key={course.id}
                                        onClick={() => setSelectedCourse(course.id)}
                                        className={`w-full text-left p-5 rounded-3xl transition-all flex items-center justify-between group ${selectedCourse === course.id
                                            ? 'bg-primary-600 text-white shadow-xl shadow-primary-200 scale-[1.02]'
                                            : 'bg-slate-50 text-slate-600 hover:bg-white hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCourse === course.id ? 'bg-white/20' : 'bg-white'}`}>
                                                <Layout size={20} className={selectedCourse === course.id ? 'text-white' : 'text-primary-600'} />
                                            </div>
                                            <span className="font-bold">{course.title}</span>
                                        </div>
                                        <ChevronRight size={18} className={`transition-transform ${selectedCourse === course.id ? 'translate-x-1' : 'opacity-0'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 p-10 rounded-[40px] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-4">Want PDF version?</h4>
                                <p className="text-slate-400 text-sm mb-8 leading-relaxed">Download the complete syllabus with weightage and reference books list.</p>
                                <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2 hover:bg-secondary-500 hover:text-white transition-all">
                                    <Download size={16} />
                                    <span>Download PDF</span>
                                </button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-600 rounded-full opacity-20 blur-3xl group-hover:scale-150 transition-transform"></div>
                        </div>
                    </div>

                    {/* Syllabus Content */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCourse}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="bg-white p-10 lg:p-14 rounded-[50px] border border-slate-100 shadow-sm h-full">
                                    <h2 className="text-3xl font-black text-slate-900 mb-2 truncate">{activeCourse?.title}</h2>
                                    <p className="text-slate-500 font-medium mb-12">Detailed chapter-wise breakdown for the academic session.</p>

                                    <div className="space-y-12">
                                        {activeSyllabus.map((sub, sIdx) => (
                                            <div key={sIdx} className="space-y-10">
                                                <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
                                                    <div className="w-2 h-8 bg-secondary-500 rounded-full"></div>
                                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{sub.subject}</h3>
                                                </div>
                                                <div className="space-y-12">
                                                    {sub.modules.map((mod, idx) => (
                                                        <div key={idx} className="relative pl-10">
                                                            <div className="absolute left-0 top-0 w-1 h-full bg-slate-100 rounded-full">
                                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-primary-600 rounded-full"></div>
                                                            </div>

                                                            <h4 className="text-xl font-bold text-slate-800 mb-6">{mod.module}</h4>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {mod.topics.map((topic, tIdx) => (
                                                                    <div key={tIdx} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-50 hover:border-primary-100 hover:bg-white transition-all group">
                                                                        <CheckCircle2 size={18} className="text-green-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                                        <span className="font-bold text-slate-600 text-sm">{topic}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        {activeSyllabus.length === 0 && (
                                            <div className="text-center py-20 bg-slate-50 rounded-[40px]">
                                                <Book size={48} className="mx-auto text-slate-200 mb-4" />
                                                <p className="text-slate-400 font-bold">No syllabus data available for this program.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Syllabus;
