-- ============================================================
-- BhojanGo Seed Data — Realistic Indian Food Data
-- Run this AFTER the schema SQL in Supabase SQL Editor.
-- ============================================================

-- ─── Categories ───────────────────────────────────────────
INSERT INTO categories (name, image_url) VALUES
  ('Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200'),
  ('Pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200'),
  ('Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200'),
  ('Chinese', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200'),
  ('South Indian', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200'),
  ('Desserts', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200'),
  ('Thali', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200'),
  ('Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200');

-- ─── Restaurants ──────────────────────────────────────────
INSERT INTO restaurants (id, name, image_url, cuisine, rating, delivery_time, delivery_fee, address, is_promoted) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Paradise Biryani House', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', 'Biryani, Mughlai, Kebabs', 4.5, '30-40 min', 30.00, 'Jubilee Hills, Hyderabad', TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Dosa Plaza', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600', 'South Indian, Dosa, Idli', 4.3, '20-30 min', 20.00, 'Koramangala, Bangalore', FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-333333333333', 'Bombay Kulfi & Chaat', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600', 'Street Food, Chaat, Desserts', 4.1, '15-25 min', 15.00, 'Andheri West, Mumbai', TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-444444444444', 'Dragon Wok', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600', 'Chinese, Thai, Asian', 4.2, '25-35 min', 25.00, 'Sector 18, Noida', FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-555555555555', 'La Pinoz Pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600', 'Pizza, Italian, Pasta', 4.4, '20-30 min', 0.00, 'Connaught Place, Delhi', TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-666666666666', 'Burger Singh', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', 'Burgers, American, Fries', 4.0, '15-25 min', 20.00, 'MG Road, Gurgaon', FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-777777777777', 'Sharma Ji Ka Dhaba', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600', 'North Indian, Thali, Punjabi', 4.6, '25-35 min', 10.00, 'Karol Bagh, Delhi', TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-888888888888', 'Gulab Sweets', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600', 'Desserts, Sweets, Mithai', 4.7, '20-30 min', 25.00, 'Chandni Chowk, Delhi', FALSE);

-- ─── Menu Items: Paradise Biryani House ───────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Hyderabadi Chicken Biryani', 'Aromatic basmati rice layered with tender chicken, saffron, and traditional spices', 320.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', 'Biryani', FALSE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Mutton Biryani', 'Slow-cooked mutton pieces with fragrant basmati rice and whole spices', 420.00, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', 'Biryani', FALSE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Veg Dum Biryani', 'Mixed vegetables layered with basmati rice, mint, and caramelized onions', 250.00, 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400', 'Biryani', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Seekh Kebab', 'Minced lamb kebabs grilled over charcoal with aromatic spices', 280.00, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', 'Starters', FALSE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Double Ka Meetha', 'Traditional Hyderabadi bread pudding with saffron and dry fruits', 150.00, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', 'Desserts', TRUE, FALSE);

-- ─── Menu Items: Dosa Plaza ───────────────────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Masala Dosa', 'Crispy golden crepe filled with spiced potato filling, served with sambar and chutney', 150.00, 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 'Dosa', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Mysore Masala Dosa', 'Spicy Mysore-style dosa with red chutney spread and potato filling', 170.00, 'https://images.unsplash.com/photo-1668236543090-82eb5eace6fc?w=400', 'Dosa', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Idli Sambar', 'Steamed rice cakes served with hot sambar and coconut chutney', 120.00, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', 'Breakfast', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Medu Vada', 'Crispy lentil donuts served with sambar and coconut chutney', 100.00, 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400', 'Snacks', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Filter Coffee', 'Traditional South Indian filter coffee with frothy milk', 60.00, 'https://images.unsplash.com/photo-1497515114889-2e3d8d06a6d0?w=400', 'Beverages', TRUE, FALSE);

-- ─── Menu Items: Bombay Kulfi & Chaat ─────────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-333333333333', 'Pani Puri', 'Crispy hollow puris filled with spiced water, tamarind, and potato', 80.00, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', 'Chaat', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-333333333333', 'Bhel Puri', 'Puffed rice mixed with sev, vegetables, and tangy chutneys', 90.00, 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400', 'Chaat', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-333333333333', 'Mango Kulfi', 'Creamy frozen dessert made with real Alphonso mangoes', 120.00, 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400', 'Desserts', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-333333333333', 'Dahi Puri', 'Crispy puris topped with curd, sweet chutney, and sev', 100.00, 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400', 'Chaat', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-333333333333', 'Rabri Falooda', 'Chilled rose milk with vermicelli, basil seeds, and thick rabri', 150.00, 'https://images.unsplash.com/photo-1571006682826-956b27a16e23?w=400', 'Desserts', TRUE, FALSE);

-- ─── Menu Items: Dragon Wok ───────────────────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-444444444444', 'Chicken Manchurian', 'Crispy chicken balls tossed in spicy Manchurian sauce', 260.00, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', 'Chinese', FALSE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-444444444444', 'Veg Hakka Noodles', 'Stir-fried noodles with mixed vegetables and soy sauce', 180.00, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', 'Noodles', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-444444444444', 'Schezwan Fried Rice', 'Spicy fried rice with schezwan sauce and vegetables', 200.00, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', 'Rice', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-444444444444', 'Spring Rolls', 'Crispy rolls stuffed with cabbage, carrots, and glass noodles', 160.00, 'https://images.unsplash.com/photo-1548507200-c72f5ee5bfc6?w=400', 'Starters', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-444444444444', 'Chilli Paneer', 'Paneer cubes tossed with bell peppers in chilli sauce', 220.00, 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400', 'Chinese', TRUE, FALSE);

-- ─── Menu Items: La Pinoz Pizza ───────────────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-555555555555', 'Margherita Pizza', 'Classic pizza with fresh mozzarella, tomato sauce, and basil', 249.00, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', 'Pizza', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-555555555555', 'Pepperoni Pizza', 'Loaded with spicy pepperoni slices and gooey mozzarella', 349.00, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', 'Pizza', FALSE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-555555555555', 'Paneer Tikka Pizza', 'Indian-style pizza topped with marinated paneer and bell peppers', 299.00, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', 'Pizza', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-555555555555', 'Garlic Breadsticks', 'Crispy breadsticks brushed with garlic butter and herbs', 149.00, 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400', 'Sides', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-555555555555', 'Pasta Alfredo', 'Creamy white sauce pasta with mushrooms and bell peppers', 229.00, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400', 'Pasta', TRUE, FALSE);

-- ─── Menu Items: Burger Singh ─────────────────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-666666666666', 'Tandoori Chicken Burger', 'Juicy tandoori chicken patty with mint mayo and crispy lettuce', 199.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', 'Burgers', FALSE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-666666666666', 'Paneer Royale Burger', 'Crispy paneer patty with spicy sauce and fresh vegetables', 179.00, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', 'Burgers', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-666666666666', 'Classic Fries', 'Golden crispy french fries with ketchup and mayo', 99.00, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', 'Sides', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-666666666666', 'Chicken Wings', 'Spicy buffalo chicken wings with ranch dipping sauce', 249.00, 'https://images.unsplash.com/photo-1608039829572-9b1234ef1702?w=400', 'Starters', FALSE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-666666666666', 'Chocolate Shake', 'Thick and creamy chocolate milkshake topped with whipped cream', 149.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', 'Beverages', TRUE, FALSE);

-- ─── Menu Items: Sharma Ji Ka Dhaba ───────────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-777777777777', 'Rajma Chawal Thali', 'Hearty rajma curry with steamed rice, salad, and pickle', 180.00, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', 'Thali', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-777777777777', 'Butter Chicken', 'Tender chicken in rich tomato-butter gravy with cream', 320.00, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', 'Main Course', FALSE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-777777777777', 'Dal Makhani', 'Slow-cooked black lentils in creamy buttery gravy', 220.00, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', 'Main Course', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-777777777777', 'Tandoori Roti', 'Fresh whole wheat bread baked in tandoor oven', 30.00, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', 'Breads', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-777777777777', 'Lassi', 'Refreshing sweet yogurt drink with cardamom', 80.00, 'https://images.unsplash.com/photo-1571006682826-956b27a16e23?w=400', 'Beverages', TRUE, FALSE);

-- ─── Menu Items: Gulab Sweets ─────────────────────────────
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_veg, is_bestseller) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-888888888888', 'Gulab Jamun', 'Soft milk-solid dumplings soaked in rose-flavored sugar syrup', 120.00, 'https://images.unsplash.com/photo-1666190070423-32893b23fa8e?w=400', 'Sweets', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-888888888888', 'Rasgulla', 'Spongy cottage cheese balls in light sugar syrup', 100.00, 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400', 'Sweets', TRUE, TRUE),
  ('a1b2c3d4-e5f6-7890-abcd-888888888888', 'Kaju Katli', 'Premium cashew fudge with silver foil topping', 250.00, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', 'Sweets', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-888888888888', 'Jalebi', 'Crispy spiral-shaped sweet soaked in saffron sugar syrup', 80.00, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', 'Sweets', TRUE, FALSE),
  ('a1b2c3d4-e5f6-7890-abcd-888888888888', 'Rasmalai', 'Flattened cottage cheese dumplings in sweetened saffron milk', 160.00, 'https://images.unsplash.com/photo-1571006682826-956b27a16e23?w=400', 'Sweets', TRUE, TRUE);
