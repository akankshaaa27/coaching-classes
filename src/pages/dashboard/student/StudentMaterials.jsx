import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    FileText, Download, Book,
    Search, Clock, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const StudentMaterials = () => {
    const { materials, courses, currentUser } = useAppContext();

    // Filter materials based on enrolled courses
    const filteredMaterials = materials.filter(m =>
        currentUser.enrolledCourses.includes(m.courseId)
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Academic Resources</h2>
                    <p className="text-slate-500 font-medium text-lg mt-1">Access your personalized library of notes, PDFs, and guides.</p>
                </div>
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary-600 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        className="input-field pl-12 py-4 bg-white border-slate-100 shadow-sm focus:shadow-xl focus:border-primary-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMaterials.map((m, i) => {
                    const course = courses.find(c => c.id === m.courseId);
                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 group hover:shadow-2xl transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary-200">
                                    <FileText size={32} />
                                </div>

                                <p className="text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em] mb-2">
                                    {course?.title || 'General'}
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-snug group-hover:text-primary-600 transition-colors">{m.title}</h3>

                                <div className="flex items-center justify-between mb-8 opacity-60">
                                    <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
                                        <Clock size={14} />
                                        <span>{m.uploadDate}</span>
                                    </div>
                                    <span className="text-xs font-black uppercase bg-slate-100 px-3 py-1 rounded-lg">{(m.type || 'PDF')}</span>
                                </div>

                                <a
                                    href={m.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center space-x-2 group-hover:bg-primary-600 transition-all font-bold shadow-lg"
                                >
                                    <Download size={20} />
                                    <span>Download Resource</span>
                                </a>
                            </div>
                        </motion.div>
                    );
                })}

                {filteredMaterials.length === 0 && (
                    <div className="lg:col-span-4 text-center py-32 bg-white rounded-[50px] border-4 border-dashed border-slate-100">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Book size={40} className="text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Resources Found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
                            Materials for your enrolled courses will appear here once they are uploaded by your teachers.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentMaterials;
