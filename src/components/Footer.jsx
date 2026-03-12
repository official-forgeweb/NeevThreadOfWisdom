import React from 'react';
import logoImg from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0A1628] pt-16 sm:pt-28 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-20 text-white">
                <div>
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                        <img src={logoImg} alt="NTW Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md bg-white p-0.5 border-2 border-[#1A3A7A]/10" />
                        <span className="font-anton font-bold text-2xl sm:text-3xl tracking-wide">
                            NEEV <span className="text-[#C9A84C] block text-[10px] sm:text-xs tracking-[0.3em] font-sans -mt-1">EST. 2010</span>
                        </span>
                    </div>
                    <p className="font-dm text-xs sm:text-sm text-[#8899AA] mb-6 sm:mb-8 leading-relaxed pr-0 sm:pr-8">
                        Driving Academic Excellence in Classes 6-12 through Structured Learning and Expert Faculty for JEE & NEET Preparation since 2010.
                    </p>
                    <div className="flex gap-3 sm:gap-4">
                        {['instagram', 'youtube', 'linkedin-in'].map(s => (
                            <a key={s} href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center text-[#6B7B8D] hover:bg-[#1A3A7A] hover:text-white transition-all shadow-inner">
                                <i className={`fa-brands fa-${s} text-base sm:text-lg`} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-space font-bold text-white text-xs sm:text-sm uppercase tracking-[0.15em] mb-6 sm:mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-8 after:h-0.5 after:bg-[#C9A84C]">Quick Links</h4>
                    <ul className="space-y-3 sm:space-y-4">
                        {[
                            { n: 'Home', p: '/' },
                            { n: 'Courses', p: '/courses' },
                            { n: 'Faculty', p: '/faculty' },
                            { n: 'Gallery', p: '/gallery' },
                            { n: 'About', p: '/#about' },
                            { n: 'Contact', p: '/#enquiry' }
                        ].map(l => (
                            <li key={l.n}>
                                {l.p.startsWith('/#') ? 
                                    <a href={l.p} className="font-space font-medium text-xs sm:text-sm text-[#8899AA] hover:text-[#C9A84C] transition-colors">{l.n}</a> :
                                    <Link to={l.p} className="font-space font-medium text-xs sm:text-sm text-[#8899AA] hover:text-[#C9A84C] transition-colors">{l.n}</Link>
                                }
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-space font-bold text-white text-xs sm:text-sm uppercase tracking-[0.15em] mb-6 sm:mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-8 after:h-0.5 after:bg-[#C9A84C]">Programs</h4>
                    <ul className="space-y-3 sm:space-y-4">
                        {[
                            { n: 'JEE Main + Advanced', p: '/courses/jee-main-advanced' },
                            { n: 'NEET UG Biology', p: '/courses/neet-ug' },
                            { n: 'Boson Batch (JEE+NEET)', p: '/courses/boson-batch' },
                            { n: 'Foundation (Classes 6-10)', p: '/courses/foundation-batch' }
                        ].map(l => (
                            <li key={l.n}>
                                <Link to={l.p} className="font-space font-medium text-xs sm:text-sm text-[#8899AA] hover:text-[#C9A84C] transition-colors">{l.n}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-space font-bold text-white text-xs sm:text-sm uppercase tracking-[0.15em] mb-6 sm:mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-8 after:h-0.5 after:bg-[#C9A84C]">Our Centers</h4>
                    <ul className="space-y-4 sm:space-y-5 font-space font-medium text-xs sm:text-sm text-[#8899AA]">
                        <li className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                <i className="fa-solid fa-location-dot text-[#C9A84C] text-sm" />
                            </div>
                            <span>NTW Tower, Knowledge Park III, Greater Noida</span>
                        </li>
                    </ul>
                    <ul className="space-y-4 sm:space-y-6 mt-4">
                        <li className="flex items-center gap-4 sm:gap-6 group">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A1628] transition-all">
                                <i className="fa-solid fa-phone" />
                            </div>
                            <span className="font-space font-medium text-sm sm:text-base text-[#8899AA] group-hover:text-white transition-colors">+91 72918 39346</span>
                        </li>
                        <li className="flex items-center gap-4 sm:gap-6 group">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A1628] transition-all">
                                <i className="fa-solid fa-envelope" />
                            </div>
                            <span className="font-space font-medium text-sm sm:text-base text-[#8899AA] group-hover:text-white transition-colors">Neevthreadofwisdom@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/5 pt-8 pb-4 text-center px-4">
                <p className="font-space font-medium text-[10px] sm:text-xs text-[#4A5568] tracking-widest uppercase">
                    © 2026 NEEV ACADEMY INDIA. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
