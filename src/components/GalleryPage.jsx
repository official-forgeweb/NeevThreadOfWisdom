import React, { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';

import s1 from '../assets/stock/stock_1.jpeg';
import s2 from '../assets/stock/stock_2.jpeg';
import s3 from '../assets/stock/stock_3.jpeg';
import s4 from '../assets/stock/stock_4.jpeg';
import s5 from '../assets/stock/stock_5.jpeg';
import s6 from '../assets/stock/stock_6.jpeg';
import s7 from '../assets/stock/stock_7.jpeg';
import s8 from '../assets/stock/stock_8.jpeg';
import s9 from '../assets/stock/stock_9.jpeg';
import s10 from '../assets/stock/stock_10.jpeg';
import s11 from '../assets/stock/stock_11.jpeg';
import s12 from '../assets/stock/stock_12.jpeg';
import s13 from '../assets/stock/stock_13.jpeg';
import s14 from '../assets/stock/stock_14.jpeg';
import s15 from '../assets/stock/stock_15.jpeg';
import s16 from '../assets/stock/stock_16.jpeg';
import s17 from '../assets/stock/stock_17.jpeg';

import SEO from './SEO';

const GalleryPage = () => {
    const [r, v] = useReveal(0.1);
    const [filter, setFilter] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = ['All', 'Classrooms', 'Events', 'Campus', 'Activities'];
    
    const images = [
        { url: s1,  },
        { url: s2,  },
        { url: s3,  },
        { url: s4,  },
        { url: s5,  },
        { url: s6,  },
        { url: s7,  },
        { url: s8,  },
        { url: s9,  },
        { url: s10,  },
        { url: s11,  },
        { url: s12,  },
        { url: s13, },
        { url: s14, },
        { url: s15,  },
        { url: s16,  },
        { url: s17,  },
    ];

    const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

    return (
        <div className="pt-20 sm:pt-24 min-h-screen bg-white">
            <SEO 
                title="Campus Gallery" 
                description="Take a visual tour of NEEV Academy. See our classrooms, events, campus activities, and student life."
                url="/gallery"
            />
            {/* Gallery Hero */}
            <div className="bg-[#0A1628] text-white py-20 sm:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/20 rounded-full -mr-64 -mt-64 blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A3A7A]/30 rounded-full -ml-48 -mb-48 blur-[100px]"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <span className="inline-block border border-white/20 bg-white/5 px-6 py-2 rounded-full font-space text-sm font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">Visual Journey</span>
                    <h1 className="font-anton text-4xl sm:text-7xl md:text-9xl leading-none">OUR GALLERY</h1>
                    <p className="font-dm text-lg sm:text-2xl mt-8 max-w-3xl mx-auto text-[#8899AA] leading-relaxed">
                        Explore the vibrant life at NEEV through our lens. From intensive classroom sessions to joyous celebrations.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setFilter(cat)}
                            className={`font-space text-sm sm:text-base font-bold px-6 py-3 rounded-full transition-all duration-300 ${filter === cat ? 'bg-[#1A3A7A] text-white shadow-lg scale-105' : 'bg-[#F0F3F9] text-[#6B7B8D] hover:bg-[#d8dfeb]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Image Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-32">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredImages.map((img, i) => (
                        <div 
                            key={`${filter}-${i}`} 
                            className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                            onClick={() => setLightbox(img)}
                            style={{ animation: `fadeUp .5s ease ${i * 50}ms both` }}
                        >
                            <img 
                                src={img.url} 
                                alt={img.title} 
                                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                <span className="font-space text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest mb-2">{img.category}</span>
                                <h4 className="font-anton text-xl text-white">{img.title}</h4>
                            </div>
                            <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white scale-75 group-hover:scale-100 duration-500">
                                <i className="fa-solid fa-expand text-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div 
                    className="fixed inset-0 z-[2000] bg-[#0A1628]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
                    onClick={() => setLightbox(null)}
                >
                    <button 
                        className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 text-white hover:bg-white hover:text-[#0A1628] flex items-center justify-center transition-all duration-300 z-50"
                        onClick={() => setLightbox(null)}
                    >
                        <i className="fa-solid fa-xmark text-2xl" />
                    </button>
                    
                    <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={e => e.stopPropagation()}>
                        <div className="relative w-full h-[70vh] flex items-center justify-center">
                            <img 
                                src={lightbox.url} 
                                className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" 
                                alt={lightbox.title}
                                style={{ animation: 'fadeUp .4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                            />
                        </div>
                        <div className="text-center text-white" style={{ animation: 'fadeUp .4s ease .1s both' }}>
                            <span className="font-space text-xs font-bold text-[#C9A84C] uppercase tracking-[0.3em] mb-2 block">{lightbox.category}</span>
                            <h3 className="font-anton text-3xl sm:text-4xl">{lightbox.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
