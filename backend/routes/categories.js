/**
 * Category Routes
 * Public endpoint for food categories.
 */
const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/categoryController');

// GET /api/categories — List all food categories
router.get('/', getAllCategories);

module.exports = router;
