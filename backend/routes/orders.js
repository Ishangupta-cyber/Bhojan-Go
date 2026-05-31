/**
 * Order Routes
 * Protected endpoints for managing orders.
 */
const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUserId } = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');

// POST /api/orders — Create a new order (requires authentication)
router.post('/', requireAuth, createOrder);

// GET /api/orders/:userId — Get orders for a user (requires authentication)
router.get('/:userId', requireAuth, getOrdersByUserId);

module.exports = router;
