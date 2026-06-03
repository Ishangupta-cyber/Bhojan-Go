/**
 * BhojanGo App Entry Point
 * Sets up Firebase Auth, Cart provider, and Navigation.
 * No Clerk — Firebase handles everything.
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import * as Linking from 'expo-linking';

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

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer linking={linking}>
            <StatusBar style="dark" />
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
