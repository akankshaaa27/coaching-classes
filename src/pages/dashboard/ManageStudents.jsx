import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    Users, UserPlus, Search, Edit2,
    Trash2, Mail, Phone, Calendar,
    BookOpen, Book, CheckCircle, X,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';

const ManageStudents = () => {
    const { users, courses: allCourses, subjects, register, updateProfile, deleteUser, currentUser } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [courseFilter, setCourseFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    // Role-based visibility
    const courses = currentUser.role === 'admin'
        ? allCourses
        : allCourses.filter(c => (currentUser.enrolledCourses || []).includes(c.id));

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        courseId: '',
        enrolledSubjects: [],
        admissionDate: new Date().toISOString().split('T')[0],
        password: 'password123'
    });

    // Get only students (filtered by teacher's courses if applicable)
    const students = users.filter(u => {
        if (u.role !== 'student') return false;
        if (currentUser.role === 'admin') return true;
        return (currentUser.enrolledCourses || []).includes(u.courseId);
    });

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = courseFilter === 'all' || student.courseId === courseFilter;
        return matchesSearch && matchesCourse;
    });

    // Available subjects for the selected course in form
    const availableSubjects = subjects.filter(s => s.courseId === formData.courseId);

    const subjectOptions = availableSubjects.map(s => ({ value: s.id, label: s.name }));

    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        setFormData({
            ...formData,
            courseId,
            enrolledSubjects: [] // Reset subjects when course changes
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
        if (editingStudent) {
            updateProfile(editingStudent.id, { ...formData, role: 'student' });
        } else {
            register({ ...formData, role: 'student' });
        }
        closeModal();
    };

    const openEdit = (student) => {
        setEditingStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone || '',
            courseId: student.courseId || '',
            enrolledSubjects: student.enrolledSubjects || [],
            admissionDate: student.admissionDate || new Date().toISOString().split('T')[0],
            password: student.password || 'password123'
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            courseId: '',
            enrolledSubjects: [],
            admissionDate: new Date().toISOString().split('T')[0],
            password: 'password123'
        });
    };

    // Custom Select Styles
    const customSelectStyles = {
        control: (base) => ({
            ...base,
            padding: '8px',
            borderRadius: '16px',
            borderColor: '#e2e8f0',
            backgroundColor: '#f8fafc',
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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Student <span className="text-primary-600">Registry</span></h2>
                    <p className="text-slate-500 font-medium text-lg">Manage enrollments, course assignments, and student profiles.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary py-4 px-8 flex items-center justify-center space-x-3 shadow-xl shadow-primary-200"
                >
                    <UserPlus size={24} />
                    <span className="font-black uppercase tracking-widest text-sm">Admit New Student</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-grow w-full font-medium">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="input-field pl-14 py-4 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative w-full md:w-64 font-bold">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        className="input-field pl-12 py-4 bg-slate-50 border-transparent appearance-none"
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                    >
                        <option value="all">All Programs</option>
                        {courses.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 font-bold">
                                <th className="px-8 py-6 text-xs text-slate-400 uppercase tracking-[0.2em]">Student Info</th>
                                <th className="px-8 py-6 text-xs text-slate-400 uppercase tracking-[0.2em]">Academics</th>
                                <th className="px-8 py-6 text-xs text-slate-400 uppercase tracking-[0.2em]">Admission Date</th>
                                <th className="px-8 py-6 text-xs text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredStudents.map((student) => {
                                const course = courses.find(c => c.id === student.courseId);
                                return (
                                    <motion.tr key={student.id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-5">
                                                <div className="w-14 h-14 bg-primary-100 rounded-[20px] flex items-center justify-center text-primary-700 font-black text-xl border-2 border-primary-50">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-lg leading-tight">{student.name}</p>
                                                    <div className="flex items-center text-slate-500 text-sm mt-1 space-x-3">
                                                        <span className="flex items-center"><Mail size={14} className="mr-1.5" /> {student.email}</span>
                                                        <span className="flex items-center"><Phone size={14} className="mr-1.5" /> {student.phone || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <BookOpen size={16} className="text-secondary-500" />
                                                    <span className="font-bold text-slate-700">{course?.title || 'No Course'}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {(student.enrolledSubjects || []).map(subId => {
                                                        const sub = subjects.find(s => s.id === subId);
                                                        return (
                                                            <span key={subId} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                                {sub?.name || 'Subject'}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-slate-600 font-bold">
                                                <Calendar size={16} className="mr-2 text-primary-500" />
                                                {student.admissionDate || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <button onClick={() => openEdit(student)} className="p-3 bg-slate-50 text-slate-400 hover:text-primary-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => deleteUser(student.id)} className="p-3 bg-red-50 text-red-400 hover:text-red-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filteredStudents.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users size={40} className="text-slate-200" />
                        </div>
                        <p className="text-slate-500 font-bold text-xl">No students found</p>
                    </div>
                )}
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
                            className="relative bg-white rounded-[50px] w-full max-w-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900">{editingStudent ? 'Update Profile' : 'Student Enrollment'}</h3>
                                    <p className="text-slate-500 font-medium">Please fill in all mandatory information.</p>
                                </div>
                                <button onClick={closeModal} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                                    <X size={24} className="text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text" required className="input-field py-4" placeholder="Full name"
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            type="email" required className="input-field py-4" placeholder="email@academy.com"
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                        <input
                                            type="tel" required className="input-field py-4" placeholder="+91 00000 00000"
                                            value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admission Date</label>
                                        <input
                                            type="date" required className="input-field py-4"
                                            value={formData.admissionDate} onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8 pt-4 border-t border-slate-50">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Enrolled Course</label>
                                        <select
                                            className="input-field py-4 appearance-none font-bold"
                                            value={formData.courseId} onChange={handleCourseChange} required
                                        >
                                            <option value="" disabled>Select course program...</option>
                                            {courses.map(c => (
                                                <option key={c.id} value={c.id}>{c.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Assignments</label>
                                        <Select
                                            isMulti
                                            options={subjectOptions}
                                            styles={customSelectStyles}
                                            value={subjectOptions.filter(o => formData.enrolledSubjects.includes(o.value))}
                                            onChange={handleSubjectChange}
                                            placeholder="Choose subjects for this student..."
                                            noOptionsMessage={() => (formData.courseId ? "No subjects found for this course" : "Select a course first")}
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button type="button" onClick={closeModal} className="flex-1 py-5 text-sm font-black uppercase tracking-widest text-slate-400 border-2 border-slate-100 rounded-[20px]">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 btn-primary py-5 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary-100">
                                        {editingStudent ? 'Save Records' : 'Confirm Enrollment'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageStudents;
