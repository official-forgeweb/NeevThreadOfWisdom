import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpeg';

import { useModal } from '../context/ModalContext';

const Nav = () => {
    const [sc, s] = useState(false);
    const [m, sm] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { openEnquiryModal } = useModal();

    useEffect(() => {
        const h = () => s(window.scrollY > 60);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    const links = [
        { n: 'Home', id: 'home', path: '/' },
        { n: 'Courses', id: 'courses', path: '/courses' },
        { n: 'About', id: 'about', id_scroll: 'about' },
        { n: 'Faculty', id: 'faculty', path: '/faculty' },
        { n: 'Gallery', id: 'gallery', path: '/gallery' },
        { n: 'Contact', id: 'enquiry', id_scroll: 'enquiry' }
    ];

    const getHref = (l) => {
        if (l.path) return l.path;
        return isHome ? `#${l.id_scroll}` : `/#${l.id_scroll}`;
    };

    const isInternal = (l) => !!l.path;

    useEffect(() => {
        if (m) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [m]);

    return (
        <>
            {/* Mobile Menu Overlay */}
            {m && (
                <div className="fixed inset-0 bg-white z-[999] flex flex-col justify-center items-center gap-4 sm:gap-6 md:hidden overflow-y-auto pt-20">
                    {links.map((l, i) => (
                        isInternal(l) ?
                            <Link key={l.n} to={l.path} onClick={() => sm(false)} className="font-anton text-3xl sm:text-5xl text-[#0A1628] hover:text-[#1A3A7A] transition-colors uppercase" style={{ animation: `fadeUp .4s ease ${i * 80}ms both` }}>{l.n}</Link> :
                            <a key={l.n} href={getHref(l)} onClick={() => sm(false)} className="font-anton text-3xl sm:text-5xl text-[#0A1628] hover:text-[#1A3A7A] transition-colors uppercase" style={{ animation: `fadeUp .4s ease ${i * 80}ms both` }}>{l.n}</a>
                    ))}
                    <button onClick={() => { sm(false); openEnquiryModal(); }} className="btn-royal mt-6 sm:mt-8 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 shadow-lg rounded-2xl border-none">Join Batch 2026</button>
                </div>
            )}

            <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${sc ? 'py-2 sm:py-4 bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(10,22,40,0.08)]' : 'py-3 sm:py-6 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 z-50">
                        <img src={logoImg} alt="NTW Logo" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover shadow-md bg-white p-0.5 border-2 border-[#1A3A7A]/10" />
                        <span className="font-anton text-2xl sm:text-3xl text-[#0A1628] tracking-wide mt-0.5 sm:mt-1">NEEV</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 lg:gap-10 bg-white/60 backdrop-blur-md px-5 lg:px-8 py-3 rounded-full border border-[#d8dfeb]/50 shadow-sm">
                        {links.map(l => (
                            isInternal(l) ?
                                <Link key={l.n} to={l.path} className={`font-space text-xs lg:text-sm font-bold transition-colors tracking-wide ${location.pathname === l.path ? 'text-[#1A3A7A]' : 'text-[#4A5568] hover:text-[#1A3A7A]'}`}>{l.n}</Link> :
                                <a key={l.n} href={getHref(l)} className="font-space text-xs lg:text-sm font-bold text-[#4A5568] hover:text-[#1A3A7A] transition-colors tracking-wide">{l.n}</a>
                        ))}
                    </div>

                    <button onClick={openEnquiryModal} className="hidden md:flex btn-royal text-xs lg:text-sm shadow-md px-6 py-3 rounded-full border-none">
                        Enroll Now <i className="fa-solid fa-arrow-right text-xs ml-2"></i>
                    </button>

                    <button className="md:hidden z-50 text-xl sm:text-2xl text-[#0A1628] relative" onClick={() => sm(!m)}>
                        <i className={`fa-solid ${m ? 'fa-xmark' : 'fa-bars'}`} />
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Nav;
