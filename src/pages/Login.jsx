import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mail, Lock, AlertCircle, GraduationCap, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const result = login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message);
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Image/Decoration */}
            <div className="hidden lg:block relative overflow-hidden bg-primary-600">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-blue-900 opacity-90"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-white text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8"
                    >
                        <GraduationCap size={48} />
                    </motion.div>
                    <h1 className="text-4xl font-extrabold mb-6">Welcome Back to Learning!</h1>
                    <p className="text-xl text-primary-100 max-w-md leading-relaxed">
                        Connect with your mentors, track your progress, and access world-class study materials.
                    </p>

                    <div className="mt-12 space-y-4 text-left w-full max-w-sm">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-sm font-bold text-white mb-2 underline">Mock Credentials:</p>
                            <div className="space-y-1 text-xs text-primary-50">
                                <p><strong>Admin:</strong> admin@example.com / admin</p>
                                <p><strong>Teacher:</strong> teacher@example.com / teacher</p>
                                <p><strong>Student:</strong> student@example.com / student</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 mb-8 transition-colors">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Home
                        </Link>
                        <h2 className="text-3xl font-extrabold text-slate-900">Sign In</h2>
                        <p className="mt-2 text-slate-600">Enter your credentials to access your dashboard</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center space-x-3"
                        >
                            <AlertCircle size={20} />
                            <span className="text-sm font-medium">{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700">Forgot?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-slate-600">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full btn-primary py-3 relative overflow-hidden ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-slate-600 text-sm">
                        Interested in joining?{' '}
                        <Link to="/admission" className="font-bold text-primary-600 hover:text-primary-700">Apply for Admission</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
