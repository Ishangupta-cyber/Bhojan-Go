/**
 * Home Screen
 * Main screen with location header, search bar, categories,
 * restaurant list, and offer banners.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { getRestaurants, getCategories } from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import RestaurantCard from '../components/RestaurantCard';
import OfferBanner from '../components/OfferBanner';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorView from '../components/ErrorView';
import Colors from '../constants/colors';

// Offer banners data
const OFFERS = [
  {
    id: '1',
    title: '50% OFF',
    subtitle: 'On your first order',
    code: 'WELCOME50',
    color: Colors.primary,
  },
  {
    id: '2',
    title: 'Free Delivery',
    subtitle: 'Orders above ₹299',
    code: 'FREEDEL',
    color: Colors.accent,
  },
  {
    id: '3',
    title: '₹100 OFF',
    subtitle: 'On orders above ₹500',
    code: 'SAVE100',
    color: '#7C3AED',
  },
];

const HomeScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedCategory) params.cuisine = selectedCategory;

      const [restResponse, catResponse] = await Promise.all([
        getRestaurants(params),
        getCategories(),
      ]);

      setRestaurants(restResponse?.data || []);
      setCategories(catResponse?.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load restaurants');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchQuery('');
    setSelectedCategory(null);
    fetchData();
  }, [fetchData]);

  // Handle category selection
  const handleCategoryPress = (categoryName) => {
    setSelectedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  // Handle search
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Navigate to restaurant detail
  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurantId: restaurant.id });
  };

  // Loading state
  if (loading) {
    return <LoadingSkeleton type="home" />;
  }

  // Error state
  if (error) {
    return <ErrorView message={error} onRetry={fetchData} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Location Header */}
        <View style={styles.locationHeader}>
          <Text style={styles.locationLabel}>📍 Delivering to</Text>
          <Text style={styles.locationText}>Home • New Delhi, India</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar value={searchQuery} onChangeText={handleSearch} />
        </View>

        {/* Offer Banners Carousel */}
        <View style={styles.section}>
          <FlatList
            data={OFFERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.offersContainer}
            renderItem={({ item }) => <OfferBanner offer={item} />}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you craving?</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.categoriesContainer}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                isSelected={selectedCategory === item.name}
                onPress={() => handleCategoryPress(item.name)}
              />
            )}
          />
        </View>

        {/* Restaurant List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory
                ? `${selectedCategory} Restaurants`
                : 'Popular Restaurants'}
            </Text>
            <Text style={styles.restaurantCount}>
              {restaurants.length} places
            </Text>
          </View>

          {restaurants.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>
                No restaurants found. Try a different search.
              </Text>
            </View>
          ) : (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onPress={() => handleRestaurantPress(restaurant)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  locationHeader: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },
  locationLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  section: {
    marginTop: 16,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  restaurantCount: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  offersContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
