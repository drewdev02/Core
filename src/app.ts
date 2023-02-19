import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import { connectToDatabase } from './database';

const app = express();

connectToDatabase();

app.use(bodyParser.json());

app.use('/', userRoutes);

app.listen(4576, () => console.log('Server running on port 4576!'));