/**
 * Order Controller
 * Handles order creation and retrieval using an in-memory array.
 **/

let dummyOrders = [];

/**
 * POST /api/orders
 * Create a new order
 */
const createOrder = async (req, res, next) => {
  try {
    const { restaurant_id, restaurant_name, items, subtotal, delivery_fee, total, delivery_address } = req.body;

    // Validate required fields
    if (!restaurant_id || !items || !items.length || !total) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: restaurant_id, items, and total are required',
      });
    }

    // In a real app, userId would come from the verified token
    // For this local demo, we'll extract it from the Auth header if present
    const authHeader = req.headers.authorization;
    let userId = 'demo-user';
    if (authHeader && authHeader.startsWith('Bearer ')) {
      userId = authHeader.split(' ')[1];
    }

    const newOrder = {
      id: Date.now().toString(),
      user_id: userId,
      restaurant_id,
      restaurant_name: restaurant_name || '',
      items,
      subtotal: subtotal || total,
      delivery_fee: delivery_fee || 0,
      total,
      status: 'placed',
      delivery_address: delivery_address || '',
      created_at: new Date().toISOString()
    };

    dummyOrders.push(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * GET /api/orders/:userId
 * Get all orders for a specific user
 */
const getOrdersByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userOrders = dummyOrders
      .filter(o => o.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json({
      success: true,
      count: userOrders.length,
      data: userOrders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrdersByUserId };
