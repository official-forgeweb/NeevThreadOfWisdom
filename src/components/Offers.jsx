import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { Link } from 'react-router-dom';

import { useModal } from '../context/ModalContext';

const Offers = () => {
    const [r, v] = useReveal(); 
    const { openEnquiryModal } = useModal();
    const cards = [
        { id: 'foundation-batch', badge: 'FOUNDATION', type: 'CLASSES 1 TO 5', price: '15,000', monthly: '1,500', features: ['Interactive Learning', 'Personalized Attention', 'Regular Assessments', 'Holistic Development'], hl: false },
        { id: 'foundation-batch', badge: 'MIDDLE SCHOOL', type: 'CLASSES 6 TO 8', price: '18,000', monthly: '1,800', features: ['Strong Foundations', 'Concept Building', 'Weekly Tests', 'Performance Reports'], hl: false },
        { id: 'foundation-batch', badge: 'HIGH SCHOOL', type: 'CLASSES 9 & 10', price: '13,000', monthly: '1,300', features: ['Board Exam Focus', 'Doubt Clearing Sessions', 'Comprehensive Material', 'Mock Exams'], hl: false },
        { id: 'jee-main-advanced', badge: 'SENIOR SEC.', type: '11TH & 12TH SCI/COM', price: '20,000', monthly: '2,000', features: ['Core Concepts', 'Expert Faculty', 'Board Pattern Focus', 'Career Guidance'], hl: false },
        { id: 'boson-batch', badge: 'COMPETITIVE', type: 'BOSON BATCH -  JEE & NEET', price: '30,000', monthly: '3,000', features: ['Rank Booster Program', 'Extensive DPPs', 'All India Test Series', 'Personal Mentorship'], hl: true },
        { id: 'accountancy-batch', badge: 'COMMERCE', type: 'ACCOUNTANCY BATCH', price: '20,000', monthly: '2,000', features: ['Starts from 2nd April 2026', 'Teacher Sushil Patel', 'Experience 18+', 'Timing: 4 to 5:30 pm'], hl: false }
    ];

    return (
        <section id="programs" className="py-16 sm:py-28 bg-[#0A1628] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div ref={r} className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
                    <span className={`inline-block border border-white/20 bg-white/5 px-4 sm:px-6 py-2 rounded-full font-space text-xs sm:text-sm font-bold text-[#C9A84C] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 ${v ? 'reveal-v' : 'reveal-h'}`}>Programs</span>
                    <h2 className={`font-anton text-4xl sm:text-5xl md:text-[5rem] text-white leading-[0.9] mt-3 ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '100ms' }}>CHOOSE YOUR PATH</h2>
                    <p className={`font-dm text-base sm:text-lg text-[#8899AA] mt-4 sm:mt-6 ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '150ms' }}>Comprehensive learning ecosystems tailored for Classes 6–12, JEE & NEET goals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto pb-12">
                    {cards.map((c, i) => (
                        <div key={i} className={`rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-10 relative flex flex-col transition-all duration-500 hover:-translate-y-3 ${c.hl ? 'bg-[#0A1628] text-white md:scale-100 lg:scale-[1.08] ring-4 ring-[#C9A84C] shadow-[0_10px_50px_rgba(201,168,76,0.25)] ring-[#C9A84C] z-10 hover:shadow-[0_20px_60px_rgba(201,168,76,0.35)]' : 'bg-white text-[#0A1628] shadow-2xl hover:shadow-[0_20px_60px_rgba(26,58,122,0.25)]'} ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: `${250 + i * 120}ms` }}>
                            {c.hl && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#0A1628] font-space text-[10px] sm:text-xs font-bold px-4 sm:px-6 py-1.5 sm:py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap border-2 border-white">★ New Batch ★</div>}
                            <div className={`inline-flex self-start justify-center font-space text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl mb-4 sm:mb-6 ${c.hl ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'bg-[#F0F3F9] text-[#4A5568]'}`}>{c.badge}</div>
                            <h3 className={`font-anton text-2xl sm:text-3xl mb-3 sm:mb-4 leading-none uppercase ${c.hl ? 'text-white' : ''}`}>{c.type}</h3>
                            <div className="flex items-baseline gap-2 mb-2"><span className={`font-space font-bold text-4xl sm:text-5xl tracking-tighter ${c.hl ? 'text-[#C9A84C]' : 'text-[#1A3A7A]'}`}>₹{c.price}</span><span className={`font-space text-sm font-bold ${c.hl ? 'text-white/60' : 'text-[#8899AA]'}`}>/yr</span></div>
                            <div className={`flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10 pb-6 sm:pb-8 border-b ${c.hl ? 'border-white/15' : 'border-[#e0e6ef]'}`}><span className={`font-space text-xs sm:text-sm font-medium ${c.hl ? 'text-white/80' : 'text-[#4A5568]'}`}>₹{c.monthly} /mo</span><span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-lg ${c.hl ? 'text-[#0A1628] bg-[#C9A84C]/80' : 'text-[#0A1628] bg-[#C9A84C]/20'}`}>Monthly Plan</span></div>
                            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10 flex-grow">{c.features.map((f, fi) => <li key={fi} className={`flex items-start gap-3 sm:gap-4 font-space text-xs sm:text-sm font-medium leading-relaxed ${c.hl ? 'text-white/80' : 'text-[#3A4A5C]'}`}><div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center text-white text-[8px] sm:text-[10px] mt-0.5 ${c.hl ? 'bg-[#C9A84C]' : 'bg-[#0A1628]'}`}><i className="fa-solid fa-check" /></div>{f}</li>)}</ul>
                            <Link to={`/courses/${c.id}`} className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-space font-bold text-base sm:text-lg uppercase tracking-wider transition-all mt-auto text-center block ${c.hl ? 'bg-[#C9A84C] text-[#0A1628] hover:bg-[#b8972f] shadow-[0_4px_20px_rgba(201,168,76,0.4)] hover:-translate-y-1' : 'bg-[#F0F3F9] text-[#0A1628] hover:bg-[#0A1628] hover:text-white border-2 border-transparent hover:border-[#0A1628]'}`}>Explore Program <i className="fa-solid fa-arrow-right ml-2" /></Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/courses" className="font-space font-bold text-[#C9A84C] hover:text-white transition-colors border-b-2 border-[#C9A84C] pb-1 uppercase tracking-widest text-sm">
                        Explore Full Course Structures
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Offers;
