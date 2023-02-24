import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? '';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const router: Router = Router();


router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return new ErrorResponse(400, 'Email or password is incorrect').send(res);        
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return new ErrorResponse(400, 'Email or password is incorrect').send(res);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return res.json({ token });
});

export default router;
