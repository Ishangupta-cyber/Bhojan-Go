/**
 * Category Controller
 * Handles food category retrieval with dummy data.
 */

const dummyCategories = [
  { id: '1', name: 'Pizza', icon: '🍕' },
  { id: '2', name: 'Burger', icon: '🍔' },
  { id: '3', name: 'Biryani', icon: '🍚' },
  { id: '4', name: 'Healthy', icon: '🥗' },
  { id: '5', name: 'Desserts', icon: '🍰' },
];

/**
 * GET /api/categories
 * Fetch all food categories
 */
const getAllCategories = async (req, res, next) => {
  try {
    res.json({
      success: true,
      count: dummyCategories.length,
      data: dummyCategories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCategories };
