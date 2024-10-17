// routes/adminRoutes.ts
import { Router } from 'express';
import { protect, admin } from '../middleware/authenticationMiddleware';
import {
  createVerifier,
  deleteUser,
  getAllUsers,
} from '../controllers/adminController';

const router = Router();

router.post('/create-verifier', protect, admin, createVerifier);
router.delete('/delete-user/:userId', protect, admin, deleteUser);
router.get('/users', protect, admin, getAllUsers);

export default router;