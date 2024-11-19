// routes/loanRoutes.ts
import { Router } from 'express';
import { protect, admin, verifier } from '../middleware/authenticationMiddleware';
import {
  createLoan,
  getUserLoans,
  updateLoanStatus,
  getVerifierLoans,
  viewAllLoans,
  assignVerifier,
} from '../controllers/loanController';

const router = Router();

// User routes
router.post('/create', protect, createLoan);
router.get('/user/loans', protect, getUserLoans);

// Verifier routes
//router.get('/verifier/loans', protect, verifier, getVerifierLoans);
router.put('/verifier/update-status', protect, verifier, updateLoanStatus);

// Admin routes
router.get('/admin/all-loans', protect, admin, viewAllLoans);
router.put('/admin/assign-verifier', protect, admin, assignVerifier);

export default router;
