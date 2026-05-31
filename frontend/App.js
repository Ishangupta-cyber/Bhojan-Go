/**
 * BhojanGo App Entry Point
 * Sets up Supabase auth, Cart provider, and Navigation.
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
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
    <AuthProvider>
      <SafeAreaProvider>
        <CartProvider>
          <NavigationContainer linking={linking}>
            <StatusBar style="dark" />
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
