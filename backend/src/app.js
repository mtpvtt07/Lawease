import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';

import authRoutes from './routes/auth.js';
import lawyerRoutes from './routes/lawyers.js';
import topicRoutes from './routes/topics.js';

// Load environment variables and connect to the database
dotenv.config();
// Database Connection 
connectDB();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes examples 
app.use('/api/auth', authRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/topics', topicRoutes);

export default app;
