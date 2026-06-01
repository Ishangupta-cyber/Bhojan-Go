/**
 * Authentication Middleware
 * Verifies Clerk JWT tokens from the Authorization header.
 * Uses @clerk/express to validate tokens server-side.
 */
const { requireAuth: clerkRequireAuth } = require('@clerk/express');

/**
 * Require Auth Middleware
 * Validates the Clerk session token from the Authorization header.
 * Attaches req.auth with user information from Clerk.
 *
 * Usage: router.get('/protected', requireAuth, handler)
 */
const requireAuth = clerkRequireAuth;

module.exports = { requireAuth };
