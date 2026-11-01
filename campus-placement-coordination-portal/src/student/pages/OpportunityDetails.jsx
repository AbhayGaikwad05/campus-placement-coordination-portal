import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button } from '../../shared/components/Button';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const OpportunityDetails = () => {
  const { id, driveId } = useParams();
  const { drives, studentProfile, applyToDrive } = usePlacement();
  const navigate = useNavigate();

  const targetId = driveId || id;
  const drive = drives.find(d => d.id === targetId) || drives[0];

  if (!drive) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-[#E0E6ED]">
        <h3 className="text-sm font-bold text-[#172B45]">Opportunity Not Found</h3>
        <Link to="/student/opportunities" className="text-xs text-[#3478C5] hover:underline mt-2 inline-block">
          ← Back to All Drives
        </Link>
      </div>
    );
  }

  const minCgpa = drive.eligibility?.minCgpa ?? drive.eligibilityCriteria?.minCgpa ?? 7.0;
  const maxBacklogs = drive.eligibility?.maxActiveBacklogs ?? drive.eligibilityCriteria?.maxActiveBacklogs ?? 0;
  const batches = drive.eligibility?.allowedBatches?.join(', ') || drive.eligibilityCriteria?.allowedBatches?.join(', ') || '2026 Batch';
  const deadline = drive.applicationDeadline || drive.registrationDeadline || 'Ongoing';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/student/opportunities')}
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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E0E6ED]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#172B45]">{drive.companyName}</h2>
              <StatusBadge status={drive.tier || 'STANDARD'} />
            </div>
            <p className="text-xs text-[#64748B] mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{drive.workLocation || 'Pune / Bangalore, India'}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-[#17365D]">₹{drive.ctcLpa} LPA</span>
            <span className="text-[11px] text-[#64748B] block">Annual CTC Package</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">Job Description</h3>
          <p className="text-xs text-[#172B45] leading-relaxed whitespace-pre-line">
            {drive.jobDescription || 'We are seeking passionate engineering graduates to join our product engineering teams. You will work on cutting-edge platforms, distributed systems, and modern cloud technologies.'}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">Eligibility Criteria</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E0E6ED] text-xs">
            <div>
              <span className="text-[#64748B] block text-[11px]">Minimum CGPA</span>
              <strong className="text-[#172B45]">{minCgpa}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Max Active Backlogs</span>
              <strong className="text-[#172B45]">{maxBacklogs}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Allowed Batches</span>
              <strong className="text-[#172B45]">{batches}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Registration Deadline</span>
              <strong className="text-[#172B45]">{deadline}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E0E6ED]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/student/opportunities')}
          >
            Back to Opportunities
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const res = applyToDrive(drive.id, studentProfile?.resumes?.[0]?.id || 'res_default');
              navigate('/student/applications');
            }}
          >
            Confirm & Apply to Drive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;
