import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { ROLES } from '../services/authService';

export const Unauthorized = () => {
  const { currentUser } = useAuth();

  const getDashboardPath = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === ROLES.STUDENT) return '/student/dashboard';
    if (currentUser.role === ROLES.CRPC) return '/crpc/dashboard';
    return '/company/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white border border-[#E0E6ED] rounded-2xl p-8 max-w-md w-full shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-[#FEF3F2] text-[#B42318] flex items-center justify-center mx-auto mb-4 border border-[#B42318]/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-extrabold text-[#172B45] mb-2">Access Restricted (403)</h1>
        <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
          Your current session does not possess the required permissions or role designation to access this area of the placement portal.
        </p>

        {currentUser && (
          <div className="p-3 bg-[#F8FAFC] border border-[#E0E6ED] rounded-xl text-xs text-[#172B45] text-left mb-6 space-y-1">
            <p><span className="text-[#64748B]">Active User:</span> <span className="font-bold">{currentUser.name}</span></p>
            <p><span className="text-[#64748B]">Active Role:</span> <span className="font-bold">{currentUser.role}</span></p>
            <p><span className="text-[#64748B]">Designation:</span> <span className="font-bold">{currentUser.designation || 'Standard'}</span></p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
          <Link
            to={getDashboardPath()}
            className="w-full sm:w-auto px-4 py-2 bg-[#17365D] hover:bg-[#254E7A] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go to My Dashboard</span>
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch Role</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
