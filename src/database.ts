import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URI: string = process.env.DB_URL ?? ''; // The nullish coalescing operator (??) is used to assign an empty string in case the variable does not exist.

console.log(DB_URI);

mongoose.set('strictQuery', false)

export const connectToDatabase = async () => {
    let dbConnected = false;
    const intervalId = setInterval(async () => {
        try {
            await mongoose.connect(DB_URI);
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

