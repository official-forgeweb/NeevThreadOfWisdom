import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';

import { useModal } from '../context/ModalContext';

import SEO from './SEO';

const IndividualCoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = courses.find(c => c.id === id);
    const { openEnquiryModal } = useModal();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!course) {
            navigate('/courses');
        }
    }, [course, navigate]);

    if (!course) return null;

    return (
        <div className="pt-20 sm:pt-24 min-h-screen bg-white">
            <SEO 
                title={course.title} 
                description={course.shortDescription}
                url={`/courses/${course.id}`}
            />
            {/* Cinematic Hero Section */}
            <div className="relative py-24 sm:py-32 xl:py-40 overflow-hidden" style={{ backgroundColor: '#0A1628' }}>
                {/* Dynamic Background generated from Course Color */}
                <div className="absolute inset-0 opacity-40 mix-blend-color z-0 pointer-events-none" style={{ backgroundColor: course.color }}></div>
                <div className="absolute top-[-30%] right-[-10%] w-[80%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent transform rotate-[-15deg] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#C9A84C] rounded-full filter blur-[200px] opacity-15 pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                    
                    <div className="lg:w-1/2 w-full order-2 lg:order-1 perspective-1000">
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10 group transform transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                            {/* Floating Floating Badge over image */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-90 group-hover:opacity-100 shadow-2xl">
                                <div>
                                    <p className="font-space text-[10px] text-white/70 uppercase tracking-widest font-bold mb-1">Target Focus</p>
                                    <p className="font-anton text-2xl text-white tracking-wide">{course.subtitle}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                                    <i className="fa-solid fa-bullseye text-[#0A1628] text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 text-white order-1 lg:order-2">
                        <Link to="/courses" className="inline-flex items-center gap-3 text-white/50 hover:text-white mb-8 font-space text-xs font-bold uppercase tracking-[0.2em] transition-all hover:-translate-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <i className="fa-solid fa-arrow-left"></i> All Programs
                        </Link>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-px bg-[#C9A84C]"></span>
                            <span className="font-space text-sm font-bold text-[#C9A84C] uppercase tracking-[0.3em] drop-shadow-sm">
                                Premium Batch
                            </span>
                        </div>
                        
                        <h1 className="font-anton text-[10vw] sm:text-7xl xl:text-[5.5rem] leading-[0.95] mb-8 drop-shadow-lg break-words" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                            {course.title}
                        </h1>
                        
                        <p className="font-dm text-lg sm:text-xl text-[#A0AAB5] leading-relaxed max-w-lg mb-12 font-light">
                            {course.shortDescription}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                                <i className="fa-solid fa-clock text-[#C9A84C] text-2xl mb-4 block"></i>
                                <p className="font-space text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Duration</p>
                                <p className="font-anton text-xl tracking-wide">{course.duration}</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                                <i className="fa-solid fa-chalkboard-user text-[#C9A84C] text-2xl mb-4 block"></i>
                                <p className="font-space text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Lead Faculty</p>
                                <p className="font-anton text-xl tracking-wide">{course.faculty}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Course Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 sm:gap-24">
                    <div className="lg:col-span-2">
                        <h2 className="font-anton text-3xl sm:text-5xl text-[#0A1628] mb-8">Course Overview</h2>
                        <p className="font-dm text-lg text-[#6B7B8D] mb-12 leading-relaxed">
                            {course.fullDescription}
                        </p>

                        <h2 className="font-anton text-4xl sm:text-5xl text-[#0A1628] mb-8 mt-16">Curriculum</h2>
                        <div className="space-y-6">
                            {course.curriculum.map((item, i) => (
                                <div key={i} className="bg-[#F0F3F9] rounded-3xl p-8 border border-transparent hover:border-[#1A3A7A]/10 transition-all duration-300">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-anton text-2xl text-[#1A3A7A]">{item.module}</h3>
                                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1A3A7A] shadow-sm font-bold text-xs">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {item.topics.map((topic, j) => (
                                            <li key={j} className="flex items-center gap-3 text-[#546170] font-dm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-[#0A1628] text-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(10,22,40,0.25)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C] rounded-full filter blur-[80px] opacity-30 pointer-events-none"></div>
                                
                                {/* Pronounced Price Block */}
                                <div className="mb-8 pb-8 border-b border-white/10 relative z-10">
                                    <span className="font-space font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C9A84C] mb-3 block">Program Investment</span>
                                    <div className="flex items-baseline gap-2 mb-2 break-all">
                                        <span className="font-anton text-4xl sm:text-6xl text-white tracking-tight">{course.price.includes('/') ? course.price.split(' / ')[0] : course.price}</span>
                                    </div>
                                    {course.price.includes('/') && (
                                        <span className="font-dm text-white/60 font-medium tracking-wide">per {course.price.split(' / ')[1]}</span>
                                    )}
                                </div>

                                <h3 className="font-anton text-2xl mb-6 relative z-10">Key Features</h3>
                                <ul className="space-y-6">
                                    {course.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-[#1A3A7A] flex items-center justify-center shrink-0 mt-1">
                                                <i className="fa-solid fa-check text-[10px] text-[#C9A84C]"></i>
                                            </div>
                                            <span className="font-dm text-white/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={openEnquiryModal} className="btn-royal w-full mt-10 py-5 rounded-2xl bg-[#C9A84C] text-[#0A1628] hover:bg-white text-center flex items-center justify-center">
                                    Enroll in this Batch
                                </button>
                                <p className="text-center mt-6 font-space text-xs text-white/40 font-bold uppercase tracking-widest">
                                    Limited seats available for 2026
                                </p>
                            </div>

                            <div className="bg-[#F0F3F9] p-8 rounded-[2.5rem] border border-[#d8dfeb]">
                                <h4 className="font-anton text-xl text-[#0A1628] mb-4 text-center">Need Counseling?</h4>
                                <p className="font-dm text-sm text-[#6B7B8D] text-center mb-6">
                                    Speak with our experts to find the right path for your academic goals.
                                </p>
                                <div className="space-y-3">
                                    <a href="tel:+917291839346" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white border border-[#d8dfeb] font-space font-bold text-[#1A3A7A] hover:bg-gray-50 transition-colors">
                                        <i className="fa-solid fa-phone"></i> +91 72918 39346
                                    </a>
                                    <a href="https://wa.me/917291839346" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] text-white font-space font-bold hover:opacity-90 transition-opacity">
                                        <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Courses */}
            <div className="bg-[#F0F3F9] py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-16">
                    <h2 className="font-anton text-4xl sm:text-6xl text-[#0A1628]">OTHER PROGRAMS</h2>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.filter(c => c.id !== id).slice(0, 3).map((other, i) => (
                        <Link to={`/courses/${other.id}`} key={i} className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-[#1A3A7A]/10">
                            <h3 className="font-anton text-2xl text-[#0A1628] mb-2">{other.title}</h3>
                            <span className="font-space text-[10px] font-bold text-[#1A3A7A] uppercase tracking-widest mb-4 block">{other.subtitle}</span>
                            <p className="font-dm text-sm text-[#6B7B8D] mb-6 line-clamp-2">{other.shortDescription}</p>
                            <span className="inline-flex items-center gap-2 font-space text-sm font-bold text-[#1A3A7A] group-hover:gap-4 transition-all">
                                View Details <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndividualCoursePage;
