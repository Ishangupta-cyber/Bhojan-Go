/**
 * MenuItem Model
 * Individual food items within a restaurant's menu.
 */
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant ID is required'],
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  original_price: {
    type: Number,
    default: null,
  },
  image_url: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    default: 'Main Course',
  },
  is_veg: {
    type: Boolean,
    default: true,
  },
  is_bestseller: {
    type: Boolean,
    default: false,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  spice_level: {
    type: String,
    enum: ['mild', 'medium', 'hot', null],
    default: null,
  },
  serving_size: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Text index for search
menuItemSchema.index({ name: 'text', category: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
