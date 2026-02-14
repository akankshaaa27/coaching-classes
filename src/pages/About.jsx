import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Users, Award, TrendingUp } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl font-black text-slate-900 leading-tight">
                            Leading the Way in <span className="text-primary-600">Educational Excellence</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            Founded in 2010, Pixel Pro Classes has been a beacon of hope for thousands of students.
                            Our journey started with a simple vision: quality education should be accessible and result-oriented.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <h4 className="text-4xl font-black text-primary-600 mb-2">15+</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-tight text-sm">Years of Legacy</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-black text-secondary-500 mb-2">500+</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-tight text-sm">Top Rankers</p>
                            </div>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                            alt="Classroom"
                            className="rounded-[40px] shadow-2xl relative z-10"
                        />
                        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary-500 rounded-3xl -z-0 opacity-20"></div>
                    </div>
                </div>

                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
                    {[
                        { icon: <Target className="text-primary-600" />, title: 'Our Mission', desc: 'To provide personalized education that empowers students to reach their full potential and clear toughest exams.' },
                        { icon: <Eye className="text-secondary-500" />, title: 'Our Vision', desc: 'To be India\'s most trusted coaching institute known for academic integrity and exceptional student outcomes.' },
                        { icon: <Shield className="text-green-600" />, title: 'Our Values', desc: 'Integrity, Passion, and Excellence in everything we do. We put students first in every decision.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Director Message */}
                <div className="bg-slate-900 rounded-[50px] p-12 lg:p-20 text-white relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
                        <div className="lg:col-span-2">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                                alt="Director"
                                className="rounded-3xl border-8 border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="lg:col-span-3 space-y-8">
                            <h2 className="text-4xl font-bold">Message from the Director</h2>
                            <p className="text-xl text-slate-300 italic leading-relaxed">
                                "Education is not just about marks; it's about building characters and sharpening minds.
                                At Pixel Pro Classes, we don't just teach subjects, we teach students how to think, analyze, and succeed."
                            </p>
                            <div>
                                <h4 className="text-2xl font-bold text-white">Dr. Satish Kulkarni</h4>
                                <p className="text-primary-400 font-bold uppercase tracking-widest text-sm">Founder & Chief Mentor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
