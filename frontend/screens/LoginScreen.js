/**
 * Login Screen
 * Clerk-powered authentication with email/password and Google OAuth.
 *
 * Google OAuth uses expo-web-browser for the redirect flow:
 * 1. Clerk creates an OAuth signIn attempt
 * 2. expo-web-browser opens Google's login page
 * 3. After user logs in, browser redirects back with a callback URL
 * 4. Clerk processes the callback and sets the active session
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/colors';

// CRITICAL: This tells expo-web-browser to automatically close the browser
// when the OAuth redirect happens. Without this, the browser stays open.
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle email/password login via Clerk
  const handleLogin = useCallback(async () => {
    if (!emailAddress.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      });

      // Set the active session — this updates isSignedIn in Clerk
      await setActive({ session: signInAttempt.createdSessionId });
    } catch (err) {
      const message = err.errors?.[0]?.message || err.message || 'Login failed';
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  }, [emailAddress, password, signIn, setActive, isLoaded]);

  // Handle Google OAuth sign-in using expo-web-browser
  const handleGoogleSignIn = useCallback(async () => {
    if (!isLoaded) return;

    try {
      // Step 1: Create OAuth sign-in attempt with Clerk
      const signInAttempt = await signIn.create({
        strategy: 'oauth_google',
      });

      // Step 2: Get the OAuth URL from Clerk's response
      const { firstFactorVerification } = signInAttempt;
      const oauthUrl = firstFactorVerification?.externalVerificationExternalURL;

      if (!oauthUrl) {
        Alert.alert('Error', 'Could not get Google sign-in URL. Please try again.');
        return;
      }

      // Step 3: Open the Google login page in a secure browser
      const result = await WebBrowser.openAuthSessionAsync(
        oauthUrl.toString(),
        'bhojango://'
      );

      // Step 4: Process the callback result
      if (result.type === 'success') {
        // The callback URL contains the redirect query params
        const { url } = result;

        // Tell Clerk to attempt getting the session from the redirect
        await signIn.attemptFirstFactor({
          strategy: 'oauth_google',
          redirectUrl: url,
        });

        // Step 5: Set the active session
        if (signIn.createdSessionId) {
          await setActive({ session: signIn.createdSessionId });
        } else {
          Alert.alert('Sign In Error', 'Could not complete Google sign-in. Please try again.');
        }
      } else if (result.type === 'cancel') {
        // User cancelled the browser — do nothing
      } else {
        Alert.alert('Sign In Error', 'Google sign-in was not completed.');
      }
    } catch (err) {
      const message = err.errors?.[0]?.message || err.message || 'Google sign-in failed';
      Alert.alert('Sign In Error', message);
    }
  }, [signIn, setActive, isLoaded]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🍽️</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to order your favorite food
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textLight}
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor={Colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={Colors.textWhite} />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.googleIcon}>🔗</Text>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundSecondary,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.backgroundSecondary,
  },
  passwordInput: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  eyeButton: {
    padding: 14,
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginButton: {
    height: 54,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 14,
    color: Colors.textLight,
    marginHorizontal: 16,
  },
  googleButton: {
    height: 54,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 10,
  },
  googleIcon: {
    fontSize: 20,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});

export default LoginScreen;
