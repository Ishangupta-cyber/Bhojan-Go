/**
 * Category Model
 * Food categories (Biryani, Pizza, Burgers, etc.)
 */
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: 100,
  },
  image_url: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Text index for search
categorySchema.index({ name: 'text' });

module.exports = mongoose.model('Category', categorySchema);
