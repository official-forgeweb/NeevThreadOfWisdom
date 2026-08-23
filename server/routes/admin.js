import { Router } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { authMiddleware } from '../middleware/auth.js';
import Enquiry from '../models/Enquiry.js';
import Registration from '../models/Registration.js';
import * as store from '../utils/store.js';

const router = Router();

// Simple fast in-memory cache
let cache = { enquiries: null, registrations: null, lastFetch: 0 };
const CACHE_TTL = 3000; // 3 seconds cache

function clearCache() {
    cache = { enquiries: null, registrations: null, lastFetch: 0 };
}

// Helper helpers to interact with MongoDB or fallback to JSON store
async function fetchEnquiries(forceFresh = false) {
    const now = Date.now();
    if (!forceFresh && cache.enquiries && (now - cache.lastFetch < CACHE_TTL)) {
        return cache.enquiries;
    }

    let result = [];
    if (mongoose.connection.readyState === 1) {
        try {
            result = await Enquiry.find().sort({ createdAt: -1 }).lean();
        } catch (e) {
            console.warn('Mongoose fetchEnquiries failed, fallback to JSON store:', e.message);
            result = store.getAll('enquiries.json');
        }
    } else {
        result = store.getAll('enquiries.json');
    }
    const formatted = result.map(i => ({ ...i, id: i._id ? String(i._id) : i.id, _id: i._id ? String(i._id) : i.id }));
    cache.enquiries = formatted;
    cache.lastFetch = now;
    return formatted;
}

async function fetchRegistrations(forceFresh = false) {
    const now = Date.now();
    if (!forceFresh && cache.registrations && (now - cache.lastFetch < CACHE_TTL)) {
        return cache.registrations;
    }

    let result = [];
    if (mongoose.connection.readyState === 1) {
        try {
            result = await Registration.find().sort({ createdAt: -1 }).lean();
        } catch (e) {
            console.warn('Mongoose fetchRegistrations failed, fallback to JSON store:', e.message);
            result = store.getAll('registrations.json');
        }
    } else {
        result = store.getAll('registrations.json');
    }
    const formatted = result.map(i => ({ ...i, id: i._id ? String(i._id) : i.id, _id: i._id ? String(i._id) : i.id }));
    cache.registrations = formatted;
    cache.lastFetch = now;
    return formatted;
}

async function fetchEnquiryById(id) {
    if (mongoose.connection.readyState === 1) {
        try {
            const item = await Enquiry.findById(id).lean();
            if (item) return { ...item, id: String(item._id) };
        } catch (e) {}
    }
    const item = store.getById('enquiries.json', id);
    return item ? { ...item, _id: item.id || item._id } : null;
}

async function updateEnquiryData(id, updateFields) {
    clearCache();
    if (mongoose.connection.readyState === 1) {
        try {
            const updated = await Enquiry.findByIdAndUpdate(id, updateFields, { new: true }).lean();
            if (updated) return { ...updated, id: String(updated._id) };
        } catch (e) {}
    }
    const updated = store.update('enquiries.json', id, updateFields);
    return updated ? { ...updated, _id: updated.id || updated._id } : null;
}

async function deleteEnquiryData(id) {
    clearCache();
    if (mongoose.connection.readyState === 1) {
        try {
            const deleted = await Enquiry.findByIdAndDelete(id);
            if (deleted) return true;
        } catch (e) {}
    }
    return store.remove('enquiries.json', id);
}

async function fetchRegistrationById(id) {
    if (mongoose.connection.readyState === 1) {
        try {
            const item = await Registration.findById(id).lean();
            if (item) return { ...item, id: String(item._id) };
        } catch (e) {}
    }
    const item = store.getById('registrations.json', id);
    return item ? { ...item, _id: item.id || item._id } : null;
}

async function updateRegistrationData(id, updateFields) {
    clearCache();
    if (mongoose.connection.readyState === 1) {
        try {
            const updated = await Registration.findByIdAndUpdate(id, updateFields, { new: true }).lean();
            if (updated) return { ...updated, id: String(updated._id) };
        } catch (e) {}
    }
    const updated = store.update('registrations.json', id, updateFields);
    return updated ? { ...updated, _id: updated.id || updated._id } : null;
}

async function deleteRegistrationData(id) {
    clearCache();
    if (mongoose.connection.readyState === 1) {
        try {
            const deleted = await Registration.findByIdAndDelete(id);
            if (deleted) return true;
        } catch (e) {}
    }
    return store.remove('registrations.json', id);
}

// POST /api/admin/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
        const expectedPassword = process.env.ADMIN_PASSWORD || 'neev@admin2026';
        const jwtSecret = process.env.JWT_SECRET || 'neev_thread_of_wisdom_jwt_secret_2026';

        if (username !== expectedUsername) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (password !== expectedPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username, role: 'admin' },
            jwtSecret,
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
        const [enquiries, registrations] = await Promise.all([
            fetchEnquiries(),
            fetchRegistrations()
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalEnquiries = enquiries.length;
        const totalRegistrations = registrations.length;
        const newEnquiries = enquiries.filter(e => e.status === 'new').length;
        const newRegistrations = registrations.filter(r => r.status === 'new').length;
        const todayEnquiries = enquiries.filter(e => new Date(e.createdAt || 0) >= today).length;
        const todayRegistrations = registrations.filter(r => new Date(r.createdAt || 0) >= today).length;
        const contactedEnquiries = enquiries.filter(e => e.status === 'contacted').length;
        const enrolledRegistrations = registrations.filter(r => r.status === 'enrolled').length;

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
        const data = await fetchEnquiries();
        res.json(data);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /api/admin/enquiries/:id
router.get('/enquiries/:id', authMiddleware, async (req, res) => {
    try {
        const item = await fetchEnquiryById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/admin/enquiries/:id
router.put('/enquiries/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await updateEnquiryData(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/admin/enquiries/:id
router.delete('/enquiries/:id', authMiddleware, async (req, res) => {
    try {
        const success = await deleteEnquiryData(req.params.id);
        if (!success) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// --- REGISTRATIONS CRUD ---

// GET /api/admin/registrations
router.get('/registrations', authMiddleware, async (req, res) => {
    try {
        const data = await fetchRegistrations();
        res.json(data);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /api/admin/registrations/:id
router.get('/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const item = await fetchRegistrationById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/admin/registrations/:id
router.put('/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await updateRegistrationData(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/admin/registrations/:id
router.delete('/registrations/:id', authMiddleware, async (req, res) => {
    try {
        const success = await deleteRegistrationData(req.params.id);
        if (!success) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

export default router;
