import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { Menu, Bell, Search, User, LogOut } from 'lucide-react';

export const StudentHeader = ({ onToggleMobile }) => {
  const { currentUser, logout } = useAuth();
  const { unreadNotificationCount, studentProfile } = usePlacement();
  const navigate = useNavigate();

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

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-bold text-[#172B45]">Student Workspace</span>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-semibold text-[#64748B]">
            {currentUser?.department || 'Computer Science & Engineering'}
          </span>
        </div>
      </div>

      {/* Right: Notification Bell & Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#E7EDF5] rounded-full border border-[#17365D]/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-[#17365D]">
            CGPA: {studentProfile?.cgpa ? `${studentProfile.cgpa} / 10.0` : '8.94 / 10.0'}
          </span>
        </div>

        {/* Notifications */}
        <Link
          to="/student/notifications"
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
          <Link
            to="/student/profile"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-[#17365D] text-white flex items-center justify-center text-xs font-bold">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#172B45] leading-tight">
                {currentUser?.name || 'Aarav Sharma'}
              </p>
              <p className="text-[10px] text-[#64748B]">B.Tech Candidate</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
