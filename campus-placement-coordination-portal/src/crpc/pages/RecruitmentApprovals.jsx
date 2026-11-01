import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Modal } from '../../shared/components/Modal';
import { Button } from '../../shared/components/Button';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Building2,
  Briefcase,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Eye
} from 'lucide-react';

export const RecruitmentApprovals = () => {
  const { drives, companies, updateDriveStatus, updateCompanyStatus, showToast } = usePlacement();

  const [activeTab, setActiveTab] = useState('drives'); // drives, companies
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const pendingDrives = drives.filter(d => d.status === 'UNDER_REVIEW' || d.status === 'DRAFT');
  const pendingCompanies = companies.filter(c => c.verificationStatus === 'PENDING');

  const handleApproveDrive = (drive) => {
    updateDriveStatus(drive.id, 'PUBLISHED');
    showToast({
      type: 'success',
      title: 'Drive Approved & Published',
      message: `${drive.jobTitle} by ${drive.companyName} is now published to eligible students.`
    });
  };

  const handleRejectDrive = () => {
    if (!selectedDrive) return;
    updateDriveStatus(selectedDrive.id, 'CANCELLED');
    showToast({
      type: 'error',
      title: 'Drive Rejected',
      message: `Drive rejected with note: ${rejectReason || 'Criteria non-compliant'}`
    });
    setRejectModalOpen(false);
    setSelectedDrive(null);
    setRejectReason('');
  };

  const handleApproveCompany = (company) => {
    updateCompanyStatus(company.id, 'VERIFIED');
    showToast({
      type: 'success',
      title: 'Company Partner Verified',
      message: `${company.name} is now approved to conduct campus recruitment.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
            CRPC Recruitment Approvals & Governance Queue
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Audit proposed recruitment drive criteria, package disclosures, and partner registrations against institutional placement policies.
          </p>
        </div>

        {/* Tab switch */}
        <div className="bg-[#E7EDF5] p-1 rounded-lg flex items-center gap-1 border border-[#E0E6ED]">
          <button
            onClick={() => setActiveTab('drives')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === 'drives'
                ? 'bg-white text-[#17365D] shadow-xs'
                : 'text-[#64748B] hover:text-[#172B45]'
            }`}
          >
            Drives Queue ({pendingDrives.length})
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === 'companies'
                ? 'bg-white text-[#17365D] shadow-xs'
                : 'text-[#64748B] hover:text-[#172B45]'
            }`}
          >
            Company Verifications ({pendingCompanies.length})
          </button>
        </div>
      </div>

      {activeTab === 'drives' && (
        <div className="space-y-4">
          {pendingDrives.length === 0 ? (
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-12 text-center shadow-xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#172B45]">No Pending Drive Approvals</h3>
              <p className="text-xs text-[#64748B] mt-1">All submitted recruitment drives have been reviewed and processed.</p>
            </div>
          ) : (
            pendingDrives.map(drive => (
              <div
                key={drive.id}
                className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#172B45]">{drive.jobTitle}</span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs font-bold text-[#17365D]">{drive.companyName}</span>
                    <StatusBadge status={drive.tier || 'STANDARD'} size="sm" />
                  </div>

                  <p className="text-xs text-[#64748B] line-clamp-2 max-w-2xl">
                    {drive.jobDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#172B45] pt-1">
                    <span>Package: <strong className="text-[#17365D]">₹{drive.ctcLpa} LPA</strong></span>
                    <span>•</span>
                    <span>Min CGPA: <strong>{drive.eligibilityCriteria?.minCgpa || 7.0}</strong></span>
                    <span>•</span>
                    <span>Allowed Branches: <strong>{drive.eligibilityCriteria?.allowedDepartments?.join(', ') || 'All'}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="danger"
                    size="sm"
                    icon={XCircle}
                    onClick={() => {
                      setSelectedDrive(drive);
                      setRejectModalOpen(true);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => handleApproveDrive(drive)}
                  >
                    Approve & Publish
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="space-y-4">
          {pendingCompanies.length === 0 ? (
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-12 text-center shadow-xs">
              <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#172B45]">All Corporate Partners Verified</h3>
              <p className="text-xs text-[#64748B] mt-1">No company registrations awaiting credential validation.</p>
            </div>
          ) : (
            pendingCompanies.map(comp => (
              <div
                key={comp.id}
                className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#172B45]">{comp.name}</h3>
                    <StatusBadge status="PENDING" size="sm" />
                  </div>
                  <p className="text-xs text-[#64748B]">{comp.industry} · Headquarters: {comp.headquarters}</p>
                  <p className="text-xs text-[#172B45] mt-2">
                    Primary HR: <strong>{comp.primaryContactName}</strong> ({comp.primaryContactEmail} · {comp.primaryContactPhone})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="success"
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => handleApproveCompany(comp)}
                  >
                    Verify Partner
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Rejection Feedback Modal */}
      {selectedDrive && (
        <Modal
          isOpen={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          title={`Reject Drive: ${selectedDrive.jobTitle}`}
          subtitle={`Submitted by ${selectedDrive.companyName}`}
          footer={
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setRejectModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleRejectDrive}>
                Confirm Rejection
              </Button>
            </div>
          }
        >
          <div className="space-y-3 text-xs">
            <label className="block font-bold text-[#172B45]">Reason for CRPC Rejection</label>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="e.g. Proposed CTC does not meet the MITAOE Super-Dream threshold criteria or requires additional bond clarification."
              className="w-full text-xs p-3 border border-[#E0E6ED] rounded-lg"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecruitmentApprovals;
