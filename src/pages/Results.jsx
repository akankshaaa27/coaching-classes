import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, TrendingUp, Filter } from 'lucide-react';

const Results = () => {
    const toppers = [
        { name: 'Aditya Sharma', rank: 'AIR 14', exam: 'NEET 2023', score: '705/720', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop' },
        { name: 'Priya Verma', rank: 'AIR 85', exam: 'JEE Adv 2023', score: '302/360', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop' },
        { name: 'Rahul Gupta', rank: 'AIR 120', exam: 'JEE Main 2023', score: '99.98 %ile', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }
    ];

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-slate-900 mb-6">Our <span className="text-primary-600">Wall of Fame</span></h1>
                    <p className="text-lg text-slate-500 font-medium">Consistently delivering world-class results year after year.</p>
                </div>

                {/* Hero Result */}
                <div className="bg-white rounded-[50px] p-8 lg:p-16 shadow-xl border border-slate-100 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/5 -skew-x-12 translate-x-20"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="relative">
                            <img
                                src={toppers[0].image}
                                alt="Topper"
                                className="w-full h-[500px] object-cover rounded-[40px] shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -right-8 bg-secondary-500 text-white p-8 rounded-[30px] shadow-2xl text-center min-w-[200px]">
                                <Trophy size={40} className="mx-auto mb-2" />
                                <h4 className="text-4xl font-black">{toppers[0].rank}</h4>
                                <p className="font-bold uppercase tracking-widest text-xs opacity-80">All India Rank</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full">
                                <Award className="text-primary-600" size={20} />
                                <span className="text-primary-600 font-black uppercase tracking-widest text-xs">NEET Excellence 2023</span>
                            </div>
                            <h2 className="text-5xl font-black text-slate-900 leading-tight">Becoming the Best requires Learning from the Best.</h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                Join the legacy of toppers who trusted Pixel Pro Classes for their competitive journey.
                                Our methodology focuses on conceptual clarity and rigorous practice.
                            </p>
                            <div className="flex items-center space-x-12">
                                <div>
                                    <p className="text-slate-400 font-bold uppercase tracking-tighter text-sm mb-1">Marks Scored</p>
                                    <p className="text-4xl font-black text-slate-900">705/720</p>
                                </div>
                                <div className="w-px h-16 bg-slate-100"></div>
                                <div>
                                    <p className="text-slate-400 font-bold uppercase tracking-tighter text-sm mb-1">State Rank</p>
                                    <p className="text-4xl font-black text-slate-900">#02</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid of Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                    {toppers.slice(1).map((topper, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
                        >
                            <div className="h-64 rounded-3xl overflow-hidden mb-8">
                                <img src={topper.image} alt={topper.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">{topper.name}</h3>
                                    <p className="text-primary-600 font-bold tracking-tight">{topper.exam}</p>
                                </div>
                                <div className="bg-secondary-50 text-secondary-600 font-black px-4 py-2 rounded-2xl text-lg">
                                    {topper.rank}
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <span className="text-slate-400 font-bold tracking-tighter uppercase text-sm">Score</span>
                                <span className="text-xl font-black text-slate-900">{topper.score}</span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Call to Action Card */}
                    <div className="bg-primary-600 rounded-[40px] p-8 text-white flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Be the Next Topper!</h3>
                        <p className="text-primary-100 mb-8 font-medium">Start your preparation today with professional guidance.</p>
                        <button className="bg-white text-primary-600 font-black py-4 px-10 rounded-2xl hover:bg-slate-50 transition-colors uppercase tracking-widest text-sm">
                            View All Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
