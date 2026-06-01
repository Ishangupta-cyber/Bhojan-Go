/**
 * Restaurant Routes
 * Public endpoints for browsing restaurants and menus.
 */
const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById, getRestaurantMenu } = require('../controllers/restaurantController');

// GET /api/restaurants — List all restaurants (with optional search/filter/pagination)
router.get('/', getAllRestaurants);

// GET /api/restaurants/:id — Get restaurant details with menu
router.get('/:id', getRestaurantById);

// GET /api/restaurants/:id/menu — Get menu items for a restaurant
router.get('/:id/menu', getRestaurantMenu);

module.exports = router;
