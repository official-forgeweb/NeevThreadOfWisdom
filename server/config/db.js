import dns from 'dns';
// Set public DNS servers to resolve MongoDB Atlas mongodb+srv SRV records reliably
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    console.warn('Could not set custom DNS servers:', e.message);
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

let isConnected; // Track connection status for Serverless environments

const DEFAULT_MONGO_URI = 'mongodb+srv://aryannda2163_db_user:K6Fw2dX8qxNC07nN@cluster0.rwr2gns.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is missing in the environment variables.");
        }
        
        const db = await mongoose.connect(mongoUri, {
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        isConnected = db.connections[0].readyState;
        console.log(`✅ MongoDB Connected: ${db.connection.host}`);
    } catch (err) {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
        // Remove process.exit(1) to prevent Vercel crashes
    }
};

export default connectDB;
