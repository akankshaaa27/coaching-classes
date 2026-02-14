import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { BookOpen, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EnrolledCourses = () => {
    const { currentUser, courses } = useAppContext();

    const enrolledCourses = courses.filter(course =>
        currentUser.enrolledCourses.includes(course.id)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900">My Learning Path</h2>
                    <p className="text-slate-500 font-medium">Manage your active courses and track your curriculum progress.</p>
                </div>
                <div className="flex -space-x-3 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-12 h-12 bg-primary-100 rounded-full border-4 border-white flex items-center justify-center text-primary-600 font-bold">
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                    <div className="w-12 h-12 bg-slate-900 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold leading-none">
                        +12
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map((course, i) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:border-primary-100 transition-all cursor-pointer"
                    >
                        <div className="h-48 bg-slate-100 relative group-hover:scale-105 transition-transform duration-500">
                            <img
                                src={`https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop`}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                        </div>

                        <div className="p-8 flex-grow">
                            <div className="flex items-center space-x-2 text-primary-600 mb-2">
                                <TrendingUp size={16} />
                                <span className="text-xs font-black uppercase tracking-widest">Active Progress</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{course.title}</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-tighter">
                                    <span>Course Completeness</span>
                                    <span>65%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="w-[65%] h-full bg-primary-600 rounded-full"></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center space-x-2 text-slate-500 text-sm font-bold">
                                    <Clock size={16} />
                                    <span>{course.duration}</span>
                                </div>
                                <button className="text-primary-600 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                                    <span>Continue</span>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {enrolledCourses.length === 0 && (
                    <div className="lg:col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <BookOpen size={48} className="mx-auto text-slate-200 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">You haven't enrolled yet</h3>
                        <p className="text-slate-500 mb-8">Explore our catalog and start your preparation journey.</p>
                        <button onClick={() => navigate('/courses')} className="btn-primary py-3 px-8">Browse Courses</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrolledCourses;
