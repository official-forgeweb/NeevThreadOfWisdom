import React, { useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const Testimonials = () => {
    const [r, v] = useReveal(); const cr = useRef(null);
    const t = [
        { name: 'Rishabh K.', loc: 'New Delhi', rank: 'AIR #1 — IIT JEE', q: 'The courses helped me always upgrade my career in just a few weeks. Highly recommended!', img: 'https://i.pravatar.cc/100?img=11' },
        { name: 'Priya S.', loc: 'Mumbai', rank: 'AIR #3 — NEET', q: 'My mentors believed in me before I believed in myself. NTW changed everything.', img: 'https://i.pravatar.cc/100?img=5' },
        { name: 'Ankit V.', loc: 'Lucknow', rank: 'Rank 12 — UPSC', q: 'The structured approach and AI tests made the overwhelming syllabus feel manageable.', img: 'https://i.pravatar.cc/100?img=13' },
        { name: 'Meera D.', loc: 'Pune', rank: '99.99%ile — CAT', q: 'Strategy sessions here completely transformed my approach. Best investment ever.', img: 'https://i.pravatar.cc/100?img=9' },
        { name: 'Kunal M.', loc: 'Bangalore', rank: 'AIR #8 — GATE', q: 'Consistent practice with NTW made all the difference in my preparation.', img: 'https://i.pravatar.cc/100?img=15' },
        { name: 'Saloni R.', loc: 'Jaipur', rank: 'AIR #2 — CLAT', q: 'The legal reasoning modules were absolutely top-notch and incredibly well designed.', img: 'https://i.pravatar.cc/100?img=20' }];
    const scroll = (d) => { if (cr.current) cr.current.scrollBy({ left: d === 'left' ? -300 : 300, behavior: 'smooth' }) };
    useEffect(() => { const tm = setInterval(() => scroll('right'), 4e3); return () => clearInterval(tm) }, []);
    return <section id="results" className="py-16 sm:py-24 bg-[#0A1628]"><div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={r} className={`flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12 ${v ? 'reveal-v' : 'reveal-h'}`}>
            <div><span className="font-space text-xs sm:text-sm font-bold text-[#C9A84C] uppercase tracking-widest">Testimonials</span><h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white mt-2 sm:mt-3">Hall of Fame 🏆</h2></div>
            <div className="flex gap-3 mt-4 md:mt-0"><button onClick={() => scroll('left')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 text-white border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#0A1628] transition-all"><i className="fa-solid fa-arrow-left text-sm" /></button><button onClick={() => scroll('right')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 text-white border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#0A1628] transition-all"><i className="fa-solid fa-arrow-right text-sm" /></button></div></div>
        <div ref={cr} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none' }}>
            {t.map((c, i) => <div key={i} className="snap-center shrink-0 w-[280px] sm:w-[320px] md:w-[380px] bg-white/5 backdrop-blur border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:-translate-y-2 transition-transform relative">
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-[#1A3A7A] text-white font-space text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">{c.rank}</div>
                <div className="text-[#C9A84C] text-4xl sm:text-5xl font-serif mb-3 sm:mb-4 leading-none">"</div>
                <p className="font-anton text-lg sm:text-xl text-white leading-snug mb-4 sm:mb-6 normal-case" style={{ textTransform: 'none' }}>{c.q}</p>
                <div className="flex text-[#C9A84C] text-xs sm:text-sm gap-1 mb-3 sm:mb-4">{[1, 2, 3, 4, 5].map(s => <i key={s} className="fa-solid fa-star" />)}</div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-3 sm:pt-4"><img src={c.img} alt={c.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#1A3A7A]/40" /><div><div className="font-space font-bold text-white text-xs sm:text-sm">{c.name}</div><div className="font-dm text-[10px] sm:text-xs text-white/50">{c.loc}</div></div></div>
            </div>)}
        </div>
        <a href="#enquiry" className="btn-royal mt-6 sm:mt-8 text-sm sm:text-base inline-flex">All Reviews <i className="fa-solid fa-arrow-right" /></a>
    </div></section>
}

export default Testimonials;
