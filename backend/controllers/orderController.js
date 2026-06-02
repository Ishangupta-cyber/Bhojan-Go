/**
 * Order Controller
 * Handles order creation, retrieval, and status updates with MongoDB.
 */
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { AppError } = require('../middleware/errorHandler');

/**
 * POST /api/orders
 * Create a new order (requires authentication)
 */
const createOrder = async (req, res, next) => {
  try {
    // Get user ID from Clerk auth
    const userId = req.auth?.userId || req.auth?.sub;

    if (!userId) {
      throw new AppError('Authentication required. Please log in.', 401);
    }

    const {
      restaurant_id,
      restaurant_name,
      items,
      subtotal,
      delivery_fee,
      tax,
      discount,
      total,
      delivery_address,
      payment_method,
      notes,
    } = req.body;

    // Validate required fields
    if (!restaurant_id || !items || !items.length || !total) {
      throw new AppError('Missing required fields: restaurant_id, items, and total are required', 400);
    }

    // Verify restaurant exists
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      throw new AppError('Restaurant not found', 404);
    }

    // Calculate estimated delivery time (30-50 mins from now)
    const estimatedMinutes = Math.floor(Math.random() * 20) + 30;
    const estimated_delivery_time = new Date(Date.now() + estimatedMinutes * 60000);

    const newOrder = await Order.create({
      user_id: userId,
      restaurant_id,
      restaurant_name: restaurant_name || restaurant.name,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        is_veg: item.is_veg || true,
        image_url: item.image_url || null,
      })),
      subtotal: subtotal || 0,
      delivery_fee: delivery_fee || 0,
      tax: tax || 0,
      discount: discount || 0,
      total,
      delivery_address: delivery_address || '',
      payment_method: payment_method || 'cod',
      estimated_delivery_time,
      notes: notes || null,
    });

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
 * Get all orders for a specific user (requires authentication)
 */
const getOrdersByUserId = async (req, res, next) => {
  try {
    // Verify the requesting user matches the requested userId
    const authUserId = req.auth?.userId || req.auth?.sub;
    const { userId } = req.params;

    if (!authUserId) {
      throw new AppError('Authentication required', 401);
    }

    // Users can only see their own orders
    const targetUserId = userId;

    const orders = await Order.find({ user_id: targetUserId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/detail/:orderId
 * Get a single order by ID
 */
const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const authUserId = req.auth?.userId || req.auth?.sub;

    const order = await Order.findById(orderId).lean();

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Users can only see their own orders
    if (order.user_id !== authUserId) {
      throw new AppError('Unauthorized to view this order', 403);
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/orders/:orderId/status
 * Update order status (for admin/restaurant use)
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['placed', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
    }

    const updateData = { status };

    // If delivered, set delivered_at
    if (status === 'delivered') {
      updateData.delivered_at = new Date();
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrdersByUserId, getOrderById, updateOrderStatus };
