/**
 * App Navigator
 * Root stack navigator — routes between Auth flow and Main app.
 * Uses Clerk auth state for navigation.
 *
 * KEY FIX: Adding `key={isSignedIn ? 'main' : 'auth'}` forces the
 * Stack.Navigator to fully re-mount when auth state changes,
 * preventing the "stuck on auth screen" bug.
 */
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@clerk/clerk-expo';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import { AuthProvider } from '../context/AuthContext';
import { initApiAuth } from '../services/api';
import Colors from '../constants/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  // Initialize API auth with Clerk's getToken function
  useEffect(() => {
    if (getToken) {
      initApiAuth(getToken);
    }
  }, [getToken]);

  // Show splash while Clerk is loading
  if (!isLoaded) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <AuthProvider>
      <Stack.Navigator
        // CRITICAL: key prop forces full remount when auth state changes
        // Without this, React Navigation keeps the old screen tree
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
    </AuthProvider>
  );
};

export default AppNavigator;
