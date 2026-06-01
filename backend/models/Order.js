/**
 * Order Model
 * Customer orders with items, status tracking, and delivery info.
 */
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  is_veg: {
    type: Boolean,
    default: true,
  },
  image_url: {
    type: String,
    default: null,
  },
});

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    index: true,
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    default: null,
  },
  restaurant_name: {
    type: String,
    default: '',
  },
  items: {
    type: [orderItemSchema],
    required: [true, 'Order must have at least one item'],
    validate: {
      validator: (items) => items.length > 0,
      message: 'Order must have at least one item',
    },
  },
  subtotal: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  delivery_fee: {
    type: Number,
    default: 0,
    min: 0,
  },
  tax: {
    type: Number,
    default: 0,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
    default: 'placed',
    index: true,
  },
  delivery_address: {
    type: String,
    default: '',
  },
  payment_method: {
    type: String,
    enum: ['cod', 'online', 'wallet', null],
    default: 'cod',
  },
  payment_status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  estimated_delivery_time: {
    type: Date,
    default: null,
  },
  delivered_at: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Index for user's orders sorted by date
orderSchema.index({ user_id: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
