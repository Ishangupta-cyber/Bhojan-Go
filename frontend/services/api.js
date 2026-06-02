/**
 * API Service
 * Axios instance configured with base URL and Clerk auth token interceptor.
 * All backend API calls go through this service.
 */
import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create Axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// We'll set the auth token dynamically using a request interceptor
// The token will be injected at call time by the API functions below
let _getSessionToken = null;

/**
 * Initialize the API service with Clerk's getToken function
 * Call this once in the App component or a top-level provider
 */
export const initApiAuth = (getToken) => {
  _getSessionToken = getToken;
};

// Request interceptor — attach Clerk session token
api.interceptors.request.use(
  async (config) => {
    try {
      if (_getSessionToken) {
        const token = await _getSessionToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.warn('Failed to attach auth token:', error.message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

// ─── Restaurant APIs ──────────────────────────────────────
export const getRestaurants = (params = {}) =>
  api.get('/restaurants', { params });

export const getRestaurantById = (id) =>
  api.get(`/restaurants/${id}`);

// ─── Category APIs ────────────────────────────────────────
export const getCategories = () =>
  api.get('/categories');

// ─── Order APIs ───────────────────────────────────────────
export const createOrder = (orderData) =>
  api.post('/orders', orderData);

export const getOrders = (userId) =>
  api.get(`/orders/${userId}`);

export const getOrderById = (orderId) =>
  api.get(`/orders/detail/${orderId}`);

export default api;
