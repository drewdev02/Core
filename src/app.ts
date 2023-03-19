import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/routes.users';
import Routes from './routes/routes';
import { connectToDatabase } from './database';
import dotenv from 'dotenv';



const app = express();

connectToDatabase();

app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', Routes);

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




export default app;