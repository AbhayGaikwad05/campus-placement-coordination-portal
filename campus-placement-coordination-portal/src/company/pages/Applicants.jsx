import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import DataTable from '../../shared/components/DataTable';
import StatusBadge from '../../shared/components/StatusBadge';
import Modal from '../../shared/components/Modal';
import {
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  Gift,
  FileText,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const CandidatePipelinePage = () => {
  const { currentUser, companies, applications, updateApplicationStage, showToast } = usePlacement();
  if (!currentUser) return null;
  const companyId = currentUser.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0];

  const myApplications = applications.filter(a => a.companyId === company.id);

  const [selectedApp, setSelectedApp] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleShortlist = (app) => {
    updateApplicationStage(app.id, 'SHORTLISTED', `Shortlisted by ${company.name} recruiter`);
    showToast({
      type: 'success',
      title: 'Candidate Shortlisted',
      message: `${app.studentName} advanced to Shortlisted stage.`
    });
  };

  const handleReject = (app) => {
    updateApplicationStage(app.id, 'REJECTED', `Application closed by ${company.name}`);
    showToast({
      type: 'info',
      title: 'Application Closed',
      message: `${app.studentName} application marked as rejected.`
    });
  };

  const columns = [
    {
      key: 'studentName',
      header: 'Applicant Name',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.studentName}</span>
          <p className="text-[11px] text-[#697780]">{item.studentDepartment} · CGPA {item.studentCgpa.toFixed(2)}</p>
        </div>
      )
    },
    {
      key: 'driveTitle',
      header: 'Applied Role',
      sortable: true,
      render: item => <span className="font-semibold text-[#182B32]">{item.driveTitle}</span>
    },
    {
      key: 'currentStage',
      header: 'Pipeline Milestone',
      sortable: true,
      render: item => <StatusBadge status={item.currentStage} />
    },
    {
      key: 'resume',
      header: 'Submitted Resume',
      render: item => (
        <span className="text-xs font-mono text-[#387A70] flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          <span>{item.resumeFileName}</span>
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Recruiter Action',
      render: item => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setSelectedApp(item);
              setDetailModalOpen(true);
            }}
            className="px-2.5 py-1 bg-[#F7F6F2] hover:bg-[#E5EEE8] border border-[#E1E5E2] text-xs font-semibold rounded text-[#182B32]"
          >
            Snapshot
          </button>

          {item.currentStage !== 'SHORTLISTED' && item.currentStage !== 'OFFERED' && item.currentStage !== 'OFFER_ACCEPTED' && (
            <button
              onClick={() => handleShortlist(item)}
              className="px-2.5 py-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold rounded shadow-2xs transition-colors"
            >
              Shortlist
            </button>
          )}

          {item.currentStage !== 'REJECTED' && (
            <button
              onClick={() => handleReject(item)}
              className="px-2.5 py-1 bg-white border border-[#B94C45] text-[#B94C45] hover:bg-[#FEF2F2] text-xs font-semibold rounded transition-colors"
            >
              Reject
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {company.name} — Candidate Applicant Pipeline
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Review candidate snapshot profiles, submitted resumes, and advance candidates through recruitment rounds.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#182B32] font-tabular">
          {myApplications.length} candidates in pipeline
        </span>
      </div>

      <DataTable
        data={myApplications}
        columns={columns}
        searchPlaceholder="Search candidates by name, department, or role..."
        exportFilename={`${company.name.replace(/\s+/g, '_')}_Applicants`}
        pageSize={10}
      />

      {/* Snapshot Preview Modal */}
      {selectedApp && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Candidate Application Snapshot: ${selectedApp.studentName}`}
          description={`${selectedApp.studentDepartment} · Applied for ${selectedApp.driveTitle}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#F0FDF9] border border-[#99F6E4] rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0F766E]">Current Stage</span>
                <p className="font-bold text-[#115E59] text-sm mt-0.5">{selectedApp.currentStageName}</p>
              </div>
              <StatusBadge status={selectedApp.currentStage} />
            </div>

            <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#182B32]">
                <ShieldCheck className="w-4 h-4 text-[#387A70]" />
                <span>Verified Application Snapshot (Immutable)</span>
              </div>
              <p className="text-[#697780]">Submitted on {new Date(selectedApp.snapshot.appliedAt).toLocaleString()}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[#697780]">Cumulative CGPA:</span>
                  <p className="font-bold text-[#387A70] text-sm">{selectedApp.snapshot.cgpa.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-[#697780]">Attached Resume:</span>
                  <p className="font-bold text-[#182B32]">{selectedApp.snapshot.resumeTitle}</p>
                </div>
              </div>

              <div>
                <span className="text-[#697780]">Skills:</span>
                <p className="font-medium text-[#182B32] mt-0.5">{selectedApp.snapshot.skillsSnapshot.join(', ')}</p>
              </div>

              {selectedApp.snapshot.projectsSummary && (
                <div>
                  <span className="text-[#697780]">Key Projects:</span>
                  <p className="font-medium text-[#182B32] mt-0.5">{selectedApp.snapshot.projectsSummary}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDetailModalOpen(false)}
                className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs"
              >
                Close Snapshot
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const Applicants = CandidatePipelinePage;
export default Applicants;
