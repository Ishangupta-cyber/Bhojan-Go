/**
 * Restaurant Controller
 * Handles all restaurant-related business logic with MongoDB.
 */
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { AppError } = require('../middleware/errorHandler');

/**
 * GET /api/restaurants
 * Fetch all restaurants with optional search, filter, and pagination
 */
const getAllRestaurants = async (req, res, next) => {
  try {
    const { search, cuisine, promoted, city, veg_only, is_open, page = 1, limit = 20 } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (cuisine) {
      filter.cuisine = { $regex: cuisine, $options: 'i' };
    }

    if (promoted === 'true') {
      filter.is_promoted = true;
    }

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (veg_only === 'true') {
      filter.is_veg_only = true;
    }

    if (is_open === 'true') {
      filter.is_open = true;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [restaurants, total] = await Promise.all([
      Restaurant.find(filter)
        .sort({ is_promoted: -1, rating: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Restaurant.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: restaurants.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/restaurants/:id
 * Fetch a single restaurant with its menu items
 */
const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id).lean();

    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }

    // Fetch menu items for this restaurant
    const menu = await MenuItem.find({ restaurant_id: id, is_available: true })
      .sort({ is_bestseller: -1, category: 1, name: 1 })
      .lean();

    // Group menu by category
    const menuByCategory = {};
    menu.forEach((item) => {
      const cat = item.category || 'Other';
      if (!menuByCategory[cat]) menuByCategory[cat] = [];
      menuByCategory[cat].push(item);
    });

    res.json({
      success: true,
      data: {
        ...restaurant,
        menu,
        menuByCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/restaurants/:id/menu
 * Fetch only the menu items for a restaurant
 */
const getRestaurantMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, veg } = req.query;

    const filter = { restaurant_id: id, is_available: true };

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (veg === 'true') {
      filter.is_veg = true;
    }

    const menu = await MenuItem.find(filter)
      .sort({ is_bestseller: -1, category: 1, name: 1 })
      .lean();

    res.json({
      success: true,
      count: menu.length,
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRestaurants, getRestaurantById, getRestaurantMenu };
