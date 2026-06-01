/**
 * Restaurant Model
 * Restaurant information with menu items as embedded references.
 */
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: 200,
  },
  image_url: {
    type: String,
    default: null,
  },
  cuisine: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  delivery_time: {
    type: String,
    default: '30-40 min',
  },
  delivery_fee: {
    type: Number,
    default: 0,
    min: 0,
  },
  min_order: {
    type: Number,
    default: 0,
  },
  price_for_two: {
    type: Number,
    default: 300,
  },
  address: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: 'New Delhi',
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  is_promoted: {
    type: Boolean,
    default: false,
  },
  is_open: {
    type: Boolean,
    default: true,
  },
  is_veg_only: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    default: null,
  },
  offer_text: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// Text index for search
restaurantSchema.index({ name: 'text', cuisine: 'text', city: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
