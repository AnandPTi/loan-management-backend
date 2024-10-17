"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/adminRoutes.ts
const express_1 = require("express");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
router.post('/create-verifier', authenticationMiddleware_1.protect, authenticationMiddleware_1.admin, adminController_1.createVerifier);
router.delete('/delete-user/:userId', authenticationMiddleware_1.protect, authenticationMiddleware_1.admin, adminController_1.deleteUser);
router.get('/users', authenticationMiddleware_1.protect, authenticationMiddleware_1.admin, adminController_1.getAllUsers);
exports.default = router;
