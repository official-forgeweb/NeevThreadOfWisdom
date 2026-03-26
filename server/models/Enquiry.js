import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    exam: { type: String, default: '' },
    message: { type: String, default: '' },
    source: { type: String, default: 'website' },
    status: { type: String, default: 'new' }, // 'new', 'contacted', 'resolved'
    notes: { type: String, default: '' },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Optional: format `createdAt` into toISOString() in the admin logic or use timestamps natively.

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
