import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    ClipboardList, Plus, Search, Trash2,
    HelpCircle, CheckCircle, BookOpen, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherQuestions = () => {
    const { questionBank, courses, addQuestion } = useAppContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        courseId: '', topic: '',
        question: '', options: ['', '', '', ''],
        correctAnswer: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQ = {
            id: Date.now().toString(),
            question: formData.question,
            options: formData.options,
            correctAnswer: formData.correctAnswer
        };
        addQuestion(formData.courseId, formData.topic, [newQ]);
        setShowAddModal(false);
        setFormData({ courseId: '', topic: '', question: '', options: ['', '', '', ''], correctAnswer: '' });
    };

    const updateOption = (idx, val) => {
        const newOptions = [...formData.options];
        newOptions[idx] = val;
        setFormData({ ...formData, options: newOptions });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Question Intelligence</h2>
                    <p className="text-slate-500 font-medium text-lg">Build and categorize your question bank for various assessments.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary py-4 px-8 flex items-center justify-center space-x-3 shadow-xl shadow-primary-200"
                >
                    <Plus size={24} />
                    <span className="text-lg font-black uppercase tracking-widest text-sm">Add Question</span>
                </button>
            </div>

            <div className="space-y-12">
                {questionBank.map((group, i) => {
                    const course = courses.find(c => c.id === group.courseId);
                    return (
                        <div key={i} className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 lg:p-12 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-primary-600">
                                        <Layers size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 leading-tight">{group.topic}</h3>
                                        <div className="flex items-center space-x-4 mt-1">
                                            <span className="text-xs font-black text-primary-600 uppercase tracking-[0.2em]">{course?.title || 'General'}</span>
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                            <span className="text-xs font-bold text-slate-400 capitalize">{group.questions.length} Questions Loaded</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-primary-600 font-black uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-4">Manage Group</button>
                            </div>

                            <div className="p-8 lg:p-12 space-y-8">
                                {group.questions.map((q, qIdx) => (
                                    <div key={qIdx} className="p-8 rounded-[35px] bg-slate-50/50 border border-slate-100 hover:border-primary-100 hover:bg-white transition-all group overflow-hidden relative">
                                        <span className="absolute -top-4 -left-4 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center pt-4 pl-4 font-black text-primary-200 group-hover:text-primary-600 transition-colors">
                                            Q{qIdx + 1}
                                        </span>
                                        <h4 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed max-w-4xl relative z-10">{q.question}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} className={`p-4 rounded-2xl border flex items-center group/opt ${opt === q.correctAnswer ? 'bg-green-50 border-green-200 text-green-700 font-bold' : 'bg-white border-slate-100 text-slate-500'}`}>
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mr-4 text-xs font-black ${opt === q.correctAnswer ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                        {String.fromCharCode(65 + oIdx)}
                                                    </div>
                                                    <span className="flex-grow">{opt}</span>
                                                    {opt === q.correctAnswer && <CheckCircle size={18} className="ml-2" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            onClick={() => setShowAddModal(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[50px] p-12 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
                        >
                            <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Add Intelligence</h3>
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Target Course</label>
                                        <select
                                            required className="input-field py-4"
                                            value={formData.courseId}
                                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                        >
                                            <option value="">Select Course...</option>
                                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Topic / Subject</label>
                                        <input
                                            type="text" required className="input-field py-4" placeholder="Physics - Kinematics"
                                            value={formData.topic}
                                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Question Content</label>
                                    <textarea
                                        required className="input-field py-4 min-h-[120px]" placeholder="Type your question here..."
                                        value={formData.question}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="space-y-6 bg-slate-50 p-8 rounded-3xl">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Answer Options</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {formData.options.map((opt, i) => (
                                            <div key={i} className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-slate-300 group-focus-within:text-primary-600 transition-colors">
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                                <input
                                                    type="text" required className="input-field pl-16 py-4 bg-white border-transparent focus:border-primary-100"
                                                    placeholder={`Option ${i + 1}`}
                                                    value={opt}
                                                    onChange={(e) => updateOption(i, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 pt-4">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Correct Answer</label>
                                        <select
                                            required className="input-field py-4 max-w-sm mx-auto"
                                            value={formData.correctAnswer}
                                            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                                        >
                                            <option value="">Choose Correct Option...</option>
                                            {formData.options.map((opt, i) => opt && (
                                                <option key={i} value={opt}>Option {String.fromCharCode(65 + i)}: {opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button" onClick={() => setShowAddModal(false)}
                                        className="flex-1 py-4 px-6 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-xs text-slate-400"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-all shadow-xl shadow-slate-100"
                                    >
                                        Save Question
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

export default TeacherQuestions;
