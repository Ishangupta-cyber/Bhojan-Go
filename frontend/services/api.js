/**
 * API Service
 * Axios instance configured with base URL and Firebase ID token interceptor.
 * All backend API calls go through this service.
 */
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create Axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Firebase getIdToken function — set by initApiAuth
let _getIdToken = null;

/**
 * Initialize the API service with Firebase's getIdToken function
 * Call this once in the AppNavigator component
 */
export const initApiAuth = (getIdToken) => {
  _getIdToken = getIdToken;
};

// Request interceptor — attach Firebase ID token
api.interceptors.request.use(
  async (config) => {
    try {
      if (_getIdToken) {
        const token = await _getIdToken();
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
