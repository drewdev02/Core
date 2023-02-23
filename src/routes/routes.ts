import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET ?? '';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const router: Router = Router();


router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return res.json({ token });
});

export default router;
