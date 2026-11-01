import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { Menu, Bell, Shield, Building, LogOut } from 'lucide-react';

export const CRPCHeader = ({ onToggleMobile }) => {
  const { currentUser, logout } = useAuth();
  const { settings, unreadNotificationCount } = usePlacement();

  const getDesignationPill = () => {
    switch (currentUser?.designation) {
      case 'SUPER_ADMIN':
        return {
          text: 'Super Admin Access',
          classes: 'bg-[#FDF9F0] text-[#8A642A] border-[#E0B66D]'
        };
      case 'PLACEMENT_OFFICER':
        return {
          text: 'Placement Officer',
          classes: 'bg-[#E7EDF5] text-[#17365D] border-[#17365D]/20'
        };
      case 'DEPT_COORDINATOR':
        return {
          text: currentUser?.department ? `Coordinator · ${currentUser.department.split(' ')[0]}` : 'Dept Coordinator',
          classes: 'bg-[#EFF8FF] text-[#175CD3] border-[#175CD3]/20'
        };
      default:
        return {
          text: 'CRPC Cell',
          classes: 'bg-slate-100 text-slate-700 border-slate-200'
        };
    }
  };

  const pill = getDesignationPill();

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
          <span className="text-xs font-bold text-[#172B45] hidden sm:inline">CRPC Directorate</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${pill.classes}`}>
            {pill.text}
          </span>
        </div>
      </div>

      {/* Right: Season Badge & User Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#F8FAFC] rounded-full border border-[#E0E6ED]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-[#172B45]">
            Academic Year {settings?.currentAcademicYear || '2025-2026'}
          </span>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E0E6ED]">
          <div className="w-8 h-8 rounded-full bg-[#17365D] text-white flex items-center justify-center text-xs font-bold">
            {currentUser?.name?.charAt(0) || 'D'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-[#172B45] leading-tight">
              {currentUser?.name || 'Dr. Rajesh Kulkarni'}
            </p>
            <p className="text-[10px] text-[#64748B]">
              {currentUser?.designationLabel || 'CRPC Directorate'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CRPCHeader;
