// lib/dbConnect.ts
import mongoose from 'mongoose';
import dns from 'node:dns';

const MONGODB_URI = process.env.MONGODB_URI;

// Some local routers return SRV answers Node can't parse (querySrv EBADRESP),
// which breaks "mongodb+srv://" URIs in development. Use public resolvers locally.
// Applied right before each connection attempt: a one-time setting at module load
// did not reliably survive a fresh `next dev` start.
const usePublicDnsInDev = () => {
    if (process.env.NODE_ENV !== 'production' && MONGODB_URI?.startsWith('mongodb+srv://')) {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
    }
};

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        usePublicDnsInDev();
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};