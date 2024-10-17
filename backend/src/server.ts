import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import connectDB from './config';

dotenv.config();

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
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
