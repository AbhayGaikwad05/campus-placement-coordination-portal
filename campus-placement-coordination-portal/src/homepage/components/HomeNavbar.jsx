import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { LogIn, ArrowRight, Menu, X, Shield, ExternalLink } from 'lucide-react';
import Button from '../../shared/components/Button';

export const HomeNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handlePortalAccess = () => {
    if (currentUser) {
      if (currentUser.role === 'STUDENT') navigate('/student/dashboard');
      else if (currentUser.role === 'CRPC') navigate('/crpc/dashboard');
      else navigate('/company/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="public-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/brand/mitaoe-logo.jpg"
              alt="MITAOE"
              className="w-10 h-10 object-contain rounded-md"
              onError={(e) => {
                e.currentTarget.src = '/images/mitaoe-logo.jpg';
              }}
            />
            <div>
              <span className="text-sm font-extrabold text-[#172B45] tracking-tight block">
                MIT Academy of Engineering
              </span>
              <span className="text-[11px] font-semibold text-[#64748B] block">
                Corporate Relations & Placement Cell (CRPC)
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-xs font-semibold text-[#172B45] hover:text-[#3478C5] transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-xs font-semibold text-[#64748B] hover:text-[#172B45] transition-colors">
              About CRPC
            </Link>
            <a href="#features" className="text-xs font-semibold text-[#64748B] hover:text-[#172B45] transition-colors">
              Platform Features
            </a>
            <a href="#roles" className="text-xs font-semibold text-[#64748B] hover:text-[#172B45] transition-colors">
              Institutional Portals
            </a>
            <a href="#workflow" className="text-xs font-semibold text-[#64748B] hover:text-[#172B45] transition-colors">
              Recruitment Workflow
            </a>
            <Link to="/contact" className="text-xs font-semibold text-[#64748B] hover:text-[#172B45] transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Login Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              icon={currentUser ? ArrowRight : LogIn}
              iconPosition="right"
              onClick={handlePortalAccess}
            >
              {currentUser ? 'My Dashboard' : 'Sign In to Portal'}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E0E6ED] bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold text-[#172B45] py-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold text-[#64748B] py-2"
          >
            About CRPC
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold text-[#64748B] py-2"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                handlePortalAccess();
              }}
            >
              {currentUser ? 'My Dashboard' : 'Sign In to Portal'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
