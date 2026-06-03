/**
 * Auth Context
 * Wraps Firebase Authentication for use throughout the app.
 * Provides: user, isSignedIn, isLoaded, userId, signOut, getIdToken
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user to our app's user format
        const appUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          first_name: firebaseUser.displayName?.split(' ')[0] || '',
          last_name: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
          image_url: firebaseUser.photoURL || null,
          phone: firebaseUser.phoneNumber || '',
          emailVerified: firebaseUser.emailVerified,
          createdAt: firebaseUser.metadata?.creationTime || '',
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setIsLoaded(true);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error.message);
      throw error;
    }
  };

  // Get Firebase ID token for API calls
  const getIdToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  };

  const value = {
    user,
    isSignedIn: !!user,
    isLoaded,
    loading: !isLoaded,
    userId: user?.id || null,
    signOut,
    getIdToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppAuth must be used within an AuthProvider');
  }
  return context;
};

// Keep backward compatibility
export const useAuthContext = useAppAuth;
