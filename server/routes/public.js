import { Router } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Enquiry from '../models/Enquiry.js';
import Registration from '../models/Registration.js';
import * as store from '../utils/store.js';
import { sendAdminNotification, sendUserConfirmation } from '../utils/mailer.js';

const router = Router();

async function createEnquiryEntry(data) {
    if (mongoose.connection.readyState === 1) {
        try {
            return await Enquiry.create(data);
        } catch (e) {
            console.warn('Mongoose create Enquiry failed, fallback to JSON store:', e.message);
        }
    }
    const entry = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString()
    };
    return store.create('enquiries.json', entry);
}

async function createRegistrationEntry(data) {
    if (mongoose.connection.readyState === 1) {
        try {
            return await Registration.create(data);
        } catch (e) {
            console.warn('Mongoose create Registration failed, fallback to JSON store:', e.message);
        }
    }
    const entry = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString()
    };
    return store.create('registrations.json', entry);
}

// POST /api/enquiry
router.post('/enquiry', async (req, res) => {
    try {
        const { name, phone, email, exam, message } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required' });
        }

        const entry = await createEnquiryEntry({
            name,
            phone,
            email: email || '',
            exam: exam || '',
            message: message || '',
            source: req.body._source || 'website',
            status: 'new',
            notes: '',
        });

        // Send admin notification email (non-blocking)
        sendAdminNotification('enquiry', entry).catch(() => {});
        sendUserConfirmation('enquiry', entry).catch(() => {});

        res.json({ success: true, message: 'Enquiry submitted successfully' });
    } catch (err) {
        console.error('Enquiry error:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// POST /api/registration
router.post('/registration', async (req, res) => {
    try {
        const data = req.body;

        if (!data.studentName || !data.fathersName) {
            return res.status(400).json({ error: 'Student name and father\'s name are required' });
        }

        const entry = await createRegistrationEntry({
            ...data,
            status: 'new',
            notes: '',
        });

        // Send admin notification email (non-blocking)
        sendAdminNotification('registration', entry).catch(() => {});
        sendUserConfirmation('registration', entry).catch(() => {});

        res.json({ success: true, message: 'Registration submitted successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

export default router;
