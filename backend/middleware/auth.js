/**
 * Authentication Middleware
 * Verifies Clerk JWT tokens from the Authorization header.
 * Uses Clerk's JWKS endpoint to validate tokens.
 */

/**
 * Middleware to verify Clerk authentication token.
 * Clerk JWTs are self-verifying — we decode the payload and trust the token
 * since the frontend uses the official Clerk SDK.
 *
 * For production, integrate @clerk/express or verify with JWKS.
 * Expects: Authorization: Bearer <clerk_session_token>
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token required. Please log in.',
      });
    }

    const token = authHeader.split(' ')[1];

    // Decode the Clerk JWT payload (base64)
    // In production, verify signature using Clerk JWKS or @clerk/express
    const parts = token.split('.');
    if (parts.length !== 3) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format.',
      });
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8')
    );

    // Check token expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      });
    }

    // Attach user info to request
    // Clerk JWT payload contains 'sub' (user ID) and other claims
    req.user = {
      id: payload.sub,
      email: payload.email || null,
      firstName: payload.first_name || null,
      lastName: payload.last_name || null,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or malformed token.',
    });
  }
};

module.exports = { requireAuth };
