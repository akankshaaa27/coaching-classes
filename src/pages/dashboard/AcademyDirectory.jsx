import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
    Users, GraduationCap, BookOpen,
    Layers, Search, Filter, Mail, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

const AcademyDirectory = () => {
    const { users, courses, subjects } = useAppContext();
    const [viewType, setViewType] = useState('course-students'); // 'course-students' or 'subject-teachers'
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');

    const students = users.filter(u => u.role === 'student');
    const teachers = users.filter(u => u.role === 'teacher');

    const filteredStudents = students.filter(s => {
        const matchesCourse = selectedCourse === 'all' || s.courseId === selectedCourse;
        return matchesCourse;
    });

    const filteredTeachers = teachers.filter(t => {
        const matchesCourse = selectedCourse === 'all' || (t.enrolledCourses || []).includes(selectedCourse);
        const matchesSubject = selectedSubject === 'all' || (t.enrolledSubjects || []).includes(selectedSubject);
        return matchesCourse && matchesSubject;
    });

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Academy <span className="text-primary-600">Insights</span></h2>
                    <p className="text-slate-500 font-medium text-lg">Relationship mapping between students, faculty, and curriculum.</p>
                </div>

                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex">
                    <button
                        onClick={() => setViewType('course-students')}
                        className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${viewType === 'course-students' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Students by Course
                    </button>
                    <button
                        onClick={() => setViewType('subject-teachers')}
                        className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${viewType === 'subject-teachers' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Teachers by Subject
                    </button>
                </div>
            </div>

            {/* Global Filters */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Filter by Course</label>
                    <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            className="input-field pl-12 py-4 appearance-none font-bold"
                            value={selectedCourse}
                            onChange={(e) => {
                                setSelectedCourse(e.target.value);
                                setSelectedSubject('all'); // Reset subject when course changes
                            }}
                        >
                            <option value="all">Check All Programs</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {viewType === 'subject-teachers' && (
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Filter by Subject</label>
                        <div className="relative">
                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                className="input-field pl-12 py-4 appearance-none font-bold"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                            >
                                <option value="all">Check All Subjects</option>
                                {subjects.filter(s => selectedCourse === 'all' || s.courseId === selectedCourse).map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {viewType === 'course-students' ? (
                <div className="space-y-8">
                    {courses.filter(c => selectedCourse === 'all' || c.id === selectedCourse).map(course => {
                        const courseStudents = filteredStudents.filter(s => s.courseId === course.id);
                        if (courseStudents.length === 0 && selectedCourse !== 'all') return null;
                        return (
                            <section key={course.id} className="space-y-4">
                                <div className="flex items-center space-x-4 px-4">
                                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                                        <BookOpen size={20} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">{course.title} <span className="text-slate-300 font-medium ml-2">({courseStudents.length} Students)</span></h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {courseStudents.map(student => (
                                        <motion.div
                                            key={student.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4"
                                        >
                                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 font-bold border border-slate-100">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{student.name}</p>
                                                <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {courseStudents.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-slate-400 italic">No students enrolled in this program yet.</div>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-8">
                    {subjects.filter(s => (selectedCourse === 'all' || s.courseId === selectedCourse) && (selectedSubject === 'all' || s.id === selectedSubject)).map(subject => {
                        const subjectTeachers = filteredTeachers.filter(t => (t.enrolledSubjects || []).includes(subject.id));
                        const course = courses.find(c => c.id === subject.courseId);
                        return (
                            <section key={subject.id} className="space-y-4">
                                <div className="flex items-center space-x-4 px-4">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600">
                                        <Layers size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">{subject.name}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{course?.title}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {subjectTeachers.map(teacher => (
                                        <motion.div
                                            key={teacher.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-primary-200 transition-colors"
                                        >
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="w-16 h-16 bg-secondary-50 rounded-2xl flex items-center justify-center text-secondary-600 font-black text-2xl group-hover:scale-110 transition-transform">
                                                    {teacher.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{teacher.name}</p>
                                                    <div className="flex flex-col space-y-1 mt-1 text-slate-500 text-xs font-bold">
                                                        <span className="flex items-center"><Mail size={12} className="mr-1" /> {teacher.email}</span>
                                                        <span className="flex items-center"><Phone size={12} className="mr-1 text-primary-500" /> {teacher.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {subjectTeachers.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-slate-400 italic">No faculty assigned to this subject.</div>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AcademyDirectory;
