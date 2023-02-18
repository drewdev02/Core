import mongoose from 'mongoose';

export const connectToDatabase = async () => {

    mongoose.connect('mongodb://localhost:27017/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.error('MongoDB connection error:', err);
        } else {
            console.log('MongoDB connected!');
        }
    });
};
