import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { Timer, SkipForward, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight, Clock, FileText, XCircle } from 'lucide-react';
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
    const [viewAnswerSheet, setViewAnswerSheet] = useState(false);

    const timerRef = useRef();

    useEffect(() => {
        if (!test) {
            navigate('/dashboard/student/mock-tests');
            return;
        }

        if (!isSubmitted) {
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
    }, [test, isSubmitted]);

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

    if (isSubmitted && !viewAnswerSheet) {
        const score = calculateScore();
        const percentage = Math.round((score / test.questions.length) * 100);

        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[50px] shadow-2xl border border-slate-100"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2">Test Completed!</h2>
                    <p className="text-slate-500 mb-10 font-medium text-lg">You have successfully submitted your answers.</p>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Final Score</p>
                            <p className="text-5xl font-black text-slate-900">{score} / {test.questions.length}</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Success Rate</p>
                            <p className="text-5xl font-black text-primary-600">{percentage}%</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => setViewAnswerSheet(true)}
                            className="btn-primary w-full py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3"
                        >
                            <FileText size={24} />
                            <span>View Answer Sheet</span>
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/student/results')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 w-full py-5 rounded-3xl font-black uppercase tracking-widest transition-all"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = test.questions[currentQuestionIndex];

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            {/* Header Info */}
            <div className="flex items-center justify-between mb-6 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                {viewAnswerSheet && <div className="absolute top-0 left-0 w-full h-1 bg-secondary-500"></div>}
                <div>
                    <h2 className="text-xl font-black text-slate-900">
                        {test.title}
                        {viewAnswerSheet && <span className="ml-3 text-secondary-500 text-sm bg-secondary-50 px-3 py-1 rounded-lg uppercase tracking-widest">Answer Key</span>}
                    </h2>
                    <p className="text-sm font-bold text-slate-400">Question {currentQuestionIndex + 1} of {test.questions.length}</p>
                </div>

                {!viewAnswerSheet ? (
                    <div className={`flex items-center space-x-3 px-6 py-2.5 rounded-2xl font-mono text-xl font-black transition-colors ${timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-900 text-white shadow-xl shadow-slate-200'}`}>
                        <Clock size={20} />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                ) : (
                    <button onClick={() => setViewAnswerSheet(false)} className="bg-slate-100 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                        <XCircle size={24} />
                    </button>
                )}

                {!isSubmitted && (
                    <button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="bg-primary-600 text-white px-6 py-2.5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary-200 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
                    >
                        <span>Submit</span>
                        <CheckCircle2 size={18} />
                    </button>
                )}
            </div>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
                {/* Question Area */}
                <div className="lg:col-span-3 flex flex-col h-full bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-10 flex-grow overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-10"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shrink-0">
                                        {currentQuestionIndex + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 leading-relaxed pt-1">
                                        {currentQuestion.question}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {currentQuestion.options.map((option, idx) => {
                                        const isSelected = answers[currentQuestionIndex] === option;
                                        const isCorrect = option === currentQuestion.correctAnswer;

                                        let variantStyles = 'border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-slate-600';
                                        let iconStyles = 'bg-slate-100 text-slate-400 group-hover:bg-slate-200';

                                        if (viewAnswerSheet) {
                                            if (isCorrect) {
                                                variantStyles = 'border-green-500 bg-green-50 text-green-700 font-bold';
                                                iconStyles = 'bg-green-500 text-white';
                                            } else if (isSelected) {
                                                variantStyles = 'border-red-500 bg-red-50 text-red-700 font-bold';
                                                iconStyles = 'bg-red-500 text-white';
                                            }
                                        } else if (isSelected) {
                                            variantStyles = 'border-primary-600 bg-primary-50 text-primary-700 font-bold shadow-lg shadow-primary-50';
                                            iconStyles = 'bg-primary-600 text-white';
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                disabled={isSubmitted && !viewAnswerSheet}
                                                onClick={() => handleOptionSelect(option)}
                                                className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center group relative overflow-hidden ${variantStyles}`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-5 text-sm font-black transition-colors ${iconStyles}`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="text-lg font-medium">{option}</span>
                                                {viewAnswerSheet && isCorrect && <CheckCircle2 size={24} className="ml-auto text-green-500" />}
                                                {viewAnswerSheet && isSelected && !isCorrect && <XCircle size={24} className="ml-auto text-red-500" />}
                                            </button>
                                        );
                                    })}
                                </div>

                                {viewAnswerSheet && (
                                    <div className="p-8 bg-primary-50 rounded-3xl border border-primary-100 mt-12">
                                        <h4 className="text-primary-700 font-black uppercase tracking-widest text-xs mb-3 flex items-center">
                                            <Zap size={14} className="mr-2" />
                                            Solution Explanation
                                        </h4>
                                        <p className="text-primary-900 font-medium leading-relaxed">
                                            The correct answer is <strong>{currentQuestion.correctAnswer}</strong>.
                                            This concept explores the core principles outlined in the syllabus. For detailed breakdown, refer to Module {currentQuestionIndex % 3 + 1} of your study materials.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            className="flex items-center space-x-2 text-slate-500 font-black uppercase tracking-widest text-xs hover:text-primary-600 transition-colors disabled:opacity-30"
                        >
                            <ChevronLeft size={20} />
                            <span>Back</span>
                        </button>

                        <div className="flex items-center space-x-2">
                            {currentQuestionIndex < test.questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                    className="flex items-center space-x-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    <span>Next</span>
                                    <ChevronRight size={20} />
                                </button>
                            ) : (
                                !isSubmitted && (
                                    <button
                                        onClick={() => setShowConfirmSubmit(true)}
                                        className="flex items-center space-x-2 bg-primary-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95"
                                    >
                                        <span>Submit</span>
                                        <CheckCircle2 size={20} />
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Question Palette */}
                <div className="lg:col-span-1 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 flex flex-col h-full overflow-hidden">
                    <h3 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs flex items-center">
                        <div className="w-1.5 h-6 bg-primary-600 rounded-full mr-3"></div>
                        Test Progress
                    </h3>

                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-4 overflow-y-auto flex-grow pb-4 pr-1 scrollbar-thin">
                        {test.questions.map((q, idx) => {
                            let statusStyles = 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300';

                            if (viewAnswerSheet) {
                                if (answers[idx] === q.correctAnswer) {
                                    statusStyles = 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-100';
                                } else if (answers[idx] !== undefined) {
                                    statusStyles = 'border-red-500 bg-red-500 text-white shadow-lg shadow-red-100';
                                }
                            } else if (currentQuestionIndex === idx) {
                                statusStyles = 'border-primary-600 bg-primary-600 text-white shadow-xl shadow-primary-200 scale-110 z-10';
                            } else if (answers[idx] !== undefined) {
                                statusStyles = 'border-primary-100 bg-primary-50 text-primary-600';
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuestionIndex(idx)}
                                    className={`w-full aspect-square flex items-center justify-center rounded-2xl text-xs font-black transition-all border-2 ${statusStyles}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Answered</span>
                            <span className="text-sm font-black text-slate-900">{Object.keys(answers).length} / {test.questions.length}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(Object.keys(answers).length / test.questions.length) * 100}%` }}
                                className="h-full bg-primary-600 rounded-full"
                            ></motion.div>
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
                            className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl"
                        >
                            <div className="w-20 h-20 bg-orange-100 rounded-[30px] flex items-center justify-center text-orange-600 mx-auto mb-8 rotate-12">
                                <AlertTriangle size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 text-center mb-4">Finish Test?</h3>
                            <p className="text-slate-500 text-center mb-10 leading-relaxed font-medium">
                                You have answered <strong>{Object.keys(answers).length}</strong> questions.
                                Once submitted, you cannot change your answers.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShowConfirmSubmit(false)}
                                    className="py-4 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-xs text-slate-400 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="py-4 rounded-2xl bg-primary-600 text-white font-black uppercase tracking-widest text-xs hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                                >
                                    Submit
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
