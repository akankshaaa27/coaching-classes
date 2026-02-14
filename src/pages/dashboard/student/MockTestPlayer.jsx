import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { Timer, SkipForward, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MockTestPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mockTests, saveResult, currentUser } = useAppContext();

    const test = mockTests.find(t => t.id === id);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(test ? test.duration * 60 : 0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

    const timerRef = useRef();

    useEffect(() => {
        if (!test) {
            navigate('/dashboard/student/mock-tests');
            return;
        }

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

        return () => clearInterval(timerRef.current);
    }, [test]);

    const handleOptionSelect = (option) => {
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
            answers: answers
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

    if (isSubmitted) {
        const score = calculateScore();
        const percentage = Math.round((score / test.questions.length) * 100);

        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Test Submitted Successfully!</h2>
                    <p className="text-slate-500 mb-8 font-medium">You have completed the "{test.title}" mock test.</p>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <div className="bg-slate-50 p-6 rounded-2xl">
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Your Score</p>
                            <p className="text-4xl font-black text-slate-900">{score} / {test.questions.length}</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl">
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Percentage</p>
                            <p className="text-4xl font-black text-primary-600">{percentage}%</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard/student/results')}
                        className="btn-primary w-full py-4 text-lg"
                    >
                        View Detailed Analysis
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = test.questions[currentQuestionIndex];

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            {/* Header Info */}
            <div className="flex items-center justify-between mb-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{test.title}</h2>
                    <p className="text-sm font-medium text-slate-500">Question {currentQuestionIndex + 1} of {test.questions.length}</p>
                </div>

                <div className={`flex items-center space-x-3 px-6 py-2.5 rounded-xl font-mono text-xl font-bold transition-colors ${timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-900 text-white'}`}>
                    <Clock size={20} />
                    <span>{formatTime(timeLeft)}</span>
                </div>

                <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-all active:scale-95 flex items-center space-x-2"
                >
                    <span>Submit Test</span>
                    <CheckCircle2 size={18} />
                </button>
            </div>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
                {/* Question Area */}
                <div className="lg:col-span-3 flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 flex-grow overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-8"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 leading-relaxed">
                                    {currentQuestion.question}
                                </h3>

                                <div className="space-y-4">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option)}
                                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center group ${answers[currentQuestionIndex] === option
                                                    ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold'
                                                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 text-sm font-bold transition-colors ${answers[currentQuestionIndex] === option ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                                }`}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span className="text-lg">{option}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            className="flex items-center space-x-2 text-slate-600 font-bold hover:text-primary-600 disabled:opacity-30 disabled:hover:text-slate-600"
                        >
                            <ChevronLeft size={20} />
                            <span>Previous</span>
                        </button>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setAnswers({ ...answers, [currentQuestionIndex]: undefined })}
                                className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors mr-4"
                            >
                                Clear Selection
                            </button>
                            {currentQuestionIndex < test.questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                    className="flex items-center space-x-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    <span>Next Question</span>
                                    <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowConfirmSubmit(true)}
                                    className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all active:scale-95"
                                >
                                    <span>Finish Test</span>
                                    <CheckCircle2 size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Question Palette */}
                <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col h-full overflow-hidden">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center">
                        <span className="w-1.5 h-6 bg-primary-600 rounded-full mr-2"></span>
                        Question Navigator
                    </h3>

                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-3 overflow-y-auto flex-grow pb-4 pr-1 scrollbar-thin">
                        {test.questions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentQuestionIndex(idx)}
                                className={`w-full aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all border-2 ${currentQuestionIndex === idx
                                        ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-200 scale-110'
                                        : answers[idx] !== undefined
                                            ? 'border-green-500 bg-green-500 text-white'
                                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300'
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-xs font-bold text-slate-500 tracking-tight">Answered</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                            <span className="text-xs font-bold text-slate-500 tracking-tight">Unvisited</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmSubmit && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowConfirmSubmit(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-6">
                                <AlertTriangle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">Submit Your Test?</h3>
                            <p className="text-slate-500 text-center mb-8 leading-relaxed">
                                You have answered <strong>{Object.keys(answers).length}</strong> out of <strong>{test.questions.length}</strong> questions.
                                Are you sure you want to finalize your submission?
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowConfirmSubmit(false)}
                                    className="flex-1 py-3 px-6 rounded-xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Go Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                                >
                                    Yes, Submit
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
