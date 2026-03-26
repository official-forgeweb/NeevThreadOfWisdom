import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const Enquiry = () => {
    const [r, v] = useReveal(0.1);
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const form = e.target;
        const data = new FormData(form);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${apiUrl}/api/enquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: data.get('name'),
                    phone: data.get('phone'),
                    email: data.get('email'),
                    exam: data.get('exam'),
                    message: data.get('message'),
                    _source: 'enquiry-form',
                })
            });
            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section id="enquiry" className="py-20 sm:py-32 bg-[#0A1628] text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#1A3A7A] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#C9A84C] rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-center">
                    
                    {/* Left Side: Info */}
                    <div ref={r} className={`${v ? 'reveal-v' : 'reveal-h'}`}>
                        <span className="inline-block border border-white/20 bg-white/5 px-4 py-2 rounded-full font-space text-xs sm:text-sm font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-6">Start Your Journey</span>
                        <h2 className="font-anton text-3xl sm:text-7xl md:text-8xl leading-none mb-8">SECURE YOUR<br /><span className="text-[#C9A84C]">FUTURE TODAY.</span></h2>
                        <p className="font-dm text-lg sm:text-xl text-[#8899AA] mb-12 max-w-lg leading-relaxed">
                            Have questions about our batches, scholarships, or teaching methodology? Our expert counselors are here to help you make the right choice.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: "fa-phone", title: "Call Us Anytime", text: "+91 72918 39346", sub: "Mon-Sat, 9AM-8PM" },
                                { icon: "fa-envelope", title: "Email Support", text: "Neevthreadofwisdom@gmail.com", sub: "Response within 24 hours" },
                                { icon: "fa-location-dot", title: "Visit Campus", text: "Delhi, India", sub: "Schedule a visit" }
                            ].map((info, i) => (
                                <div key={i} className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] transition-all duration-300">
                                        <i className={`fa-solid ${info.icon} text-xl text-[#C9A84C] group-hover:text-[#0A1628] transition-colors`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-anton text-lg tracking-wide">{info.title}</h4>
                                        <p className="font-space font-bold text-white text-xl">{info.text}</p>
                                        <p className="font-dm text-sm text-[#8899AA]">{info.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className={`${v ? 'reveal-v' : 'reveal-h'} transition-all`} style={{ transitionDelay: '200ms' }}>
                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative">
                            <div className="absolute top-0 right-12 w-20 h-20 bg-[#F0F3F9] rounded-b-3xl flex items-center justify-center text-[#1A3A7A]">
                                <i className="fa-solid fa-paper-plane text-2xl"></i>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="font-anton text-3xl sm:text-4xl text-[#0A1628] mb-8">ENQUIRY FORM</h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-space text-xs font-bold text-[#1A3A7A] uppercase tracking-widest ml-1">Student Name</label>
                                        <input name="name" required type="text" placeholder="John Doe" className="w-full bg-[#F0F3F9] border-none rounded-2xl py-4 px-6 text-[#0A1628] font-space text-sm font-medium focus:ring-4 focus:ring-[#1A3A7A]/10 transition-all outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-space text-xs font-bold text-[#1A3A7A] uppercase tracking-widest ml-1">Mobile Number</label>
                                        <input name="phone" required type="tel" placeholder="+91 00000 00000" className="w-full bg-[#F0F3F9] border-none rounded-2xl py-4 px-6 text-[#0A1628] font-space text-sm font-medium focus:ring-4 focus:ring-[#1A3A7A]/10 transition-all outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="font-space text-xs font-bold text-[#1A3A7A] uppercase tracking-widest ml-1">Target Examination</label>
                                    <select name="exam" required defaultValue="" className="w-full bg-[#F0F3F9] border-none rounded-2xl py-4 px-6 text-[#0A1628] font-space text-sm font-medium focus:ring-4 focus:ring-[#1A3A7A]/10 transition-all outline-none appearance-none">
                                        <option value="" disabled>Select Exam</option>
                                        <option>JEE Main + Advanced</option>
                                        <option>NEET UG</option>
                                        <option>Foundation (Class 6-10)</option>
                                        <option>Boson Batch</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="font-space text-xs font-bold text-[#1A3A7A] uppercase tracking-widest ml-1">Your Message</label>
                                    <textarea name="message" rows="4" placeholder="How can we help you?" className="w-full bg-[#F0F3F9] border-none rounded-2xl py-4 px-6 text-[#0A1628] font-space text-sm font-medium focus:ring-4 focus:ring-[#1A3A7A]/10 transition-all outline-none resize-none" />
                                </div>

                                <button disabled={status !== 'idle' && status !== 'error'} type="submit" className="w-full bg-[#1A3A7A] hover:bg-[#0A1628] text-white font-space font-bold text-lg py-5 rounded-2xl transition-all shadow-[0_12px_30px_rgba(26,58,122,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80">
                                    {status === 'idle' && <>Send Message <i className="fa-solid fa-arrow-right"></i></>}
                                    {status === 'loading' && <i className="fa-solid fa-circle-notch fa-spin text-2xl"></i>}
                                    {status === 'success' && <><i className="fa-solid fa-check-circle text-2xl"></i> Sent Successfully!</>}
                                    {status === 'error' && <><i className="fa-solid fa-exclamation-triangle text-2xl"></i> Error, Try Again</>}
                                </button>
                                
                                <p className="text-center font-dm text-xs text-[#6B7B8D]">
                                    By submitting, you agree to our <a href="#" className="underline hover:text-[#1A3A7A]">Privacy Policy</a> and <a href="#" className="underline hover:text-[#1A3A7A]">Terms of Service</a>.
                                </p>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Enquiry;
