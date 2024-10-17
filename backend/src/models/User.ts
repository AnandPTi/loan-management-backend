import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: ObjectId;  // Explicitly define _id as ObjectId
  email: string;
  name: string;
  phone: string;
  address: string;
  password: string;
  role: 'user' | 'verifier' | 'admin';
  isPasswordMatch: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'verifier', 'admin'], default: 'user' },
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isPasswordMatch = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
