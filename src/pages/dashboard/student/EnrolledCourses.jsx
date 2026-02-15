import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    BookOpen, TrendingUp, Award, Zap,
    Layout, Play, Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const { currentUser, courses } = useAppContext();
    const navigate = useNavigate();

    const enrolledCourses = courses.filter(course =>
        currentUser.enrolledCourses.includes(course.id)
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Header section */}
            <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-6">
                            <Zap size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Active Enrollment</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
                            Your Elite <span className="text-primary-600">Learning</span> Journey.
                        </h2>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Track your academic progress, access specialized curriculum, and continue your path to excellence across all your enrolled modules.
                        </p>
                    </div>

                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-16 h-16 rounded-3xl border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center overflow-hidden"
                            >
                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <div className="w-16 h-16 rounded-3xl border-4 border-white shadow-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                            +4.2k
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {enrolledCourses.map((course, i) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="h-64 relative overflow-hidden">
                            <img
                                src={course.image || `https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop`}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                            <div className="absolute top-6 left-6">
                                <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{course.category || 'Professional'}</span>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                <div className="flex flex-col">
                                    <p className="text-white/70 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Duration</p>
                                    <p className="text-white font-black text-xl leading-none">{course.duration}</p>
                                </div>
                                <button className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/20 hover:bg-white hover:text-primary-600 transition-colors">
                                    <Play size={24} fill="currentColor" />
                                </button>
                            </div>
                        </div>

                        <div className="p-10 flex flex-col flex-grow">
                            <div className="mb-10">
                                <div className="flex items-center space-x-2 text-primary-600 mb-2">
                                    <TrendingUp size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Active Progress</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight">
                                    {course.title}
                                </h3>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completeness</p>
                                        <p className="text-2xl font-black text-slate-900">65%</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 border border-slate-50">
                                        <Award size={20} />
                                    </div>
                                </div>

                                <div className="px-2">
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5">
                                        <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full w-[65%] shadow-sm shadow-primary-500/20"></div>
                                    </div>
                                </div>

                                <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 group/btn cursor-pointer" onClick={() => navigate('/dashboard/student/syllabus')}>
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover/btn:bg-primary-50 group-hover/btn:text-primary-600 transition-all">
                                            <Layout size={18} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-500 group-hover/btn:text-slate-900 transition-colors">View Roadmap</span>
                                    </div>
                                    <button className="p-3 text-slate-300 hover:text-yellow-500 transition-colors">
                                        <Star size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {enrolledCourses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-3 text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100"
                    >
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <BookOpen size={40} className="text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Active Enrollments</h3>
                        <p className="text-slate-500 mb-10 font-medium max-w-xs mx-auto">You haven't enrolled in any courses yet. Explore our elite curriculum to begin.</p>
                        <button
                            onClick={() => navigate('/courses')}
                            className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-600 transition-all shadow-xl shadow-slate-100"
                        >
                            Explore Courses
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default EnrolledCourses;
