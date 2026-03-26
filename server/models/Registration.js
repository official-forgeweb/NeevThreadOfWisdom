import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    // Personal Details
    regNo: { type: String },
    studentName: { type: String, required: true },
    dob: { type: String },
    gender: { type: String },
    
    // Academic Details
    schoolName: { type: String },
    studentClass: { type: String },
    board: { type: String },
    medium: { type: String },
    stream11_12: { type: String },
    stream9_10: { type: String },
    
    // Family & Contact Details
    fathersName: { type: String, required: true },
    fathersContact: { type: String },
    mothersName: { type: String },
    mothersContact: { type: String },
    address: { type: String },
    
    // Course Details
    dateOfJoining: { type: String },
    feePackage: { type: String },
    
    // Additional Info
    heardAboutUs: { type: String },
    referenceBy: { type: String },
    
    // Admin Fields
    status: { type: String, default: 'new' }, // 'new', 'contacted', 'enrolled', 'rejected'
    notes: { type: String, default: '' },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
