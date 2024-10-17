// src/controllers/authController.ts
import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';

interface RegisterRequestBody {
  email: string;
  name: string;
  phone: string;
  address: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}
export const registerUser = async (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
  ) => {
    try {
      const { email, name, phone, address, password } = req.body;
  
      // Validate input
      if (!email || !name || !phone || !address || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user (password will be hashed in the User model)
      const user = await User.create({
        email,
        name,
        phone,
        address,
        password, // Password will be hashed by mongoose hook
        role: 'user', // Default role
      });
  
      if (user) {
        res.status(201).json({
          message: 'User registered successfully',
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
          },
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        message: 'Registration failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
  export const loginUser = async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response
  ) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
  
      // If user exists and password matches
      if (user && (await user.isPasswordMatch(password))) {
        res.json({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id.toString()),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
  
// Get current user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Failed to get user profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};