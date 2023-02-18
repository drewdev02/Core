import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import User from './models/User';
import mongoose from 'mongoose';
import { connectToDatabase } from './database';

const app = express();
connectToDatabase();

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000!'));




const user = new User({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123'
});

user.save((err, user) => {
    if (err) {
        console.error(err);
    } else {
        console.log(user);
    }
});
