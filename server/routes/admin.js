import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authMiddleware } from '../middleware/auth.js';
import Enquiry from '../models/Enquiry.js';
import Registration from '../models/Registration.js';

const router = Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username !== process.env.ADMIN_USERNAME) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password (plain text comparison since we store it plain in .env)
        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ success: true, token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/admin/stats
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [
            totalEnquiries, totalRegistrations,
            newEnquiries, newRegistrations,
            todayEnquiries, todayRegistrations,
            contactedEnquiries, enrolledRegistrations
        ] = await Promise.all([
            Enquiry.countDocuments(),
            Registration.countDocuments(),
            Enquiry.countDocuments({ status: 'new' }),
            Registration.countDocuments({ status: 'new' }),
            Enquiry.countDocuments({ createdAt: { $gte: today } }),
            Registration.countDocuments({ createdAt: { $gte: today } }),
            Enquiry.countDocuments({ status: 'contacted' }),
            Registration.countDocuments({ status: 'enrolled' })
        ]);

        res.json({
            totalEnquiries, totalRegistrations,
            newEnquiries, newRegistrations,
            todayEnquiries, todayRegistrations,
            contactedEnquiries, enrolledRegistrations
        });
    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// --- ENQUIRIES CRUD ---

// GET /api/admin/enquiries
router.get('/enquiries', authMiddleware, async (req, res) => {
    try {
        const data = await Enquiry.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /api/admin/enquiries/:id
router.get('/enquiries/:id', authMiddleware, async (req, res) => {
    try {
        const item = await Enquiry.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/admin/enquiries/:id
router.put('/enquiries/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/admin/enquiries/:id
router.delete('/enquiries/:id', authMiddleware, async (req, res) => {
    try {
        const deleted = await Enquiry.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// --- REGISTRATIONS CRUD ---

// GET /api/admin/registrations
router.get('/registrations', authMiddleware, async (req, res) => {
    try {
        const data = await Registration.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /api/admin/registrations/:id
router.get('/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const item = await Registration.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/admin/registrations/:id
router.put('/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/admin/registrations/:id
router.delete('/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const deleted = await Registration.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

export default router;
