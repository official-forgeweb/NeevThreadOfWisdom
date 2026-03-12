import React, { useState } from 'react';
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

const Gallery = () => {
    const [r, v] = useReveal(); const [f, sf] = useState('All'); const [lb, slb] = useState(null);
    const filters = ['All', 'Classrooms', 'Events', 'Campus'];
    const imgs = [
        { c: 'Classrooms', u: s1 }, { c: 'Events', u: s2 }, { c: 'Campus', u: s3 },
        { c: 'Classrooms', u: s4 }, { c: 'Events', u: s5 }, { c: 'Campus', u: s6 },
        { c: 'Classrooms', u: s7 }, { c: 'Events', u: s8 }, { c: 'Campus', u: s9 },
        { c: 'Classrooms', u: s10 }, { c: 'Events', u: s11 }, { c: 'Campus', u: s12 },
        { c: 'Classrooms', u: s13 }, { c: 'Events', u: s14 }, { c: 'Campus', u: s15 },
        { c: 'Classrooms', u: s16 }, { c: 'Events', u: s17 },
    ];
    const fi = f === 'All' ? imgs : imgs.filter(i => i.c === f);
    return <section id="gallery" className="py-16 sm:py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={r} className={`text-center mb-8 sm:mb-12 ${v ? 'reveal-v' : 'reveal-h'}`}>
            <span className="font-space text-xs sm:text-sm font-bold text-[#1A3A7A] uppercase tracking-widest">Campus Life</span>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#0A1628] mt-2 sm:mt-3 mb-5 sm:mb-8">Life at NTW</h2>
            <div className="flex flex-wrap justify-center gap-2">{filters.map(x => <button key={x} onClick={() => sf(x)} className={`font-space text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all ${f === x ? 'bg-[#1A3A7A] text-white shadow-md' : 'bg-[#F0F3F9] text-[#6B7B8D] hover:bg-[#d8dfeb]'}`}>{x}</button>)}</div></div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">{fi.map((im, i) => <div key={`${f}-${i}`} className="break-inside-avoid relative rounded-xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow" onClick={() => slb(im.u)} style={{ animation: `fadeUp .4s ease ${i * 60}ms both` }}>
            <img src={im.u} alt="Gallery" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-[#0A1628]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white"><i className="fa-solid fa-expand text-sm sm:text-lg" /></div></div></div>)}</div></div>
        {lb && <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => slb(null)}><button className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 text-white hover:bg-white hover:text-black flex items-center justify-center transition"><i className="fa-solid fa-xmark text-lg sm:text-xl" /></button><img src={lb} className="max-w-full sm:max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl" alt="Enlarged" onClick={e => e.stopPropagation()} style={{ animation: 'fadeUp .3s ease' }} /></div>}
    </section>
}

export default Gallery;
