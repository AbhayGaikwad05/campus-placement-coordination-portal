import React, { useState, useRef, useEffect } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Menu
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { MitaoeLogo } from './MitaoeBranding';
import { getThemeForRole } from '../../theme/roleTheme';

interface HeaderProps {
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav }) => {
  const {
    currentUser,
    logout,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = usePlacement();

  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return null;
  }

  const roleTheme = getThemeForRole(currentUser.role);

  const handleSignOut = () => {
    setUserMenuOpen(false);
    logout();
    navigate('/login');
  };

  const userInitials = (currentUser.name || 'User')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-16 px-4 lg:px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Nav toggle + Clean MITAOE Branding + Workspace Badge */}
      <div className="flex items-center gap-3">
        {onToggleMobileNav && (
          <button
            onClick={onToggleMobileNav}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(roleTheme.homePath)}>
          <MitaoeLogo />
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden lg:flex items-center relative w-72 xl:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search drives, records, schedules..."
          className="w-full text-xs pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all"
        />
      </div>

      {/* Right: Notifications, User Profile & Sign Out */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Button */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="View notifications"
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Drawer */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                      {unreadNotificationCount} new
                    </span>
                  )}
                </div>
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] font-semibold hover:underline cursor-pointer"
                    style={{ color: roleTheme.primaryColor }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">No notifications yet</div>
                ) : (
                  notifications.slice(0, 8).map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.linkUrl) navigate(n.linkUrl);
                        setNotifOpen(false);
                      }}
                      className="p-3.5 text-left hover:bg-slate-50 cursor-pointer transition-colors"
                      style={!n.read ? { backgroundColor: `${roleTheme.secondaryBg}60` } : undefined}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: roleTheme.primaryColor }}
                        >
                          {n.category}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Authenticated User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-xl text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0"
              style={{ backgroundColor: roleTheme.primaryColor }}
            >
              {userInitials}
            </div>

            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-900 max-w-[130px] truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                {roleTheme.shortRole}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 overflow-hidden">
              <div
                className="px-4 py-3 border-b border-slate-100"
                style={{ backgroundColor: roleTheme.pageBg }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: roleTheme.textColor,
                      borderColor: roleTheme.borderColor
                    }}
                  >
                    {roleTheme.shortRole}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                {currentUser.department && (
                  <p className="text-[10px] text-slate-600 font-medium mt-0.5">
                    Dept: {currentUser.department}
                  </p>
                )}
              </div>

              <div className="py-1 text-xs">
                {currentUser.role === 'STUDENT' && (
                  <button
                    onClick={() => {
                      navigate('/student/portfolio');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile & Portfolio</span>
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-t border-slate-100 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
