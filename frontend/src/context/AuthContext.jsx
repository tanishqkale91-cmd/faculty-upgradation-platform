/**
 * AuthContext
 *
 * Provides authentication state (user, token) and actions (login, logout)
 * globally across the app.
 *
 * Key behaviours:
 * - Hydrates from localStorage on mount so a page refresh preserves the session.
 * - `login()` persists both token and user to localStorage.
 * - `logout()` clears all auth state and storage.
 * - `isAuthenticated` is derived from the presence of a non-null token.
 */

import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // `loading` is true only during the initial hydration from localStorage.
  // ProtectedRoute checks this before redirecting to avoid a false /login flash.
  const [loading, setLoading] = useState(true);

  // ── Hydrate from localStorage on first mount ─────────────────────────────
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // If stored data is corrupt, clear it and start fresh
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Called after a successful register or login API response.
   * @param {object} userData  - { _id, name, email, role, ... }
   * @param {string} jwtToken  - the JWT string from the server
   */
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — convenience hook.
 * Usage: const { user, login, logout, isAuthenticated, loading } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
