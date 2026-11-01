import React, { createContext, useContext, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { mockService } from '../../services/mockService';
import {
  DEMO_ACCOUNTS,
  findAccountByEmail,
  hasPermission as checkPermission,
  ROLES,
  DESIGNATIONS
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const placement = usePlacement();
  // Read raw user from PlacementContext state or synchronous mockService storage
  const rawUser = placement?.currentUser || mockService.getCurrentUser();

  // Enhance rawUser with consolidated role / designation / permissions
  const currentUser = useMemo(() => {
    if (!rawUser) return null;

    const matchedAccount = findAccountByEmail(rawUser.email) || DEMO_ACCOUNTS.find(a => a.id === rawUser.id);
    if (matchedAccount) {
      return {
        ...rawUser,
        role: matchedAccount.role,
        designation: matchedAccount.designation,
        permissions: matchedAccount.permissions,
        designationLabel: matchedAccount.designationLabel || matchedAccount.designation
      };
    }

    // Map legacy roles from placement database
    let role = ROLES.STUDENT;
    let designation = DESIGNATIONS.STUDENT;
    const roleStr = String(rawUser.role || '').toUpperCase();

    if (roleStr.includes('ADMIN') || roleStr.includes('OFFICER') || roleStr.includes('COORDINATOR') || roleStr.includes('CRPC')) {
      role = ROLES.CRPC;
      if (roleStr === 'CRPC_SUPER_ADMIN' || roleStr.includes('ADMIN')) {
        designation = DESIGNATIONS.SUPER_ADMIN;
      } else if (roleStr === 'DEPT_COORDINATOR' || roleStr.includes('COORD')) {
        designation = DESIGNATIONS.DEPT_COORDINATOR;
      } else {
        designation = DESIGNATIONS.PLACEMENT_OFFICER;
      }
    } else if (roleStr.includes('COMPANY') || roleStr.includes('RECRUITER') || roleStr.includes('INTERVIEWER')) {
      role = ROLES.COMPANY;
      designation = roleStr.includes('INTERVIEWER') ? DESIGNATIONS.INTERVIEWER : DESIGNATIONS.RECRUITER;
    }

    return {
      ...rawUser,
      role,
      designation,
      permissions: designation === DESIGNATIONS.SUPER_ADMIN ? ['*'] : []
    };
  }, [rawUser]);

  const isAuthenticated = Boolean(currentUser);
  const loading = false;

  const loginWithDemo = (accountIdOrEmail) => {
    const acc = DEMO_ACCOUNTS.find(
      a => a.id === accountIdOrEmail || a.email.toLowerCase() === accountIdOrEmail.toLowerCase()
    ) || findAccountByEmail(accountIdOrEmail);

    if (acc) {
      // Map back to legacy role expected by placement mockService so all data queries work
      let legacyRole = 'STUDENT';
      if (acc.role === ROLES.CRPC) {
        if (acc.designation === DESIGNATIONS.SUPER_ADMIN) legacyRole = 'CRPC_SUPER_ADMIN';
        else if (acc.designation === DESIGNATIONS.DEPT_COORDINATOR) legacyRole = 'DEPT_COORDINATOR';
        else legacyRole = 'CRPC_OFFICER';
      } else if (acc.role === ROLES.COMPANY) {
        legacyRole = acc.designation === DESIGNATIONS.INTERVIEWER ? 'COMPANY_INTERVIEWER' : 'COMPANY_RECRUITER';
      }

      const userAccount = {
        id: acc.id,
        name: acc.name,
        email: acc.email,
        role: legacyRole,
        department: acc.department,
        designation: acc.designationLabel || acc.designation,
        phone: acc.phone,
        studentId: acc.studentId,
        companyId: acc.companyId,
        companyName: acc.companyName
      };

      // Synchronously write to mockService storage first so route guards immediately succeed
      mockService.setCurrentUser(userAccount);
      placement.login(userAccount);

      return { success: true, user: acc };
    }
    return { success: false, message: 'Account not found' };
  };

  const logout = () => {
    mockService.logout();
    placement.logout();
  };

  const hasPermission = (permission) => {
    return checkPermission(currentUser, permission);
  };

  const isRole = (role) => {
    return currentUser?.role === role;
  };

  const isDesignation = (designation) => {
    return currentUser?.designation === designation;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        loginWithDemo,
        logout,
        hasPermission,
        isRole,
        isDesignation,
        isSuperAdmin: currentUser?.designation === DESIGNATIONS.SUPER_ADMIN,
        isOfficer: currentUser?.designation === DESIGNATIONS.PLACEMENT_OFFICER,
        isCoordinator: currentUser?.designation === DESIGNATIONS.DEPT_COORDINATOR,
        isRecruiter: currentUser?.designation === DESIGNATIONS.RECRUITER,
        isInterviewer: currentUser?.designation === DESIGNATIONS.INTERVIEWER,
        demoAccounts: DEMO_ACCOUNTS,
        ROLES,
        DESIGNATIONS,
        // Shared placement references
        notifications: placement?.notifications || [],
        announcements: placement?.announcements || [],
        markNotificationRead: placement?.markNotificationRead,
        clearNotifications: placement?.clearNotifications
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export default AuthContext;
