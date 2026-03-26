import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { create } from '../utils/store.js';
import { sendAdminNotification } from '../utils/mailer.js';

const router = Router();

// POST /api/enquiry
router.post('/enquiry', async (req, res) => {
    try {
        const { name, phone, email, exam, message } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required' });
        }

        const entry = {
            id: uuid(),
            name,
            phone,
            email: email || '',
            exam: exam || '',
            message: message || '',
            source: req.body._source || 'website',
            status: 'new',
            notes: '',
            createdAt: new Date().toISOString(),
        };

        create('enquiries.json', entry);

        // Send admin notification email (non-blocking)
        sendAdminNotification('enquiry', entry).catch(() => {});

        res.json({ success: true, message: 'Enquiry submitted successfully' });
    } catch (err) {
        console.error('Enquiry error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/registration
router.post('/registration', async (req, res) => {
    try {
        const data = req.body;

        if (!data.studentName || !data.fathersName) {
            return res.status(400).json({ error: 'Student name and father\'s name are required' });
        }

        const entry = {
            id: uuid(),
            ...data,
            status: 'new',
            notes: '',
            createdAt: new Date().toISOString(),
        };

        create('registrations.json', entry);

        // Send admin notification email (non-blocking)
        sendAdminNotification('registration', entry).catch(() => {});

        res.json({ success: true, message: 'Registration submitted successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
