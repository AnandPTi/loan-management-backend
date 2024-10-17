"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
// Connect to the database
(0, config_1.default)();
// Start the server
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import authRoutes from './routes/authRoutes';
// import loanRoutes from './routes/loanRoutes';
// dotenv.config();
// const app = express();
// app.use(express.json());
// const PORT = process.env.PORT || 5000;
// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URL!, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/user', loanRoutes);
// app.use('/api/verifier', loanRoutes);
// app.use('/api/admin', loanRoutes);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
