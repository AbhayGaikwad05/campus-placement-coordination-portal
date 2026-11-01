import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { Building2, ArrowRight } from 'lucide-react';

export const CompanyRegisterPage: React.FC = () => {
  const { createCompany, showToast, settings } = usePlacement();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    industry: 'Technology & Cloud Computing',
    description: '',
    headquarters: '',
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    tier: 'TIER_2' as const,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCompany({
      name: formData.name,
      website: formData.website,
      industry: formData.industry,
      description: formData.description,
      headquarters: formData.headquarters,
      primaryContactName: formData.primaryContactName,
      primaryContactEmail: formData.primaryContactEmail,
      primaryContactPhone: formData.primaryContactPhone,
      tier: formData.tier,
      notes: formData.notes
    });

    showToast({
      type: 'success',
      title: 'Company Registration Submitted',
      message: `${formData.name} application has been sent to CRPC. Review will occur in the Placement Officer portal.`
    });

    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-8 px-4 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full bg-white border border-[#E1E5E2] rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E1E5E2]">
          <div className="p-2.5 rounded-lg bg-[#FBF5E9] text-[#8C6B1F]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#182B32]">
              Recruiting Partner Registration
            </h1>
            <p className="text-xs text-[#697780]">
              {settings.institutionName} · Placement Onboarding Portal
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Cisco Systems India"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Company Website *</label>
              <input
                type="url"
                required
                value={formData.website}
                onChange={e => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://company.com"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Industry Sector *</label>
              <select
                value={formData.industry}
                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
              >
                <option value="Technology & Cloud Computing">Technology & Cloud Computing</option>
                <option value="Software & AI/ML">Software & AI/ML</option>
                <option value="Core Engineering & Automotive">Core Engineering & Automotive</option>
                <option value="Consulting & Data Analytics">Consulting & Data Analytics</option>
                <option value="Fintech & Banking">Fintech & Banking</option>
                <option value="Healthcare & BioTech">Healthcare & BioTech</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Brief Description *</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief overview of operations and hiring focus..."
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Primary Recruiter Name *</label>
              <input
                type="text"
                required
                value={formData.primaryContactName}
                onChange={e => setFormData({ ...formData, primaryContactName: e.target.value })}
                placeholder="Lead Campus Recruiter"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Recruiter Email *</label>
              <input
                type="email"
                required
                value={formData.primaryContactEmail}
                onChange={e => setFormData({ ...formData, primaryContactEmail: e.target.value })}
                placeholder="recruiter@company.com"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Official Contact Phone *</label>
              <input
                type="text"
                required
                value={formData.primaryContactPhone}
                onChange={e => setFormData({ ...formData, primaryContactPhone: e.target.value })}
                placeholder="+91 98000 00000"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Headquarters Location *</label>
              <input
                type="text"
                required
                value={formData.headquarters}
                onChange={e => setFormData({ ...formData, headquarters: e.target.value })}
                placeholder="Bengaluru / Pune"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
              />
            </div>
          </div>

          <div className="p-3 bg-[#F0EFEA] border border-[#E1E5E2] rounded-md text-[11px] text-[#697780]">
            Registration submissions enter the <span className="font-semibold text-[#182B32]">Pending Verification</span> queue for the CRPC Placement Officer to review and approve before publishing drives.
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#387A70] hover:bg-[#2D635B] text-white font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Submit Onboarding Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#697780]">
          Already registered?{' '}
          <Link to="/login" className="text-[#387A70] font-semibold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
