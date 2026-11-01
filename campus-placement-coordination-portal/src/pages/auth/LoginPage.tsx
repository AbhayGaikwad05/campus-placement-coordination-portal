import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { ROLE_THEMES } from '../../theme/roleTheme';
import { MitaoeLogo } from '../../components/common/MitaoeBranding';
import { RoleLoginForm } from '../../components/auth/RoleLoginForm';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  ExternalLink,
  UserCheck,
  HelpCircle
} from 'lucide-react';

/**
 * Authentication Gateway (/login):
 * Lets institutional users select their designated portal and proceed
 * to their respective role-themed login screens.
 */
export const LoginPage: React.FC = () => {
  const { settings } = usePlacement();
  const navigate = useNavigate();

  const portals = [
    ROLE_THEMES.STUDENT,
    ROLE_THEMES.CRPC_SUPER_ADMIN,
    ROLE_THEMES.CRPC_OFFICER,
    ROLE_THEMES.DEPT_COORDINATOR,
    ROLE_THEMES.COMPANY_RECRUITER,
    ROLE_THEMES.COMPANY_INTERVIEWER
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar with Clean MITAOE Official Branding */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-4 border-b border-slate-200/90">
        <MitaoeLogo />
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
          <span className="text-xs font-bold text-slate-700">
            Season {settings.currentAcademicYear} Active
          </span>
        </div>
      </header>

      {/* Main Gateway Container */}
      <main className="max-w-6xl w-full mx-auto my-8">
        {/* Gateway Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-blue-900 bg-[#EFF5FF] border border-[#BDD5F8] px-3 py-1 rounded-full mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3974C6]" />
            Official Institutional Authentication Gateway
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Placement Coordination Portal
          </h1>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Your gateway to campus recruitment, career opportunities, and placement coordination.
          </p>
        </div>

        {/* 6 Responsive Role Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map(portal => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.roleKey}
                className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-6 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: portal.secondaryBg,
                        color: portal.textColor
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: portal.pageBg,
                        color: portal.textColor,
                        borderColor: portal.borderColor
                      }}
                    >
                      {portal.shortRole}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                    {portal.portalTitle}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {portal.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={portal.loginPath}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer group-hover:translate-x-0.5"
                    style={{ color: portal.primaryColor }}
                  >
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {portal.role === 'STUDENT' ? (
                    <Link
                      to="/register/student"
                      className="text-[11px] font-semibold text-slate-400 hover:text-[#3974C6] hover:underline"
                    >
                      Register
                    </Link>
                  ) : portal.role === 'COMPANY_RECRUITER' ? (
                    <Link
                      to="/register/company"
                      className="text-[11px] font-semibold text-slate-400 hover:text-emerald-600 hover:underline"
                    >
                      Partner
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Directory Notice */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
              <Building2 className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Corporate Relations and Placement Cell (CRPC) · MIT Academy of Engineering
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Alandi, Pune · Autonomous Institute Affiliated to Savitribai Phule Pune University
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 shrink-0">
            <Link
              to="/register/student"
              className="text-[#3974C6] hover:text-[#2d60a6] hover:underline"
            >
              Student Registration
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              to="/register/company"
              className="text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              Company Registration
            </Link>
          </div>
        </div>
      </main>

      {/* Official Footer */}
      <footer className="max-w-6xl w-full mx-auto pt-6 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 MIT Academy of Engineering, Pune. Corporate Relations & Placement Cell.</p>
        <p className="text-[11px] text-slate-400 font-mono">
          Campus Placement Coordination Portal
        </p>
      </footer>
    </div>
  );
};

/* Role-specific login page wrappers for dedicated routes */
export const StudentLoginPage: React.FC = () => <RoleLoginForm role="STUDENT" />;
export const SuperAdminLoginPage: React.FC = () => <RoleLoginForm role="CRPC_SUPER_ADMIN" />;
export const PlacementOfficerLoginPage: React.FC = () => <RoleLoginForm role="CRPC_OFFICER" />;
export const DeptCoordinatorLoginPage: React.FC = () => <RoleLoginForm role="DEPT_COORDINATOR" />;
export const CompanyRecruiterLoginPage: React.FC = () => <RoleLoginForm role="COMPANY_RECRUITER" />;
export const CompanyInterviewerLoginPage: React.FC = () => <RoleLoginForm role="COMPANY_INTERVIEWER" />;
