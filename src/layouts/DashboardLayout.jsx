import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Users, BookOpen, FileText, BarChart3, Settings,
    LogOut, Menu, X, Bell, User, GraduationCap,
    LayoutDashboard, ClipboardList, Book, Layers
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SidebarLink = ({ to, icon, label, collapsed, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
        >
            <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-600'}`}>
                {icon}
            </div>
            {!collapsed && <span className="font-medium">{label}</span>}
        </Link>
    );
};

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { currentUser, logout } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getLinks = () => {
        if (currentUser.role === 'admin') {
            return [
                { to: '/dashboard/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
                { to: '/dashboard/admin/students', icon: <Users size={20} />, label: 'Manage Students' },
                { to: '/dashboard/admin/teachers', icon: <GraduationCap size={20} />, label: 'Manage Teachers' },
                { to: '/dashboard/admin/courses', icon: <BookOpen size={20} />, label: 'Manage Courses' },
                { to: '/dashboard/admin/subjects', icon: <Layers size={20} />, label: 'Manage Subjects' },
                { to: '/dashboard/admin/syllabus', icon: <Book size={20} />, label: 'Manage Syllabus' },
                { to: '/dashboard/admin/directory', icon: <BarChart3 size={20} />, label: 'Academy Insights' },
                { to: '/dashboard/admin/profile', icon: <User size={20} />, label: 'My Profile' },
            ];
        } else if (currentUser.role === 'teacher') {
            return [
                { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
                { to: '/dashboard/admin/students', icon: <Users size={20} />, label: 'My Students' },
                { to: '/dashboard/teacher/materials', icon: <Book size={20} />, label: 'Study Materials' },
                { to: '/dashboard/teacher/syllabus', icon: <BookOpen size={20} />, label: 'Curriculum' },
                { to: '/dashboard/teacher/questions', icon: <ClipboardList size={20} />, label: 'Question Bank' },
                { to: '/dashboard/teacher/mock-tests', icon: <FileText size={20} />, label: 'Mock Tests' },
                { to: '/dashboard/teacher/results', icon: <BarChart3 size={20} />, label: 'Student Results' },
                { to: '/dashboard/teacher/profile', icon: <User size={20} />, label: 'My Profile' },
            ];
        } else {
            return [
                { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
                { to: '/dashboard/student/courses', icon: <BookOpen size={20} />, label: 'Enrolled Courses' },
                { to: '/dashboard/student/materials', icon: <Book size={20} />, label: 'Study Materials' },
                { to: '/dashboard/student/mock-tests', icon: <FileText size={20} />, label: 'Mock Tests' },
                { to: '/dashboard/student/results', icon: <BarChart3 size={20} />, label: 'My Results' },
                { to: '/dashboard/student/profile', icon: <User size={20} />, label: 'My Profile' },
            ];
        }
    };

    const links = getLinks();

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden">
            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
                    }`}
            >
                <div className="p-6 flex items-center justify-between border-b border-slate-50 shrink-0">
                    {!collapsed && (
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                                <GraduationCap size={18} />
                            </div>
                            <span className="font-bold text-slate-900 tracking-tight">PIXEL PRO CLASSES</span>
                        </Link>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:text-primary-600"
                    >
                        {collapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                </div>

                <nav className="flex-grow px-3 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
                    {links.map((link) => (
                        <SidebarLink key={link.to} {...link} collapsed={collapsed} />
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        {!collapsed && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setMobileOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 flex items-center justify-between border-b border-slate-100">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                            <GraduationCap size={18} />
                        </div>
                        <span className="font-bold text-slate-900">PIXEL PRO CLASSES</span>
                    </Link>
                    <button onClick={() => setMobileOpen(false)} className="text-slate-500">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-160px)]">
                    {links.map((link) => (
                        <SidebarLink
                            key={link.to}
                            {...link}
                            collapsed={false}
                            onClick={() => setMobileOpen(false)}
                        />
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-white">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0 h-full overflow-hidden">
                <header className="h-20 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 -ml-2 text-slate-600 lg:hidden"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex-grow">
                        <h1 className="text-xl font-bold text-slate-900 ml-4 lg:ml-0">
                            {links.find(l => l.to === location.pathname)?.label || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-slate-400 hover:text-primary-600 relative">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="flex items-center space-x-3">
                            <div className="hidden text-right lg:block">
                                <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                                <p className="text-xs font-medium text-slate-500 capitalize">{currentUser.role}</p>
                            </div>
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border-2 border-primary-50">
                                {currentUser.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
