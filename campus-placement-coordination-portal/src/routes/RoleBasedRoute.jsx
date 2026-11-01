import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../authentication/context/AuthContext';
import Loader from '../shared/components/Loader';

/**
 * RoleBasedRoute component
 * Validates that the authenticated user possesses one of the allowed roles.
 * If unauthorized, redirects to /unauthorized.
 */
export default function RoleBasedRoute({ allowedRoles = [], allowedDesignations = [], children }) {
  const { currentUser, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen message="Checking authorization credentials..." />;
  }

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Normalize allowedRoles
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const userRole = currentUser.role?.toUpperCase();

  const roleMatch = roles.length === 0 || roles.includes(userRole);

  if (!roleMatch) {
    return <Navigate to="/unauthorized" state={{ attemptedUrl: location.pathname, requiredRoles: roles }} replace />;
  }

  // If specific designation is required
  if (allowedDesignations && allowedDesignations.length > 0) {
    const designations = Array.isArray(allowedDesignations) ? allowedDesignations : [allowedDesignations];
    const userDesig = currentUser.designation?.toUpperCase();
    if (!designations.includes(userDesig)) {
      return <Navigate to="/unauthorized" state={{ attemptedUrl: location.pathname, requiredDesignations: designations }} replace />;
    }
  }

  return children ? children : <Outlet />;
}
