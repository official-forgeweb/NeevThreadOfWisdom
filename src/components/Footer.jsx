import React from 'react';
import logoImg from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#060D18] text-white pt-20 pb-10 border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                
                {/* Top Section: Brand + Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 border-b border-white/10 pb-16">
                    <div className="max-w-lg">
                        <Link to="/" className="flex items-center gap-4 mb-6 group">
                            <img src={logoImg} alt="NEEV Logo" className="w-14 h-14 rounded-xl object-contain bg-white p-1" />
                            <div>
                                <h3 className="font-anton text-4xl tracking-wide text-white leading-none group-hover:text-[#C9A84C] transition-colors">NEEV</h3>
                                <span className="font-space text-[10px] tracking-[0.3em] font-bold text-[#C9A84C] uppercase block mt-1">EST. 2010</span>
                            </div>
                        </Link>
                        <p className="font-dm text-[#8899AA] text-sm sm:text-base leading-relaxed mb-8">
                            A premier institute dedicated to academic excellence. Providing structured learning and expert guidance for JEE, NEET, and foundation courses since 2010.
                        </p>
                        <div className="flex gap-3">
                            {['instagram', 'youtube', 'linkedin-in'].map(s => (
                                <a key={s} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8899AA] hover:bg-[#C9A84C] hover:text-[#060D18] hover:-translate-y-1 transition-all duration-300">
                                    <i className={`fa-brands fa-${s}`} />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                        <h4 className="font-space font-bold text-sm sm:text-base tracking-widest uppercase mb-2 text-white">Never Miss an Update</h4>
                        <p className="font-dm text-sm text-[#8899AA] mb-6">Subscribe to our newsletter for study materials and announcements.</p>
                        <form className="flex flex-col sm:flex-row w-full gap-3 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="w-full sm:w-72 bg-white/10 border border-white/20 sm:rounded-l-xl sm:rounded-r-none rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-[#6B7B8D] focus:outline-none focus:border-[#C9A84C] transition-colors" 
                            />
                            <button className="bg-[#C9A84C] text-[#060D18] font-space font-bold tracking-wider uppercase text-xs px-8 py-3.5 sm:rounded-r-xl sm:rounded-l-none rounded-xl hover:bg-white transition-colors shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Grid Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    <div>
                        <h4 className="font-space font-bold text-xs tracking-[0.2em] text-white mb-6 uppercase">Quick Links</h4>
                        <ul className="space-y-4">
                            {[ {n: 'Home', p:'/'}, {n: 'About Us', p:'/#about'}, {n: 'Gallery', p:'/gallery'}, {n: 'Contact', p:'/#enquiry'} ].map(l => (
                                <li key={l.n}>
                                    {l.p.startsWith('/#') ? 
                                        <a href={l.p} className="font-dm text-sm text-[#8899AA] hover:text-white transition-colors">{l.n}</a>
                                        : <Link to={l.p} className="font-dm text-sm text-[#8899AA] hover:text-white transition-colors">{l.n}</Link>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-space font-bold text-xs tracking-[0.2em] text-white mb-6 uppercase">Programs</h4>
                        <ul className="space-y-4">
                            {[{n:'JEE Main + Advanced', p:'/courses/jee-main-advanced'}, {n:'NEET UG', p:'/courses/neet-ug'}, {n:'Boson Batch (JEE+NEET)', p:'/courses/boson-batch'}, {n:'Foundation (6th-10th)', p:'/courses/foundation-batch'}].map(l => (
                                <li key={l.n}>
                                    <Link to={l.p} className="font-dm text-sm text-[#8899AA] hover:text-white transition-colors">{l.n}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-2 lg:pl-12">
                        <h4 className="font-space font-bold text-xs tracking-[0.2em] text-white mb-6 uppercase">Contact Information</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-5">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-location-dot text-[#C9A84C] text-sm"></i>
                                </div>
                                <span className="font-dm text-sm text-[#8899AA] leading-relaxed pt-2">NTW Tower, Knowledge Park III,<br/>Greater Noida, UP 201310</span>
                            </li>
                            <li className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-phone text-[#C9A84C] text-sm"></i>
                                </div>
                                <a href="tel:+917291839346" className="font-space font-bold tracking-widest text-sm text-white hover:text-[#C9A84C] transition-colors">+91 72918 39346</a>
                            </li>
                            <li className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-envelope text-[#C9A84C] text-sm"></i>
                                </div>
                                <a href="mailto:Neevthreadofwisdom@gmail.com" className="font-dm text-sm text-[#8899AA] hover:text-white transition-colors">Neevthreadofwisdom@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
                    <p className="font-space font-medium text-[10px] sm:text-xs text-[#6B7B8D] tracking-widest uppercase text-center sm:text-left">
                        © {new Date().getFullYear()} NEEV Academy. All rights reserved.
                    </p>
                    <div className="flex gap-8 font-space text-[10px] sm:text-xs text-[#6B7B8D] uppercase tracking-widest font-bold">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
