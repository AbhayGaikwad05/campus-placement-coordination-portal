import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { Menu, Bell, Building2, UserCheck } from 'lucide-react';

export const CompanyHeader = ({ onToggleMobile }) => {
  const { currentUser } = useAuth();
  const { unreadNotificationCount } = usePlacement();

  const isInterviewer = currentUser?.designation === 'INTERVIEWER';

  return (
    <header className="h-16 bg-white border-b border-[#E0E6ED] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Page Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#172B45] hidden sm:inline">
            {currentUser?.companyName || 'Google India'}
          </span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-[#E7EDF5] text-[#17365D] border-[#17365D]/20">
            {isInterviewer ? 'Interviewer Workspace' : 'Campus Recruiter'}
          </span>
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3">
        <Link
          to="/company/notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B42318] text-white text-[9px] font-black flex items-center justify-center">
              {unreadNotificationCount}
            </span>
          )}
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E0E6ED]">
          <div className="w-8 h-8 rounded-full bg-[#17365D] text-white flex items-center justify-center text-xs font-bold">
            {currentUser?.name?.charAt(0) || 'D'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-[#172B45] leading-tight">
              {currentUser?.name || 'Devika Sen'}
            </p>
            <p className="text-[10px] text-[#64748B]">
              {isInterviewer ? 'Technical Bar Raiser' : 'Talent Acquisition'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;
