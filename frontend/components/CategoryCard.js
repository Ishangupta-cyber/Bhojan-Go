/**
 * CategoryCard Component
 * Horizontal scroll category chip with image and label.
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const CategoryCard = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: category.image_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 12,
    width: 90,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.skeletonBase,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  labelSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default CategoryCard;
