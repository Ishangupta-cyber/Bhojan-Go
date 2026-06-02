/**
 * BhojanGo Database Seed Script
 * Populates MongoDB with realistic Indian food data.
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in .env');
  process.exit(1);
}

// ─── Seed Data ─────────────────────────────────────────────

const categories = [
  { name: 'Biryani', image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200', icon: '🍚', order: 1 },
  { name: 'Pizza', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200', icon: '🍕', order: 2 },
  { name: 'Burgers', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', icon: '🍔', order: 3 },
  { name: 'Chinese', image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200', icon: '🥡', order: 4 },
  { name: 'South Indian', image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200', icon: '🥘', order: 5 },
  { name: 'Desserts', image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200', icon: '🍰', order: 6 },
  { name: 'Thali', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200', icon: '🍛', order: 7 },
  { name: 'Street Food', image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200', icon: '🧆', order: 8 },
  { name: 'North Indian', image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', icon: '🍲', order: 9 },
  { name: 'Rolls', image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', icon: '🌯', order: 10 },
  { name: 'Ice Cream', image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200', icon: '🍦', order: 11 },
  { name: 'Beverages', image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200', icon: '🥤', order: 12 },
];

const restaurants = [
  {
    name: 'Paradise Biryani House',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
    cuisine: 'Biryani, Mughlai, Kebabs',
    rating: 4.5,
    delivery_time: '30-40 min',
    delivery_fee: 30,
    min_order: 200,
    price_for_two: 500,
    address: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    is_promoted: true,
    is_open: true,
    offer_text: '20% OFF on first order',
  },
  {
    name: 'Dosa Plaza',
    image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600',
    cuisine: 'South Indian, Dosa, Idli',
    rating: 4.3,
    delivery_time: '20-30 min',
    delivery_fee: 20,
    min_order: 100,
    price_for_two: 300,
    address: 'Koramangala, Bangalore',
    city: 'Bangalore',
    is_promoted: false,
    is_open: true,
  },
  {
    name: 'Bombay Kulfi & Chaat',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
    cuisine: 'Street Food, Chaat, Desserts',
    rating: 4.1,
    delivery_time: '15-25 min',
    delivery_fee: 15,
    min_order: 100,
    price_for_two: 250,
    address: 'Andheri West, Mumbai',
    city: 'Mumbai',
    is_promoted: true,
    is_open: true,
    offer_text: 'Free delivery on orders above ₹199',
  },
  {
    name: 'Dragon Wok',
    image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600',
    cuisine: 'Chinese, Thai, Asian',
    rating: 4.2,
    delivery_time: '25-35 min',
    delivery_fee: 25,
    min_order: 150,
    price_for_two: 450,
    address: 'Sector 18, Noida',
    city: 'Noida',
    is_promoted: false,
    is_open: true,
  },
  {
    name: 'La Pinoz Pizza',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
    cuisine: 'Pizza, Italian, Pasta',
    rating: 4.4,
    delivery_time: '20-30 min',
    delivery_fee: 0,
    min_order: 200,
    price_for_two: 400,
    address: 'Connaught Place, Delhi',
    city: 'New Delhi',
    is_promoted: true,
    is_open: true,
    offer_text: 'FREE DELIVERY on all orders!',
  },
  {
    name: 'Burger Singh',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    cuisine: 'Burgers, American, Fries',
    rating: 4.0,
    delivery_time: '15-25 min',
    delivery_fee: 20,
    min_order: 100,
    price_for_two: 300,
    address: 'MG Road, Gurgaon',
    city: 'Gurgaon',
    is_promoted: false,
    is_open: true,
  },
  {
    name: 'Sharma Ji Ka Dhaba',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    cuisine: 'North Indian, Thali, Punjabi',
    rating: 4.6,
    delivery_time: '25-35 min',
    delivery_fee: 10,
    min_order: 150,
    price_for_two: 350,
    address: 'Karol Bagh, Delhi',
    city: 'New Delhi',
    is_promoted: true,
    is_open: true,
    offer_text: '₹50 OFF on Thali orders',
  },
  {
    name: 'Gulab Sweets',
    image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600',
    cuisine: 'Desserts, Sweets, Mithai',
    rating: 4.7,
    delivery_time: '20-30 min',
    delivery_fee: 25,
    min_order: 100,
    price_for_two: 250,
    address: 'Chandni Chowk, Delhi',
    city: 'New Delhi',
    is_promoted: false,
    is_open: true,
  },
  {
    name: 'Rolls Mania',
    image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600',
    cuisine: 'Rolls, Wraps, Fast Food',
    rating: 4.1,
    delivery_time: '15-25 min',
    delivery_fee: 15,
    min_order: 100,
    price_for_two: 250,
    address: 'Hauz Khas, Delhi',
    city: 'New Delhi',
    is_promoted: false,
    is_open: true,
    offer_text: 'Buy 2 Rolls Get 1 Free',
  },
  {
    name: 'Ice Cream Dreamery',
    image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600',
    cuisine: 'Ice Cream, Frozen Desserts, Shakes',
    rating: 4.3,
    delivery_time: '15-20 min',
    delivery_fee: 20,
    min_order: 150,
    price_for_two: 300,
    address: 'Khan Market, Delhi',
    city: 'New Delhi',
    is_promoted: true,
    is_open: true,
  },
  {
    name: 'Behrouz Biryani',
    image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600',
    cuisine: 'Biryani, North Indian, Kebabs',
    rating: 4.5,
    delivery_time: '35-45 min',
    delivery_fee: 0,
    min_order: 250,
    price_for_two: 600,
    address: 'Saket, Delhi',
    city: 'New Delhi',
    is_promoted: true,
    is_open: true,
    offer_text: 'FREE DELIVERY | 15% OFF',
  },
  {
    name: 'Chai Point',
    image_url: 'https://images.unsplash.com/photo-1497515114889-2e3d8d06a6d0?w=600',
    cuisine: 'Beverages, Snacks, Breakfast',
    rating: 4.2,
    delivery_time: '10-20 min',
    delivery_fee: 10,
    min_order: 80,
    price_for_two: 200,
    address: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    is_promoted: false,
    is_open: true,
  },
];

// Menu items mapped by restaurant name
const menuItemsByRestaurant = {
  'Paradise Biryani House': [
    { name: 'Hyderabadi Chicken Biryani', description: 'Aromatic basmati rice layered with tender chicken, saffron, and traditional spices', price: 320, image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', category: 'Biryani', is_veg: false, is_bestseller: true, spice_level: 'hot', serving_size: 'Serves 1' },
    { name: 'Mutton Biryani', description: 'Slow-cooked mutton pieces with fragrant basmati rice and whole spices', price: 420, image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', category: 'Biryani', is_veg: false, is_bestseller: true, spice_level: 'hot', serving_size: 'Serves 1' },
    { name: 'Veg Dum Biryani', description: 'Mixed vegetables layered with basmati rice, mint, and caramelized onions', price: 250, image_url: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400', category: 'Biryani', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: 'Serves 1' },
    { name: 'Seekh Kebab', description: 'Minced lamb kebabs grilled over charcoal with aromatic spices', price: 280, image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', category: 'Starters', is_veg: false, is_bestseller: false, spice_level: 'medium', serving_size: '4 pieces' },
    { name: 'Double Ka Meetha', description: 'Traditional Hyderabadi bread pudding with saffron and dry fruits', price: 150, image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', category: 'Desserts', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: '1 bowl' },
    { name: 'Chicken 65', description: 'Spicy deep-fried chicken bites with curry leaves and red chilies', price: 260, image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400', category: 'Starters', is_veg: false, is_bestseller: true, spice_level: 'hot', serving_size: '8 pieces' },
  ],
  'Dosa Plaza': [
    { name: 'Masala Dosa', description: 'Crispy golden crepe filled with spiced potato filling, served with sambar and chutney', price: 150, image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', category: 'Dosa', is_veg: true, is_bestseller: true, spice_level: 'medium', serving_size: '1 dosa' },
    { name: 'Mysore Masala Dosa', description: 'Spicy Mysore-style dosa with red chutney spread and potato filling', price: 170, image_url: 'https://images.unsplash.com/photo-1668236543090-82eb5eace6fc?w=400', category: 'Dosa', is_veg: true, is_bestseller: true, spice_level: 'hot', serving_size: '1 dosa' },
    { name: 'Idli Sambar', description: 'Steamed rice cakes served with hot sambar and coconut chutney', price: 120, image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', category: 'Breakfast', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: '2 idli' },
    { name: 'Medu Vada', description: 'Crispy lentil donuts served with sambar and coconut chutney', price: 100, image_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400', category: 'Snacks', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: '2 vada' },
    { name: 'Filter Coffee', description: 'Traditional South Indian filter coffee with frothy milk', price: 60, image_url: 'https://images.unsplash.com/photo-1497515114889-2e3d8d06a6d0?w=400', category: 'Beverages', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 cup' },
    { name: 'Rava Dosa', description: 'Crispy semolina crepe with onions and herbs, served with chutneys', price: 160, image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', category: 'Dosa', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: '1 dosa' },
  ],
  'Bombay Kulfi & Chaat': [
    { name: 'Pani Puri', description: 'Crispy hollow puris filled with spiced water, tamarind, and potato', price: 80, image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Chaat', is_veg: true, is_bestseller: true, spice_level: 'hot', serving_size: '6 puris' },
    { name: 'Bhel Puri', description: 'Puffed rice mixed with sev, vegetables, and tangy chutneys', price: 90, image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400', category: 'Chaat', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: '1 plate' },
    { name: 'Mango Kulfi', description: 'Creamy frozen dessert made with real Alphonso mangoes', price: 120, image_url: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400', category: 'Desserts', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '1 stick' },
    { name: 'Dahi Puri', description: 'Crispy puris topped with curd, sweet chutney, and sev', price: 100, image_url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400', category: 'Chaat', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: '6 puris' },
    { name: 'Rabri Falooda', description: 'Chilled rose milk with vermicelli, basil seeds, and thick rabri', price: 150, image_url: 'https://images.unsplash.com/photo-1571006682826-956b27a16e23?w=400', category: 'Beverages', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 glass' },
    { name: 'Sev Puri', description: 'Flat puris topped with onions, tomatoes, chutneys, and crispy sev', price: 90, image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Chaat', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: '6 puris' },
  ],
  'Dragon Wok': [
    { name: 'Chicken Manchurian', description: 'Crispy chicken balls tossed in spicy Manchurian sauce', price: 260, image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', category: 'Chinese', is_veg: false, is_bestseller: true, spice_level: 'hot', serving_size: 'Serves 2' },
    { name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with mixed vegetables and soy sauce', price: 180, image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', category: 'Noodles', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: 'Serves 1' },
    { name: 'Schezwan Fried Rice', description: 'Spicy fried rice with schezwan sauce and vegetables', price: 200, image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', category: 'Rice', is_veg: true, is_bestseller: true, spice_level: 'hot', serving_size: 'Serves 1' },
    { name: 'Spring Rolls', description: 'Crispy rolls stuffed with cabbage, carrots, and glass noodles', price: 160, image_url: 'https://images.unsplash.com/photo-1548507200-c72f5ee5bfc6?w=400', category: 'Starters', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: '4 pieces' },
    { name: 'Chilli Paneer', description: 'Paneer cubes tossed with bell peppers in chilli sauce', price: 220, image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400', category: 'Chinese', is_veg: true, is_bestseller: false, spice_level: 'hot', serving_size: 'Serves 2' },
    { name: 'Hot & Sour Soup', description: 'Tangy and spicy soup with tofu, mushrooms, and bamboo shoots', price: 140, image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', category: 'Soups', is_veg: true, is_bestseller: false, spice_level: 'hot', serving_size: '1 bowl' },
  ],
  'La Pinoz Pizza': [
    { name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil', price: 249, image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', category: 'Pizza', is_veg: true, is_bestseller: true, spice_level: 'mild', serving_size: 'Medium (10")' },
    { name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni slices and gooey mozzarella', price: 349, image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', category: 'Pizza', is_veg: false, is_bestseller: true, spice_level: 'medium', serving_size: 'Medium (10")' },
    { name: 'Paneer Tikka Pizza', description: 'Indian-style pizza topped with marinated paneer and bell peppers', price: 299, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', category: 'Pizza', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: 'Medium (10")' },
    { name: 'Garlic Breadsticks', description: 'Crispy breadsticks brushed with garlic butter and herbs', price: 149, image_url: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400', category: 'Sides', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: '6 sticks' },
    { name: 'Pasta Alfredo', description: 'Creamy white sauce pasta with mushrooms and bell peppers', price: 229, image_url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400', category: 'Pasta', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: 'Serves 1' },
    { name: 'Farmhouse Pizza', description: 'Loaded with mushrooms, olives, capsicum, and onion', price: 329, image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', category: 'Pizza', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: 'Medium (10")' },
  ],
  'Burger Singh': [
    { name: 'Tandoori Chicken Burger', description: 'Juicy tandoori chicken patty with mint mayo and crispy lettuce', price: 199, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'Burgers', is_veg: false, is_bestseller: true, spice_level: 'medium', serving_size: '1 burger' },
    { name: 'Paneer Royale Burger', description: 'Crispy paneer patty with spicy sauce and fresh vegetables', price: 179, image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', category: 'Burgers', is_veg: true, is_bestseller: true, spice_level: 'medium', serving_size: '1 burger' },
    { name: 'Classic Fries', description: 'Golden crispy french fries with ketchup and mayo', price: 99, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', category: 'Sides', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: 'Regular' },
    { name: 'Chicken Wings', description: 'Spicy buffalo chicken wings with ranch dipping sauce', price: 249, image_url: 'https://images.unsplash.com/photo-1608039829572-9b1234ef1702?w=400', category: 'Starters', is_veg: false, is_bestseller: false, spice_level: 'hot', serving_size: '6 wings' },
    { name: 'Chocolate Shake', description: 'Thick and creamy chocolate milkshake topped with whipped cream', price: 149, image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', category: 'Beverages', is_veg: true, is_bestseller: false, spice_level: null, serving_size: 'Regular' },
    { name: 'Aloo Tikki Burger', description: 'Crispy potato patty with tangy tamarind chutney and fresh veggies', price: 129, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'Burgers', is_veg: true, is_bestseller: false, spice_level: 'mild', serving_size: '1 burger' },
  ],
  'Sharma Ji Ka Dhaba': [
    { name: 'Rajma Chawal Thali', description: 'Hearty rajma curry with steamed rice, salad, and pickle', price: 180, image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', category: 'Thali', is_veg: true, is_bestseller: true, spice_level: 'medium', serving_size: '1 thali' },
    { name: 'Butter Chicken', description: 'Tender chicken in rich tomato-butter gravy with cream', price: 320, image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', category: 'Main Course', is_veg: false, is_bestseller: true, spice_level: 'medium', serving_size: 'Serves 2' },
    { name: 'Dal Makhani', description: 'Slow-cooked black lentils in creamy buttery gravy', price: 220, image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', category: 'Main Course', is_veg: true, is_bestseller: true, spice_level: 'mild', serving_size: 'Serves 2' },
    { name: 'Tandoori Roti', description: 'Fresh whole wheat bread baked in tandoor oven', price: 30, image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', category: 'Breads', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 piece' },
    { name: 'Lassi', description: 'Refreshing sweet yogurt drink with cardamom', price: 80, image_url: 'https://images.unsplash.com/photo-1571006682826-956b27a16e23?w=400', category: 'Beverages', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 glass' },
    { name: 'Kadhi Chawal', description: 'Tangy yogurt-based curry with pakoras, served with rice', price: 180, image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', category: 'Main Course', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: 'Serves 1' },
    { name: 'Paneer Butter Masala', description: 'Soft paneer cubes in rich, creamy tomato-based gravy', price: 280, image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', category: 'Main Course', is_veg: true, is_bestseller: true, spice_level: 'medium', serving_size: 'Serves 2' },
  ],
  'Gulab Sweets': [
    { name: 'Gulab Jamun', description: 'Soft milk-solid dumplings soaked in rose-flavored sugar syrup', price: 120, image_url: 'https://images.unsplash.com/photo-1666190070423-32893b23fa8e?w=400', category: 'Sweets', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '4 pieces' },
    { name: 'Rasgulla', description: 'Spongy cottage cheese balls in light sugar syrup', price: 100, image_url: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400', category: 'Sweets', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '4 pieces' },
    { name: 'Kaju Katli', description: 'Premium cashew fudge with silver foil topping', price: 250, image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', category: 'Sweets', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '250g box' },
    { name: 'Jalebi', description: 'Crispy spiral-shaped sweet soaked in saffron sugar syrup', price: 80, image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Sweets', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 plate' },
    { name: 'Rasmalai', description: 'Flattened cottage cheese dumplings in sweetened saffron milk', price: 160, image_url: 'https://images.unsplash.com/photo-1571006682826-956b27a16e23?w=400', category: 'Sweets', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '4 pieces' },
  ],
  'Rolls Mania': [
    { name: 'Chicken Roll', description: 'Spicy chicken tikka wrapped in a flaky paratha with onions and chutney', price: 140, image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', category: 'Rolls', is_veg: false, is_bestseller: true, spice_level: 'hot', serving_size: '1 roll' },
    { name: 'Paneer Roll', description: 'Grilled paneer tikka with peppers and spicy mayo in a paratha wrap', price: 120, image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', category: 'Rolls', is_veg: true, is_bestseller: true, spice_level: 'medium', serving_size: '1 roll' },
    { name: 'Egg Roll', description: 'Classic Kolkata-style egg roll with onions, cucumber, and sauce', price: 80, image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', category: 'Rolls', is_veg: false, is_bestseller: false, spice_level: 'mild', serving_size: '1 roll' },
    { name: 'Double Chicken Roll', description: 'Extra loaded chicken roll with double the filling and cheese', price: 190, image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', category: 'Rolls', is_veg: false, is_bestseller: false, spice_level: 'hot', serving_size: '1 roll' },
  ],
  'Ice Cream Dreamery': [
    { name: 'Belgian Chocolate Scoop', description: 'Rich and creamy Belgian dark chocolate ice cream', price: 120, image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', category: 'Ice Cream', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '1 scoop' },
    { name: 'Mango Sorbet', description: 'Refreshing Alphonso mango sorbet, dairy-free', price: 130, image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', category: 'Ice Cream', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '1 scoop' },
    { name: 'Butterscotch Sundae', description: 'Butterscotch ice cream topped with caramel, nuts, and wafer', price: 180, image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', category: 'Ice Cream', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 sundae' },
    { name: 'Oreo Milkshake', description: 'Thick Oreo cookie milkshake with vanilla ice cream and whipped cream', price: 160, image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', category: 'Beverages', is_veg: true, is_bestseller: false, spice_level: null, serving_size: 'Regular' },
    { name: 'Brownie a la Mode', description: 'Warm chocolate brownie topped with vanilla ice cream and chocolate sauce', price: 220, image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', category: 'Desserts', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '1 serving' },
  ],
  'Behrouz Biryani': [
    { name: 'Signature Chicken Biryani', description: 'Their flagship slow-cooked biryani with aromatic spices and tender chicken', price: 380, image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', category: 'Biryani', is_veg: false, is_bestseller: true, spice_level: 'hot', serving_size: 'Serves 1' },
    { name: 'Royal Mutton Biryani', description: 'Premium mutton biryani with saffron and dry fruits', price: 480, image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', category: 'Biryani', is_veg: false, is_bestseller: true, spice_level: 'hot', serving_size: 'Serves 1' },
    { name: 'Subz-e-Bahar Biryani', description: 'Royal vegetable biryani with seasonal veggies and aromatic rice', price: 280, image_url: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400', category: 'Biryani', is_veg: true, is_bestseller: false, spice_level: 'medium', serving_size: 'Serves 1' },
    { name: 'Galouti Kebab', description: 'Melt-in-your-mouth Lucknowi kebabs with secret spice blend', price: 340, image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', category: 'Starters', is_veg: false, is_bestseller: true, spice_level: 'medium', serving_size: '6 pieces' },
    { name: 'Phirni', description: 'Creamy ground rice pudding flavored with cardamom and saffron', price: 130, image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', category: 'Desserts', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 pot' },
  ],
  'Chai Point': [
    { name: 'Ginger Chai', description: 'Classic Indian masala chai with fresh ginger', price: 30, image_url: 'https://images.unsplash.com/photo-1497515114889-2e3d8d06a6d0?w=400', category: 'Beverages', is_veg: true, is_bestseller: true, spice_level: null, serving_size: '1 cup' },
    { name: 'Elaichi Chai', description: 'Aromatic tea brewed with cardamom pods', price: 35, image_url: 'https://images.unsplash.com/photo-1497515114889-2e3d8d06a6d0?w=400', category: 'Beverages', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '1 cup' },
    { name: 'Samosa', description: 'Crispy pastry filled with spiced potato and peas', price: 30, image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Snacks', is_veg: true, is_bestseller: true, spice_level: 'medium', serving_size: '2 pieces' },
    { name: 'Vada Pav', description: 'Mumbai-style spiced potato fritter in a bun with chutneys', price: 40, image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400', category: 'Snacks', is_veg: true, is_bestseller: true, spice_level: 'hot', serving_size: '1 vada pav' },
    { name: 'Butter Toast', description: 'Toasted bread with butter, served with chai', price: 40, image_url: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400', category: 'Snacks', is_veg: true, is_bestseller: false, spice_level: null, serving_size: '2 slices' },
  ],
};

// ─── Seed Function ─────────────────────────────────────────
const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Connected to database');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Category.deleteMany({});
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});

    // Seed categories
    console.log('📂 Seeding categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} categories created`);

    // Seed restaurants
    console.log('🏪 Seeding restaurants...');
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`✅ ${createdRestaurants.length} restaurants created`);

    // Seed menu items
    console.log('🍽️  Seeding menu items...');
    let totalMenuItems = 0;

    for (const restaurant of createdRestaurants) {
      const menuData = menuItemsByRestaurant[restaurant.name];

      if (menuData && menuData.length > 0) {
        const menuItemsWithRef = menuData.map((item) => ({
          ...item,
          restaurant_id: restaurant._id,
        }));

        const createdItems = await MenuItem.insertMany(menuItemsWithRef);
        totalMenuItems += createdItems.length;
      }
    }

    console.log(`✅ ${totalMenuItems} menu items created`);

    // Summary
    console.log('\n🎉 Seed completed successfully!');
    console.log('─────────────────────────────');
    console.log(`📂 Categories:  ${createdCategories.length}`);
    console.log(`🏪 Restaurants: ${createdRestaurants.length}`);
    console.log(`🍽️  Menu Items: ${totalMenuItems}`);
    console.log('─────────────────────────────');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();
