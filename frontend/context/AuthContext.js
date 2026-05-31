/**
 * Auth Context
 * Simple local authentication using AsyncStorage.
 * Stores user credentials locally so the app works without external auth services.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const USERS_STORAGE_KEY = '@bhojango_users';
const SESSION_STORAGE_KEY = '@bhojango_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const sessionStr = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionStr) {
        const sessionUser = JSON.parse(sessionStr);
        setUser(sessionUser);
      }
    } catch (e) {
      console.warn('Failed to restore session:', e.message);
    } finally {
      setLoading(false);
    }
  };

  // Get all registered users
  const getUsers = async () => {
    try {
      const usersStr = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      return usersStr ? JSON.parse(usersStr) : [];
    } catch {
      return [];
    }
  };

  // Sign up — store new user locally
  const signUp = async (email, password, fullName) => {
    const users = await getUsers();
    const existing = users.find((u) => u.email === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists. Please sign in.');
    }

    const newUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Auto sign in after signup
    const sessionUser = { ...newUser };
    delete sessionUser.password;
    setUser(sessionUser);
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));

    return { user: sessionUser };
  };

  // Sign in — verify credentials locally
  const signIn = async (email, password) => {
    const users = await getUsers();
    const found = users.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!found) {
      throw new Error('Invalid email or password.');
    }

    const sessionUser = { ...found };
    delete sessionUser.password;
    setUser(sessionUser);
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));

    return { user: sessionUser };
  };

  // Sign out
  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isSignedIn: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
