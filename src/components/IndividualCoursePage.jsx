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
            {/* Hero Section */}
            <div className="relative py-20 sm:py-32 overflow-hidden" style={{ backgroundColor: course.color }}>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -mr-64 -mt-64 blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full -ml-48 -mb-48 blur-[100px]"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-2/3 text-white">
                            <Link to="/courses" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 font-space text-sm font-bold uppercase tracking-widest transition-colors">
                                <i className="fa-solid fa-arrow-left"></i> Back to Courses
                            </Link>
                            <span className="inline-block border border-white/20 bg-white/10 px-6 py-2 rounded-full font-space text-sm font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
                                {course.subtitle}
                            </span>
                            <h1 className="font-anton text-3xl sm:text-7xl md:text-8xl leading-none mb-8">
                                {course.title}
                            </h1>
                            <p className="font-dm text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
                                {course.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-6 mt-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <i className="fa-solid fa-calendar-days text-[#C9A84C]"></i>
                                    </div>
                                    <div>
                                        <p className="font-space text-[10px] text-white/50 uppercase font-bold">Duration</p>
                                        <p className="font-dm font-bold">{course.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <i className="fa-solid fa-user-tie text-[#C9A84C]"></i>
                                    </div>
                                    <div>
                                        <p className="font-space text-[10px] text-white/50 uppercase font-bold">Faculty</p>
                                        <p className="font-dm font-bold">{course.faculty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 w-full">
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 relative group">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 sm:gap-24">
                    <div className="lg:col-span-2">
                        <h2 className="font-anton text-4xl sm:text-5xl text-[#0A1628] mb-8">Course Overview</h2>
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
                            <div className="bg-[#0A1628] text-white p-10 rounded-[2.5rem] shadow-xl">
                                <h3 className="font-anton text-3xl mb-6">Key Features</h3>
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
