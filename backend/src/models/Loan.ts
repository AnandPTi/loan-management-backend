// models/Loan.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ILoan extends Document {
  user: mongoose.Types.ObjectId | IUser;
  fullName: string;
  amount: number;
  tenure: number;
  employmentStatus: string;
  reason: string;
  employmentAddress1: string;
  employmentAddress2: string;
  termsAccepted: boolean;
  creditInfoDisclosure: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'verified';
  assignedVerifier?: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const LoanSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  reason: { type: String, required: true },
  employmentAddress1: { type: String, required: true },
  employmentAddress2: { type: String },
  termsAccepted: { type: Boolean, required: true },
  creditInfoDisclosure: { type: Boolean, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'verified'], default: 'pending' },
  assignedVerifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

export default mongoose.model<ILoan>('Loan', LoanSchema);