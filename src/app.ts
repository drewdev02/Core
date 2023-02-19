import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/routes.users';
import { connectToDatabase } from './database';

const app = express();

connectToDatabase();

app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);
let port = 4576;
app.listen(port, () => console.log(`Server running on port ${port}`));