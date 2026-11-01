import React, { useState, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import DataTable from '../../shared/components/DataTable';
import StatusBadge from '../../shared/components/StatusBadge';
import Modal from '../../shared/components/Modal';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Filter,
  UserCheck,
  ShieldCheck,
  Download,
  Calendar
} from 'lucide-react';

export const ApplicationsCoordinationPage = () => {
  const { applications, drives, updateApplicationStage, showToast } = usePlacement();

  const [driveFilter, setDriveFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [stageModalOpen, setStageModalOpen] = useState(false);
  const [newStage, setNewStage] = useState('SHORTLISTED');
  const [stageNote, setStageNote] = useState('');

  const filteredApps = useMemo(() => {
    return applications.filter(a => {
      if (driveFilter !== 'ALL' && a.driveId !== driveFilter) return false;
      if (stageFilter !== 'ALL' && a.currentStage !== stageFilter) return false;
      return true;
    });
  }, [applications, driveFilter, stageFilter]);

  const handleOpenStageChange = (app) => {
    setSelectedApp(app);
    setNewStage(app.currentStage);
    setStageNote('');
    setStageModalOpen(true);
  };

  const handleConfirmStageChange = () => {
    if (!selectedApp) return;
    updateApplicationStage(selectedApp.id, newStage, stageNote || 'Updated by Placement Coordinator');
    setStageModalOpen(false);
  };

  const handleBulkShortlist = () => {
    const candidates = filteredApps.filter(a => a.currentStage === 'APPLIED' || a.currentStage === 'ELIGIBILITY_CONFIRMED' || a.currentStage === 'ASSESSMENT_COMPLETED');
    if (candidates.length === 0) {
      showToast({ type: 'info', title: 'No Eligible Candidates', message: 'No applications in qualifying stages to shortlist.' });
      return;
    }
    candidates.forEach(c => {
      updateApplicationStage(c.id, 'SHORTLISTED', 'Bulk shortlisting by CRPC placement office');
    });
    showToast({
      type: 'success',
      title: 'Bulk Shortlisting Complete',
      message: `Advanced ${candidates.length} candidates to Shortlisted status.`
    });
  };

  const columns = [
    {
      key: 'studentName',
      header: 'Candidate Name',
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
      header: 'Placement Drive',
      sortable: true,
      render: item => (
        <div>
          <span className="font-semibold text-[#182B32]">{item.companyName}</span>
          <p className="text-[11px] text-[#697780]">{item.driveTitle}</p>
        </div>
      )
    },
    {
      key: 'appliedAt',
      header: 'Applied Date',
      sortable: true,
      className: 'font-tabular',
      render: item => (
        <span className="text-xs text-[#697780]">
          {new Date(item.appliedAt).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'currentStage',
      header: 'Recruitment Milestone',
      sortable: true,
      render: item => <StatusBadge status={item.currentStage} />
    },
    {
      key: 'assessment',
      header: 'Screening Score',
      render: item => item.assessmentScore ? (
        <span className="font-tabular font-bold text-[#387A70]">
          {item.assessmentScore.score}/{item.assessmentScore.maxScore} ({item.assessmentScore.percentage}%)
        </span>
      ) : (
        <span className="text-[#94A3B8]">—</span>
      )
    },
    {
      key: 'actions',
      header: 'Action',
      render: item => (
        <button
          onClick={() => handleOpenStageChange(item)}
          className="px-2.5 py-1 bg-[#F0EFEA] hover:bg-[#E5EEE8] border border-[#CBD5E1] text-[#182B32] font-semibold text-xs rounded transition-colors"
        >
          Update Stage
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Candidate Applications & Pipeline Coordination
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Master application pipeline tracker with stage progression controls and bulk shortlisting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={driveFilter}
            onChange={e => setDriveFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
          >
            <option value="ALL">All Drives</option>
            {drives.map(d => (
              <option key={d.id} value={d.id}>{d.companyName} - {d.jobTitle.slice(0, 24)}...</option>
            ))}
          </select>

          <select
            value={stageFilter}
            onChange={e => setStageFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
          >
            <option value="ALL">All Stages</option>
            <option value="APPLIED">Applied</option>
            <option value="ELIGIBILITY_CONFIRMED">Eligibility Confirmed</option>
            <option value="ASSESSMENT_COMPLETED">Assessment Completed</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="OFFERED">Offered</option>
            <option value="OFFER_ACCEPTED">Offer Accepted</option>
          </select>

          <button
            onClick={handleBulkShortlist}
            className="px-3 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            Bulk Shortlist
          </button>
        </div>
      </div>

      <DataTable
        data={filteredApps}
        columns={columns}
        searchPlaceholder="Search candidate applications..."
        exportFilename="Candidate_Applications_Pipeline"
        pageSize={10}
      />

      {/* Stage Change Modal */}
      {selectedApp && (
        <Modal
          isOpen={stageModalOpen}
          onClose={() => setStageModalOpen(false)}
          title={`Update Pipeline Stage: ${selectedApp.studentName}`}
          description={`${selectedApp.companyName} · ${selectedApp.driveTitle}`}
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">
                Select New Recruitment Stage *
              </label>
              <select
                value={newStage}
                onChange={e => setNewStage(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
              >
                <option value="APPLIED">Applied</option>
                <option value="ELIGIBILITY_CONFIRMED">Eligibility Confirmed</option>
                <option value="ASSESSMENT_SCHEDULED">Assessment Scheduled</option>
                <option value="ASSESSMENT_COMPLETED">Assessment Completed</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                <option value="INTERVIEW_COMPLETED">Interview Completed</option>
                <option value="OFFERED">Offer Extended</option>
                <option value="OFFER_ACCEPTED">Offer Accepted (Placed)</option>
                <option value="OFFER_DECLINED">Offer Declined</option>
                <option value="REJECTED">Rejected / Closed</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">
                Stage Transition Note
              </label>
              <input
                type="text"
                value={stageNote}
                onChange={e => setStageNote(e.target.value)}
                placeholder="e.g. Cleared technical interview round with recommendation."
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStageModalOpen(false)}
                className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStageChange}
                className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs"
              >
                Save Stage Update
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const Applications = ApplicationsCoordinationPage;
export default Applications;
