import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  CheckSquare,
  Calendar,
  Gift,
  Code2,
  Shield,
  Settings,
  Building2,
  Users,
  Award,
  BarChart3,
  BellRing,
  FolderCheck,
  History,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { UserRole } from '../../types';
import { getThemeForRole } from '../../theme/roleTheme';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { currentUser, applications, drives, companies, offers } = usePlacement();

  // Collapsible state with persistence
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mitaoe_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  if (!currentUser) return null;

  const roleTheme = getThemeForRole(currentUser.role);

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('mitaoe_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const getNavLinks = (role: UserRole) => {
    switch (role) {
      case 'STUDENT':
        return [
          { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/student/portfolio', label: 'My Portfolio', icon: GraduationCap },
          { to: '/student/opportunities', label: 'Placement Drives', icon: Briefcase, count: drives.filter(d => d.status === 'PUBLISHED').length },
          { to: '/student/applications', label: 'My Applications', icon: FileText, count: applications.filter(a => a.studentId === currentUser?.studentId).length },
          { to: '/student/practice-tests', label: 'Assessment Practice', icon: CheckSquare },
          { to: '/student/interviews', label: 'Interview Schedules', icon: Calendar },
          { to: '/student/offers', label: 'Offers', icon: Gift, count: offers.filter(o => o.studentId === currentUser?.studentId).length },
          { to: '/student/coding-profiles', label: 'Coding Profiles', icon: Code2 }
        ];

      case 'CRPC_SUPER_ADMIN':
        return [
          { to: '/admin/overview', label: 'Executive Overview', icon: LayoutDashboard },
          { to: '/admin/settings', label: 'Institution Settings', icon: Settings },
          { to: '/admin/departments', label: 'Departments & Batches', icon: Building2 },
          { to: '/admin/users', label: 'User & Role Access', icon: Users },
          { to: '/admin/policy', label: 'Placement Policies', icon: Shield },
          { to: '/admin/reports', label: 'Institutional Analytics', icon: BarChart3 },
          { to: '/admin/audit-log', label: 'System Audit Logs', icon: History }
        ];

      case 'CRPC_OFFICER':
        return [
          { to: '/officer/dashboard', label: 'Placement Hub', icon: LayoutDashboard },
          { to: '/officer/companies', label: 'Companies Directory', icon: Building2, count: companies.filter(c => c.verificationStatus === 'PENDING').length },
          { to: '/officer/drives', label: 'Recruitment Drives', icon: Briefcase, count: drives.length },
          { to: '/officer/students', label: 'Student Directory', icon: Users },
          { to: '/officer/verification', label: 'Document Verification', icon: FolderCheck },
          { to: '/officer/applications', label: 'Applications Pipeline', icon: FileText, count: applications.length },
          { to: '/officer/assessments', label: 'Assessments & MCQs', icon: CheckSquare },
          { to: '/officer/interviews', label: 'Interview Schedules', icon: Calendar },
          { to: '/officer/offers', label: 'Offers & Records', icon: Award },
          { to: '/officer/announcements', label: 'Announcements', icon: BellRing },
          { to: '/officer/analytics', label: 'Placement Analytics', icon: BarChart3 }
        ];

      case 'DEPT_COORDINATOR':
        return [
          { to: '/coordinator/dashboard', label: 'Dept Dashboard', icon: LayoutDashboard },
          { to: '/coordinator/students', label: 'Assigned Students', icon: Users },
          { to: '/coordinator/verification', label: 'Academic Verification', icon: FolderCheck },
          { to: '/coordinator/eligibility', label: 'Eligibility Monitor', icon: CheckSquare },
          { to: '/coordinator/reports', label: 'Department Reports', icon: BarChart3 }
        ];

      case 'COMPANY_RECRUITER':
        return [
          { to: '/company/dashboard', label: 'Recruiter Dashboard', icon: LayoutDashboard },
          { to: '/company/profile', label: 'Company Profile', icon: Building2 },
          { to: '/company/drives', label: 'Active Drives', icon: Briefcase },
          { to: '/company/applications', label: 'Applicant Pipeline', icon: FileText },
          { to: '/company/interviews', label: 'Interview Stages', icon: Calendar },
          { to: '/company/offers', label: 'Issue & Track Offers', icon: Gift }
        ];

      case 'COMPANY_INTERVIEWER':
        return [
          { to: '/interviewer/workspace', label: 'Assigned Interviews', icon: Calendar },
          { to: '/interviewer/evaluations', label: 'Evaluation Records', icon: CheckSquare }
        ];

      default:
        return [];
    }
  };

  const navLinks = getNavLinks(currentUser.role);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:sticky top-16 z-40 md:z-20 h-[calc(100vh-4rem)] bg-white border-r border-slate-200/90 flex flex-col transition-all duration-200 ease-in-out shrink-0 ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        } ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Navigation list */}
        <div className="py-3 px-2.5 overflow-y-auto flex-1 overflow-x-hidden">
          {/* Header with Collapse/Expand Toggle Button */}
          <div
            className={`pb-3 mb-2.5 border-b border-slate-100 flex items-center ${
              isCollapsed ? 'justify-center px-1' : 'justify-between px-2.5'
            }`}
          >
            {!isCollapsed && (
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: roleTheme.primaryColor }}
                  />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Workspace Portal
                  </p>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">
                  {roleTheme.shortRole}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {roleTheme.subtitle}
                </p>
              </div>
            )}

            <button
              onClick={toggleCollapse}
              aria-label={isCollapsed ? 'Expand side menu' : 'Collapse side menu'}
              title={isCollapsed ? 'Expand side menu' : 'Collapse side menu'}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-slate-600" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={idx}
                  to={link.to}
                  onClick={onCloseMobile}
                  title={isCollapsed ? link.label : undefined}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          backgroundColor: roleTheme.secondaryBg,
                          color: roleTheme.textColor
                        }
                      : {}
                  }
                  className={({ isActive }) =>
                    `group relative flex items-center rounded-xl text-xs font-medium transition-all duration-150 ${
                      isCollapsed
                        ? 'justify-center py-2.5 px-0 w-full'
                        : 'justify-between px-3 py-2.5'
                    } ${
                      isActive
                        ? 'font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5 truncate'}`}>
                        <div className="relative">
                          <Icon
                            className="w-4 h-4 shrink-0 transition-colors"
                            style={{
                              color: isActive ? roleTheme.primaryColor : undefined
                            }}
                          />
                          {/* Dot count indicator in collapsed mode */}
                          {isCollapsed && link.count !== undefined && link.count > 0 && (
                            <span
                              className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full ring-2 ring-white"
                              style={{ backgroundColor: roleTheme.primaryColor }}
                            />
                          )}
                        </div>
                        {!isCollapsed && <span className="truncate">{link.label}</span>}
                      </div>

                      {/* Count badge in expanded mode */}
                      {!isCollapsed && link.count !== undefined && link.count > 0 && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full font-tabular"
                          style={{
                            backgroundColor: isActive ? roleTheme.primaryColor : '#F1F5F9',
                            color: isActive ? '#FFFFFF' : '#475569'
                          }}
                        >
                          {link.count}
                        </span>
                      )}

                      {/* Tooltip on hover when in collapsed state */}
                      {isCollapsed && (
                        <div className="fixed left-[76px] hidden group-hover:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl z-50 whitespace-nowrap pointer-events-none transition-opacity">
                          <span>{link.label}</span>
                          {link.count !== undefined && link.count > 0 && (
                            <span
                              className="text-white text-[10px] px-1.5 py-0.2 rounded-full font-tabular"
                              style={{ backgroundColor: roleTheme.primaryColor }}
                            >
                              {link.count}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
