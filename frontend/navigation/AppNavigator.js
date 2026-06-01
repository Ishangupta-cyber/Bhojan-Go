/**
 * App Navigator
 * Root stack navigator — routes between Auth flow and Main app.
 * Uses Clerk auth state for navigation.
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

  return (
    <AuthProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'fade',
        }}
      >
        {!isLoaded ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !isSignedIn ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
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
        )}
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default AppNavigator;
