"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
// Protected routes
router.get('/profile', authenticationMiddleware_1.protect, authController_1.getUserProfile);
exports.default = router;
