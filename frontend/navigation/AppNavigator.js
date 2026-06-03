/**
 * App Navigator
 * Root stack navigator — routes between Auth flow and Main app.
 * Uses Firebase auth state from AuthContext for navigation.
 */
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppAuth } from '../context/AuthContext';
import { initApiAuth } from '../services/api';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import Colors from '../constants/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isSignedIn, isLoaded, getIdToken } = useAppAuth();

  // Initialize API auth with Firebase's getIdToken function
  useEffect(() => {
    if (getIdToken) {
      initApiAuth(getIdToken);
    }
  }, [getIdToken]);

  // Show splash while Firebase is loading
  if (!isLoaded) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      // key prop forces full remount when auth state changes
      key={isSignedIn ? 'main' : 'auth'}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'fade',
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen
            name="RestaurantDetail"
            component={RestaurantDetailScreen}
            options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerTintColor: Colors.textWhite,
              animation: 'slide_from_right',
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
