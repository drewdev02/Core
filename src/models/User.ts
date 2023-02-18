import { Document, Model, model, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User: Model<IUser> = model<IUser>('User', userSchema, 'users');

export default User;
