import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    Users, BookOpen, FileText, BarChart3,
    Calendar, Clock, CheckCircle, TrendingUp
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const StatCard = ({ icon, label, value, trend, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                {icon}
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
);

const DashboardHero = () => {
    const { currentUser, users, courses, mockTests, results } = useAppContext();

    // Admin Stats
    const adminStats = [
        { label: 'Total Students', value: users.filter(u => u.role === 'student').length, icon: <Users size={24} />, color: 'bg-blue-600', trend: 12 },
        { label: 'Total Teachers', value: users.filter(u => u.role === 'teacher').length, icon: <Users size={24} />, color: 'bg-purple-600', trend: 5 },
        { label: 'Active Courses', value: courses.length, icon: <BookOpen size={24} />, color: 'bg-orange-600' },
        { label: 'Tests Conducted', value: results.length, icon: <FileText size={24} />, color: 'bg-green-600' }
    ];

    // Student Stats
    const studentResults = results.filter(r => r.studentId === currentUser.id);
    const avgScore = studentResults.length > 0
        ? Math.round((studentResults.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / studentResults.length) * 100)
        : 0;

    const studentStats = [
        { label: 'Enrolled Courses', value: currentUser?.enrolledCourses?.length || 0, icon: <BookOpen size={24} />, color: 'bg-blue-600' },
        { label: 'Tests Taken', value: studentResults.length, icon: <FileText size={24} />, color: 'bg-purple-600' },
        { label: 'Average Score', value: `${avgScore}%`, icon: <TrendingUp size={24} />, color: 'bg-green-600' },
        { label: 'Recent Rank', value: '#12', icon: <CheckCircle size={24} />, color: 'bg-orange-600' }
    ];

    const stats = currentUser.role === 'admin' ? adminStats : studentStats;

    const data = [
        { name: 'Mon', score: 65 },
        { name: 'Tue', score: 59 },
        { name: 'Wed', score: 80 },
        { name: 'Thu', score: 81 },
        { name: 'Fri', score: 56 },
        { name: 'Sat', score: 55 },
        { name: 'Sun', score: 40 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}! 👋</h2>
                    <p className="text-primary-100 opacity-90 text-lg">
                        {currentUser.role === 'admin'
                            ? "Here's what's happening today at the academy."
                            : "You've completed 75% of your weekly targets. Keep it up!"}
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-full bg-white/10 skew-x-12 translate-x-32"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900">Performance Analytics</h3>
                        <select className="bg-slate-50 border-none rounded-lg text-sm font-semibold p-2 focus:ring-primary-500">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Schedule / Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                            <button className="text-xs font-bold text-primary-600 hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { time: '10:00 AM', event: 'Physics Mock Test - I', type: 'Test' },
                                { time: '02:00 PM', event: 'Live Biology Session', type: 'Class' },
                                { time: '04:30 PM', event: 'Doubt Clearing Class', type: 'Support' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-bold text-slate-400">{item.time.split(' ')[1]}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{item.event}</p>
                                        <p className="text-xs text-slate-500 font-medium">Scheduled for {item.time}</p>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full mt-1 ${item.type === 'Test' ? 'bg-orange-400' : item.type === 'Class' ? 'bg-blue-400' : 'bg-purple-400'
                                        }`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-2">Need help?</h3>
                            <p className="text-sm text-slate-400 mb-6">Contact our support desk for technical issues.</p>
                            <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-primary-50 transition-colors">
                                Contact Support
                            </button>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
