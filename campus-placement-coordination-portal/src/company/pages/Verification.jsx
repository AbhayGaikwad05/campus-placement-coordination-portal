import React from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button } from '../../shared/components/Button';
import { ShieldCheck, CheckCircle2, FileCheck, Building2, AlertCircle } from 'lucide-react';

export const Verification = () => {
  const { currentUser } = useAuth();
  const { companies } = usePlacement();

  const companyId = currentUser?.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
            Corporate Partner Verification
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Official CRPC accreditation for participating in on-campus recruitment drives.
          </p>
        </div>
        <StatusBadge status={company.verificationStatus} />
      </div>

      <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-3 p-4 bg-[#E8F5EE] border border-[#287449]/20 rounded-xl">
          <ShieldCheck className="w-8 h-8 text-[#287449] shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-[#172B45]">Accredited Recruitment Partner</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {company.name} has completed official document verification and holds Tier 1 placement partner status for the 2025-2026 academic season.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">Verification Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E0E6ED] text-xs">
            <div>
              <span className="text-[#64748B] block text-[11px]">Corporate Entity</span>
              <strong className="text-[#172B45]">{company.name}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Partner Tier</span>
              <strong className="text-[#17365D] font-black">{company.tier || 'TIER_1'}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Audited by</span>
              <strong className="text-[#172B45]">CRPC Lead Placement Officer</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">CRPC Placement Notes</h3>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-[#172B45]">
            {company.notes || 'Premium corporate recruiting partner approved for Super-Dream engineering drives with CTC >= 18 LPA.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
