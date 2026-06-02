/**
 * MenuItem Component
 * Displays a single menu item with veg/non-veg indicator,
 * name, description, price, and add-to-cart button.
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const MenuItem = ({ item, quantity, onAdd }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        {/* Veg/Non-veg indicator */}
        <View
          style={[
            styles.vegIndicator,
            { borderColor: item.is_veg ? Colors.veg : Colors.nonVeg },
          ]}
        >
          <View
            style={[
              styles.vegDot,
              { backgroundColor: item.is_veg ? Colors.veg : Colors.nonVeg },
            ]}
          />
        </View>

        {/* Bestseller badge */}
        {item.is_bestseller && (
          <View style={styles.bestsellerBadge}>
            <Text style={styles.bestsellerText}>★ Bestseller</Text>
          </View>
        )}

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price.toFixed(0)}</Text>

        {item.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
      </View>

      {/* Image + Add Button */}
      <View style={styles.actionSection}>
        {item.image_url ? (
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}

        <TouchableOpacity
          style={[styles.addButton, quantity > 0 && styles.addButtonActive]}
          onPress={onAdd}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.addButtonText, quantity > 0 && styles.addButtonTextActive]}
          >
            {quantity > 0 ? `Added (${quantity})` : 'ADD'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  infoSection: {
    flex: 1,
    paddingRight: 16,
  },
  vegIndicator: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  vegDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  bestsellerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  bestsellerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 18,
  },
  actionSection: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: 110,
    height: 90,
    borderRadius: 12,
    backgroundColor: Colors.skeletonBase,
    marginBottom: 8,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: Colors.background,
  },
  addButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  addButtonTextActive: {
    color: Colors.textWhite,
  },
});

export default MenuItem;
