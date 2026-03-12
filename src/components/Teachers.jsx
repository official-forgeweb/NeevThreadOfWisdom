import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { faculty } from '../data/faculty';

const Teachers = ({ showBio = false }) => {
    const [r, v] = useReveal(0.1); 
    return <section id="faculty" className="py-16 sm:py-28 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={r} className={`text-center mb-12 sm:mb-20 ${v ? 'reveal-v' : 'reveal-h'}`}>
            <span className="inline-block border border-[#d8dfeb] bg-[#F0F3F9] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-space text-xs sm:text-sm font-bold text-[#1A3A7A] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4">Expert Faculty</span>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-[5rem] text-[#0A1628] mt-3">{showBio ? 'OUR EXPERT PANEL' : 'THE NTW FACULTY'}</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {faculty.map((t, i) => (
                <div key={i} className={`card text-center group hover:border-[#1A3A7A]/30 bg-[#F0F3F9] shadow-none hover:bg-white hover:shadow-[0_20px_40px_rgba(10,22,40,0.1)] p-4 sm:p-8 ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-6 overflow-hidden rounded-xl sm:rounded-[2rem] group-hover:rounded-full transition-all duration-500 border-2 sm:border-4 border-white shadow-md">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                    </div>
                    <h4 className="font-anton text-lg sm:text-2xl text-[#0A1628] mb-1 sm:mb-2 tracking-wide">{t.name}</h4>
                    <span className="inline-block font-space text-[9px] sm:text-xs font-bold text-white bg-[#1A3A7A] px-2 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3 uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-sm">{t.subject}</span>
                    <p className="font-space font-medium text-[10px] sm:text-sm text-[#6B7B8D] mb-2">{t.experience}</p>
                    {showBio && <p className="font-dm text-xs sm:text-sm text-[#4A5568] mt-4 border-t border-[#d8dfeb] pt-4 leading-relaxed">{t.bio}</p>}
                </div>
            ))}
        </div></div></section>
}

export default Teachers;
