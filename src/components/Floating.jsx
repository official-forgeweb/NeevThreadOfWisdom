import React, { useState, useEffect } from 'react';

const Floating = () => {
    const [s, ss] = useState(false);
    useEffect(() => {
        const h = () => ss(window.scrollY > 300);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h)
    }, []);
    return <><a href="https://wa.me/917291839346" target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000] w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#25D366] text-white flex items-center justify-center text-xl sm:text-2xl shadow-lg hover:scale-110 transition-transform group" style={{ animation: 'pulse 2s infinite' }}><i className="fa-brands fa-whatsapp" /><span className="absolute right-full mr-3 bg-white text-[#0A1628] font-dm text-sm px-4 py-2 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">Chat with us</span></a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[1000] w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#d8dfeb] text-[#0A1628] flex items-center justify-center shadow-lg hover:bg-[#1A3A7A] hover:text-white hover:border-[#1A3A7A] transition-all duration-300 ${s ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}><i className="fa-solid fa-arrow-up text-xs sm:text-sm" /></button></>
}

export default Floating;
