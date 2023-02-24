import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.USERNAME ?? '';
const PASSWORD = process.env.PASSWORD ?? '';

mongoose.set('strictQuery', false)

export const connectToDatabase = async () => {
    let dbConnected = false;
    const intervalId = setInterval(async () => {
        try {
            await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.abhqnha.mongodb.net/test`);
            dbConnected = true;
            clearInterval(intervalId);
            console.log('MongoDB connected!');
        } catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }, 10000);
    
    process.on('SIGINT', () => {
        if (!dbConnected) {
            clearInterval(intervalId);
            process.exit(0);
        }
    });
};

