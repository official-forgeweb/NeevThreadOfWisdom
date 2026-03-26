import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());

// Serve admin panel static files
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// API routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`\n🚀 NEEV Server running on http://localhost:${PORT}`);
    console.log(`📋 Admin Panel: http://localhost:${PORT}/admin`);
    console.log(`📡 API Base: http://localhost:${PORT}/api\n`);
});
