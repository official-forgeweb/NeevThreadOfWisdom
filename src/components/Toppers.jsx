import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

// Import all images from the toppers directory
const images = import.meta.glob('../assets/toppers/*.jpeg', { eager: true, import: 'default' });

const Toppers = () => {
    const [r, v] = useReveal();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="results-toppers" className="py-16 sm:py-28 bg-[#F0F3F9] text-[#0A1628] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none -z-10 animate-blob"></div>
                <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-[#1A3A7A] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 pointer-events-none -z-10 animate-blob animation-delay-2000"></div>

                <div ref={r} className={`text-center mb-16 sm:mb-24 max-w-3xl mx-auto flex flex-col items-center ${v ? 'reveal-v' : 'reveal-h'}`}>
                    <span className="inline-block border border-[#1A3A7A]/20 bg-white px-5 sm:px-6 py-2.5 rounded-full font-space text-xs sm:text-sm font-bold text-[#1A3A7A] uppercase tracking-[0.2em] mb-6 shadow-sm">Hall of Fame</span>
                    <h2 className="font-anton text-4xl sm:text-6xl md:text-[5rem] text-[#0A1628] leading-[0.9] mt-3">OUR ACHIEVERS</h2>
                    <p className="font-dm text-base sm:text-xl text-[#4A5568] mt-6 leading-relaxed">These incredible students dared to dream big and achieved phenomenal results. Their success is a testament to their hard work and our dedicated guidance.</p>
                </div>

                {/* Toppers Grid */}
                <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '100ms' }}>
                    {Object.values(images).slice(0, 8).map((img, idx) => (
                        <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_10px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(26,58,122,0.2)] transition-all duration-700 transform hover:-translate-y-3 border-2 border-white bg-white flex justify-center items-center">
                            <img src={img} alt={`Neev Achiever ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.1] group-hover:rotate-1 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                                <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] mb-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                    <i className="fa-solid fa-star text-sm"></i>
                                </div>
                                <span className="text-white font-space font-bold text-xs tracking-widest uppercase mb-1 drop-shadow-md">Neev Scholar</span>
                                <span className="text-[#C9A84C] font-anton text-2xl tracking-wide drop-shadow-md">TOP ACHIEVER</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`mt-16 sm:mt-20 text-center ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '300ms' }}>
                    <button onClick={() => setIsModalOpen(true)} className="btn-royal inline-flex items-center gap-3 group px-10 py-5 rounded-full text-lg shadow-[0_10px_30px_rgba(26,58,122,0.3)] hover:shadow-[0_15px_40px_rgba(26,58,122,0.4)] transition-all">
                        View All Achievers
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                            <i className="fa-solid fa-arrow-right text-sm"></i>
                        </div>
                    </button>
                </div>
            </div>

            {/* Modal for All Toppers */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A1628]/90 backdrop-blur-lg p-4 sm:p-8 overflow-hidden transition-opacity duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-7xl max-h-[90vh] flex flex-col shadow-[0_20px_70px_rgba(0,0,0,0.5)] relative transform transition-all duration-300 scale-100" style={{ animation: 'zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                        
                        <div className="flex justify-between items-center p-8 border-b border-gray-100 shrink-0 bg-white/80 backdrop-blur-md rounded-t-[2.5rem] z-10 relative">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#0A1628] flex items-center justify-center shadow-lg">
                                    <i className="fa-solid fa-trophy text-[#C9A84C] text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-anton text-4xl text-[#0A1628] leading-none mb-1">Hall of Fame</h3>
                                    <p className="font-space font-bold text-xs tracking-widest text-[#6B7B8D] uppercase">Neev's Proud Performers</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full bg-gray-50 text-[#0A1628] flex items-center justify-center hover:bg-[#E53E3E] hover:text-white transition-all duration-300 border border-gray-200 shadow-sm group">
                                <i className="fa-solid fa-xmark text-xl group-hover:rotate-90 transition-transform duration-300"></i>
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto bg-[#F8FAFC]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E1 transparent' }}>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                {Object.values(images).map((img, idx) => (
                                    <div key={idx} className="group rounded-2xl overflow-hidden aspect-[4/5] border-4 border-white shadow-md hover:shadow-2xl transition-all duration-500 relative bg-white transform hover:-translate-y-2">
                                        <img src={img} alt={`Achiever ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <div className="flex items-center gap-2">
                                                <i className="fa-solid fa-medal text-[#C9A84C] drop-shadow-sm"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Toppers;
