import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Header } from '../common/Header';
import { Sidebar } from '../common/Sidebar';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ToastContainer } from '../common/ToastContainer';
import { usePlacement } from '../../context/PlacementContext';
import { getThemeForRole } from '../../theme/roleTheme';

export const AppLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { currentUser } = usePlacement();
  const location = useLocation();
  const navigate = useNavigate();

  // If no user is authenticated, redirect directly to the login gateway
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const roleTheme = getThemeForRole(currentUser.role);

  // Strict route protection: ensure the current path matches the active user role's workspace prefix
  useEffect(() => {
    const rolePrefixes: Record<string, string> = {
      STUDENT: '/student',
      CRPC_SUPER_ADMIN: '/admin',
      CRPC_OFFICER: '/officer',
      DEPT_COORDINATOR: '/coordinator',
      COMPANY_RECRUITER: '/company',
      COMPANY_INTERVIEWER: '/interviewer'
    };

    const expectedPrefix = rolePrefixes[currentUser.role] || '/student';
    if (!location.pathname.startsWith(expectedPrefix)) {
      navigate(roleTheme.homePath, { replace: true });
    }
  }, [currentUser.role, location.pathname, roleTheme.homePath, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col text-slate-900 transition-colors"
      style={{
        backgroundColor: roleTheme.pageBg,
        // @ts-ignore
        '--portal-primary': roleTheme.primaryColor,
        '--portal-primary-hover': roleTheme.primaryHover,
        '--portal-page-bg': roleTheme.pageBg,
        '--portal-secondary-bg': roleTheme.secondaryBg,
        '--portal-border': roleTheme.borderColor,
        '--portal-text': roleTheme.textColor
      }}
    >
      {/* Top Navigation */}
      <Header onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)} />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-full">
        {/* Dynamic Role Sidebar */}
        <Sidebar
          isOpenMobile={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>

      {/* Floating System Toasts */}
      <ToastContainer />
    </div>
  );
};
