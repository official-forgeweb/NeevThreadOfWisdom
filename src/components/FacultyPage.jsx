import React, { useEffect } from 'react';
import Teachers from './Teachers';
import { useReveal } from '../hooks/useReveal';
import SEO from './SEO';

const FacultyPage = () => {
    const [r, v] = useReveal(0.1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 sm:pt-24 min-h-screen bg-white">
            <SEO 
                title="Expert Faculty" 
                description="Meet the elite faculty panel at NEEV Academy. Our experts specialize in JEE and NEET preparation with decades of combined experience."
                url="/faculty"
            />
            {/* Premium Header */}
            <div className="bg-[#0A1628] text-white py-20 sm:py-32 relative overflow-hidden">
                {/* Decorative background patterns */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A3A7A] rounded-full -mr-64 -mt-64 blur-[120px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C] rounded-full -ml-48 -mb-48 blur-[100px] opacity-10"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <span className="inline-block border border-white/20 bg-white/5 px-6 py-2 rounded-full font-space text-sm font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">World-Class Educators</span>
                    <h1 className="font-anton text-5xl sm:text-7xl md:text-9xl leading-none">MEET THE LEADERS</h1>
                    <p className="font-dm text-lg sm:text-2xl mt-8 max-w-3xl mx-auto text-[#8899AA] leading-relaxed">
                        Our faculty members aren't just teachers; they are mentors, innovators, and industry experts dedicated to shaping the next generation of excellence.
                    </p>
                </div>
            </div>

            {/* Statistics/Highlights Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-16 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {[
                        { label: "Combined Experience", val: "100+ Yrs" },
                        { label: "Expert Faculties", val: "15+" },
                        { label: "IIT/NEET Alumni", val: "70%" },
                        { label: "Success Rate", val: "95%" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-center border border-gray-100">
                            <h3 className="font-anton text-2xl sm:text-4xl text-[#1A3A7A] mb-1">{stat.val}</h3>
                            <p className="font-space text-[10px] sm:text-xs font-bold text-[#6B7B8D] uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-20 sm:py-32">
                <div className="max-w-3xl mx-auto px-4 text-center mb-16 sm:mb-24">
                    <h2 className="font-anton text-4xl sm:text-6xl text-[#0A1628] mb-6">GUIDING YOUR PATH</h2>
                    <p className="font-dm text-lg text-[#6B7B8D] leading-relaxed">
                        At NEEV, we handpick our faculty based on their academic prowess and their ability to connect with students. Every lecture is crafted to inspire curiosity and build confidence.
                    </p>
                </div>
                
                {/* Teachers Component for the Grid */}
                <Teachers showBio={true} />
            </div>

            {/* Philosophy Section */}
            <div className="bg-[#F0F3F9] py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="h-48 sm:h-64 rounded-3xl bg-[#1A3A7A] flex items-center justify-center p-8 text-white">
                                        <i className="fa-solid fa-graduation-cap text-5xl"></i>
                                    </div>
                                    <div className="h-64 sm:h-80 rounded-3xl bg-white shadow-sm border border-gray-100"></div>
                                </div>
                                <div className="space-y-4 mt-8 sm:mt-12">
                                    <div className="h-64 sm:h-80 rounded-3xl bg-[#C9A84C] flex items-center justify-center p-8 text-white">
                                        <i className="fa-solid fa-lightbulb text-5xl"></i>
                                    </div>
                                    <div className="h-48 sm:h-64 rounded-3xl bg-white shadow-sm border border-gray-100"></div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="font-space text-[#1A3A7A] font-bold tracking-widest uppercase text-sm mb-4 block">Our Culture</span>
                            <h2 className="font-anton text-4xl sm:text-6xl text-[#0A1628] leading-tight mb-8">WHERE TEACHING<br />MEETS PASSION</h2>
                            <p className="font-dm text-lg text-[#6B7B8D] mb-10 leading-relaxed">
                                Our educators don't just follow a syllabus; they follow a student's journey. We maintain a small student-to-teacher ratio to ensure that no question goes unanswered and no student is left behind.
                            </p>
                            <ul className="space-y-6">
                                {[
                                    { icon: "fa-comments", title: "Direct Interaction", desc: "No middle-man. Students have direct access to faculty for doubts." },
                                    { icon: "fa-target-shot", title: "Result Oriented", desc: "Focused strategies tailored to each student's strong and weak areas." },
                                    { icon: "fa-heart", title: "Holistic Care", desc: "Emotional and mental support through regular motivational sessions." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-6 items-start">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#1A3A7A]">
                                            <i className={`fa-solid ${item.icon} text-xl`}></i>
                                        </div>
                                        <div>
                                            <h4 className="font-anton text-xl text-[#0A1628] mb-1">{item.title}</h4>
                                            <p className="font-dm text-[#6B7B8D]">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyPage;
