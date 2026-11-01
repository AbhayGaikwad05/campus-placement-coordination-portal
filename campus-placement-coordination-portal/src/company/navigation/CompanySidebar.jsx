import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { getCompanyNavLinks } from './CompanyNavigation';
import {
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Briefcase,
  Building2
} from 'lucide-react';

export const CompanySidebar = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const { currentUser, logout } = useAuth();
  const { drives, applications } = usePlacement();

  const companyId = currentUser?.companyId || 'comp_01';
  const companyDrives = drives.filter(d => d.companyId === companyId);
  const companyApps = applications.filter(a => a.companyId === companyId);

  const navLinks = getCompanyNavLinks({
    designation: currentUser?.designation,
    drivesCount: companyDrives.length,
    applicantsCount: companyApps.length
  });

  const isInterviewer = currentUser?.designation === 'INTERVIEWER';

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-mobile-backdrop md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Left Sidebar */}
      <aside
        style={{ backgroundColor: '#17365D' }}
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col text-white transition-all duration-200 ease-in-out border-r border-[#17365D]/60 ${
          isCollapsed ? 'w-[72px]' : 'w-[248px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Top Brand Banner */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-white/10 shrink-0">
          {!isCollapsed ? (
            <Link to="/company/dashboard" className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded bg-white text-[#17365D] flex items-center justify-center font-black text-sm shrink-0">
                G
              </div>
              <div className="min-w-0">
                <span className="text-xs font-black tracking-tight text-white block truncate">
                  {currentUser?.companyName || 'Google India'}
                </span>
                <span className="text-[10px] font-bold text-[#E0B66D] tracking-wider uppercase block truncate">
                  {isInterviewer ? 'Technical Bar Raiser' : 'University Talent'}
                </span>
              </div>
            </Link>
          ) : (
            <div className="mx-auto w-8 h-8 rounded bg-white text-[#17365D] flex items-center justify-center font-black text-sm">
              G
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onCloseMobile}
                title={isCollapsed ? link.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#3478C5] text-white shadow-sm font-bold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && (
                  <span className="flex-1 truncate">{link.label}</span>
                )}
                {!isCollapsed && link.count !== undefined && link.count > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-white/20 text-white font-tabular">
                    {link.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Account Info at Bottom */}
        <div className="p-3 border-t border-white/10 shrink-0 bg-[#0F243E]">
          {!isCollapsed ? (
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {currentUser?.name || 'Devika Sen'}
                </p>
                <p className="text-[10px] text-[#E0B66D] truncate font-semibold">
                  {isInterviewer ? 'Staff Engineer / Interviewer' : 'Lead Campus Recruiter'}
                </p>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-300 hover:text-rose-300 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              title="Sign out"
              className="w-full flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-rose-300 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;
