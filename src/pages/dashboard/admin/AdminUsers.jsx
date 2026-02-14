import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
    Users, UserPlus, Search, Filter,
    Edit2, Trash2, Mail, Shield, CheckCircle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUsers = () => {
    const { users, register, updateProfile } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'student', password: 'password123' });

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        register({ ...formData });
        setIsModalOpen(false);
        setFormData({ name: '', email: '', role: 'student', password: 'password123' });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900">User Management</h2>
                    <p className="text-slate-500 font-medium">Manage students, teachers, and administrative access.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary py-3 px-6 flex items-center justify-center space-x-2"
                >
                    <UserPlus size={20} />
                    <span>Add New User</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="input-field pl-12 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            className="input-field pl-12 bg-slate-50 border-transparent appearance-none"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="student">Students</option>
                            <option value="teacher">Teachers</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">User Info</th>
                                <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence>
                                {filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-700 font-black text-lg border-2 border-primary-50">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                                                    <div className="flex items-center text-slate-500 text-sm mt-0.5">
                                                        <Mail size={14} className="mr-1.5" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' :
                                                user.role === 'teacher' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                <Shield size={12} />
                                                <span>{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center text-green-600 font-bold text-sm">
                                                <CheckCircle size={16} className="mr-2" />
                                                Active
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center">
                        <Users size={48} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-500 font-bold">No users found matching your criteria</p>
                    </div>
                )}
            </div>

            {/* Add User Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-2xl font-black text-slate-900">Add New User</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>
                            <form onSubmit={handleAddUser} className="p-8 space-y-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text" required className="input-field py-4" placeholder="Enter name"
                                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email" required className="input-field py-4" placeholder="user@academy.com"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assign Role</label>
                                        <select
                                            className="input-field py-4 appearance-none"
                                            value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            <option value="student">Student</option>
                                            <option value="teacher">Teacher</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                        <input
                                            type="text" required className="input-field py-4" placeholder="••••••••"
                                            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="btn-primary w-full py-5 text-sm font-black uppercase tracking-widest shadow-lg">Create Account</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;
