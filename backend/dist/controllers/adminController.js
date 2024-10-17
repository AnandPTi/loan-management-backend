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
exports.getAllUsers = exports.deleteUser = exports.createVerifier = void 0;
const User_1 = __importDefault(require("../models/User"));
const createVerifier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, phone, address, password } = req.body;
        const verifierExists = yield User_1.default.findOne({ email });
        if (verifierExists) {
            res.status(400).json({ message: 'Verifier already exists' });
            return;
        }
        const verifier = yield User_1.default.create({
            email,
            name,
            phone,
            address,
            password,
            role: 'verifier',
        });
        res.status(201).json({
            message: 'Verifier created successfully',
            verifier: {
                id: verifier._id,
                email: verifier.email,
                name: verifier.name,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.createVerifier = createVerifier;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.role === 'admin') {
            res.status(403).json({ message: 'Cannot delete admin user' });
            return;
        }
        yield User_1.default.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ role: { $ne: 'admin' } }).select('-password');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            message: `Error: ${error instanceof Error ? error.message : 'Unexpected error'}`,
        });
    }
});
exports.getAllUsers = getAllUsers;
