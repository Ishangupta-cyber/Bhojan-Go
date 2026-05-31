/**
 * Restaurant Detail Screen
 * Displays restaurant info — image, rating, delivery time, menu list,
 * and add-to-cart functionality.
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { getRestaurantById } from '../services/api';
import { useCart } from '../context/CartContext';
import MenuItem from '../components/MenuItem';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorView from '../components/ErrorView';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items, cartTotal, itemCount, addToCart, restaurantId: cartRestaurantId } = useCart();

  // Fetch restaurant details + menu
  const fetchRestaurant = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getRestaurantById(restaurantId);
      setRestaurant(response?.data || null);
    } catch (err) {
      setError(err.message || 'Failed to load restaurant');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantId]);

  // Handle adding item to cart
  const handleAddToCart = (menuItem) => {
    addToCart({
      ...menuItem,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
  };

  // Get quantity of a specific item in cart
  const getItemQuantity = (itemId) => {
    const cartItem = items.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) return <LoadingSkeleton type="detail" />;
  if (error) return <ErrorView message={error} onRetry={fetchRestaurant} />;
  if (!restaurant) return <ErrorView message="Restaurant not found" />;

  // Group menu items by category
  const menuByCategory = {};
  (restaurant.menu || []).forEach((item) => {
    const cat = item.category || 'Other';
    if (!menuByCategory[cat]) menuByCategory[cat] = [];
    menuByCategory[cat].push(item);
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Restaurant Image */}
        <Image
          source={{ uri: restaurant.image_url }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Restaurant Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statIcon}>⭐</Text>
              <Text style={styles.statValue}>{restaurant.rating}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statIcon}>🕐</Text>
              <Text style={styles.statValue}>{restaurant.delivery_time}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statIcon}>🚴</Text>
              <Text style={styles.statValue}>
                {restaurant.delivery_fee > 0
                  ? `₹${restaurant.delivery_fee}`
                  : 'FREE'}
              </Text>
            </View>
          </View>

          {/* Promoted badge */}
          {restaurant.is_promoted && (
            <View style={styles.promotedBadge}>
              <Text style={styles.promotedText}>⚡ Promoted</Text>
            </View>
          )}
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu</Text>

          {Object.entries(menuByCategory).map(([category, menuItems]) => (
            <View key={category} style={styles.menuCategory}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  quantity={getItemQuantity(item.id)}
                  onAdd={() => handleAddToCart(item)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Cart Bar */}
      {itemCount > 0 && (
        <TouchableOpacity
          style={styles.cartBar}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Cart' })}
          activeOpacity={0.9}
        >
          <View>
            <Text style={styles.cartBarItems}>
              {itemCount} item{itemCount > 1 ? 's' : ''} added
            </Text>
            <Text style={styles.cartBarRestaurant}>
              from {items[0]?.restaurantName || 'restaurant'}
            </Text>
          </View>
          <View style={styles.cartBarRight}>
            <Text style={styles.cartBarTotal}>₹{cartTotal.toFixed(0)}</Text>
            <Text style={styles.cartBarAction}>View Cart →</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroImage: {
    width: width,
    height: 260,
    backgroundColor: Colors.skeletonBase,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
  promotedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  promotedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  menuSection: {
    padding: 20,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  menuCategory: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cartBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  cartBarItems: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  cartBarRestaurant: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  cartBarRight: {
    alignItems: 'flex-end',
  },
  cartBarTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textWhite,
  },
  cartBarAction: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});

export default RestaurantDetailScreen;
