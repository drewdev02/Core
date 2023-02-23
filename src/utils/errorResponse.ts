import { Response } from 'express';

class ErrorResponse {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }

    send(res: Response) {
        res.status(this.status).json({ message: this.message });
    }
}

export default ErrorResponse;
