/**
 * Category Routes
 * Public endpoint for food categories.
 */
const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById } = require('../controllers/categoryController');

// GET /api/categories — List all food categories
router.get('/', getAllCategories);

// GET /api/categories/:id — Get single category
router.get('/:id', getCategoryById);

module.exports = router;
