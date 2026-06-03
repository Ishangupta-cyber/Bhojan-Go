/**
 * Profile Screen
 * Shows user info from Firebase Auth and logout button.
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useAppAuth } from '../context/AuthContext';
import Colors from '../constants/colors';

const ProfileScreen = () => {
  const { user, signOut } = useAppAuth();

  // Handle logout via Firebase
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch (err) {
            Alert.alert('Error', err.message || 'Failed to sign out');
          }
        },
      },
    ]);
  };

  const userName = user?.full_name || 'User';
  const userEmail = user?.email || 'user@bhojango.com';
  const userImage = user?.image_url || null;
  const initials = userName.charAt(0).toUpperCase();
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently joined';

  // Menu items for profile
  const menuItems = [
    { icon: '📍', label: 'Manage Addresses', subtitle: 'Add or edit delivery addresses' },
    { icon: '💳', label: 'Payment Methods', subtitle: 'Manage your payment options' },
    { icon: '🔔', label: 'Notifications', subtitle: 'Order updates and offers' },
    { icon: '🎁', label: 'Refer & Earn', subtitle: 'Invite friends, get rewards' },
    { icon: '❓', label: 'Help & Support', subtitle: 'FAQs and customer support' },
    { icon: '📄', label: 'Terms & Conditions', subtitle: 'Read our policies' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
            {memberSince ? (
              <Text style={styles.memberSince}>Member since {memberSince}</Text>
            ) : null}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.6}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>BhojanGo</Text>
          <Text style={styles.appVersion}>Version 2.0.0 • MongoDB + Firebase</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.skeletonBase,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textWhite,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  memberSince: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: 14,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 24,
    color: Colors.textLight,
    fontWeight: '300',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  appName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  appVersion: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.error,
    gap: 8,
  },
  logoutIcon: {
    fontSize: 18,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
  },
});

export default ProfileScreen;
