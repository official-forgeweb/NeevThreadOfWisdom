import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useCounter } from '../hooks/useCounter';
import aboutImg from '../assets/stock/stock_5.jpeg';

const About = () => {
    const [r, v] = useReveal();
    return (
        <section id="about" className="py-20 sm:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Visual Side */}
                    <div ref={r} className={`w-full lg:w-1/2 relative ${v ? 'reveal-v' : 'reveal-h'}`}>
                        <div className="relative group">
                            {/* Decorative background shape */}
                            <div className="absolute -inset-4 bg-[#F0F3F9] rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700 -z-10"></div>
                            
                            <img 
                                src={aboutImg} 
                                alt="NEEV Academic Environment" 
                                className="w-full h-auto rounded-[2.5rem] shadow-2xl border-4 border-white object-cover aspect-[4/5] sm:aspect-square lg:aspect-[4/5]" 
                            />
                            
                            {/* Floating Highlight */}
                            <div className="absolute -bottom-10 -right-6 sm:-right-12 bg-[#0A1628] p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 hidden sm:block animate-[float_6s_ease-in-out_infinite]">
                                <div className="flex flex-col gap-2">
                                    <span className="font-anton text-4xl text-[#C9A84C] leading-none">ESTD. 2010</span>
                                    <span className="font-space font-bold text-white text-xs uppercase tracking-[0.2em]">Legacy of Excellence</span>
                                </div>
                            </div>

                            {/* Experience Badge */}
                            <div className="absolute -top-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-[#d8dfeb] flex items-center gap-4 animate-[float_7s_ease-in-out_infinite_reverse]">
                                <div className="w-12 h-12 rounded-2xl bg-[#1A3A7A] flex items-center justify-center text-white text-xl shadow-lg shadow-[#1A3A7A]/20">
                                    <i className="fa-solid fa-graduation-cap"></i>
                                </div>
                                <div className="font-anton text-xl text-[#0A1628]">ELITE COACHING</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className={`w-full lg:w-1/2 ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '200ms' }}>
                        <div className="space-y-8">
                            <div>
                                <span className="font-space text-xs sm:text-sm font-bold text-[#1A3A7A] uppercase tracking-[0.2em] border-l-4 border-[#C9A84C] pl-4">The NEEV Philosophy</span>
                                <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#0A1628] mt-6 leading-[0.9] tracking-tight">
                                    NURTURING <br />
                                    <span className="text-[#1A3A7A]">CURIOSITY.</span> <br />
                                    BUILDING <br />
                                    <span className="text-[#C9A84C]">MINDS.</span>
                                </h2>
                            </div>

                            <p className="font-dm text-lg sm:text-xl text-[#4A5568] leading-relaxed">
                                At NEEV (NTW), we go beyond traditional coaching. We provide a <strong className="text-[#0A1628]">Structured Academic Framework</strong> designed to transform students into consistent high-performers. 
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-6 items-start">
                                    <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-2.5 shrink-0"></div>
                                    <p className="font-dm text-base text-[#6B7B8D]">
                                        <strong className="text-[#1A3A7A] font-bold">Personalized Mentorship:</strong> Every student receives one-on-one attention to track progress and bridge conceptual gaps.
                                    </p>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-2 h-2 rounded-full bg-[#1A3A7A] mt-2.5 shrink-0"></div>
                                    <p className="font-dm text-base text-[#6B7B8D]">
                                        <strong className="text-[#1A3A7A] font-bold">Concept-First Approach:</strong> We prioritize deep understanding over rote memorization, building a rock-solid foundation for competitive exams.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 flex flex-wrap gap-6 items-center border-t border-[#d8dfeb]">
                                <a href="#enquiry" className="btn-royal px-10 py-5 rounded-2xl shadow-xl shadow-[#1A3A7A]/10">
                                    Our Vision <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                                </a>
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-[#F0F3F9] overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Success Stories" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-12 h-12 rounded-full border-4 border-white bg-[#1A3A7A] flex items-center justify-center text-white font-space font-bold text-[10px]">
                                        500+
                                    </div>
                                </div>
                                <span className="font-space text-xs font-bold text-[#6B7B8D] uppercase tracking-widest">Happy Students</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
