import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

// Import all images from the toppers directory
const images = import.meta.glob('../assets/toppers/*.jpeg', { eager: true, import: 'default' });

const Toppers = () => {
    const [r, v] = useReveal();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Find Kabir's image (the one with 3.44.20 in the name as it's the first one sent separately)
    const imageList = Object.values(images);
    let kabirImage = imageList[0];
    const restImages = [];

    Object.keys(images).forEach((path) => {
        if (path.includes('3.44.20')) {
            kabirImage = images[path];
        } else {
            restImages.push(images[path]);
        }
    });

    return (
        <section id="results-toppers" className="py-16 sm:py-28 bg-[#F0F3F9] text-[#0A1628]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div ref={r} className={`text-center mb-12 sm:mb-20 max-w-3xl mx-auto flex flex-col items-center ${v ? 'reveal-v' : 'reveal-h'}`}>
                    <span className="inline-block border border-[#1A3A7A]/20 bg-white px-4 sm:px-6 py-2 rounded-full font-space text-xs sm:text-sm font-bold text-[#1A3A7A] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 shadow-sm">NEEV's Pride</span>
                    <h2 className="font-anton text-3xl sm:text-5xl md:text-[5rem] text-[#0A1628] leading-[0.9] mt-3">MEET OUR TOPPERS</h2>
                    <p className="font-dm text-base sm:text-lg text-[#4A5568] mt-4 sm:mt-6">These incredible students dared to dream big and achieved phenomenal results. Their success is a testament to our dedicated guidance.</p>
                </div>

                {/* Featured Topper - Kabir */}
                <div className={`mb-16 sm:mb-24 rounded-[2rem] sm:rounded-[3rem] bg-[#0A1628] flex flex-col-reverse md:flex-row items-stretch relative shadow-[0_20px_60px_rgba(10,22,40,0.25)] border border-[#1A3A7A]/20 overflow-hidden ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '100ms' }}>

                    <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white z-10 relative">
                        {/* Decorative blob */}
                        <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A3A7A]/20 via-[#0A1628]/0 to-transparent pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none"></div>

                        <div className="inline-flex self-start justify-center font-space text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl mb-4 sm:mb-6 bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30 shadow-inner">🏆 JEE Main Topper</div>
                        <h3 className="font-anton text-3xl sm:text-6xl lg:text-[5.5rem] mb-2 leading-none" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>KABIR</h3>
                        <div className="text-[#8899AA] font-space text-[10px] sm:text-base uppercase tracking-widest mb-8 sm:mb-10 block">Outstanding Performance</div>

                        <div className="flex items-baseline gap-3 mb-8 sm:mb-10 bg-white/5 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl border border-white/10 w-fit backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C] to-[#C9A84C]/0 group-hover:via-white transition-colors duration-500"></div>
                            <span className="font-space font-bold text-5xl sm:text-[5.5rem] tracking-tighter text-[#C9A84C] leading-none" style={{ filter: 'drop-shadow(0 4px 10px rgba(201,168,76,0.3))' }}>99.8</span>
                            <span className="font-space text-lg sm:text-xl font-bold text-white/90">%ILE</span>
                        </div>

                        <p className="font-dm text-base sm:text-lg text-[#8899AA] leading-relaxed max-w-md relative z-10">
                            A testament to hard work, dedication, and the right guidance. Kabir's outstanding performance in JEE Mains sets a new benchmark for excellence.
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 relative bg-[#060D18] flex justify-center items-center p-6 sm:p-10 md:p-12 lg:p-16">
                        {/* Background glowing effects for the image */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#C9A84C]/10 to-transparent pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#C9A84C] rounded-full filter blur-[120px] opacity-10 pointer-events-none"></div>

                        {/* Image Container */}
                        <div className="relative w-full max-w-[22rem] lg:max-w-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/10 group cursor-pointer">
                            <img src={kabirImage} alt="Kabir - 99.8%ile JEE" className="w-full h-auto object-contain transform group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* Rest of the Toppers Grid */}
                <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '200ms' }}>
                    {restImages.slice(0, 4).map((img, idx) => (
                        <div key={idx} className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(26,58,122,0.15)] transition-all duration-500 transform hover:-translate-y-2 border border-black/5 flex bg-white justify-center items-center">
                            <img src={img} alt={`Topper ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08] ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 xs:p-6 translate-y-4 group-hover:translate-y-0">
                                <span className="text-white/90 font-space font-bold text-[10px] sm:text-xs tracking-wider uppercase mb-1">Star Achiever</span>
                                <span className="text-[#C9A84C] font-anton text-lg sm:text-2xl tracking-wide">EXCELLENT RESULT</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`mt-12 text-center ${v ? 'reveal-v' : 'reveal-h'}`} style={{ transitionDelay: '300ms' }}>
                    <button onClick={() => setIsModalOpen(true)} className="btn-royal inline-flex items-center gap-2 group px-8 py-4">
                        Show More Achievers
                        <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>

            {/* Modal for All Toppers */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A1628]/80 backdrop-blur-md p-4 sm:p-6 overflow-hidden">
                    <div className="bg-white rounded-[2rem] w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl relative" style={{ animation: 'fadeUp 0.3s ease-out forwards' }}>
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                            <div>
                                <h3 className="font-anton text-3xl text-[#0A1628]">All Achievers</h3>
                                <p className="font-dm text-sm text-[#4A5568] mt-1">Our proud performers</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 text-[#0A1628] flex items-center justify-center hover:bg-[#0A1628] hover:text-white transition-colors border border-gray-200">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto bg-[#F0F3F9]" style={{ scrollbarWidth: 'thin' }}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {restImages.map((img, idx) => (
                                    <div key={idx} className="rounded-xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <img src={img} alt={`Topper ${idx + 2}`} className="w-full h-full object-cover" />
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
