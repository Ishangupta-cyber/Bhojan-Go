/**
 * Authentication Middleware
 * Verifies Firebase ID tokens from the Authorization header.
 * Uses firebase-admin to validate tokens server-side.
 */
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID || 'bhojan-go-2dadb',
  });
}

/**
 * Require Auth Middleware
 * Validates the Firebase ID token from the Authorization header.
 * Attaches req.auth with { userId, email, name } from Firebase.
 *
 * Usage: router.get('/protected', requireAuth, handler)
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header missing. Please provide a valid token.',
      });
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach user info to request
    req.auth = {
      userId: decodedToken.uid,
      email: decodedToken.email || '',
      name: decodedToken.name || decodedToken.email?.split('@')[0] || '',
      emailVerified: decodedToken.email_verified || false,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please sign in again.',
      });
    }

    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please sign in again.',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Please sign in.',
    });
  }
};

module.exports = { requireAuth };
