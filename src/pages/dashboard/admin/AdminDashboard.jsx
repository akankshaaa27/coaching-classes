import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { Users, BookOpen, GraduationCap, TrendingUp, UserCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, detail, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
    >
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">{title}</p>
        <h3 className="text-4xl font-black text-slate-900 mb-2">{value}</h3>
        <p className="text-slate-500 font-medium text-sm flex items-center">
            <TrendingUp size={14} className="mr-1 text-green-500" />
            {detail}
        </p>
    </motion.div>
);

const AdminDashboard = () => {
    const { users, courses } = useAppContext();

    const stats = [
        { icon: <Users size={24} />, title: 'Total Students', value: users.filter(u => u.role === 'student').length, detail: '+12% this month', color: 'bg-primary-600', delay: 0.1 },
        { icon: <GraduationCap size={24} />, title: 'Expert Teachers', value: users.filter(u => u.role === 'teacher').length, detail: '2 new joined', color: 'bg-secondary-500', delay: 0.2 },
        { icon: <BookOpen size={24} />, title: 'Active Courses', value: courses.length, detail: '4 batch categories', color: 'bg-green-600', delay: 0.3 },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Admin <span className="text-primary-600">Overview</span></h2>
                    <p className="text-slate-500 font-medium text-lg">System-wide monitoring and institutional management.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3 text-slate-400 font-bold text-sm">
                    <UserCheck size={18} className="text-primary-500" />
                    <span>Logged in as: <span className="text-slate-900">Administrator</span></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <AlertCircle size={40} className="text-secondary-400 mb-6" />
                        <h3 className="text-3xl font-black mb-4">Pending Admissions</h3>
                        <p className="text-slate-400 mb-8 font-medium">There are 8 new admission requests waiting for verification and batch assignment.</p>
                        <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary-500 hover:text-white transition-all">Review Requests</button>
                    </div>
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity"></div>
                </div>

                <div className="bg-primary-600 rounded-[50px] p-12 text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <TrendingUp size={40} className="text-white mb-6" />
                        <h3 className="text-3xl font-black mb-4">Performance Insights</h3>
                        <p className="text-primary-100 mb-8 font-medium">Overall test success rate has increased by 15% after implementing the new mock test series.</p>
                        <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all">View Analytics</button>
                    </div>
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500 opacity-20 blur-[100px] group-hover:opacity-30 transition-opacity"></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
