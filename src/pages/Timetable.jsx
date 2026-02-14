import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, User, Bell } from 'lucide-react';

const Timetable = () => {
    const schedule = [
        {
            day: 'Monday', classes: [
                { time: '08:00 AM - 10:00 AM', subject: 'Physics', teacher: 'Prof. Sharma', topic: 'Electromagnetism', room: 'Hall A' },
                { time: '10:30 AM - 12:30 PM', subject: 'Mathematics', teacher: 'Dr. Kulkarni', topic: 'Calculus III', room: 'Hall B' },
                { time: '02:00 PM - 04:00 PM', subject: 'Doubt Session', teacher: 'Team Leads', topic: 'General', room: 'Library' },
            ]
        },
        {
            day: 'Tuesday', classes: [
                { time: '08:00 AM - 10:00 AM', subject: 'Chemistry', teacher: 'Prof. Yadav', topic: 'Organic Chemistry', room: 'Lab 1' },
                { time: '10:30 AM - 12:30 PM', subject: 'Biology', teacher: 'Dr. Mehta', topic: 'Genetics', room: 'Hall A' },
                { time: '02:00 PM - 04:00 PM', subject: 'Mock Test', teacher: 'Invigilator', topic: 'Weekly MSQ', room: 'Online/Hall C' },
            ]
        },
        {
            day: 'Wednesday', classes: [
                { time: '08:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Dr. Kulkarni', topic: 'Probability', room: 'Hall B' },
                { time: '10:30 AM - 12:30 PM', subject: 'Physics', teacher: 'Prof. Sharma', topic: 'Optics', room: 'Hall A' },
            ]
        },
        // Add more days as needed...
    ];

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6 font-bold text-xs uppercase tracking-widest">
                            <Clock size={16} />
                            <span>Academic Schedule 2024-25</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Class <span className="text-primary-600">Timetable</span></h1>
                        <p className="text-lg text-slate-500 font-medium">Stay updated with your daily lecture schedule, doubt sessions, and weekly MSQ tests.</p>
                    </div>
                    <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                        <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest">General</button>
                        <button className="px-6 py-3 rounded-xl text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">My Batch</button>
                    </div>
                </div>

                <div className="space-y-12">
                    {schedule.map((dayPlan, i) => (
                        <motion.div
                            key={dayPlan.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-600">
                                    <Calendar size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{dayPlan.day}</h2>
                                <div className="flex-grow h-px bg-slate-200 ml-4 hidden md:block"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {dayPlan.classes.map((cls, idx) => (
                                    <div key={idx} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full translate-x-8 -translate-y-8 group-hover:bg-primary-100 transition-colors"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center text-xs font-black text-primary-600 uppercase tracking-widest bg-primary-100/50 px-3 py-1.5 rounded-lg">
                                                    <Clock size={14} className="mr-2" />
                                                    {cls.time}
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{cls.room}</span>
                                            </div>

                                            <h3 className="text-2xl font-black text-slate-900 mb-2 truncate">{cls.subject}</h3>
                                            <div className="flex items-center text-slate-500 font-bold text-sm mb-6">
                                                <BookOpen size={16} className="mr-2 opacity-50" />
                                                {cls.topic}
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                        <User size={16} />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700">{cls.teacher}</span>
                                                </div>
                                                <Bell size={18} className="text-slate-300 hover:text-primary-600 cursor-pointer transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 bg-slate-900 rounded-[50px] p-12 lg:p-20 text-white relative overflow-hidden text-center">
                    <h2 className="text-4xl font-black mb-6">Never Miss a Class</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium">Download the full academic calendar and get notifications about extra classes or test schedule changes directly on your dashboard.</p>
                    <button className="btn-secondary rounded-2xl py-4 px-12 text-lg shadow-2xl">Download PDF Schedule</button>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 opacity-10 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500 opacity-10 blur-[100px]"></div>
                </div>
            </div>
        </div>
    );
};

export default Timetable;
