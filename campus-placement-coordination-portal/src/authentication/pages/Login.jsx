import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES, DEMO_ACCOUNTS, findAccountByEmail } from '../services/authService';
import {
  GraduationCap,
  Building,
  Briefcase,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import '../styles/auth.css';

export const Login = () => {
  const { loginWithDemo } = useAuth();
  const navigate = useNavigate();

  // Selected main role tab: STUDENT, CRPC, or COMPANY
  const [selectedRole, setSelectedRole] = useState(ROLES.STUDENT);
  
  // Credentials input
  const [email, setEmail] = useState('student@mitaoe.ac.in');
  const [password, setPassword] = useState('MitAoe@Campus2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);

  // Update default email when switching main role tab
  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setError(null);
    setPassword('MitAoe@Campus2026!');
    if (role === ROLES.STUDENT) {
      setEmail('student@mitaoe.ac.in');
    } else if (role === ROLES.CRPC) {
      setEmail('admin@mitaoe.ac.in');
    } else if (role === ROLES.COMPANY) {
      setEmail('devika.sen@google.com');
    }
  };

  // Quick Persona switcher click
  const handleQuickLogin = (demoAccount) => {
    setError(null);
    setEmail(demoAccount.email);
    setPassword('MitAoe@Campus2026!');
    const res = loginWithDemo(demoAccount.id);
    if (res.success) {
      if (demoAccount.role === ROLES.STUDENT) {
        navigate('/student/dashboard');
      } else if (demoAccount.role === ROLES.CRPC) {
        navigate('/crpc/dashboard');
      } else {
        navigate('/company/dashboard');
      }
    } else {
      setError(res.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your registered email address');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    const matched = findAccountByEmail(email);
    if (matched) {
      const res = loginWithDemo(matched.id);
      if (res.success) {
        if (matched.role === ROLES.STUDENT) {
          navigate('/student/dashboard');
        } else if (matched.role === ROLES.CRPC) {
          navigate('/crpc/dashboard');
        } else {
          navigate('/company/dashboard');
        }
        return;
      }
    }

    // Fallback for custom emails
    if (selectedRole === ROLES.STUDENT) {
      loginWithDemo('user_student_1');
      navigate('/student/dashboard');
    } else if (selectedRole === ROLES.CRPC) {
      loginWithDemo('user_admin_1');
      navigate('/crpc/dashboard');
    } else {
      loginWithDemo('user_recruiter_1');
      navigate('/company/dashboard');
    }
  };

  // Filter demo accounts by the currently selected role
  const activeRoleDemoAccounts = DEMO_ACCOUNTS.filter(a => a.role === selectedRole);

  const roleMeta = {
    [ROLES.STUDENT]: {
      label: 'Student',
      icon: GraduationCap,
      color: '#17365D',
      title: 'Student Portal Access',
      subtitle: 'Sign in to access campus placement drives, track applications, and view offers.',
      emailPlaceholder: 'student@mitaoe.ac.in'
    },
    [ROLES.CRPC]: {
      label: 'CRPC Directorate',
      icon: Building,
      color: '#17365D',
      title: 'CRPC Governance Portal',
      subtitle: 'Unified institutional gateway for Super Admin, Placement Officers, and Coordinators.',
      emailPlaceholder: 'admin@mitaoe.ac.in / officer@mitaoe.ac.in'
    },
    [ROLES.COMPANY]: {
      label: 'Company Partner',
      icon: Briefcase,
      color: '#17365D',
      title: 'Corporate Recruitment Workspace',
      subtitle: 'Corporate portal for Company Recruiters and Technical Interviewers.',
      emailPlaceholder: 'recruiter@company.com'
    }
  };

  const currentMeta = roleMeta[selectedRole];
  const CurrentIcon = currentMeta.icon;

  return (
    <div className="auth-page-container">
      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-3 border-b border-[#E0E6ED]">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/brand/mitaoe-logo.jpg"
            alt="MITAOE Emblem"
            className="w-10 h-10 object-contain rounded-md"
            onError={(e) => {
              e.currentTarget.src = '/images/mitaoe-logo.jpg';
            }}
          />
          <div>
            <h2 className="text-sm font-bold text-[#172B45] leading-tight">MIT Academy of Engineering</h2>
            <p className="text-[11px] text-[#64748B]">Corporate Relations & Placement Cell</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xs font-semibold text-[#17365D] hover:underline"
          >
            ← Public Website
          </Link>
        </div>
      </header>

      {/* Main Authentication Box */}
      <div className="auth-card-container">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#17365D] bg-[#E7EDF5] border border-[#17365D]/15 px-3 py-1 rounded-full mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3478C5]" />
            <span>Official Institutional Authentication</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#172B45] tracking-tight">
            Sign In to Placement Portal
          </h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
            Choose your institutional role below to access your dedicated workspace.
          </p>
        </div>

        {/* 3 Main Role Selector Tabs */}
        <div className="bg-[#E7EDF5]/70 p-1 rounded-xl flex items-center gap-1 mb-5 border border-[#E0E6ED]">
          <button
            type="button"
            onClick={() => handleRoleTabChange(ROLES.STUDENT)}
            className={`role-tab-btn ${selectedRole === ROLES.STUDENT ? 'active' : ''}`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleTabChange(ROLES.CRPC)}
            className={`role-tab-btn ${selectedRole === ROLES.CRPC ? 'active' : ''}`}
          >
            <Building className="w-4 h-4" />
            <span>CRPC</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleTabChange(ROLES.COMPANY)}
            className={`role-tab-btn ${selectedRole === ROLES.COMPANY ? 'active' : ''}`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Company</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-[#E0E6ED] shadow-xl overflow-hidden">
          {/* Card Header Banner */}
          <div className="px-6 py-5 border-b border-[#E0E6ED] bg-gradient-to-r from-[#F8FAFC] to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#E7EDF5] text-[#17365D] flex items-center justify-center font-bold">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#172B45]">{currentMeta.title}</h3>
                  <p className="text-[11px] text-[#64748B]">{currentMeta.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-[#FEF3F2] border border-[#B42318]/20 text-[#B42318] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#172B45] mb-1.5">
                {selectedRole === ROLES.STUDENT ? 'Student Email / PRN' : selectedRole === ROLES.CRPC ? 'Institutional Email' : 'Work Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={currentMeta.emailPlaceholder}
                  required
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E0E6ED] rounded-lg text-[#172B45] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#3478C5] focus:ring-2 focus:ring-[#3478C5]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#172B45]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-[#3478C5] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your security password"
                  required
                  className="w-full text-xs pl-10 pr-10 py-2.5 bg-slate-50 border border-[#E0E6ED] rounded-lg text-[#172B45] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#3478C5] focus:ring-2 focus:ring-[#3478C5]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#64748B]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#17365D] focus:ring-[#17365D]"
                />
                <span>Remember me on this device</span>
              </label>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                SSL Verified
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-white text-xs font-bold rounded-lg shadow-sm bg-[#17365D] hover:bg-[#254E7A] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Sign In to {currentMeta.label} Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Persona Switcher for Testing (Grouped strictly under the 3 main roles) */}
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E0E6ED]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#3478C5]" />
                <span>Test Persona Quick Access ({currentMeta.label})</span>
              </span>
              <span className="text-[10px] text-slate-400">Click to instant sign-in</span>
            </div>

            <div className="space-y-1.5">
              {activeRoleDemoAccounts.map((acc) => (
                <div
                  key={acc.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuickLogin(acc)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleQuickLogin(acc);
                    }
                  }}
                  className="persona-switcher-pill"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#172B45] truncate">{acc.name}</p>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E7EDF5] text-[#17365D]">
                        {acc.designation}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] truncate">{acc.email}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto pt-4 border-t border-[#E0E6ED] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-2">
        <p>© 2026 MIT Academy of Engineering, Pune. Corporate Relations & Placement Cell.</p>
        <p className="text-[11px] text-slate-400 font-mono">
          Consolidated Role Governance v2.0
        </p>
      </footer>
    </div>
  );
};

export default Login;
