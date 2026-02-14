import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Lock, FileText, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StudyMaterial = () => {
    const { courses } = useAppContext();

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Premium <span className="text-secondary-500">Study Resources</span></h1>
                    <p className="text-lg text-slate-500 font-medium">Access over 5000+ pages of curated notes, previous years' question papers, and video lectures.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all"
                        >
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-8 mb-4 group-hover:text-primary-600 transition-colors">
                                    <FileText size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
                                <p className="text-slate-500 mb-8 font-medium">Full access to formula sheets, chapter-wise notes, and shortcut trick PDFs.</p>

                                <div className="space-y-4 mb-10">
                                    {[
                                        'Chapter Notes', 'Equation Sheets', 'Previous Year Qs', 'Reference PDFs'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-2xl border border-slate-50">
                                            <span className="text-xs font-bold text-slate-600">{item}</span>
                                            <Lock size={14} className="text-slate-300" />
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/login"
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center space-x-2 font-black uppercase tracking-widest text-[10px] hover:bg-primary-600 transition-all shadow-lg shadow-slate-200"
                                >
                                    <span>Login to Access</span>
                                    <ChevronRight size={16} />
                                </Link>
                            </div>

                            {/* Background pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-12 -translate-y-12 transition-colors group-hover:bg-primary-50"></div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center bg-primary-600 rounded-[50px] p-16 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <GraduationCap size={48} className="mx-auto mb-8 text-primary-200" />
                        <h2 className="text-4xl font-black mb-6 leading-tight">Join Pixel Pro Classes for Full Access</h2>
                        <p className="text-xl text-primary-100 mb-10 font-medium">
                            Our digital library is exclusively available to enrolled students.
                            Get the competitive edge with our premium materials.
                        </p>
                        <Link to="/admission" className="btn-secondary py-4 px-12 text-lg inline-block rounded-2xl shadow-2xl">Start Admission Process</Link>
                    </div>
                    {/* Decoration */}
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default StudyMaterial;
