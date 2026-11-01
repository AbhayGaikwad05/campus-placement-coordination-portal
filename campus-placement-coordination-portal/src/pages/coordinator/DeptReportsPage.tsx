import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockService } from '../../services/mockService';
import { BarChart3, Download, Award, Users } from 'lucide-react';

export const DeptReportsPage: React.FC = () => {
  const { students, offers, currentUser, settings } = usePlacement();
  if (!currentUser) return null;
  const myDept = currentUser.department || 'Computer Science and Engineering';

  const deptStudents = students.filter(s => s.department === myDept);
  const deptOffers = offers.filter(o => o.studentDepartment === myDept);

  const stats = mockService.getPlacementSummary(myDept, 2026);

  const rows = deptStudents.map(std => {
    const stdOffer = deptOffers.find(o => o.studentId === std.id && o.status === 'ACCEPTED');
    return {
      studentId: std.studentId,
      name: std.name,
      cgpa: std.cgpa.toFixed(2),
      activeBacklogs: std.activeBacklogs,
      placementStatus: std.placementStatus,
      placedCompany: stdOffer ? stdOffer.companyName : 'Seeking Placement',
      jobRole: stdOffer ? stdOffer.jobRole : '—',
      ctcLpa: stdOffer ? `₹${stdOffer.ctcLpa} LPA` : '—'
    };
  });

  const columns: Column<typeof rows[0]>[] = [
    { key: 'studentId', header: 'PRN', sortable: true, className: 'font-mono' },
    {
      key: 'name',
      header: 'Student Name',
      sortable: true,
      render: r => <span className="font-bold text-[#182B32]">{r.name}</span>
    },
    { key: 'cgpa', header: 'CGPA', sortable: true, className: 'font-tabular font-bold text-[#387A70]' },
    { key: 'activeBacklogs', header: 'Backlogs', sortable: true, className: 'font-tabular text-center' },
    {
      key: 'placementStatus',
      header: 'Placement Status',
      sortable: true,
      render: r => <StatusBadge status={r.placementStatus} />
    },
    {
      key: 'placedCompany',
      header: 'Placed Company',
      sortable: true,
      render: r => <span className="font-semibold text-[#182B32]">{r.placedCompany}</span>
    },
    { key: 'ctcLpa', header: 'CTC Package', sortable: true, className: 'font-tabular font-bold text-[#2E7D32]' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {myDept} — Placement Audit Report
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Departmental placement ledger for batch of 2026.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Total Candidates</span>
          <p className="text-2xl font-black text-[#182B32] font-tabular mt-1">{stats.totalEligible}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Unique Placed</span>
          <p className="text-2xl font-black text-[#2E7D32] font-tabular mt-1">{stats.uniquePlacedStudentsCount}</p>
          <p className="text-[11px] text-[#697780] font-semibold">{stats.placementPercentage}% Rate</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Seeking Candidates</span>
          <p className="text-2xl font-black text-[#182B32] font-tabular mt-1">{stats.seekingPlacementCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E1E5E2] shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Average Package</span>
          <p className="text-2xl font-black text-[#387A70] font-tabular mt-1">₹{stats.averageCtcLpa} LPA</p>
        </div>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        searchPlaceholder="Search departmental report..."
        exportFilename={`${myDept.replace(/\s+/g, '_')}_Placement_Report`}
        pageSize={10}
      />
    </div>
  );
};
