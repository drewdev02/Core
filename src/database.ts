import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false)

export const connectToDatabase = async () => {
    let dbConnected: boolean = false;
    const intervalId = setInterval(async () => {
        try {
            await mongoose.connect(`mongodb+srv://adrewdev:fDd0UOD91CE1MPYr@cluster0.abhqnha.mongodb.net/test`);
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

