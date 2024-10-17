// src/routes/authRoutes.ts
import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/authController';
import { protect } from '../middleware/authenticationMiddleware';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);

export default router;