/**
 * CartItem Component
 * Displays a cart item with quantity controls (+/-) and remove option.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <View style={styles.container}>
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

      {/* Item Info */}
      <View style={styles.infoSection}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{(item.price * item.quantity).toFixed(0)}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() => onUpdateQuantity(item.quantity - 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.qtyButtonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity
          style={[styles.qtyButton, styles.qtyButtonAdd]}
          onPress={() => onUpdateQuantity(item.quantity + 1)}
          activeOpacity={0.7}
        >
          <Text style={[styles.qtyButtonText, styles.qtyButtonAddText]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 10,
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  qtyButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.border,
  },
  qtyButtonAdd: {
    backgroundColor: Colors.primary,
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  qtyButtonAddText: {
    color: Colors.textWhite,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: 14,
    minWidth: 44,
    textAlign: 'center',
  },
});

export default CartItem;
