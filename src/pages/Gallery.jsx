import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, X, Image as ImageIcon, Video } from 'lucide-react';

const Gallery = () => {
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    const items = [
        { id: 1, type: 'image', category: 'campus', url: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, type: 'image', category: 'classroom', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop' },
        { id: 3, type: 'image', category: 'events', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224594?q=80&w=2070&auto=format&fit=crop' },
        { id: 4, type: 'image', category: 'campus', url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop' },
        { id: 5, type: 'image', category: 'classroom', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop' },
        { id: 6, type: 'image', category: 'events', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop' },
    ];

    const filteredItems = filter === 'all' ? items : items.filter(i => i.category === filter);

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl font-black text-slate-900 mb-6">Our <span className="text-primary-600">Vibrant Life</span></h1>
                    <p className="text-lg text-slate-500 font-medium">Glance through our campus, classrooms, and memorable events.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    {['all', 'campus', 'classroom', 'events'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${filter === f
                                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-200 scale-105'
                                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative h-80 rounded-[40px] overflow-hidden group cursor-pointer border-8 border-white shadow-lg shadow-slate-200"
                                onClick={() => setSelectedImage(item.url)}
                            >
                                <img src={item.url} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-600 scale-50 group-hover:scale-100 transition-transform duration-500">
                                        <Maximize2 size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Video Preview Section */}
                <div className="mt-32">
                    <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center">
                        <Video className="mr-4 text-secondary-500" size={32} />
                        Video Showcase
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[1, 2].map((v) => (
                            <div key={v} className="relative aspect-video rounded-[40px] overflow-hidden group shadow-2xl border-4 border-white">
                                <img
                                    src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop`}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt="Video Thumbnail"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/20 transition-all">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-2xl group-hover:scale-110 transition-all cursor-pointer">
                                        <Play size={32} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-8 left-8">
                                    <h4 className="text-xl font-bold text-white mb-1">Campus Tour 2024</h4>
                                    <p className="text-primary-400 font-bold uppercase tracking-widest text-xs">Video Content</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
                            onClick={() => setSelectedImage(null)}
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-3xl"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <img src={selectedImage} alt="Full View" className="w-full h-full object-contain" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
