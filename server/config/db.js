import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected; // Track connection status for Serverless environments

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in the environment variables.");
        }
        
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState;
        console.log(`✅ MongoDB Connected: ${db.connection.host}`);
    } catch (err) {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
        // Remove process.exit(1) to prevent Vercel crashes
    }
};

export default connectDB;
