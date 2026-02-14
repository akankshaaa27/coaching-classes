import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Clock, CreditCard, ChevronRight, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 group"
    >
        <div className="relative h-48 overflow-hidden">
            <img
                src={`https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop`}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
                <span className="bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Best Seller
                </span>
            </div>
        </div>

        <div className="p-8">
            <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-secondary-500 text-secondary-500" />)}
                <span className="text-xs font-bold text-slate-400 ml-2">(120+ Reviews)</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                {course.title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {course.description}
            </p>

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                <div className="flex items-center space-x-2 text-slate-600">
                    <Clock size={16} />
                    <span className="text-sm font-bold">{course.duration}</span>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Course Fee</p>
                    <p className="text-2xl font-black text-slate-900">₹{course.fees}</p>
                </div>
            </div>

            <Link
                to="/admission"
                className="btn-primary w-full py-4 flex items-center justify-center space-x-2 group/btn"
            >
                <span>Enroll Now</span>
                <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
    </motion.div>
);

const Courses = () => {
    const { courses } = useAppContext();

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Our <span className="text-primary-600 underline decoration-secondary-500 decoration-4 underline-offset-8">Academic Programs</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Choose from our wide range of specialized programs designed for competitive excellence
                        and comprehensive board preparation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {courses.map((course, i) => (
                        <CourseCard key={course.id} course={course} index={i} />
                    ))}
                </div>

                {/* Support Section */}
                <div className="mt-24 p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Confused which path to take?</h2>
                            <p className="text-slate-500 mb-8 max-w-md font-medium">
                                Talk to our expert counselors today for a personalized roadmap for your career goals.
                                No obligations, just pure guidance.
                            </p>
                            <div className="space-y-4">
                                {['Personalized Mentorship', 'Result-Oriented Strategy', 'Doubt Clearing Support'].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3 text-slate-700 font-bold">
                                        <CheckCircle2 size={24} className="text-secondary-500" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl">
                            <h3 className="text-xl font-bold mb-6">Request Callback</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Your Name" className="input-field py-4" />
                                <input type="tel" placeholder="Phone Number" className="input-field py-4" />
                                <button className="btn-secondary w-full py-4 uppercase font-black tracking-widest text-sm">
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
