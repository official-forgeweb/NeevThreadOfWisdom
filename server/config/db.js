import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Set public DNS servers only in local environment
if (!process.env.VERCEL) {
    import('dns').then(dns => {
        try {
            dns.default.setServers(['8.8.8.8', '1.1.1.1']);
        } catch (e) {}
    }).catch(() => {});
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

let isConnected = false;

const DEFAULT_MONGO_URI = 'mongodb+srv://aryannda2163_db_user:K6Fw2dX8qxNC07nN@cluster0.rwr2gns.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    try {
        const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;
        const db = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log(`✅ MongoDB Connected: ${db.connection.host}`);
    } catch (err) {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
    }
};

export default connectDB;
