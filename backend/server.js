/**
 * BhojanGo Backend Server
 * Express API server for the BhojanGo food delivery application.
 * Connects to MongoDB Atlas for data persistence.
 * Uses Firebase Authentication for user verification.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import database connection
const connectDB = require('./config/database');

// Import route handlers
const restaurantRoutes = require('./routes/restaurants');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');

// Import error handler
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Connect to MongoDB ─────────────────────────────────────
connectDB();

// ─── Middleware ───────────────────────────────────────────────
app.use(helmet());                              // Security headers
app.use(cors({
  origin: '*',                                  // Allow mobile app & web
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));                          // Request logging
app.use(express.json({ limit: '10mb' }));       // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BhojanGo API',
    version: '2.0.0',
    database: 'MongoDB Atlas',
    auth: 'Firebase',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// ─── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 BhojanGo API v2.0 running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth: Firebase | 🗄️ DB: MongoDB Atlas`);
});

module.exports = app;
