import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authMiddleware } from '../middleware/auth.js';
import { getAll, getById, update, remove } from '../utils/store.js';

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
router.get('/stats', authMiddleware, (req, res) => {
    const enquiries = getAll('enquiries.json');
    const registrations = getAll('registrations.json');

    const today = new Date().toISOString().split('T')[0];

    res.json({
        totalEnquiries: enquiries.length,
        totalRegistrations: registrations.length,
        newEnquiries: enquiries.filter(e => e.status === 'new').length,
        newRegistrations: registrations.filter(r => r.status === 'new').length,
        todayEnquiries: enquiries.filter(e => e.createdAt?.startsWith(today)).length,
        todayRegistrations: registrations.filter(r => r.createdAt?.startsWith(today)).length,
        contactedEnquiries: enquiries.filter(e => e.status === 'contacted').length,
        enrolledRegistrations: registrations.filter(r => r.status === 'enrolled').length,
    });
});

// --- ENQUIRIES CRUD ---

// GET /api/admin/enquiries
router.get('/enquiries', authMiddleware, (req, res) => {
    const data = getAll('enquiries.json');
    res.json(data);
});

// GET /api/admin/enquiries/:id
router.get('/enquiries/:id', authMiddleware, (req, res) => {
    const item = getById('enquiries.json', req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

// PUT /api/admin/enquiries/:id
router.put('/enquiries/:id', authMiddleware, (req, res) => {
    const updated = update('enquiries.json', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
});

// DELETE /api/admin/enquiries/:id
router.delete('/enquiries/:id', authMiddleware, (req, res) => {
    const deleted = remove('enquiries.json', req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
});

// --- REGISTRATIONS CRUD ---

// GET /api/admin/registrations
router.get('/registrations', authMiddleware, (req, res) => {
    const data = getAll('registrations.json');
    res.json(data);
});

// GET /api/admin/registrations/:id
router.get('/registrations/:id', authMiddleware, (req, res) => {
    const item = getById('registrations.json', req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

// PUT /api/admin/registrations/:id
router.put('/registrations/:id', authMiddleware, (req, res) => {
    const updated = update('registrations.json', req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
});

// DELETE /api/admin/registrations/:id
router.delete('/registrations/:id', authMiddleware, (req, res) => {
    const deleted = remove('registrations.json', req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
});

export default router;
