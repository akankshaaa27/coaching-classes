import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    Users, UserPlus, Search, Edit2,
    Trash2, Mail, Phone, GraduationCap,
    BookOpen, Layers, CheckCircle, X,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';

const ManageTeachers = () => {
    const { users, courses, subjects, register, updateProfile, deleteUser } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        enrolledCourses: [],
        enrolledSubjects: [],
        password: 'password123'
    });

    const teachers = users.filter(u => u.role === 'teacher');

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Multi-select options
    const courseOptions = courses.map(c => ({ value: c.id, label: c.title }));

    // Available subjects for ALL selected courses
    const availableSubjects = subjects.filter(s => formData.enrolledCourses.includes(s.courseId));
    const subjectOptions = availableSubjects.map(s => {
        const course = courses.find(c => c.id === s.courseId);
        return {
            value: s.id,
            label: `${s.name} (${course?.title || 'Unknown'})`,
            courseId: s.courseId
        };
    });

    const handleCourseChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(o => o.value) : [];
        setFormData({
            ...formData,
            enrolledCourses: selectedIds,
            // Filter out subjects that are no longer in the selected courses
            enrolledSubjects: formData.enrolledSubjects.filter(sid => {
                const sub = subjects.find(s => s.id === sid);
                return sub && selectedIds.includes(sub.courseId);
            })
        });
    };

    const handleSubjectChange = (selectedOptions) => {
        setFormData({
            ...formData,
            enrolledSubjects: selectedOptions ? selectedOptions.map(o => o.value) : []
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTeacher) {
            updateProfile(editingTeacher.id, { ...formData, role: 'teacher' });
        } else {
            register({ ...formData, role: 'teacher' });
        }
        closeModal();
    };

    const openEdit = (teacher) => {
        setEditingTeacher(teacher);
        setFormData({
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone || '',
            enrolledCourses: teacher.enrolledCourses || [],
            enrolledSubjects: teacher.enrolledSubjects || [],
            password: teacher.password || 'password123'
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTeacher(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            enrolledCourses: [],
            enrolledSubjects: [],
            password: 'password123'
        });
    };

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            padding: '8px',
            borderRadius: '16px',
            borderColor: '#e2e8f0',
            backgroundColor: '#f8fafc',
            fontFamily: 'inherit',
            '&:hover': { borderColor: '#4f46e5' }
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#4f46e5',
            borderRadius: '8px',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'white',
            fontWeight: 'bold',
            padding: '2px 8px'
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: 'white',
            '&:hover': { backgroundColor: '#4338ca', color: 'white' }
        })
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Faculty <span className="text-secondary-500">Management</span></h2>
                    <p className="text-slate-500 font-medium text-lg">Manage teacher qualifications, assigned programs, and subject expertise.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary py-4 px-8 flex items-center justify-center space-x-3 shadow-xl shadow-primary-200"
                >
                    <UserPlus size={24} />
                    <span className="font-black uppercase tracking-widest text-sm text-white">Hire Faculty Member</span>
                </button>
            </div>

            {/* Filter */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="relative font-medium">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search faculty by name, email or mobile..."
                        className="input-field pl-16 py-5 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {filteredTeachers.map((teacher, i) => (
                    <motion.div
                        key={teacher.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full translate-x-24 -translate-y-24 group-hover:bg-primary-50 transition-colors"></div>

                        <div className="flex flex-col items-center space-y-4 relative z-10 shrink-0">
                            <div className="w-24 h-24 bg-secondary-100 rounded-[2rem] flex items-center justify-center text-secondary-600 font-black text-4xl border-4 border-white shadow-lg group-hover:rotate-6 transition-all">
                                {teacher.name.charAt(0)}
                            </div>
                            <div className="text-center">
                                <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                    Active Faculty
                                </span>
                            </div>
                        </div>

                        <div className="flex-grow space-y-6 relative z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{teacher.name}</h3>
                                    <div className="flex items-center text-slate-500 text-sm mt-1 space-x-4">
                                        <span className="flex items-center font-bold"><Mail size={14} className="mr-1.5 text-primary-500" /> {teacher.email}</span>
                                        <span className="flex items-center font-bold"><Phone size={14} className="mr-1.5 text-secondary-500" /> {teacher.phone}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => openEdit(teacher)} className="p-3 bg-slate-50 text-slate-400 hover:text-primary-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => deleteUser(teacher.id)} className="p-3 bg-red-50 text-red-400 hover:text-red-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Assigned Programs</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(teacher.enrolledCourses || []).map(cid => {
                                            const course = courses.find(c => c.id === cid);
                                            return (
                                                <span key={cid} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-xl text-xs font-bold border border-primary-100 flex items-center">
                                                    <BookOpen size={12} className="mr-1.5" />
                                                    {course?.title || 'Program'}
                                                </span>
                                            );
                                        })}
                                        {(!teacher.enrolledCourses || teacher.enrolledCourses.length === 0) && (
                                            <span className="text-slate-400 text-xs italic font-medium">No programs assigned</span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Subject Expertise</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(teacher.enrolledSubjects || []).map(sid => {
                                            const sub = subjects.find(s => s.id === sid);
                                            return (
                                                <span key={sid} className="px-3 py-1.5 bg-secondary-50 text-secondary-700 rounded-xl text-xs font-bold border border-secondary-100 flex items-center">
                                                    <Layers size={12} className="mr-1.5" />
                                                    {sub?.name || 'Subject'}
                                                </span>
                                            );
                                        })}
                                        {(!teacher.enrolledSubjects || teacher.enrolledSubjects.length === 0) && (
                                            <span className="text-slate-400 text-xs italic font-medium">No subjects assigned</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                            onClick={closeModal}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] md:rounded-[4rem] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            <div className="p-6 md:p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 shrink-0">
                                <div>
                                    <h3 className="text-xl md:text-3xl font-black text-slate-900">{editingTeacher ? 'Update Faculty' : 'Hire New Faculty'}</h3>
                                    <p className="text-slate-500 font-medium text-xs md:text-sm">Define expertise and assign academic responsibilities.</p>
                                </div>
                                <button onClick={closeModal} className="p-2 md:p-4 hover:bg-white rounded-2xl transition-colors shadow-sm shrink-0">
                                    <X size={24} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
                                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text" required className="input-field py-4 md:py-5" placeholder="Faculty name"
                                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <input
                                                type="email" required className="input-field py-4 md:py-5" placeholder="faculty@academy.com"
                                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                            <input
                                                type="tel" required className="input-field py-4 md:py-5" placeholder="+91 00000 00000"
                                                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Portal Password</label>
                                            <input
                                                type="text" required className="input-field py-4 md:py-5"
                                                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6 md:space-y-8 pt-6 md:pt-8 border-t border-slate-50">
                                        <div className="space-y-2 md:space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Programs</label>
                                            <Select
                                                isMulti
                                                options={courseOptions}
                                                styles={customSelectStyles}
                                                value={courseOptions.filter(o => formData.enrolledCourses.includes(o.value))}
                                                onChange={handleCourseChange}
                                                placeholder="Assign courses..."
                                            />
                                        </div>

                                        <div className="space-y-2 md:space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Expertise</label>
                                            <Select
                                                isMulti
                                                options={subjectOptions}
                                                styles={customSelectStyles}
                                                value={subjectOptions.filter(o => formData.enrolledSubjects.includes(o.value))}
                                                onChange={handleSubjectChange}
                                                placeholder="Assign subjects for selected courses..."
                                                noOptionsMessage={() => (formData.enrolledCourses.length > 0 ? "No subjects found for selected courses" : "Select at least one course first")}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 md:pt-6 flex flex-col md:flex-row gap-4 md:gap-6">
                                        <button type="button" onClick={closeModal} className="flex-1 py-4 md:py-5 text-xs md:text-sm font-black uppercase tracking-widest text-slate-400 border-2 border-slate-100 rounded-2xl md:rounded-3xl hover:bg-slate-50 transition-all">
                                            Discard
                                        </button>
                                        <button type="submit" className="flex-1 btn-primary py-4 md:py-5 text-xs md:text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary-200">
                                            {editingTeacher ? 'Save Faculty Records' : 'Complete Hiring'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageTeachers;
