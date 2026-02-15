import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    FileText, Download,
    Search, Clock,
    Filter, LayoutGrid, List,
    BookOpen, Video,
    Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentMaterials = () => {
    const { materials, courses, currentUser } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [viewMode, setViewMode] = useState('grid');

    // Filter materials based on enrolled courses, type and search query
    const filteredMaterials = materials.filter(m => {
        const matchesCourse = currentUser.enrolledCourses.includes(m.courseId);
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || m.type === selectedType;
        return matchesCourse && matchesSearch && matchesType;
    });

    const types = ['All', 'PDF', 'Video', 'Doc'];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Header section with Search */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-6">
                            <BookOpen size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Digital Repository</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                            Your Personal <span className="text-primary-600">Knowledge</span> Base.
                        </h2>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Access all your course-specific notes, video lectures, and reference materials in one centralized location.
                        </p>
                    </div>

                    <div className="w-full lg:w-96 space-y-4">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title or topic..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-50 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
                    <div className="p-2 bg-slate-100 rounded-xl mr-2">
                        <Filter size={18} className="text-slate-400" />
                    </div>
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedType === type
                                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                                }`}
                        >
                            {type === 'All' ? 'All Formats' : type}
                        </button>
                    ))}
                </div>

                <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm self-start">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            {/* Content Display */}
            <AnimatePresence mode="wait">
                {filteredMaterials.length > 0 ? (
                    <motion.div
                        key={viewMode + selectedType + searchQuery}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={viewMode === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            : "space-y-4"
                        }
                    >
                        {filteredMaterials.map((m, i) => {
                            const course = courses.find(c => c.id === m.courseId);

                            if (viewMode === 'grid') {
                                return (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-primary-50 transition-colors"></div>

                                        <div className="relative z-10 flex-grow">
                                            <div className="flex justify-between items-start mb-8">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${m.type === 'Video' ? 'bg-red-50 text-red-600' : 'bg-primary-600 text-white'
                                                    }`}>
                                                    {m.type === 'Video' ? <Video size={28} /> : <FileText size={28} />}
                                                </div>
                                                <button className="text-slate-300 hover:text-yellow-500 transition-colors">
                                                    <Star size={20} />
                                                </button>
                                            </div>

                                            <div className="space-y-2 mb-8">
                                                <p className="text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em]">
                                                    {course?.title || 'General Resource'}
                                                </p>
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                                                    {m.title}
                                                </h3>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-8">
                                                <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    <Clock size={12} />
                                                    <span>{m.uploadDate}</span>
                                                </div>
                                                <span className="text-[10px] font-black uppercase bg-white px-2 py-1 rounded shadow-sm text-slate-600">{m.type || 'PDF'}</span>
                                            </div>
                                        </div>

                                        <a
                                            href={m.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative z-10 w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center space-x-2 group-hover:bg-primary-600 transition-all font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-100 group-hover:shadow-primary-100"
                                        >
                                            {m.type === 'Video' ? <Video size={16} /> : <Download size={16} />}
                                            <span>{m.type === 'Video' ? 'Watch Lecture' : 'Access Resource'}</span>
                                        </a>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="group bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-6 hover:shadow-xl hover:border-primary-100 transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${m.type === 'Video' ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-600'}`}>
                                        {m.type === 'Video' ? <Video size={20} /> : <FileText size={20} />}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">{m.title}</h3>
                                        <div className="flex items-center space-x-4 mt-0.5">
                                            <span className="text-[10px] font-black uppercase text-secondary-500 tracking-widest">{course?.title}</span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                            <span className="text-[10px] font-bold text-slate-400">{m.uploadDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 pr-2">
                                        <span className="hidden md:inline-block text-[10px] font-black uppercase bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-100">{m.type}</span>
                                        <a
                                            href={m.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-slate-900 text-white rounded-xl hover:bg-primary-600 transition-all shadow-lg"
                                        >
                                            <Download size={18} />
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100"
                    >
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <BookOpen size={40} className="text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Matching Resources</h3>
                        <p className="text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
                            We couldn't find any materials matching your current filters. Try refining your search or changing the format.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentMaterials;
