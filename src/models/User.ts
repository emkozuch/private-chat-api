import mongoose, { Document, Model, Schema } from 'mongoose';
import { UserRole } from '../types';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: UserRole;
}

const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, required: false },
  role: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
