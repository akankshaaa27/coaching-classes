import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, BookOpen, Clock, Award } from 'lucide-react';

const Faculty = () => {
    const teachers = [
        {
            name: 'Dr. Ramesh Kumar',
            role: 'HOD - Physics',
            exp: '22+ Years',
            qual: 'PhD from IIT Bombay',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Mrs. Sonia Verma',
            role: 'HOD - Biology',
            exp: '15+ Years',
            qual: 'MSc NEET Specialist',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
        },
        {
            name: 'Mr. Arvind Saxena',
            role: 'Math Expert',
            exp: '10+ Years',
            qual: 'BTech IIT Delhi',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
        }
    ];

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-slate-900 mb-6">Learn from <span className="text-primary-600 underline underline-offset-8 decoration-secondary-500">Expert Mentors</span></h1>
                    <p className="text-lg text-slate-500 font-medium">Our faculty consists of industry veterans and academic experts committed to your success.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {teachers.map((teacher, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all group"
                        >
                            <div className="relative h-96">
                                <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-3xl font-black text-white mb-1">{teacher.name}</h3>
                                    <p className="text-primary-400 font-black uppercase tracking-widest text-xs">{teacher.role}</p>
                                </div>
                            </div>

                            <div className="p-10 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Experience</p>
                                        <div className="flex items-center space-x-2 text-slate-900 font-black">
                                            <Clock size={16} className="text-primary-600" />
                                            <span>{teacher.exp}</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Qualification</p>
                                        <div className="flex items-center space-x-2 text-slate-900 font-black truncate">
                                            <Award size={16} className="text-secondary-500" />
                                            <span className="truncate">{teacher.qual.split(' ')[0]}+</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-500 font-medium leading-relaxed">
                                    A dedicated mentor known for making complex concepts easy to understand using real-world examples.
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex space-x-3">
                                        <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all">
                                            <Mail size={18} />
                                        </a>
                                    </div>
                                    <button className="text-primary-600 font-black uppercase tracking-widest text-xs flex items-center space-x-2 group">
                                        <span>View Profile</span>
                                        <BookOpen size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faculty;
