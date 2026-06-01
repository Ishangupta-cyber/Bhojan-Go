/**
 * Orders Screen
 * Displays order history using Supabase auth.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { getOrders } from '../services/api';
import { useAuth } from '@clerk/clerk-expo';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorView from '../components/ErrorView';
import Colors from '../constants/colors';

const STATUS_CONFIG = {
  placed: { label: 'Order Placed', color: Colors.info, icon: '📋' },
  confirmed: { label: 'Confirmed', color: Colors.primary, icon: '✅' },
  preparing: { label: 'Preparing', color: Colors.warning, icon: '👨‍🍳' },
  on_the_way: { label: 'On the Way', color: Colors.accent, icon: '🚴' },
  delivered: { label: 'Delivered', color: Colors.success, icon: '✅' },
  cancelled: { label: 'Cancelled', color: Colors.error, icon: '❌' },
};

const OrdersScreen = () => {
  const { userId } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setError(null);
      const response = await getOrders(userId);
      setOrders(response?.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const renderOrder = ({ item: order }) => {
    const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
    const orderItems = order.items || [];

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.restaurantName}>{order.restaurant_name || 'Restaurant'}</Text>
            <Text style={styles.orderDate}>{formatDate(order.created_at)}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
            <Text style={styles.statusIcon}>{status.icon}</Text>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          {orderItems.slice(0, 3).map((item, index) => (
            <View key={index} style={styles.orderItemRow}>
              <View style={styles.itemLeft}>
                <View style={[styles.vegIndicator, { borderColor: item.is_veg ? Colors.veg : Colors.nonVeg }]}>
                  <View style={[styles.vegDot, { backgroundColor: item.is_veg ? Colors.veg : Colors.nonVeg }]} />
                </View>
                <Text style={styles.itemName}>{item.name} × {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(0)}</Text>
            </View>
          ))}
          {orderItems.length > 3 && (
            <Text style={styles.moreItems}>+{orderItems.length - 3} more items</Text>
          )}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.totalLabel}>Total Paid</Text>
          <Text style={styles.totalAmount}>₹{order.total?.toFixed(0)}</Text>
        </View>
      </View>
    );
  };

  if (loading) return <LoadingSkeleton type="orders" />;
  if (error) return <ErrorView message={error} onRetry={fetchOrders} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Place your first order and it will show up here</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} tintColor={Colors.primary} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundSecondary },
  header: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16, backgroundColor: Colors.background },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  listContent: { padding: 16, paddingBottom: 32 },
  orderCard: {
    backgroundColor: Colors.background, borderRadius: 16, marginBottom: 16, padding: 16,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  restaurantName: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  orderDate: { fontSize: 12, color: Colors.textLight, marginTop: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 4 },
  statusIcon: { fontSize: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  orderItems: { borderTopWidth: 1, borderTopColor: Colors.borderLight, paddingTop: 12 },
  orderItemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 8 },
  vegIndicator: { width: 16, height: 16, borderWidth: 1.5, borderRadius: 3, justifyContent: 'center', alignItems: 'center' },
  vegDot: { width: 8, height: 8, borderRadius: 4 },
  itemName: { fontSize: 14, color: Colors.textPrimary, flex: 1 },
  itemPrice: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  moreItems: { fontSize: 13, color: Colors.textSecondary, fontStyle: 'italic', marginTop: 4 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.borderLight, paddingTop: 12, marginTop: 8 },
  totalLabel: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  totalAmount: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  emptySubtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center' },
});

export default OrdersScreen;
