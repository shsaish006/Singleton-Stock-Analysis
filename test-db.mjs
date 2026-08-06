import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || '';

async function testConnection() {
    try {
        console.log('Connecting to:', uri.replace(/:([^:@]{1,})@/, ':***@'));
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB!');
        process.exit(0);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

testConnection();
