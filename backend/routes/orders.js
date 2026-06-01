/**
 * Order Routes
 * Protected endpoints for managing orders.
 */
const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');

// POST /api/orders — Create a new order (requires authentication)
router.post('/', requireAuth, createOrder);

// GET /api/orders/:userId — Get orders for a user (requires authentication)
router.get('/:userId', requireAuth, getOrdersByUserId);

// GET /api/orders/detail/:orderId — Get a single order (requires authentication)
router.get('/detail/:orderId', requireAuth, getOrderById);

// PATCH /api/orders/:orderId/status — Update order status
router.patch('/:orderId/status', requireAuth, updateOrderStatus);

module.exports = router;
