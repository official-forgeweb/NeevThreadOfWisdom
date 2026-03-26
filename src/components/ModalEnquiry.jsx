import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

const ModalEnquiry = () => {
    const { isEnquiryModalOpen, closeEnquiryModal } = useModal();
    const [status, setStatus] = useState('idle');

    if (!isEnquiryModalOpen) return null;

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
                    exam: data.get('exam'),
                    message: data.get('message'),
                    _source: 'modal-enquiry',
                })
            });
            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    closeEnquiryModal();
                    setStatus('idle');
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm" onClick={closeEnquiryModal}></div>
            
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]" style={{ animation: 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <button 
                    onClick={closeEnquiryModal}
                    className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-[#F0F3F9] text-[#0A1628] hover:bg-[#1A3A7A] hover:text-white flex items-center justify-center transition-all duration-300"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <div className="mb-8">
                    <span className="inline-block bg-[#C9A84C]/20 px-4 py-1.5 rounded-full font-space text-[10px] font-bold text-[#1A3A7A] uppercase tracking-widest mb-4">Immediate Admission</span>
                    <h3 className="font-anton text-4xl text-[#0A1628] tracking-tight">ENROLL NOW</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="font-space text-xs font-bold text-[#1A3A7A] uppercase tracking-widest ml-1">Student Name</label>
                            <input name="name" required type="text" placeholder="Full Name" className="w-full bg-[#F0F3F9] border-none rounded-2xl py-4 px-6 text-[#0A1628] font-space text-sm font-medium focus:ring-4 focus:ring-[#1A3A7A]/10 transition-all outline-none" />
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
                        <label className="font-space text-xs font-bold text-[#1A3A7A] uppercase tracking-widest ml-1">Message (Optional)</label>
                        <textarea name="message" rows="3" placeholder="Any specific requirements?" className="w-full bg-[#F0F3F9] border-none rounded-2xl py-4 px-6 text-[#0A1628] font-space text-sm font-medium focus:ring-4 focus:ring-[#1A3A7A]/10 transition-all outline-none resize-none" />
                    </div>

                    <button disabled={status !== 'idle' && status !== 'error'} type="submit" className="w-full bg-[#1A3A7A] hover:bg-[#0A1628] text-white font-space font-bold text-lg py-5 rounded-2xl transition-all shadow-[0_12px_30px_rgba(26,58,122,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80">
                        {status === 'idle' && <>Submit Application <i className="fa-solid fa-arrow-right"></i></>}
                        {status === 'loading' && <i className="fa-solid fa-circle-notch fa-spin text-2xl"></i>}
                        {status === 'success' && <><i className="fa-solid fa-check-circle text-2xl"></i> Sent Successfully!</>}
                        {status === 'error' && <><i className="fa-solid fa-exclamation-triangle text-2xl"></i> Error, Try Again</>}
                    </button>
                    
                    <p className="text-center font-dm text-[11px] text-[#6B7B8D] leading-relaxed">
                        Our admissions team will contact you within 24 hours. By submitting, you agree to our policies.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ModalEnquiry;
