// controllers/adminController.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const createVerifier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, phone, address, password } = req.body;

    const verifierExists = await User.findOne({ email });
    if (verifierExists) {
      res.status(400).json({ message: 'Verifier already exists' });
      return;
    }

    const verifier = await User.create({
      email,
      name,
      phone,
      address,
      password,
      role: 'verifier',
    });

    res.status(201).json({
      message: 'Verifier created successfully',
      verifier: {
        id: verifier._id,
        email: verifier.email,
        name: verifier.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.role === 'admin') {
      res.status(403).json({ message: 'Cannot delete admin user' });
      return;
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};