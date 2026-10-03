/**
 * Axios Instance
 *
 * Pre-configured Axios instance used for all API calls.
 *
 * - Base URL is read from VITE_API_BASE_URL env variable (defaults to /api
 *   which is proxied to the backend in development via vite.config.js).
 * - Request interceptor attaches the JWT from localStorage as a Bearer token.
 * - Response interceptor handles 401 errors globally (clears session).
 */

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ───────────────────────────────────────────────────
// Attaches the JWT to every outgoing request.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────────────
// Handles expired / invalid tokens globally.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale session data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
