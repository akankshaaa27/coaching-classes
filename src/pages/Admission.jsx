import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Mail, Phone, Book, Send, CheckCircle, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admission = () => {
    const { courses, register } = useAppContext();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        courseId: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate registration
        register({
            name: formData.name,
            email: formData.email,
            password: 'password123', // Default password for new registrations
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="pt-40 pb-24 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center border border-slate-100"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-10 shadow-inner">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Registration Successful!</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        Thank you for choosing Pixel Pro Classes. Our counselor will contact you within 24 hours
                        on <strong>{formData.phone}</strong> to complete the process.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="btn-primary w-full py-4 text-lg"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-secondary-500/10 px-4 py-2 rounded-full mb-6">
                            <GraduationCap className="text-secondary-600" size={20} />
                            <span className="text-secondary-600 font-black uppercase tracking-widest text-xs">Enrollment 2024</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
                            Begin Your <br />
                            Success <span className="text-primary-600">Story Here</span>
                        </h1>
                        <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-medium">
                            Join thousands of students who have realized their dreams with Pixel Pro Classes.
                            Complete this form to start your enrollment process.
                        </p>

                        <div className="space-y-8">
                            {[
                                { title: 'Fill the Form', desc: 'Provide your basic details and interest.' },
                                { title: 'Counseling Call', desc: 'Our experts will call for a free session.' },
                                { title: 'Registration', desc: 'Complete the fee payment and join the batch.' }
                            ].map((step, i) => (
                                <div key={i} className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center font-black text-primary-600 shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                                        <p className="text-slate-500 font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-600 blur-[100px] opacity-10 rounded-full animate-pulse"></div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative bg-white p-10 lg:p-14 rounded-[40px] shadow-2xl border border-slate-100"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-tighter ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            required
                                            className="input-field pl-12 py-4"
                                            placeholder="Student Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-tighter ml-1">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="email"
                                                required
                                                className="input-field pl-12 py-4"
                                                placeholder="email@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-tighter ml-1">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="tel"
                                                required
                                                className="input-field pl-12 py-4"
                                                placeholder="+91 XXXXX XXXXX"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-tighter ml-1">Select Course</label>
                                    <div className="relative">
                                        <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <select
                                            required
                                            className="input-field pl-12 py-4 appearance-none"
                                            value={formData.courseId}
                                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                        >
                                            <option value="">Select Target Exam...</option>
                                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-tighter ml-1">Message (Optional)</label>
                                    <textarea
                                        className="input-field py-4 min-h-[120px]"
                                        placeholder="Tell us about your previous marks or specific requirements..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-full py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3 shadow-primary-200"
                                >
                                    <span>Request Admission</span>
                                    <Send size={20} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admission;
