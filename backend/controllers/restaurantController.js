/**
 * Restaurant Controller
 * Handles all restaurant-related business logic with dummy data.
 */

const dummyRestaurants = [
  {
    id: '1',
    name: 'Domino\'s Pizza',
    cuisine: 'Pizza, Fast Food',
    rating: 4.5,
    delivery_time: '25-30',
    min_order: 150,
    price_for_two: 400,
    is_open: true,
    is_promoted: true,
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  },
  {
    id: '2',
    name: 'Burger King',
    cuisine: 'Burger, Fast Food',
    rating: 4.2,
    delivery_time: '30-40',
    min_order: 100,
    price_for_two: 300,
    is_open: true,
    is_promoted: false,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  },
  {
    id: '3',
    name: 'Behrouz Biryani',
    cuisine: 'Biryani, North Indian',
    rating: 4.8,
    delivery_time: '40-50',
    min_order: 250,
    price_for_two: 600,
    is_open: true,
    is_promoted: true,
    image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
  }
];

const dummyMenuItems = [
  { id: '1', restaurant_id: '1', name: 'Margherita Pizza', price: 200, is_veg: true, is_bestseller: true, description: 'Classic cheese pizza' },
  { id: '2', restaurant_id: '1', name: 'Pepperoni Pizza', price: 350, is_veg: false, is_bestseller: true, description: 'Pepperoni with extra cheese' },
  { id: '3', restaurant_id: '2', name: 'Whopper', price: 150, is_veg: false, is_bestseller: true, description: 'Signature burger' },
  { id: '4', restaurant_id: '2', name: 'Veggie Burger', price: 120, is_veg: true, is_bestseller: false, description: 'Crispy veg patty' },
  { id: '5', restaurant_id: '3', name: 'Chicken Biryani', price: 400, is_veg: false, is_bestseller: true, description: 'Aromatic basmati rice' },
];

/**
 * GET /api/restaurants
 * Fetch all restaurants with optional search/filter
 */
const getAllRestaurants = async (req, res, next) => {
  try {
    const { search, cuisine, promoted } = req.query;
    let data = [...dummyRestaurants];

    if (search) {
      data = data.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()));
    }
    if (cuisine) {
      data = data.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
    }
    if (promoted === 'true') {
      data = data.filter(r => r.is_promoted);
    }

    res.json({
      success: true,
      count: data.length,
      data,
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
    const restaurant = dummyRestaurants.find(r => r.id === id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const menu = dummyMenuItems.filter(m => m.restaurant_id === id);

    res.json({
      success: true,
      data: {
        ...restaurant,
        menu,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRestaurants, getRestaurantById };
