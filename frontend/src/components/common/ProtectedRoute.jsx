/**
 * ProtectedRoute
 *
 * Wraps routes that require authentication and/or a specific role.
 *
 * Usage:
 *   <ProtectedRoute>              — requires any authenticated user
 *   <ProtectedRoute role="admin"> — requires admin role
 *
 * Redirects:
 *   - While hydrating from localStorage → renders nothing (avoids /login flash)
 *   - Unauthenticated users            → /login
 *   - Wrong role                       → /dashboard or /admin/dashboard
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();

  // Wait for localStorage hydration before making any redirect decision
  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return children;
}

export default ProtectedRoute;
