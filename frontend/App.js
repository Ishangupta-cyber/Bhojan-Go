/**
 * BhojanGo App Entry Point
 * Sets up Clerk Auth, Cart provider, and Navigation.
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { CartProvider } from './context/CartContext';
import AppNavigator from './navigation/AppNavigator';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';

// Clerk token cache using SecureStore
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      // SecureStore not available on web
    }
  },
};

const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix, 'bhojango://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          SignUp: 'signup',
        },
      },
      MainTabs: {
        screens: {
          Home: 'home',
          Orders: 'orders',
          Cart: 'cart',
          Profile: 'profile',
        },
      },
    },
  },
};

// Get Clerk publishable key from env
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <SafeAreaProvider>
          <CartProvider>
            <NavigationContainer linking={linking}>
              <StatusBar style="dark" />
              <AppNavigator />
            </NavigationContainer>
          </CartProvider>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
