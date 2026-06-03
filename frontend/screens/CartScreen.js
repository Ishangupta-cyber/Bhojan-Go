/**
 * Cart Screen
 * Displays selected items, quantity controls, price summary, and checkout.
 * Uses Firebase Auth for userId.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useAppAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import CartItem from '../components/CartItem';
import Colors from '../constants/colors';

const DELIVERY_FEE = 30;
const TAX_RATE = 0.05;

const CartScreen = ({ navigation }) => {
  const { items, cartTotal, itemCount, updateQuantity, removeFromCart, clearCart, restaurantId, restaurantName } = useCart();
  const { userId } = useAppAuth();
  const [loading, setLoading] = useState(false);

  const taxAmount = cartTotal * TAX_RATE;
  const totalWithExtras = cartTotal + (items.length > 0 ? DELIVERY_FEE : 0) + taxAmount;

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (!userId) {
      Alert.alert('Sign In Required', 'Please sign in to place an order.');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        restaurant_id: restaurantId,
        restaurant_name: restaurantName,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          is_veg: item.is_veg,
        })),
        subtotal: cartTotal,
        delivery_fee: DELIVERY_FEE,
        total: totalWithExtras,
        delivery_address: 'Home • New Delhi, India',
      };

      await createOrder(orderData);
      clearCart();
      Alert.alert(
        '🎉 Order Placed!',
        'Your delicious food is being prepared.',
        [
          { text: 'View Orders', onPress: () => navigation.navigate('Orders') },
          { text: 'OK' },
        ]
      );
    } catch (err) {
      Alert.alert('Order Failed', err.message || 'Could not place order.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Browse restaurants and add delicious items
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.browseButtonText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantIcon}>🏪</Text>
        <View>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <Text style={styles.itemCountText}>{itemCount} items</Text>
        </View>
      </View>

      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Bill Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item Total</Text>
            <Text style={styles.summaryValue}>₹{cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹{DELIVERY_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST (5%)</Text>
            <Text style={styles.summaryValue}>₹{taxAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{totalWithExtras.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={[styles.checkoutButton, loading && styles.buttonDisabled]}
          onPress={handleCheckout}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textWhite} />
          ) : (
            <>
              <Text style={styles.checkoutText}>Place Order</Text>
              <Text style={styles.checkoutTotal}>₹{totalWithExtras.toFixed(0)}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundSecondary },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16, backgroundColor: Colors.background,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  clearText: { fontSize: 14, fontWeight: '600', color: Colors.error },
  restaurantInfo: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: Colors.background, borderBottomWidth: 1, borderBottomColor: Colors.borderLight, gap: 12,
  },
  restaurantIcon: { fontSize: 28 },
  restaurantName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  itemCountText: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  itemsList: { flex: 1, padding: 16 },
  summaryCard: {
    backgroundColor: Colors.background, borderRadius: 16, padding: 20,
    marginTop: 16, marginBottom: 100,
  },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
  },
  summaryLabel: { fontSize: 14, color: Colors.textSecondary },
  summaryValue: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  summaryDivider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  totalValue: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  checkoutContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.borderLight,
  },
  checkoutButton: {
    height: 56, backgroundColor: Colors.primary, borderRadius: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24,
  },
  buttonDisabled: { opacity: 0.7 },
  checkoutText: { fontSize: 17, fontWeight: '700', color: Colors.textWhite },
  checkoutTotal: { fontSize: 17, fontWeight: '800', color: Colors.textWhite },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, backgroundColor: Colors.background },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  emptySubtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', marginBottom: 24 },
  browseButton: {
    paddingHorizontal: 32, paddingVertical: 14, backgroundColor: Colors.primary, borderRadius: 14,
  },
  browseButtonText: { fontSize: 16, fontWeight: '700', color: Colors.textWhite },
});

export default CartScreen;
