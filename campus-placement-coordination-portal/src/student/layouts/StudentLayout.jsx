import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../navigation/StudentSidebar';
import StudentHeader from '../navigation/StudentHeader';
import { ToastContainer } from '../../components/common/ToastContainer';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

import { ErrorBoundary } from '../../shared/components/ErrorBoundary';

export const StudentLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('mitaoe_sidebar_student_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('mitaoe_sidebar_student_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#172B45] flex flex-col">
      {/* Student Left Sidebar */}
      <StudentSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${
          isCollapsed ? 'md:ml-[72px]' : 'md:ml-[248px]'
        }`}
      >
        <StudentHeader onToggleMobile={() => setIsMobileOpen(!isMobileOpen)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Breadcrumbs />
          <ErrorBoundary title="Student Portal Section Error">
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default StudentLayout;
