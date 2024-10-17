// app.ts
import express from 'express';
import authRoutes from './routes/authRoutes';
import loanRoutes from './routes/loanRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/admin', adminRoutes);

export default app;