/**
 * OfferBanner Component
 * Carousel banner item displaying promotional offers.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const OfferBanner = ({ offer }) => {
  return (
    <TouchableOpacity
      style={[styles.banner, { backgroundColor: offer.color }]}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.subtitle}>{offer.subtitle}</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Use code: </Text>
          <Text style={styles.codeText}>{offer.code}</Text>
        </View>
      </View>
      <Text style={styles.decorEmoji}>🎉</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: 280,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.textWhite,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  codeLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  codeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textWhite,
    letterSpacing: 1,
  },
  decorEmoji: {
    fontSize: 40,
    opacity: 0.3,
    marginLeft: 10,
  },
});

export default OfferBanner;
