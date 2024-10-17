// controllers/loanController.ts
import { Request, Response } from 'express';
import Loan from '../models/Loan';
import User from '../models/User';

// Create Loan (for users)
export const createLoan = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      amount,
      tenure,
      employmentStatus,
      reason,
      employmentAddress1,
      employmentAddress2,
      termsAccepted,
      creditInfoDisclosure,
    } = req.body;

    const newLoan = await Loan.create({
      user: req.user!._id, // Add user reference
      fullName,
      amount,
      tenure,
      employmentStatus,
      reason,
      employmentAddress1,
      employmentAddress2,
      termsAccepted,
      creditInfoDisclosure,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Loan application submitted successfully',
      loan: newLoan,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};

// Get User's Loans (for users)
export const getUserLoans = async (req: Request, res: Response): Promise<void> => {
  try {
    const loans = await Loan.find({ user: req.user!._id })
      .sort({ createdAt: -1 });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};

// Update Loan Status (for verifiers)
export const updateLoanStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { loanId, status } = req.body;

    const loan = await Loan.findOneAndUpdate(
      { _id: loanId, assignedVerifier: req.user!._id },
      { status },
      { new: true }
    );

    if (!loan) {
      res.status(404).json({ message: 'Loan not found or not assigned to you' });
      return;
    }

    res.status(200).json({
      message: 'Loan status updated successfully',
      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};

// Get Verifier's Assigned Loans (for verifiers)
export const getVerifierLoans = async (req: Request, res: Response): Promise<void> => {
  try {
    const loans = await Loan.find({ assignedVerifier: req.user!._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};

// Admin Functions
// Get All Loans (for admin)
export const viewAllLoans = async (req: Request, res: Response): Promise<void> => {
  try {
    const loans = await Loan.find({})
      .populate('user', 'name email')
      .populate('assignedVerifier', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};

// Assign Verifier to Loan (for admin)
export const assignVerifier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { loanId, verifierId } = req.body;

    // Verify verifier exists and has verifier role
    const verifier = await User.findOne({ _id: verifierId, role: 'verifier' });
    if (!verifier) {
      res.status(404).json({ message: 'Verifier not found' });
      return;
    }

    const loan = await Loan.findByIdAndUpdate(
      loanId,
      { assignedVerifier: verifierId },
      { new: true }
    );

    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    res.status(200).json({
      message: 'Verifier assigned successfully',
      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
    });
  }
};