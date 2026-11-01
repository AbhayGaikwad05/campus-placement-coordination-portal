import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';
import { ROLES } from '../authentication/services/authService';

// Public Homepage Pages
import { Home, About, Contact } from '../homepage';

// Authentication Pages
import Login from '../authentication/pages/Login';
import ForgotPassword from '../authentication/pages/ForgotPassword';
import Unauthorized from '../authentication/pages/Unauthorized';

// Student Module
import {
  StudentLayout,
  StudentDashboard,
  StudentProfile,
  StudentOpportunities,
  StudentOpportunityDetails,
  StudentApplications,
  StudentInterviews,
  StudentAnnouncements,
  StudentNotifications,
  StudentSettings
} from '../student';

// CRPC Module
import {
  CRPCLayout,
  CRPCDashboard,
  CRPCStudents,
  CRPCStudentDetails,
  CRPCCompanies,
  CRPCCompanyDetails,
  CRPCRecruitmentApprovals,
  CRPCAllDrives,
  CRPCApplications,
  CRPCInterviews,
  CRPCAnnouncements,
  CRPCReports,
  CRPCSettings
} from '../crpc';

// Company Module
import {
  CompanyLayout,
  CompanyDashboard,
  CompanyProfile,
  CompanyVerification,
  CompanyRecruitmentDrives,
  CompanyCreateDrive,
  CompanyDriveDetails,
  CompanyApplicants,
  CompanyInterviews,
  CompanyAnnouncements,
  CompanyNotifications,
  CompanySettings
} from '../company';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Student Portal Routes */}
      <Route
        path="/student"
        element={
          <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentLayout />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="opportunities" element={<StudentOpportunities />} />
        <Route path="opportunities/:driveId" element={<StudentOpportunityDetails />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="interviews" element={<StudentInterviews />} />
        <Route path="announcements" element={<StudentAnnouncements />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      {/* CRPC Portal Routes */}
      <Route
        path="/crpc"
        element={
          <RoleBasedRoute allowedRoles={[ROLES.CRPC]}>
            <CRPCLayout />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Navigate to="/crpc/dashboard" replace />} />
        <Route path="dashboard" element={<CRPCDashboard />} />
        <Route path="students" element={<CRPCStudents />} />
        <Route path="students/:studentId" element={<CRPCStudentDetails />} />
        <Route path="companies" element={<CRPCCompanies />} />
        <Route path="companies/:companyId" element={<CRPCCompanyDetails />} />
        <Route path="approvals" element={<CRPCRecruitmentApprovals />} />
        <Route path="drives" element={<CRPCAllDrives />} />
        <Route path="applications" element={<CRPCApplications />} />
        <Route path="interviews" element={<CRPCInterviews />} />
        <Route path="announcements" element={<CRPCAnnouncements />} />
        <Route path="reports" element={<CRPCReports />} />
        <Route path="settings" element={<CRPCSettings />} />
      </Route>

      {/* Company Portal Routes */}
      <Route
        path="/company"
        element={
          <RoleBasedRoute allowedRoles={[ROLES.COMPANY]}>
            <CompanyLayout />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Navigate to="/company/dashboard" replace />} />
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="verification" element={<CompanyVerification />} />
        <Route path="drives" element={<CompanyRecruitmentDrives />} />
        <Route path="create-drive" element={<CompanyCreateDrive />} />
        <Route path="drives/:driveId" element={<CompanyDriveDetails />} />
        <Route path="applicants" element={<CompanyApplicants />} />
        <Route path="interviews" element={<CompanyInterviews />} />
        <Route path="announcements" element={<CompanyAnnouncements />} />
        <Route path="notifications" element={<CompanyNotifications />} />
        <Route path="settings" element={<CompanySettings />} />
      </Route>

      {/* Catch-all redirect to Homepage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
