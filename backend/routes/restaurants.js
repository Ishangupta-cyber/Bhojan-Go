/**
 * Restaurant Routes
 * Public endpoints for browsing restaurants.
 */
const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById } = require('../controllers/restaurantController');

// GET /api/restaurants — List all restaurants (with optional search/filter)
router.get('/', getAllRestaurants);

// GET /api/restaurants/:id — Get restaurant details with menu
router.get('/:id', getRestaurantById);

module.exports = router;
