import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Gift, Plus, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { Offer } from '../../types';

export const CompanyOffersPage: React.FC = () => {
  const { currentUser, companies, offers, applications, issueOffer } = usePlacement();
  if (!currentUser) return null;
  const companyId = currentUser.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0];

  const myOffers = offers.filter(o => o.companyId === company.id);
  const myApplications = applications.filter(a => a.companyId === company.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(myApplications[0]?.id || '');
  const [ctcLpa, setCtcLpa] = useState<number>(32.0);
  const [baseLpa, setBaseLpa] = useState<number>(20.0);
  const [joiningBonus, setJoiningBonus] = useState<number>(3.0);
  const [workLocation, setWorkLocation] = useState('Bengaluru / Hyderabad');
  const [deadline, setDeadline] = useState('2026-11-20');
  const [joiningDate, setJoiningDate] = useState('2026-07-15');

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const app = myApplications.find(a => a.id === selectedAppId);
    if (!app) return;

    issueOffer({
      applicationId: app.id,
      studentId: app.studentId,
      studentName: app.studentName,
      studentDepartment: app.studentDepartment,
      companyId: company.id,
      companyName: company.name,
      driveId: app.driveId,
      jobRole: app.driveTitle,
      ctcLpa: Number(ctcLpa),
      baseSalaryLpa: Number(baseLpa),
      joiningBonusLpa: Number(joiningBonus),
      workLocation,
      acceptanceDeadline: deadline,
      expectedJoiningDate: joiningDate,
      offerLetterFileName: `${company.name.replace(/\s+/g, '_')}_Offer_${app.studentName.replace(/\s+/g, '_')}.pdf`
    });

    setModalOpen(false);
  };

  const columns: Column<Offer>[] = [
    {
      key: 'studentName',
      header: 'Selected Candidate',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.studentName}</span>
          <p className="text-[11px] text-[#697780]">{item.studentDepartment}</p>
        </div>
      )
    },
    {
      key: 'jobRole',
      header: 'Offered Role',
      sortable: true,
      render: item => <span className="font-semibold text-[#182B32]">{item.jobRole}</span>
    },
    {
      key: 'ctcLpa',
      header: 'Annual CTC Package',
      sortable: true,
      className: 'font-tabular',
      render: item => <span className="font-black text-[#387A70]">₹{item.ctcLpa} LPA</span>
    },
    {
      key: 'baseSalaryLpa',
      header: 'Base Salary',
      sortable: true,
      className: 'font-tabular text-xs'
    },
    {
      key: 'status',
      header: 'Student Response',
      sortable: true,
      render: item => <StatusBadge status={item.status} />
    },
    {
      key: 'acceptanceDeadline',
      header: 'Expiry Deadline',
      sortable: true,
      className: 'font-tabular text-xs text-[#697780]'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {company.name} — Offers & Candidate Selection Ledger
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Extend formal offers to selected candidates and monitor acceptance decisions.
          </p>
        </div>

        {myApplications.length > 0 && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Campus Offer</span>
          </button>
        )}
      </div>

      <DataTable
        data={myOffers}
        columns={columns}
        searchPlaceholder="Search offers by candidate or role..."
        exportFilename={`${company.name.replace(/\s+/g, '_')}_Offers`}
        pageSize={10}
      />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Extend Campus Employment Offer"
        description={`Recruiter: ${currentUser.name} (${company.name})`}
      >
        <form onSubmit={handleIssue} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Select Candidate *</label>
            <select
              value={selectedAppId}
              onChange={e => setSelectedAppId(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
            >
              {myApplications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.studentName} ({app.studentDepartment}) — {app.driveTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">CTC (LPA) *</label>
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
              <label className="block font-semibold text-[#182B32] mb-1">Base (LPA)</label>
              <input
                type="number"
                step="0.5"
                value={baseLpa}
                onChange={e => setBaseLpa(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Joining Bonus</label>
              <input
                type="number"
                step="0.5"
                value={joiningBonus}
                onChange={e => setJoiningBonus(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Work Location</label>
              <input
                type="text"
                required
                value={workLocation}
                onChange={e => setWorkLocation(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Response Deadline</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs"
            >
              Issue Offer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
