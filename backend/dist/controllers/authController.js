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
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, phone, address, password } = req.body;
        // Validate input
        if (!email || !name || !phone || !address || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user exists
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user (password will be hashed in the User model)
        const user = yield User_1.default.create({
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
                    token: (0, generateToken_1.default)(user._id.toString()),
                },
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Registration failed',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Find user by email
        const user = yield User_1.default.findOne({ email });
        // If user exists and password matches
        if (user && (yield user.isPasswordMatch(password))) {
            res.json({
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                token: (0, generateToken_1.default)(user._id.toString()),
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Login failed',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.loginUser = loginUser;
// Get current user profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select('-password');
        if (user) {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
            });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            message: 'Failed to get user profile',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getUserProfile = getUserProfile;
