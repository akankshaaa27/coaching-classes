import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Get in <span className="text-primary-600 underline underline-offset-8 decoration-secondary-500">Touch</span></h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">Have questions about admissions or our programs? Our team is here to help you 24/7.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Info Cards */}
                    <div className="lg:col-span-1 space-y-8">
                        {[
                            { icon: <Phone size={24} />, title: 'Call Us', value: '+91 8767826955', desc: 'Mon-Sat (9AM - 7PM)', color: 'bg-primary-600' },
                            { icon: <Mail size={24} />, title: 'Email Us', value: 'pixelproitsolutions@gmail.com', desc: 'Support available 24/7', color: 'bg-secondary-500' },
                            { icon: <MapPin size={24} />, title: 'Visit Us', value: 'Pune, Maharashtra', desc: 'India', color: 'bg-green-600' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm flex items-start space-x-6 group"
                            >
                                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-1">{item.title}</h3>
                                    <p className="text-lg font-black text-slate-900 leading-tight mb-2">{item.value}</p>
                                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Socials card */}
                        <div className="bg-slate-900 p-8 rounded-[35px] text-white">
                            <h3 className="text-lg font-bold mb-6">Follow Our Socials</h3>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-10 lg:p-14 rounded-[50px] border border-slate-100 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                            <form className="relative z-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Your Name</label>
                                        <input type="text" className="input-field py-4" placeholder="Aditya Roy" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Your Email</label>
                                        <input type="email" className="input-field py-4" placeholder="aditya@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Subject</label>
                                    <select className="input-field py-4 appearance-none">
                                        <option>Admission Inquiry</option>
                                        <option>Fee Structure</option>
                                        <option>Technical Issue</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Message</label>
                                    <textarea className="input-field py-4 min-h-[180px]" placeholder="How can we help you?"></textarea>
                                </div>

                                <button className="btn-primary w-full py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3 shadow-lg group">
                                    <span>Send Message Now</span>
                                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-20 h-96 rounded-[50px] overflow-hidden bg-slate-200 relative grayscale group hover:grayscale-0 transition-all duration-700 border-8 border-white shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all">
                        <div className="bg-white p-6 rounded-3xl shadow-2xl flex items-center space-x-4">
                            <MapPin className="text-red-500 animate-bounce" size={32} />
                            <div>
                                <h4 className="font-black text-slate-900 leading-tight">Our Main Campus</h4>
                                <p className="text-sm text-slate-500 font-medium">Pune, Maharashtra</p>
                            </div>
                        </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2033&auto=format&fit=crop" className="w-full h-full object-cover" alt="Map Location" />
                </div>
            </div>
        </div>
    );
};

export default Contact;
