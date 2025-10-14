import express from 'express';
import cors from "cors";
import connectDB from './config/mongodb'; //config/db.mjs
require('dotenv').config(); //config/index.mjs

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(require('cors')());

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));