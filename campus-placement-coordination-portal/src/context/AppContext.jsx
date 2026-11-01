import React from 'react';
import { PlacementProvider } from './PlacementContext';
import { AuthProvider } from '../authentication/context/AuthContext';

/**
 * AppProvider combines PlacementProvider (domain data and business logic)
 * and AuthProvider (3-role authentication and permission models).
 */
export function AppProvider({ children }) {
  return (
    <PlacementProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </PlacementProvider>
  );
}

export default AppProvider;
