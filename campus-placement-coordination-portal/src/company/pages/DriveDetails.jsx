import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button } from '../../shared/components/Button';
import { ArrowLeft, Briefcase, Users, Calendar, MapPin } from 'lucide-react';

export const DriveDetails = () => {
  const { id } = useParams();
  const { drives, applications } = usePlacement();
  const navigate = useNavigate();

  const drive = drives.find(d => d.id === id) || drives[0];

  if (!drive) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-[#E0E6ED]">
        <h3 className="text-sm font-bold text-[#172B45]">Drive Not Found</h3>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/company/drives')}>
          Back to Drives
        </Button>
      </div>
    );
  }

  const driveApps = applications.filter(a => a.driveId === drive.id);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/company/drives')}
          className="p-2 rounded-lg bg-white border border-[#E0E6ED] text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-black text-[#172B45]">{drive.jobTitle}</h1>
          <p className="text-xs text-[#64748B]">{drive.companyName} · Drive ID: {drive.id}</p>
        </div>
      </div>

      <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E6ED]">
          <div>
            <span className="text-xs text-[#64748B] block">Current Drive Status</span>
            <StatusBadge status={drive.status} />
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#17365D]">₹{drive.ctcLpa} LPA</span>
            <span className="text-[11px] text-[#64748B] block">Compensation Package</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">Job Description</h3>
          <p className="text-xs text-[#172B45] leading-relaxed whitespace-pre-line">
            {drive.jobDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E0E6ED] text-xs">
          <div>
            <span className="text-[#64748B] block text-[11px]">Location</span>
            <strong className="text-[#172B45]">{drive.workLocation}</strong>
          </div>
          <div>
            <span className="text-[#64748B] block text-[11px]">Min CGPA</span>
            <strong className="text-[#172B45]">{drive.eligibilityCriteria?.minCgpa || 7.0}</strong>
          </div>
          <div>
            <span className="text-[#64748B] block text-[11px]">Registered Applicants</span>
            <strong className="text-base text-[#17365D]">{driveApps.length}</strong>
          </div>
          <div>
            <span className="text-[#64748B] block text-[11px]">Deadline</span>
            <strong className="text-[#172B45]">{drive.registrationDeadline}</strong>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E0E6ED] flex items-center justify-end gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/company/applicants')}
          >
            Manage Applicants Pipeline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriveDetails;
