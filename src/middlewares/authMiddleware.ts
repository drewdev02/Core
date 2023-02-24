import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User} from '../models/User';
import dotenv from 'dotenv';
import ErrorResponse from '../utils/errorResponse';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET ?? '';

interface IRequest extends Request {
    User?: {
        id: string;
    };
}

const authMiddleware = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return new ErrorResponse(401, 'No token provided').send(res);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const user = await User.findById(decoded.id);

        if (!user) {
            return new ErrorResponse(401, 'Invalid token').send(res);
        }

        req.User = { id: user.id };
        next();
    } catch (err) {
        return new ErrorResponse(401, 'Invalid token').send(res);
    }
};

export default authMiddleware;
