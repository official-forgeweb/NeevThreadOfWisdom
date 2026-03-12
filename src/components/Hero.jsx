import React from 'react';
import { useReveal } from '../hooks/useReveal';
import heroImg from '../assets/stock/stock_9.jpeg';
import { useModal } from '../context/ModalContext';

const Hero = () => {
    const [r, v] = useReveal();
    const { openEnquiryModal } = useModal();
    return <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-28 sm:pt-36 pb-24 sm:pb-20" style={{ background: 'linear-gradient(180deg,#E8EDF6 0%,#F0F3F9 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#c8d4e8 1.5px,transparent 1.5px)', backgroundSize: '32px 32px', opacity: .5 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
            <div ref={r} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className={`lg:col-span-7 ${v ? 'reveal-v' : 'reveal-h'}`}>
                    <div className="inline-flex items-center gap-2 sm:gap-3 bg-white rounded-2xl px-3 sm:px-5 py-2 sm:py-3 shadow-md border border-[#d8dfeb] mb-6 sm:mb-10"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#10B981] animate-pulse" /><span className="font-space text-[10px] sm:text-xs font-bold text-[#0A1628] uppercase tracking-[0.1em] sm:tracking-[0.15em]">Academic Excellence | Classes 6–12</span></div>
                    <h1 className="font-anton text-[2.5rem] sm:text-6xl md:text-[5rem] lg:text-[5.5rem] text-[#0A1628] leading-[0.9] mb-6 sm:mb-8 tracking-tight">CLASSES 6-12,<br />JEE & NEET<br /><span className="text-[#1A3A7A]">WITH NTW</span></h1>
                    <p className="font-dm text-base sm:text-xl md:text-2xl text-[#4A5568] max-w-xl mb-8 sm:mb-12 leading-relaxed">Structured Learning & Expert Faculty. Experience India's premier ecosystem exclusively built for your success.</p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5">
                        <button onClick={openEnquiryModal} className="btn-royal text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 shadow-[0_8px_24px_rgba(26,58,122,0.3)] hover:-translate-y-1 text-center">Start Preparation <i className="fa-solid fa-arrow-right" /></button>
                        <a href="#about" className="btn-outline text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-white border-transparent shadow-sm hover:shadow-md hover:bg-white hover:text-[#0A1628] hover:border-[#c8d4e8] hover:-translate-y-1 text-center">Explore Campus</a>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-6 sm:gap-12 mt-10 sm:mt-16 bg-white/60 backdrop-blur p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-white max-w-2xl">{[{ n: 'Top 100', l: 'AIR Ranks' }, { n: '45+', l: 'Expert Faculty' }, { n: '2.5k+', l: 'Selections' }].map((s, i) => <div key={i}><div className="font-anton text-2xl sm:text-4xl text-[#1A3A7A]">{s.n}</div><div className="font-space font-bold text-[10px] sm:text-sm text-[#4A5568] uppercase tracking-wide mt-1">{s.l}</div></div>)}</div>
                </div>
                <div className={`relative hidden lg:block lg:col-span-5 w-full mx-auto ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '200ms' }}>
                    <div className="card w-full aspect-[4/5] p-3 shadow-2xl rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all bg-white relative">
                        <img src={heroImg} alt="Student" className="w-full h-full object-cover rounded-[1.5rem]" />
                        <div className="absolute -bottom-8 -left-8 card p-6 flex items-center gap-4 shadow-[0_16px_40px_rgba(10,22,40,0.15)] border border-[#d8dfeb]"><div className="w-14 h-14 rounded-2xl bg-[#1A3A7A] flex items-center justify-center text-white text-2xl shadow-inner"><i className="fa-solid fa-bolt" /></div><div><div className="font-anton text-2xl leading-none">AI-DRIVEN</div><div className="font-space font-bold text-sm text-[#1A3A7A] uppercase tracking-wider mt-1">Testing Method</div></div></div>
                    </div>
                </div>
            </div></div>
        {/* Marquee */}
        <div className="absolute bottom-0 w-full overflow-hidden bg-[#0A1628] py-3 sm:py-4 border-t-4 border-[#C9A84C]"><div className="flex whitespace-nowrap"><div className="inline-flex gap-5 pr-5 font-anton text-sm sm:text-xl tracking-[0.1em] text-white opacity-95" style={{ animation: 'marquee 25s linear infinite' }}>{[1, 2, 3, 4, 5].map(x => <span key={x}>JEE ADVANCED ✦ NEET UG ✦ BITSAT ✦ BOARDS ✦ KVPY ✦ OLYMPIADS ✦&nbsp;</span>)}</div><div className="inline-flex gap-5 pr-5 font-anton text-sm sm:text-xl tracking-[0.1em] text-white opacity-95" style={{ animation: 'marquee 25s linear infinite' }} aria-hidden>{[1, 2, 3, 4, 5].map(x => <span key={x}>JEE ADVANCED ✦ NEET UG ✦ BITSAT ✦ BOARDS ✦ KVPY ✦ OLYMPIADS ✦&nbsp;</span>)}</div></div></div>
    </section>
}

export default Hero;
