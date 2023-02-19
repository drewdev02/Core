import mongoose from 'mongoose';

mongoose.set('strictQuery', false)
export const connectToDatabase = async () => {
    mongoose.connect('mongodb://localhost:27017/myapp',(err) => {
        if (err) {
            console.error('MongoDB connection error:', err);
        } else {
            console.log('MongoDB connected!');
        }
    });
};
