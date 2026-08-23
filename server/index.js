import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import connectDB from './config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure DB connection on incoming requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
    } catch (e) {
        console.error('Middleware connectDB error:', e);
    }
    next();
});

// Middleware
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());

// Serve admin uploads (if any) or just leave it clean
// app.use('/admin', express.static(path.join(__dirname, 'admin'))); // Migrated to React Frontend

// API routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

if (process.argv[1] && process.argv[1].endsWith('index.js') && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`\n🚀 NEEV Server running on http://localhost:${PORT}`);
        console.log(`📋 Admin Panel: http://localhost:${PORT}/admin`);
        console.log(`📡 API Base: http://localhost:${PORT}/api\n`);
    });
}

export default app;
