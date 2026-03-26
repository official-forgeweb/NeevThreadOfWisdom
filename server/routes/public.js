import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';
import Registration from '../models/Registration.js';
import { sendAdminNotification, sendUserConfirmation } from '../utils/mailer.js';

const router = Router();

// POST /api/enquiry
router.post('/enquiry', async (req, res) => {
    try {
        const { name, phone, email, exam, message } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required' });
        }

        const entry = await Enquiry.create({
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
        sendUserConfirmation('enquiry', entry).catch(() => {}); // Send confirmation back to user

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

        const entry = await Registration.create({
            ...data,
            status: 'new',
            notes: '',
        });

        // Send admin notification email (non-blocking)
        sendAdminNotification('registration', entry).catch(() => {});
        sendUserConfirmation('registration', entry).catch(() => {}); // Send confirmation back to user

        res.json({ success: true, message: 'Registration submitted successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
