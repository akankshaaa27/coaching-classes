import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Users, Award, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary-500/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 rounded-full">
                            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                            <span className="text-primary-400 text-sm font-semibold tracking-wide uppercase">Admissions Open 2024-25</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1]">
                            Shaping Future <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Leaders & Achievers</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                            Experience modern learning with India's top mentors. Proven results in NEET, JEE, and Board exams.
                            Join the journey to excellence today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/admission" className="btn-primary py-4 px-8 text-lg flex items-center justify-center space-x-2 group">
                                <span>Start Your Journey</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/courses" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 px-8 rounded-lg font-semibold transition-colors flex items-center justify-center">
                                Explore Courses
                            </Link>
                        </div>

                        <div className="flex items-center space-x-8 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-bold text-white">15k+</p>
                                <p className="text-slate-500 text-sm uppercase">Students</p>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div>
                                <p className="text-3xl font-bold text-white">98%</p>
                                <p className="text-slate-500 text-sm uppercase">Success Rate</p>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div>
                                <p className="text-3xl font-bold text-white">250+</p>
                                <p className="text-slate-500 text-sm uppercase">Rank Holders</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                alt="Student studying"
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        </div>

                        {/* Floating stats card */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20 animate-bounce-slow">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Quality Guaranteed</p>
                                    <p className="text-lg font-bold text-slate-900">ISO Certified 9001</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-6 -right-6 bg-secondary-500 p-6 rounded-2xl shadow-2xl z-20 animate-pulse">
                            <div className="flex items-center space-x-4 text-white">
                                <Star size={24} fill="white" />
                                <div>
                                    <p className="text-xs opacity-80 font-medium">Student Rating</p>
                                    <p className="text-lg font-bold">4.9/5.0</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Features = () => {
    const features = [
        { icon: <Users size={32} />, title: "Expert Faculty", desc: "Learn from top IITians and Doctors with years of teaching experience." },
        { icon: <BookOpen size={32} />, title: "Digital Modules", desc: "Access comprehensive study material and video lectures anytime, anywhere." },
        { icon: <Award size={32} />, title: "Personalized Support", desc: "Dedicated doubt clearing sessions and one-on-one mentorship." },
        { icon: <ShieldCheck size={32} />, title: "Modern Testing", desc: "AI-powered mock tests and performance analytics to track progress." }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4">Why Choose Pixel Pro Classes</h2>
                    <p className="text-4xl font-extrabold text-slate-900">Experience a New Way of Learning</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:shadow-xl hover:bg-white"
                        >
                            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            {/* More sections can be added here or in future steps */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to boost your career?</h2>
                    <Link to="/admission" className="btn-secondary py-4 px-10 rounded-full inline-block">Enroll Now</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
