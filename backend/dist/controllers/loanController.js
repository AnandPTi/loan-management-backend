"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignVerifier = exports.viewAllLoans = exports.getVerifierLoans = exports.updateLoanStatus = exports.getUserLoans = exports.createLoan = void 0;
const Loan_1 = __importDefault(require("../models/Loan"));
const User_1 = __importDefault(require("../models/User"));
// Create Loan (for users)
const createLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, amount, tenure, employmentStatus, reason, employmentAddress1, employmentAddress2, termsAccepted, creditInfoDisclosure, } = req.body;
        const newLoan = yield Loan_1.default.create({
            user: req.user._id, // Add user reference
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
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.createLoan = createLoan;
// Get User's Loans (for users)
const getUserLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield Loan_1.default.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.status(200).json(loans);
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.getUserLoans = getUserLoans;
// Update Loan Status (for verifiers)
const updateLoanStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loanId, status } = req.body;
        const loan = yield Loan_1.default.findOneAndUpdate({ _id: loanId, assignedVerifier: req.user._id }, { status }, { new: true });
        if (!loan) {
            res.status(404).json({ message: 'Loan not found or not assigned to you' });
            return;
        }
        res.status(200).json({
            message: 'Loan status updated successfully',
            loan,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.updateLoanStatus = updateLoanStatus;
// Get Verifier's Assigned Loans (for verifiers)
const getVerifierLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield Loan_1.default.find({ assignedVerifier: req.user._id })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(loans);
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.getVerifierLoans = getVerifierLoans;
// Admin Functions
// Get All Loans (for admin)
const viewAllLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield Loan_1.default.find({})
            .populate('user', 'name email')
            .populate('assignedVerifier', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(loans);
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.viewAllLoans = viewAllLoans;
// Assign Verifier to Loan (for admin)
const assignVerifier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loanId, verifierId } = req.body;
        // Verify verifier exists and has verifier role
        const verifier = yield User_1.default.findOne({ _id: verifierId, role: 'verifier' });
        if (!verifier) {
            res.status(404).json({ message: 'Verifier not found' });
            return;
        }
        const loan = yield Loan_1.default.findByIdAndUpdate(loanId, { assignedVerifier: verifierId }, { new: true });
        if (!loan) {
            res.status(404).json({ message: 'Loan not found' });
            return;
        }
        res.status(200).json({
            message: 'Verifier assigned successfully',
            loan,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.assignVerifier = assignVerifier;
