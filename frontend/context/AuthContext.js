/**
 * Auth Context
 * Wraps Clerk authentication for use throughout the app.
 * Provides: isSignedIn, isLoaded, user, signOut, userId
 */
import React, { createContext, useContext } from 'react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-expo';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  // Map Clerk user to our app's user format
  const appUser = user
    ? {
        id: userId,
        email: user.primaryEmailAddress?.emailAddress || '',
        full_name: user.fullName || user.username || 'User',
        first_name: user.firstName || '',
        last_name: user.lastName || '',
        image_url: user.imageUrl || null,
        created_at: user.createdAt?.toString() || '',
        phone: user.primaryPhoneNumber?.phoneNumber || '',
      }
    : null;

  const value = {
    user: appUser,
    isSignedIn: !!isSignedIn,
    isLoaded,
    loading: !isLoaded,
    userId,
    signOut,
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
