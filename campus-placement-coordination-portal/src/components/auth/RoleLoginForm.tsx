import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { UserRole } from '../../types';
import { ROLE_THEMES, getThemeForRole } from '../../theme/roleTheme';
import { MitaoeLogo } from '../common/MitaoeBranding';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Info,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface RoleLoginFormProps {
  role: UserRole;
}

export const RoleLoginForm: React.FC<RoleLoginFormProps> = ({ role }) => {
  const theme = getThemeForRole(role);
  const { loginWithRole, settings } = usePlacement();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(theme.identifierExample);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const RoleIcon = theme.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError(`Please enter your ${theme.identifierLabel.toLowerCase()}`);
      return;
    }

    if (!password.trim() || password.length < 4) {
      setError('Please enter a valid password (minimum 4 characters)');
      return;
    }

    // Direct clean transition to the role-specific workspace
    loginWithRole(role, {
      email: identifier.includes('@') ? identifier : `${identifier}@mitaoe.ac.in`
    });
    navigate(theme.homePath);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: theme.pageBg }}
    >
      {/* Top Bar with Clean MITAOE Branding & Navigation Back */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
            title="Return to portal selection gateway"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Portals</span>
          </Link>
          <MitaoeLogo />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
          <span className="text-xs font-semibold text-slate-700">
            Season {settings.currentAcademicYear} Active
          </span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Header Banner customized by role color */}
          <div
            className="p-6 sm:p-7 border-b border-slate-100"
            style={{
              background: `linear-gradient(135deg, ${theme.secondaryBg} 0%, #FFFFFF 100%)`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border flex items-center gap-1.5"
                style={{
                  backgroundColor: theme.pageBg,
                  color: theme.textColor,
                  borderColor: theme.borderColor
                }}
              >
                <RoleIcon className="w-3.5 h-3.5" />
                <span>{theme.shortRole} Workspace</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                Official Access
              </span>
            </div>

            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {theme.portalTitle}
            </h1>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {theme.description}
            </p>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Identifier Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {theme.identifierLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={theme.identifierPlaceholder}
                  required
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-300 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold hover:underline"
                  style={{ color: theme.primaryColor }}
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
                  placeholder="Enter your security password"
                  required
                  className="w-full text-xs pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-300 transition-all"
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

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-slate-300"
                  style={{ accentColor: theme.primaryColor }}
                />
                <span>Remember on this device</span>
              </label>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-400" />
                SSL Encrypted
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              style={{
                backgroundColor: theme.primaryColor
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = theme.primaryHover)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = theme.primaryColor)}
            >
              <span>Sign In to {theme.shortRole} Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Registration / Account Help Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 text-xs text-slate-600">
            {role === 'STUDENT' ? (
              <div className="flex items-center justify-between">
                <span>New 2026 Batch Student?</span>
                <Link
                  to="/register/student"
                  className="font-bold hover:underline"
                  style={{ color: theme.primaryColor }}
                >
                  Register Student Profile →
                </Link>
              </div>
            ) : role === 'COMPANY_RECRUITER' ? (
              <div className="flex items-center justify-between">
                <span>New Recruiting Partner?</span>
                <Link
                  to="/register/company"
                  className="font-bold hover:underline"
                  style={{ color: theme.primaryColor }}
                >
                  Register Company Profile →
                </Link>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Institutional personnel accounts are managed and provisioned by the MITAOE CRPC Directorate. Contact the Placement Cell for credential inquiries.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Select a different institutional workspace</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl w-full mx-auto pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 MIT Academy of Engineering, Pune. Corporate Relations & Placement Cell.</p>
        <p className="text-[11px] text-slate-400 font-mono">
          Campus Placement Coordination Portal
        </p>
      </div>
    </div>
  );
};
