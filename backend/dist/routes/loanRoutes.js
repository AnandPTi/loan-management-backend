"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/loanRoutes.ts
const express_1 = require("express");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const loanController_1 = require("../controllers/loanController");
const router = (0, express_1.Router)();
// User routes
router.post('/create', authenticationMiddleware_1.protect, loanController_1.createLoan);
router.get('/user/loans', authenticationMiddleware_1.protect, loanController_1.getUserLoans);
// Verifier routes
router.get('/verifier/loans', authenticationMiddleware_1.protect, authenticationMiddleware_1.verifier, loanController_1.getVerifierLoans);
router.put('/verifier/update-status', authenticationMiddleware_1.protect, authenticationMiddleware_1.verifier, loanController_1.updateLoanStatus);
// Admin routes
router.get('/admin/all-loans', authenticationMiddleware_1.protect, authenticationMiddleware_1.admin, loanController_1.viewAllLoans);
router.put('/admin/assign-verifier', authenticationMiddleware_1.protect, authenticationMiddleware_1.admin, loanController_1.assignVerifier);
exports.default = router;
