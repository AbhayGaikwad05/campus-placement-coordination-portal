import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import StatusBadge from '../../shared/components/StatusBadge';
import { Building2, Globe, MapPin, Users, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const CompanyProfilePage = () => {
  const { currentUser, companies } = usePlacement();
  if (!currentUser) return null;
  const companyId = currentUser.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-xl bg-[#FBF5E9] text-[#8C6B1F] shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#182B32]">{company.name}</h1>
              <StatusBadge status={company.verificationStatus} />
            </div>
            <p className="text-xs text-[#697780] mt-0.5">{company.industry} · Headquarters: {company.headquarters}</p>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#387A70] hover:underline flex items-center gap-1 mt-2"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{company.website}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-[#182B32] pb-2 border-b border-[#E1E5E2]">
          Organization Overview & Campus Engagement Focus
        </h2>
        <p className="text-xs text-[#697780] leading-relaxed">{company.description}</p>

        {company.notes && (
          <div className="p-3 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] text-xs text-[#697780]">
            <strong className="text-[#182B32]">Placement Cell Engagement Notes: </strong>
            {company.notes}
          </div>
        )}
      </div>

      <div className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-[#182B32] pb-2 border-b border-[#E1E5E2]">
          Authorized University Recruitment Team
        </h2>

        <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-[#182B32]">{company.primaryContactName}</p>
            <p className="text-[11px] text-[#697780]">Primary Talent Acquisition Lead</p>
            <div className="flex items-center gap-4 text-[#697780] mt-2">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {company.primaryContactEmail}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {company.primaryContactPhone}</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#2E7D32] bg-[#F0FDF4] px-2.5 py-1 rounded border border-[#DCFCE7]">
            Active Recruiter
          </span>
        </div>
      </div>
    </div>
  );
};

export const CompanyProfile = CompanyProfilePage;
export default CompanyProfile;
