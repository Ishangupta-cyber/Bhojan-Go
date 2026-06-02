/**
 * Category Controller
 * Handles food category retrieval with MongoDB.
 */
const Category = require('../models/Category');
const { AppError } = require('../middleware/errorHandler');

/**
 * GET /api/categories
 * Fetch all food categories
 */
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .sort({ order: 1, name: 1 })
      .lean();

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/categories/:id
 * Fetch a single category by ID
 */
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).lean();

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCategories, getCategoryById };
