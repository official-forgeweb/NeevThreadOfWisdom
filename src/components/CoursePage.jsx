import React, { useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { useModal } from '../context/ModalContext';
import SEO from './SEO';

const CoursePage = () => {
    const [r, v] = useReveal(0.1);
    const { openEnquiryModal } = useModal();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 sm:pt-24 min-h-screen bg-white">
            <SEO 
                title="Our Programs" 
                description="Explore NEEV Academy's comprehensive coaching programs for JEE, NEET, and Foundation classes. Specialized learning structures for academic success."
                url="/courses"
            />
            {/* Header Section */}
            <div className="relative bg-[#0A1628] pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 shadow-[0_20px_50px_rgba(10,22,40,0.5)] overflow-hidden z-10">
                {/* Immersive Background Effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A3A7A]/40 via-[#0A1628]/0 to-transparent transform rotate-12 pointer-events-none"></div>
                <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#C9A84C] rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
                
                {/* Massive Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-5">
                    <span className="font-anton text-[25vw] leading-none whitespace-nowrap text-white">PROGRAMS</span>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block border border-white/20 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full font-space text-xs font-bold text-[#C9A84C] uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(201,168,76,0.15)]">Explore Excellence</span>
                    <h1 className="font-anton text-[12vw] sm:text-8xl md:text-[7rem] tracking-tight text-white leading-[0.9] drop-shadow-xl break-words whitespace-pre-wrap">
                        OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8899AA]">PROGRAMS</span>
                    </h1>
                    <p className="font-dm text-lg sm:text-2xl mt-8 text-[#8899AA] leading-relaxed max-w-2xl mx-auto font-light">
                        At <strong className="text-white font-medium">NEEV</strong>, we believe in a structured approach to education. Our specialized courses bridge the gap between school learning and competitive ranking success.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent transform translate-y-px"></div>
            </div>

            {/* Structure Explanation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center mb-32">
                    <div ref={r} className={`${v ? 'reveal-v' : 'reveal-h'}`}>
                        <span className="font-space text-[#1A3A7A] font-bold tracking-widest uppercase text-sm mb-4 block">Our Methodology</span>
                        <h2 className="font-anton text-4xl sm:text-6xl text-[#0A1628] leading-none mb-8">HOW WE TEACH AT NEEV</h2>
                        <p className="font-dm text-lg text-[#6B7B8D] mb-8 leading-relaxed">
                            Our teaching philosophy is built on three core pillars: Conceptual Clarity, Rigorous Practice, and Regular Assessment. We don't just teach for exams; we teach for life.
                        </p>
                        <div className="space-y-8 mt-12">
                            {[
                                { title: "Phase 1: Foundation", desc: "Understanding core concepts deeply through interactive sessions and vivid visual aids.", icon: "brain" },
                                { title: "Phase 2: Reinforcement", desc: "Applying concepts rigorously through daily practice modules and strategic discussions.", icon: "dumbbell" },
                                { title: "Phase 3: Assessment", desc: "Testing knowledge under strict exam conditions with predictive performance analytics.", icon: "chart-line" }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(26,58,122,0.06)] flex items-center justify-center text-[#1A3A7A] group-hover:bg-[#1A3A7A] group-hover:text-white transition-all duration-500 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[#C9A84C] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl z-0"></div>
                                        <i className={`fa-solid fa-${step.icon} text-xl relative z-10`}></i>
                                        <span className="absolute top-1 right-1.5 font-anton text-[10px] opacity-20 relative z-10">{i + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-anton text-2xl text-[#0A1628] mb-2">{step.title}</h4>
                                        <p className="font-dm text-[#6B7B8D] leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-[#F0F3F9] overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A3A7A]/20 to-transparent"></div>
                            {/* Decorative elements instead of placeholder images */}
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="grid grid-cols-2 gap-4 w-full h-full">
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                        <i className="fa-solid fa-brain text-4xl text-[#1A3A7A] mb-4"></i>
                                        <h5 className="font-anton text-lg text-[#0A1628]">Logic</h5>
                                    </div>
                                    <div className="bg-[#1A3A7A] rounded-2xl p-6 shadow-sm text-white flex flex-col justify-center items-center text-center">
                                        <i className="fa-solid fa-flask text-4xl mb-4"></i>
                                        <h5 className="font-anton text-lg">Science</h5>
                                    </div>
                                    <div className="bg-[#0A1628] rounded-2xl p-6 shadow-sm text-white flex flex-col justify-center items-center text-center">
                                        <i className="fa-solid fa-calculator text-4xl mb-4"></i>
                                        <h5 className="font-anton text-lg">Maths</h5>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                        <i className="fa-solid fa-book text-4xl text-[#1A3A7A] mb-4"></i>
                                        <h5 className="font-anton text-lg text-[#0A1628]">Concepts</h5>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#C9A84C]/20 rounded-full blur-3xl -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <h2 className="font-anton text-4xl sm:text-7xl text-center text-[#0A1628] mb-20 break-words">AVAILABLE COURSES</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
                    {courses.map((course, i) => (
                        <div key={i} className="group relative bg-white rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_60px_rgba(10,22,40,0.08)] transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                            
                            {/* Image Section */}
                            <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden bg-gray-100">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/20 to-transparent flex flex-col justify-end p-6">
                                    <span className="font-space font-bold text-xs tracking-widest text-[#C9A84C] uppercase drop-shadow-md">{course.duration}</span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 sm:p-10 flex flex-col w-full md:w-3/5">
                                <div className="mb-4">
                                    <h3 className="font-anton text-3xl sm:text-4xl text-[#0A1628] mb-1">{course.title}</h3>
                                    <span className="font-space font-bold text-[10px] sm:text-xs tracking-widest text-[#8899AA] uppercase">{course.subtitle}</span>
                                </div>

                                <p className="font-dm text-sm sm:text-base text-[#6B7B8D] mb-6 flex-grow line-clamp-3 lg:line-clamp-4">
                                    {course.shortDescription}
                                </p>
                                
                                {/* Price Highlight */}
                                <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-8 border border-[#E2E8F0] flex justify-between items-center group-hover:bg-[#1A3A7A]/5 transition-colors duration-300">
                                    <div className="flex flex-col">
                                        <span className="font-space font-bold text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] mb-1">Fee Structure</span>
                                        <span className="font-anton text-2xl sm:text-3xl text-[#1A3A7A] leading-none">{course.price}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <Link to={`/courses/${course.id}`} className="btn-royal py-4 px-6 rounded-xl flex-1 text-center font-bold text-sm shadow-md hover:shadow-lg transition-all">
                                        View Details
                                    </Link>
                                    <button onClick={openEnquiryModal} className="bg-white text-[#0A1628] font-space font-bold py-4 px-6 rounded-xl hover:bg-[#F0F3F9] transition-colors border-2 border-gray-100 text-sm">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final CTA */}
            <div className="bg-[#F0F3F9] py-20 sm:py-32">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="font-anton text-4xl sm:text-7xl text-[#0A1628] mb-8">STILL HAVE QUESTIONS?</h2>
                    <p className="font-dm text-lg sm:text-xl text-[#6B7B8D] mb-12 max-w-2xl mx-auto">
                        Choosing the right course is the first step towards success. Contact our experts for a personalized counseling session.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <button className="btn-royal px-12 py-5 rounded-2xl text-lg">Contact Us</button>
                        <button className="bg-white text-[#1A3A7A] border border-[#d8dfeb] font-space font-bold px-12 py-5 rounded-2xl text-lg hover:bg-gray-50 transition-colors">Download Syllabus</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
