import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, GraduationCap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { currentUser, logout } = useAppContext();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Courses', path: '/courses' },
        { name: 'Results', path: '/results' },
        { name: 'Faculty', path: '/faculty' },
        { name: 'Admission', path: '/admission' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <GraduationCap size={24} />
                        </div>
                        <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                            PIXEL PRO <span className="text-secondary-500">CLASSES</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-secondary-500 ${location.pathname === link.path
                                    ? 'text-secondary-500'
                                    : (scrolled ? 'text-slate-600' : 'text-white/90')
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {currentUser ? (
                            <Link to="/dashboard" className="btn-primary py-2 px-5 text-sm">Dashboard</Link>
                        ) : (
                            <Link to="/login" className="btn-primary py-2 px-5 text-sm">Login</Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md ${scrolled ? 'text-slate-600' : 'text-white'}`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-2xl absolute top-full left-0 w-full animate-in slide-in-from-top duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 pb-2 border-t border-slate-100">
                            {currentUser ? (
                                <Link to="/dashboard" className="block px-3 py-2 text-primary-600 font-bold">Explore Dashboard</Link>
                            ) : (
                                <Link to="/login" className="block px-3 py-2 text-primary-600 font-bold">Student Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                                <GraduationCap size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">PIXEL PRO CLASSES</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Excellence in education for over 15 years. We shape future leaders and professionals
                            through innovative teaching methodologies.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/courses" className="hover:text-white transition-colors">Our Courses</Link></li>
                            <li><Link to="/results" className="hover:text-white transition-colors">Results</Link></li>
                            <li><Link to="/admission" className="hover:text-white transition-colors">Admission</Link></li>
                            <li><Link to="/study-material" className="hover:text-white transition-colors">Study Material</Link></li>
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Popular Courses</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link to="/courses" className="hover:text-white transition-colors">NEET Preparation</Link></li>
                            <li><Link to="/courses" className="hover:text-white transition-colors">JEE Main & Adv</Link></li>
                            <li><Link to="/courses" className="hover:text-white transition-colors">Foundations (8th-10th)</Link></li>
                            <li><Link to="/courses" className="hover:text-white transition-colors">CET Coaching</Link></li>
                            <li><Link to="/courses" className="hover:text-white transition-colors">Board Excellence</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4 text-slate-400">
                        <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
                        <div className="flex items-start space-x-3">
                            <MapPin className="text-primary-500 shrink-0 mt-1" size={18} />
                            <p>Pune, Maharashtra, India</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="text-primary-500 shrink-0" size={18} />
                            <p>+91 8767826955</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="text-primary-500 shrink-0" size={18} />
                            <p>pixelproitsolutions@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Pixel Pro Classes. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
