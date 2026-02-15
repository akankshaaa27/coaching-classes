import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import {
    Timer, SkipForward, CheckCircle2, AlertTriangle,
    ChevronLeft, ChevronRight, Clock, FileText,
    XCircle, Zap, ShieldCheck, Trophy,
    Info, HelpCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MockTestPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mockTests, saveResult, currentUser } = useAppContext();

    const test = mockTests.find(t => t.id === id);
    const [testStarted, setTestStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(test ? test.duration * 60 : 0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
    const [viewAnswerSheet, setViewAnswerSheet] = useState(false);

    const timerRef = useRef();

    useEffect(() => {
        if (!test) {
            navigate('/dashboard/student/mock-tests');
            return;
        }

        if (testStarted && !isSubmitted) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [test, testStarted, isSubmitted]);

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setAnswers({
            ...answers,
            [currentQuestionIndex]: option
        });
    };

    const calculateScore = () => {
        let score = 0;
        test.questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    const handleSubmit = () => {
        clearInterval(timerRef.current);
        const score = calculateScore();
        const result = {
            studentId: currentUser.id,
            mockTestId: test.id,
            score: score,
            total: test.questions.length,
            answers: answers,
            date: new Date().toLocaleDateString()
        };
        saveResult(result);
        setIsSubmitted(true);
        setShowConfirmSubmit(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (!test) return null;

    // 1. Instruction Screen
    if (!testStarted && !isSubmitted) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden"
                >
                    <div className="bg-slate-900 p-12 text-white relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black mb-4">{test.title}</h2>
                            <div className="flex flex-wrap gap-6 text-slate-400 font-bold uppercase tracking-widest text-xs">
                                <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl">
                                    <Clock size={16} />
                                    <span>{test.duration} Minutes</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl">
                                    <FileText size={16} />
                                    <span>{test.questions.length} Questions</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-12 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 flex items-center">
                                    <ShieldCheck className="mr-3 text-primary-600" />
                                    Test Instructions
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Ensure a stable internet connection.",
                                        "The timer starts immediately after clicking 'Begin'.",
                                        "You cannot pause or restart the assessment once it begins.",
                                        "Final results will be available immediately after submission."
                                    ].map((inst, i) => (
                                        <li key={i} className="flex items-start space-x-3 text-slate-500 font-medium tracking-tight leading-relaxed">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0"></div>
                                            <span>{inst}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-primary-600 mb-6 border border-slate-100">
                                    <Zap size={40} />
                                </div>
                                <h4 className="text-lg font-black text-slate-900 mb-2">Ready to Start?</h4>
                                <p className="text-sm font-medium text-slate-400 mb-8 max-w-[200px]">Test your skills and get instant performance insights.</p>
                                <button
                                    onClick={() => setTestStarted(true)}
                                    className="w-full bg-primary-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 active:scale-95"
                                >
                                    <span>Begin Assessment</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <button onClick={() => navigate(-1)} className="mt-8 flex items-center space-x-2 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-600 mx-auto transition-colors">
                    <ChevronLeft size={16} />
                    <span>Back to Catalog</span>
                </button>
            </div>
        );
    }

    // 2. Result View
    if (isSubmitted && !viewAnswerSheet) {
        const score = calculateScore();
        const percentage = Math.round((score / test.questions.length) * 100);

        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden"
                >
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-16 text-center text-white relative">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-green-500/20">
                                <Trophy size={48} />
                            </div>
                            <h2 className="text-5xl font-black mb-4 leading-tight">Great Effort!</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Assessment Successfully Submitted</p>
                        </div>
                    </div>

                    <div className="p-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] text-center border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Items</p>
                                <p className="text-4xl font-black text-slate-900">{test.questions.length}</p>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] text-center border border-slate-100 shadow-xl shadow-primary-50">
                                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-4">Your Score</p>
                                <p className="text-5xl font-black text-primary-600">{score}</p>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] text-center border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Success Rate</p>
                                <p className="text-4xl font-black text-slate-900">{percentage}%</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                onClick={() => setViewAnswerSheet(true)}
                                className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-primary-600 transition-all shadow-xl shadow-slate-200"
                            >
                                <FileText size={20} />
                                <span>Detailed Analysis</span>
                            </button>
                            <button
                                onClick={() => navigate('/dashboard/student/mock-tests')}
                                className="flex-1 bg-white text-slate-500 border-2 border-slate-100 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
                            >
                                Back to Console
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = test.questions[currentQuestionIndex];

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col pb-8">
            {/* Master Header */}
            <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm shrink-0">
                <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                        <FileText size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">{test.title}</h2>
                        <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg uppercase tracking-tight">
                                Question {currentQuestionIndex + 1} of {test.questions.length}
                            </span>
                            {viewAnswerSheet && (
                                <span className="text-[10px] font-black uppercase bg-secondary-50 text-secondary-600 px-3 py-1 rounded-lg tracking-widest">
                                    Review Mode
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    {!viewAnswerSheet ? (
                        <div className={`flex items-center space-x-3 px-8 py-3.5 rounded-2xl font-mono text-2xl font-black transition-all ${timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse border-2 border-red-500/20' : 'bg-slate-900 text-white shadow-2xl shadow-slate-200'
                            }`}>
                            <Clock size={24} />
                            <span>{formatTime(timeLeft)}</span>
                        </div>
                    ) : (
                        <button
                            onClick={() => setViewAnswerSheet(false)}
                            className="bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <XCircle size={28} />
                        </button>
                    )}

                    {!isSubmitted && (
                        <button
                            onClick={() => setShowConfirmSubmit(true)}
                            className="bg-primary-600 text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-100 hover:bg-primary-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3"
                        >
                            <span>Finish</span>
                            <CheckCircle2 size={20} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
                {/* Question Canvas */}
                <div className="lg:col-span-3 flex flex-col h-full bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-12 flex-grow overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-12"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-[10px] font-black text-primary-600 uppercase tracking-[0.3em]">
                                        <div className="w-8 h-px bg-primary-200"></div>
                                        <span>Current Item</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 leading-[1.4] tracking-tight">
                                        {currentQuestion.question}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    {currentQuestion.options.map((option, idx) => {
                                        const isSelected = answers[currentQuestionIndex] === option;
                                        const isCorrect = option === currentQuestion.correctAnswer;

                                        let variantStyles = 'border-slate-100 hover:border-primary-100 hover:bg-primary-50/10 text-slate-600 bg-white';
                                        let iconStyles = 'bg-slate-100 text-slate-400 group-hover:bg-primary-100 group-hover:text-primary-600';

                                        if (viewAnswerSheet) {
                                            if (isCorrect) {
                                                variantStyles = 'border-green-500 bg-green-50 text-green-700 font-black shadow-lg shadow-green-100/50';
                                                iconStyles = 'bg-green-500 text-white';
                                            } else if (isSelected) {
                                                variantStyles = 'border-red-500 bg-red-50 text-red-700 font-black shadow-lg shadow-red-100/50';
                                                iconStyles = 'bg-red-500 text-white';
                                            }
                                        } else if (isSelected) {
                                            variantStyles = 'border-primary-600 bg-primary-50 text-primary-700 font-black shadow-xl shadow-primary-100/50 scale-[1.02]';
                                            iconStyles = 'bg-primary-600 text-white';
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                disabled={isSubmitted && !viewAnswerSheet}
                                                onClick={() => handleOptionSelect(option)}
                                                className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center group relative overflow-hidden active:scale-[0.98] ${variantStyles}`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-6 text-base font-black transition-all ${iconStyles}`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="text-xl font-medium tracking-tight">{option}</span>
                                                {viewAnswerSheet && isCorrect && <CheckCircle2 size={24} className="ml-auto text-green-600" />}
                                                {viewAnswerSheet && isSelected && !isCorrect && <XCircle size={24} className="ml-auto text-red-600" />}
                                            </button>
                                        );
                                    })}
                                </div>

                                {viewAnswerSheet && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-10 bg-slate-900 rounded-[2.5rem] mt-16 text-white relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>
                                        <h4 className="text-primary-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4 flex items-center">
                                            <Info size={14} className="mr-2" />
                                            Curriculum Insight
                                        </h4>
                                        <p className="text-slate-300 font-medium leading-[1.8] text-lg">
                                            The correct scientific conclusion is <strong>{currentQuestion.correctAnswer}</strong>.
                                            This concept is covered in detail under the primary syllabus modules. Reviewing your classroom notes on this topic is recommended to reinforce this foundation.
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Bar */}
                    <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                        <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            className="flex items-center space-x-3 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-all disabled:opacity-20"
                        >
                            <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center">
                                <ChevronLeft size={20} />
                            </div>
                            <span>Previous Question</span>
                        </button>

                        <div className="flex items-center space-x-4">
                            {currentQuestionIndex < test.questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                    className="flex items-center space-x-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-200 hover:bg-primary-600 hover:shadow-primary-100 transition-all active:scale-95"
                                >
                                    <span>Next</span>
                                    <ChevronRight size={20} />
                                </button>
                            ) : (
                                !isSubmitted && (
                                    <button
                                        onClick={() => setShowConfirmSubmit(true)}
                                        className="flex items-center space-x-4 bg-primary-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95"
                                    >
                                        <span>Complete Test</span>
                                        <CheckCircle2 size={20} />
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Question Sidebar */}
                <div className="lg:col-span-1 bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8 flex flex-col h-full overflow-hidden">
                    <div className="mb-10">
                        <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-2 flex items-center">
                            <div className="w-4 h-1 bg-primary-600 rounded-full mr-3"></div>
                            Quick Navigation
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Jump to any specific item</p>
                    </div>

                    <div className="grid grid-cols-4 gap-3 overflow-y-auto flex-grow pb-6 pr-2 custom-scrollbar">
                        {test.questions.map((q, idx) => {
                            let statusStyles = 'border-slate-50 bg-slate-50 text-slate-300 hover:border-slate-200';

                            if (viewAnswerSheet) {
                                if (answers[idx] === q.correctAnswer) {
                                    statusStyles = 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-100';
                                } else if (answers[idx] !== undefined) {
                                    statusStyles = 'border-red-500 bg-red-500 text-white shadow-lg shadow-red-100';
                                }
                            } else if (currentQuestionIndex === idx) {
                                statusStyles = 'border-slate-900 bg-slate-900 text-white shadow-2xl shadow-slate-200 scale-110 z-10';
                            } else if (answers[idx] !== undefined) {
                                statusStyles = 'border-primary-100 bg-primary-50 text-primary-600 font-black';
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuestionIndex(idx)}
                                    className={`aspect-square flex items-center justify-center rounded-2xl text-xs font-black transition-all border-2 ${statusStyles}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Answered</span>
                                <span className="text-xl font-black text-slate-900">{Object.keys(answers).length} <span className="text-slate-300 font-medium">/ {test.questions.length}</span></span>
                            </div>
                            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 font-black text-xs">
                                {Math.round((Object.keys(answers).length / test.questions.length) * 100)}%
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(Object.keys(answers).length / test.questions.length) * 100}%` }}
                                className="h-full bg-primary-600 rounded-full"
                            ></motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submission Modal */}
            <AnimatePresence>
                {showConfirmSubmit && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                            onClick={() => setShowConfirmSubmit(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[40px] p-12 max-w-md w-full shadow-2xl text-center"
                        >
                            <div className="w-24 h-24 bg-primary-50 rounded-[40px] flex items-center justify-center text-primary-600 mx-auto mb-8 border border-primary-100">
                                <HelpCircle size={48} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4">Complete Assessment?</h3>
                            <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                                You have successfully answered <strong>{Object.keys(answers).length}</strong> questions.
                                Ready to see your results?
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={handleSubmit}
                                    className="py-5 rounded-2xl bg-primary-600 text-white font-black uppercase tracking-widest text-xs hover:bg-primary-700 transition-all shadow-xl shadow-primary-100 active:scale-95"
                                >
                                    Yes, Submit Now
                                </button>
                                <button
                                    onClick={() => setShowConfirmSubmit(false)}
                                    className="py-5 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] text-slate-400 hover:bg-slate-50 transition-colors"
                                >
                                    Go back to items
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MockTestPlayer;
