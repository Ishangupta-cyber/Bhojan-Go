/**
 * Google Sign In Service
 * Handles Google OAuth for React Native with Firebase.
 * Uses @react-native-google-signin/google-signin for native Google auth.
 */
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
  '997717882026-8vk6fq0k7h3i7lnqv3hcq2b5r0qjg9vr.apps.googleusercontent.com';

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
});

/**
 * Google Sign In
 * Uses native Google Sign In + Firebase credential
 */
export async function googleSignIn() {
  try {
    // Check if Play Services are available (Android)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in with Google
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;

    if (idToken) {
      // Create Firebase credential and sign in
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      return;
    }

    throw new Error('Failed to get Google ID token.');
  } catch (error) {
    // If native Google Sign In fails, show helpful message
    if (error.message?.includes('Play services') || error.code === 'SIGN_IN_CANCELLED') {
      throw error;
    }

    // For Expo Go or simulators without Google Play
    throw new Error(
      'Google Sign In requires Google Play Services. Please use Email/Password sign in on simulators, or test on a real device.'
    );
  }
}
