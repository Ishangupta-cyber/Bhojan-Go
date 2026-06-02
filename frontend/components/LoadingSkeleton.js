/**
 * LoadingSkeleton Component
 * Skeleton placeholder for loading states across different screens.
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

// Animated skeleton block
const SkeletonBlock = ({ style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[styles.skeleton, style, { opacity }]}
    />
  );
};

// Home screen skeleton
const HomeSkeleton = () => (
  <View style={styles.container}>
    {/* Header skeleton */}
    <View style={styles.headerSkeleton}>
      <SkeletonBlock style={{ width: 80, height: 12, marginBottom: 8 }} />
      <SkeletonBlock style={{ width: 180, height: 16 }} />
    </View>
    {/* Search skeleton */}
    <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
      <SkeletonBlock style={{ width: '100%', height: 48, borderRadius: 14 }} />
    </View>
    {/* Banner skeleton */}
    <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, gap: 12 }}>
      <SkeletonBlock style={{ width: 280, height: 110, borderRadius: 16 }} />
      <SkeletonBlock style={{ width: 280, height: 110, borderRadius: 16 }} />
    </View>
    {/* Categories skeleton */}
    <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, gap: 12 }}>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonBlock key={i} style={{ width: 90, height: 90, borderRadius: 16 }} />
      ))}
    </View>
    {/* Restaurant cards skeleton */}
    {[1, 2, 3].map((i) => (
      <View key={i} style={{ marginHorizontal: 20, marginBottom: 16 }}>
        <SkeletonBlock style={{ width: '100%', height: 180, borderRadius: 16, marginBottom: 12 }} />
        <SkeletonBlock style={{ width: '60%', height: 18 }} />
        <SkeletonBlock style={{ width: '40%', height: 14, marginTop: 6 }} />
      </View>
    ))}
  </View>
);

// Detail screen skeleton
const DetailSkeleton = () => (
  <View style={styles.container}>
    <SkeletonBlock style={{ width: '100%', height: 260 }} />
    <View style={{ padding: 20 }}>
      <SkeletonBlock style={{ width: '70%', height: 24, marginBottom: 8 }} />
      <SkeletonBlock style={{ width: '50%', height: 14, marginBottom: 16 }} />
      <SkeletonBlock style={{ width: '100%', height: 50, borderRadius: 12 }} />
    </View>
    <View style={{ padding: 20 }}>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <SkeletonBlock style={{ width: 18, height: 18, marginBottom: 8 }} />
            <SkeletonBlock style={{ width: '70%', height: 16, marginBottom: 4 }} />
            <SkeletonBlock style={{ width: '40%', height: 14 }} />
          </View>
          <SkeletonBlock style={{ width: 110, height: 90, borderRadius: 12 }} />
        </View>
      ))}
    </View>
  </View>
);

// Orders screen skeleton
const OrdersSkeleton = () => (
  <View style={styles.container}>
    <View style={styles.headerSkeleton}>
      <SkeletonBlock style={{ width: 140, height: 24 }} />
    </View>
    <View style={{ padding: 16 }}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <SkeletonBlock style={{ width: '60%', height: 18, marginBottom: 6 }} />
          <SkeletonBlock style={{ width: '30%', height: 12, marginBottom: 14 }} />
          {[1, 2].map((j) => (
            <SkeletonBlock key={j} style={{ width: '80%', height: 14, marginBottom: 8 }} />
          ))}
          <SkeletonBlock style={{ width: '40%', height: 18, marginTop: 8 }} />
        </View>
      ))}
    </View>
  </View>
);

const LoadingSkeleton = ({ type = 'home' }) => {
  switch (type) {
    case 'detail':
      return <DetailSkeleton />;
    case 'orders':
      return <OrdersSkeleton />;
    case 'home':
    default:
      return <HomeSkeleton />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  skeleton: {
    backgroundColor: Colors.skeletonBase,
    borderRadius: 8,
  },
  headerSkeleton: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
});

export default LoadingSkeleton;
