import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const HomeFooter = () => {
  return (
    <footer className="bg-[#172B45] text-white pt-12 pb-8 border-t border-[#17365D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/assets/brand/mitaoe-logo.jpg"
                alt="MITAOE"
                className="w-9 h-9 object-contain rounded bg-white p-0.5"
                onError={(e) => {
                  e.currentTarget.src = '/images/mitaoe-logo.jpg';
                }}
              />
              <span className="text-sm font-extrabold tracking-tight">MITAOE CRPC</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Corporate Relations & Placement Cell, MIT Academy of Engineering, Pune. Dedicated to fostering industry partnerships and empowering students with premier career opportunities.
            </p>
            <div className="text-[11px] text-slate-400">
              Autonomous Institute Affiliated to SPPU · Approved by AICTE
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E0B66D] mb-3">
              Portals & Access
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#3478C5]" />
                  <span>Student Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#3478C5]" />
                  <span>CRPC Governance Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#3478C5]" />
                  <span>Company Partner Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="hover:text-white transition-colors">
                  Password Recovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Placement Policy Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E0B66D] mb-3">
              Policy & Governance
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Single Offer Institutional Rule</li>
              <li>• Dream Package Threshold (₹9.0+ LPA)</li>
              <li>• Super-Dream Tier (₹18.0+ LPA)</li>
              <li>• Semester Marksheet Verification Mandatory</li>
              <li>• Transparent Evaluation & Audit Trail</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E0B66D] mb-3">
              Placement Cell Office
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3478C5] shrink-0 mt-0.5" />
                <span>CRPC Directorate, Ground Floor, Academic Block B, MITAOE, Alandi, Pune - 412105</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3478C5] shrink-0" />
                <span>crpc@mitaoe.ac.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3478C5] shrink-0" />
                <span>+91 020 30253500 / 700</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 MIT Academy of Engineering, Pune. All Rights Reserved.</p>
          <p className="font-mono text-[11px] text-slate-500">
            Campus Placement Coordination Portal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
