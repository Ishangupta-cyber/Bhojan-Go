/**
 * RestaurantCard Component
 * Displays restaurant info in a card layout — image, name, cuisine, rating, delivery time.
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

const RestaurantCard = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Restaurant Image */}
      <Image
        source={{ uri: restaurant.image_url }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Promoted Badge */}
      {restaurant.is_promoted && (
        <View style={styles.promotedBadge}>
          <Text style={styles.promotedText}>⚡ Promoted</Text>
        </View>
      )}

      {/* Free Delivery Badge */}
      {restaurant.delivery_fee === 0 && (
        <View style={styles.freeDeliveryBadge}>
          <Text style={styles.freeDeliveryText}>FREE DELIVERY</Text>
        </View>
      )}

      {/* Info Section */}
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.cuisine} numberOfLines={1}>
          {restaurant.cuisine}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🕐 {restaurant.delivery_time}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>
            {restaurant.delivery_fee > 0
              ? `₹${restaurant.delivery_fee} delivery`
              : 'Free delivery'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.skeletonBase,
  },
  promotedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  promotedText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.accent,
  },
  freeDeliveryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  freeDeliveryText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textWhite,
    letterSpacing: 0.5,
  },
  info: {
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  cuisine: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  metaDot: {
    color: Colors.textLight,
    fontSize: 10,
  },
});

export default RestaurantCard;
