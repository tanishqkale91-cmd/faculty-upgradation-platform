/**
 * authApi.js
 *
 * All API calls related to authentication.
 * Uses the shared axiosInstance (JWT interceptor already attached).
 */

import axiosInstance from './axiosInstance';

/**
 * Register a new faculty account.
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<{ token: string, user: object }>}
 */
export const registerApi = (data) => axiosInstance.post('/auth/register', data);

/**
 * Log in with email and password.
 * @param {{ email: string, password: string }} data
 * @returns {Promise<{ token: string, user: object }>}
 */
export const loginApi = (data) => axiosInstance.post('/auth/login', data);

/**
 * Fetch the currently authenticated user.
 * Requires a valid JWT (attached automatically by axiosInstance).
 * @returns {Promise<{ user: object }>}
 */
export const getMeApi = () => axiosInstance.get('/auth/me');
