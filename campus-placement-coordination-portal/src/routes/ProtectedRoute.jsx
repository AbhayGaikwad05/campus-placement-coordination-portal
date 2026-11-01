import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../authentication/context/AuthContext';
import Loader from '../shared/components/Loader';

/**
 * ProtectedRoute component
 * Ensures that only authenticated users can access the route.
 * Redirects unauthenticated users to /login preserving the return path.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen message="Verifying session authorization..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
