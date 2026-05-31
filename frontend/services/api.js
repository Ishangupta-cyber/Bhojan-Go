/**
 * API Service
 * Axios instance configured with base URL and Supabase auth token interceptor.
 * All backend API calls go through this service.
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create Axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach local auth token if exists
api.interceptors.request.use(
  async (config) => {
    try {
      const sessionStr = await AsyncStorage.getItem('@bhojango_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session.id) {
          config.headers.Authorization = `Bearer ${session.id}`;
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

export default api;
