import React, { useState } from 'react';
import SEO from './SEO';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        regNo: '',
        studentName: '',
        fathersName: '',
        fathersContact: '',
        mothersName: '',
        mothersContact: '',
        dob: '',
        gender: '',
        address: '',
        applicantPhone: '',
        schoolName: '',
        studentClass: '',
        dateOfJoining: '',
        feePackage: '',
        medium: '',
        board: '',
        stream11_12: '',
        stream9_10: '',
        heardAboutUs: '',
        referenceBy: ''
    });

    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChoice = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${apiUrl}/api/registration`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json' 
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Submission Error:', err);
            setStatus('error');
        }
    };

    const ChoiceButton = ({ name, value, label, current }) => (
        <button
            type="button"
            onClick={() => handleChoice(name, value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                current === value 
                ? 'bg-[#1A3A7A] border-[#1A3A7A] text-white shadow-md scale-[1.02]' 
                : 'bg-white border-slate-200 text-[#4A5568] hover:border-[#1A3A7A]/30'
            }`}
        >
            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${current === value ? 'bg-white border-white' : 'bg-slate-50 border-slate-300'}`}>
                {current === value && <i className="fa-solid fa-check text-[10px] text-[#1A3A7A]"></i>}
            </div>
            <span className="font-bold text-sm uppercase tracking-wide">{label}</span>
        </button>
    );

    if (status === 'success') {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center px-4">
                <div className="max-w-xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-10 text-center border border-slate-100">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
                        <i className="fa-solid fa-check text-5xl text-green-500"></i>
                    </div>
                    <h2 className="text-3xl font-anton text-[#0A1628] mb-4 uppercase tracking-tight">Registration Successful!</h2>
                    <p className="text-[#4A5568] mb-8 font-space text-lg">Thank you for registering at NEEV - Thread of Wisdom. <br/>Our admissions team will contact you shortly.</p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="btn-royal px-10 py-4 rounded-2xl shadow-xl border-none w-full sm:w-auto text-lg transition-transform hover:scale-105"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#F0F3F9]">
            <SEO title="Student Registration" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    
                    {/* Left Sticky Sidebar */}
                    <div className="w-full lg:w-1/3 lg:sticky lg:top-32 bg-[#0A1628] rounded-[2.5rem] p-8 sm:p-10 text-center text-white relative overflow-hidden shadow-2xl">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1A3A7A] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#C9A84C] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-20"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="flex flex-col items-center mb-10">
                                <h1 className="text-5xl sm:text-7xl font-anton tracking-[0.1em] mb-1">NEEV</h1>
                                <p className="text-[10px] sm:text-xs font-space uppercase tracking-[0.4em] text-[#C9A84C] font-bold">Thread Of Wisdom</p>
                            </div>
                            
                            <div className="inline-flex flex-col items-center gap-3 bg-white/5 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/10 shadow-2xl w-full mb-10">
                                <span className="w-3 h-3 bg-[#C9A84C] rounded-full animate-pulse"></span>
                                <h2 className="text-xl font-anton tracking-widest uppercase text-center">ADMISSION<br/>APPLICATION</h2>
                            </div>

                            <div className="space-y-3 opacity-80 text-left w-full bg-black/20 p-6 rounded-2xl border border-white/5">
                                <p className="text-xs font-space text-[#8899AA] uppercase tracking-widest mb-2 font-bold">Helpdesk</p>
                                <p className="text-sm font-space text-white"><i className="fa-solid fa-phone text-[#C9A84C] mr-2"></i> 9811309171</p>
                                <p className="text-sm font-space text-white"><i className="fa-solid fa-phone text-[#C9A84C] mr-2"></i> 7291839346</p>
                                <hr className="border-white/10 my-3" />
                                <p className="text-[10px] font-mono tracking-tighter text-slate-400">REG: PSA/REG/FBD/LI-FBD-XIVI0297617</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Container */}
                    <div className="w-full lg:w-2/3 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(10,22,40,0.05)] border border-slate-200/50 p-6 sm:p-12 mb-8">
                        <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Section 1: Basic Info */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1A3A7A] font-bold">01</div>
                                <h3 className="text-xl font-anton text-[#0A1628] uppercase tracking-wider">Student Profile</h3>
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Full Name of Student</label>
                                    <input required type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 focus:border-[#1A3A7A] transition-all outline-none font-medium" placeholder="Ex: Rahul Sharma" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Date of Birth</label>
                                    <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 focus:border-[#1A3A7A] transition-all outline-none" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">School Name</label>
                                    <input required type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 focus:border-[#1A3A7A] transition-all outline-none" placeholder="University / School Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Gender</label>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => handleChoice('gender', 'Male')} className={`flex-1 py-4 rounded-2xl border transition-all font-bold text-xs uppercase ${formData.gender === 'Male' ? 'bg-[#1A3A7A] border-[#1A3A7A] text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>Male</button>
                                        <button type="button" onClick={() => handleChoice('gender', 'Female')} className={`flex-1 py-4 rounded-2xl border transition-all font-bold text-xs uppercase ${formData.gender === 'Female' ? 'bg-[#1A3A7A] border-[#1A3A7A] text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>Female</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Family & Contact */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1A3A7A] font-bold">02</div>
                                <h3 className="text-xl font-anton text-[#0A1628] uppercase tracking-wider">Family Records</h3>
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Father's Name</label>
                                        <div className="relative">
                                            <i className="fa-solid fa-user-tie absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                            <input required type="text" name="fathersName" value={formData.fathersName} onChange={handleChange} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Father's Contact</label>
                                        <div className="relative">
                                            <i className="fa-solid fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                            <input required type="tel" name="fathersContact" value={formData.fathersContact} onChange={handleChange} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Mother's Name</label>
                                        <div className="relative">
                                            <i className="fa-solid fa-user-nurse absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                            <input required type="text" name="mothersName" value={formData.mothersName} onChange={handleChange} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Mother's Contact</label>
                                        <div className="relative">
                                            <i className="fa-solid fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                            <input type="tel" name="mothersContact" value={formData.mothersContact} onChange={handleChange} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-2 pt-4">
                                    <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Current Address</label>
                                    <div className="relative">
                                        <i className="fa-solid fa-location-dot absolute left-5 top-6 text-slate-400"></i>
                                        <textarea required rows={3} name="address" value={formData.address} onChange={handleChange} className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1A3A7A]/5 outline-none transition-all resize-none"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Course Choices */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1A3A7A] font-bold">03</div>
                                <h3 className="text-xl font-anton text-[#0A1628] uppercase tracking-wider">Admission Preferences</h3>
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Academic Info */}
                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Class</label>
                                            <input required type="text" name="studentClass" value={formData.studentClass} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-[#1A3A7A]" placeholder="e.g. 11th" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Joining Date</label>
                                            <input required type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Fee Package</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Monthly', 'Quarterly', 'Yearly'].map(pkg => (
                                                <ChoiceButton key={pkg} name="feePackage" label={pkg} value={pkg} current={formData.feePackage} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Medium</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Hindi', 'English'].map(val => (
                                                <ChoiceButton key={val} name="medium" label={val} value={val} current={formData.medium} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest pl-1">Registration Board</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['HBSE', 'CBSE'].map(val => (
                                                <ChoiceButton key={val} name="board" label={val} value={val} current={formData.board} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Stream Selection */}
                                <div className="space-y-8 bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                                    <div className="space-y-4">
                                        <div className="pb-2">
                                            <label className="text-xs font-bold text-[#1A3A7A] uppercase tracking-widest pl-1">Stream Selection</label>
                                            <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-tight">For Classes 11th & 12th</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {['Medical', 'Non-Medical', 'Commerce', 'Humanities'].map(stream => (
                                                <ChoiceButton key={stream} name="stream11_12" label={stream} value={stream} current={formData.stream11_12} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-slate-200">
                                        <div className="pb-2">
                                            <label className="text-xs font-bold text-[#1A3A7A] uppercase tracking-widest pl-1">Subject Choice</label>
                                            <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-tight">For Classes 9th & 10th</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {['Science', 'Maths', 'English'].map(subj => (
                                                <ChoiceButton key={subj} name="stream9_10" label={subj} value={subj} current={formData.stream9_10} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Referral */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1A3A7A] font-bold">04</div>
                                <h3 className="text-xl font-anton text-[#0A1628] uppercase tracking-wider">How did you hear about us?</h3>
                                <div className="flex-1 h-px bg-slate-100"></div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {['Banner', 'Pamphlet', 'Social Media', 'Reference by'].map(val => (
                                    <ChoiceButton key={val} name="heardAboutUs" label={val} value={val} current={formData.heardAboutUs} />
                                ))}
                            </div>

                            {formData.heardAboutUs === 'Reference by' && (
                                <div className="animate-fadeUp pt-2 max-w-md">
                                    <input 
                                        type="text" 
                                        name="referenceBy" 
                                        value={formData.referenceBy} 
                                        onChange={handleChange} 
                                        className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-[#1A3A7A]/20 focus:border-[#1A3A7A] outline-none shadow-lg" 
                                        placeholder="Enter Name of Referrer" 
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="pt-10 mt-10 border-t border-slate-200">

                            <div className="flex flex-col items-center">
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-6 text-center max-w-md">By clicking submit, I agree to the terms and conditions of NEEV Academy and confirm that all information provided is accurate.</p>
                                <button 
                                    disabled={status !== 'idle' && status !== 'error'} 
                                    type="submit" 
                                    className="w-full sm:w-auto px-16 py-5 bg-[#1A3A7A] text-white rounded-2xl font-anton text-xl tracking-[0.1em] shadow-[0_15px_40px_rgba(26,58,122,0.3)] hover:shadow-[0_20px_50px_rgba(26,58,122,0.4)] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-80"
                                >
                                    {status === 'idle' && <>Submit Application <i className="fa-solid fa-arrow-right-long animate-bounce-x"></i></>}
                                    {status === 'loading' && <><i className="fa-solid fa-circle-notch fa-spin text-2xl mr-2"></i> Submitting...</>}
                                    {status === 'error' && <><i className="fa-solid fa-exclamation-triangle mr-2"></i> Error, Try Again</>}
                                </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .animate-bounce-x { animation: bounce-x 1s infinite; }
            `}} />
        </div>
    );
};

export default RegistrationForm;
