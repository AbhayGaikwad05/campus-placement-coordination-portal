import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button } from '../../shared/components/Button';
import { ArrowLeft, Building2, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const CompanyDetails = () => {
  const { id } = useParams();
  const { companies, drives, updateCompanyStatus } = usePlacement();
  const navigate = useNavigate();

  const company = companies.find(c => c.id === id) || companies[0];

  if (!company) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-[#E0E6ED]">
        <h3 className="text-sm font-bold text-[#172B45]">Company Record Not Found</h3>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/crpc/companies')}>
          Back to Companies
        </Button>
      </div>
    );
  }

  const companyDrives = drives.filter(d => d.companyId === company.id);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/crpc/companies')}
          className="p-2 rounded-lg bg-white border border-[#E0E6ED] text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-black text-[#172B45]">{company.name}</h1>
          <p className="text-xs text-[#64748B]">{company.industry} · ID: {company.id}</p>
        </div>
      </div>

      <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E6ED]">
          <div>
            <span className="text-xs text-[#64748B] block">CRPC Verification Status</span>
            <StatusBadge status={company.verificationStatus} />
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#17365D] uppercase bg-[#E7EDF5] px-2.5 py-1 rounded-md">
              {company.tier || 'TIER_1'}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">Corporate Profile</h3>
          <p className="text-xs text-[#172B45] leading-relaxed">
            {company.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E0E6ED] text-xs">
          <div>
            <span className="text-[#64748B] block text-[11px]">Primary Contact</span>
            <strong className="text-[#172B45]">{company.primaryContactName}</strong>
            <p className="text-[#64748B] text-[11px] mt-0.5">{company.primaryContactEmail}</p>
          </div>
          <div>
            <span className="text-[#64748B] block text-[11px]">Headquarters</span>
            <strong className="text-[#172B45]">{company.headquarters}</strong>
          </div>
          <div>
            <span className="text-[#64748B] block text-[11px]">Total Campus Hires</span>
            <strong className="text-[#172B45] text-base">{company.totalHires} candidates</strong>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">Recruitment Drives ({companyDrives.length})</h3>
          <div className="space-y-2">
            {companyDrives.map(d => (
              <div key={d.id} className="p-3 bg-white border border-[#E0E6ED] rounded-lg flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#172B45]">{d.jobTitle}</p>
                  <p className="text-[11px] text-[#64748B]">₹{d.ctcLpa} LPA · Deadline: {d.registrationDeadline}</p>
                </div>
                <StatusBadge status={d.status} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
