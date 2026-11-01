import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { mockService } from '../../services/mockService';
import {
  Award,
  Plus,
  Gift,
  Building2,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { Offer } from '../../types';

export const OfferCoordinationPage: React.FC = () => {
  const { offers, applications, issueOffer, settings, showToast } = usePlacement();

  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(applications[0]?.id || '');
  const [ctcLpa, setCtcLpa] = useState<number>(14.5);
  const [baseLpa, setBaseLpa] = useState<number>(10.0);
  const [joiningBonus, setJoiningBonus] = useState<number>(1.5);
  const [workLocation, setWorkLocation] = useState('Pune');
  const [joiningDate, setJoiningDate] = useState('2026-07-01');
  const [deadline, setDeadline] = useState('2026-11-20');

  const stats = mockService.getPlacementSummary('ALL', 2026);

  const handleIssueOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const app = applications.find(a => a.id === selectedAppId);
    if (!app) return;

    issueOffer({
      applicationId: app.id,
      studentId: app.studentId,
      studentName: app.studentName,
      studentDepartment: app.studentDepartment,
      companyId: app.companyId,
      companyName: app.companyName,
      driveId: app.driveId,
      jobRole: app.driveTitle,
      ctcLpa: Number(ctcLpa),
      baseSalaryLpa: Number(baseLpa),
      joiningBonusLpa: Number(joiningBonus),
      workLocation,
      acceptanceDeadline: deadline,
      expectedJoiningDate: joiningDate,
      offerLetterFileName: `${app.companyName.replace(/\s+/g, '_')}_Offer_${app.studentName.replace(/\s+/g, '_')}.pdf`
    });

    setIssueModalOpen(false);
  };

  const columns: Column<Offer>[] = [
    {
      key: 'studentName',
      header: 'Candidate',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.studentName}</span>
          <p className="text-[11px] text-[#697780]">{item.studentDepartment}</p>
        </div>
      )
    },
    {
      key: 'companyName',
      header: 'Company & Role',
      sortable: true,
      render: item => (
        <div>
          <span className="font-semibold text-[#182B32]">{item.companyName}</span>
          <p className="text-[11px] text-[#697780]">{item.jobRole}</p>
        </div>
      )
    },
    {
      key: 'ctcLpa',
      header: 'Total CTC',
      sortable: true,
      className: 'font-tabular',
      render: item => (
        <span className="font-black text-[#387A70]">
          ₹{item.ctcLpa} LPA
        </span>
      )
    },
    {
      key: 'baseSalaryLpa',
      header: 'Base Salary',
      sortable: true,
      className: 'font-tabular',
      render: item => <span className="text-xs">₹{item.baseSalaryLpa} LPA</span>
    },
    {
      key: 'status',
      header: 'Offer Status',
      sortable: true,
      render: item => <StatusBadge status={item.status} />
    },
    {
      key: 'acceptanceDeadline',
      header: 'Deadline',
      sortable: true,
      className: 'font-tabular text-xs text-[#697780]'
    },
    {
      key: 'offerLetter',
      header: 'Document',
      render: item => (
        <div className="flex items-center gap-1 text-[11px] text-[#697780] font-mono">
          <FileText className="w-3.5 h-3.5 text-[#387A70]" />
          <span className="truncate max-w-[120px]">{item.offerLetterFileName}</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Campus Offers & Placement Records Coordination
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Official ledger of extended offers, student acceptance decisions, and confirmed placements.
          </p>
        </div>

        <button
          onClick={() => setIssueModalOpen(true)}
          className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Record Company Offer</span>
        </button>
      </div>

      {/* Unique placement count summary pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Unique Placed Students</span>
          <p className="text-2xl font-black text-[#2E7D32] font-tabular mt-1">{stats.uniquePlacedStudentsCount}</p>
          <p className="text-[11px] text-[#697780] mt-0.5 font-semibold">{stats.placementPercentage}% Placement Rate</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Total Offers Issued</span>
          <p className="text-2xl font-black text-[#182B32] font-tabular mt-1">{stats.totalOffersIssued}</p>
          <p className="text-[11px] text-[#697780] mt-0.5">{stats.totalOffersAccepted} Confirmed Accepted</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Offers Declined</span>
          <p className="text-2xl font-black text-[#B94C45] font-tabular mt-1">{stats.totalOffersDeclined}</p>
          <p className="text-[11px] text-[#697780] mt-0.5">Rejected by candidates</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Highest CTC Confirmed</span>
          <p className="text-2xl font-black text-[#387A70] font-tabular mt-1">₹{stats.highestCtcLpa} LPA</p>
          <p className="text-[11px] text-[#697780] mt-0.5">Average: ₹{stats.averageCtcLpa} LPA</p>
        </div>
      </div>

      <DataTable
        data={offers}
        columns={columns}
        searchPlaceholder="Search offers by student, company, or role..."
        exportFilename="Campus_Offers_Master_Ledger"
        pageSize={10}
      />

      {/* Record Offer Modal */}
      <Modal
        isOpen={issueModalOpen}
        onClose={() => setIssueModalOpen(false)}
        title="Record Formal Campus Employment Offer"
        description="Issue official appointment letter details to candidate."
      >
        <form onSubmit={handleIssueOffer} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Select Candidate Application *</label>
            <select
              value={selectedAppId}
              onChange={e => setSelectedAppId(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
            >
              {applications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.studentName} ({app.studentDepartment}) — {app.companyName} ({app.driveTitle})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Total CTC (LPA) *</label>
              <input
                type="number"
                step="0.5"
                required
                value={ctcLpa}
                onChange={e => setCtcLpa(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular font-bold text-[#387A70]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Base Salary (LPA)</label>
              <input
                type="number"
                step="0.5"
                value={baseLpa}
                onChange={e => setBaseLpa(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Joining Bonus (LPA)</label>
              <input
                type="number"
                step="0.5"
                value={joiningBonus}
                onChange={e => setJoiningBonus(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Work Location *</label>
              <input
                type="text"
                required
                value={workLocation}
                onChange={e => setWorkLocation(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Expected Joining Date</label>
              <input
                type="date"
                value={joiningDate}
                onChange={e => setJoiningDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Decision Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIssueModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs"
            >
              Issue Campus Offer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
