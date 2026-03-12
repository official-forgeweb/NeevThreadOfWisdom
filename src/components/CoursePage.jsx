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
            <div className="bg-[#1A3A7A] text-white py-16 sm:py-24 text-center px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                
                <h1 className="font-anton text-5xl sm:text-7xl md:text-9xl tracking-tight relative z-10">OUR PROGRAMS</h1>
                <p className="font-dm text-base sm:text-xl mt-6 max-w-3xl mx-auto text-[#d8dfeb] leading-relaxed relative z-10">
                    At NEEV, we believe in a structured approach to education. Our courses are designed to bridge the gap between school learning and competitive success.
                </p>
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
                        <div className="space-y-6">
                            {[
                                { title: "Phase 1: Foundation", desc: "Understanding core concepts through interactive sessions and visual aids." },
                                { title: "Phase 2: Reinforcement", desc: "Applying concepts through daily practice problems and group discussions." },
                                { title: "Phase 3: Assessment", desc: "Testing knowledge under exam conditions with detailed performance analytics." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#F0F3F9] flex items-center justify-center font-anton text-2xl text-[#1A3A7A]">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-anton text-xl text-[#0A1628] mb-1">{step.title}</h4>
                                        <p className="font-dm text-[#6B7B8D]">{step.desc}</p>
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
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#C9A84C]/20 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>

                {/* Course Grid */}
                <h2 className="font-anton text-5xl sm:text-7xl text-center text-[#0A1628] mb-20">AVAILABLE COURSES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                    {courses.map((course, i) => (
                        <div key={i} className="group p-8 sm:p-12 rounded-[2.5rem] bg-[#F0F3F9] transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_rgba(10,22,40,0.1)] border border-transparent hover:border-[#1A3A7A]/10">
                            <h3 className="font-anton text-3xl sm:text-5xl text-[#0A1628] mb-2">{course.title}</h3>
                            <span className="font-space font-bold text-sm tracking-widest text-[#1A3A7A] uppercase mb-6 block">{course.subtitle}</span>
                            <p className="font-dm text-base sm:text-lg text-[#6B7B8D] mb-8 leading-relaxed">
                                {course.shortDescription}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {course.features.map((feature, j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#1A3A7A] text-xs shadow-sm">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <span className="font-space font-medium text-sm text-[#1E2A3B]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={`/courses/${course.id}`} className="btn-royal flex-1 py-5 rounded-2xl group-hover:bg-[#0A1628] items-center justify-center">
                                    View Details
                                </Link>
                                <button onClick={openEnquiryModal} className="bg-white text-[#1A3A7A] border-2 border-[#1A3A7A]/10 font-space font-bold py-5 px-8 rounded-2xl hover:bg-gray-50 transition-colors">
                                    Enroll Now
                                </button>
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
