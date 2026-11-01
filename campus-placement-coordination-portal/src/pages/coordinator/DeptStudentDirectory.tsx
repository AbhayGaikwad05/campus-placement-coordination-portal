import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Users } from 'lucide-react';
import { StudentProfile } from '../../types';

export const DeptStudentDirectory: React.FC = () => {
  const { students, currentUser } = usePlacement();
  if (!currentUser) return null;
  const myDept = currentUser.department || 'Computer Science and Engineering';
  const deptStudents = students.filter(s => s.department === myDept);

  const columns: Column<StudentProfile>[] = [
    {
      key: 'studentId',
      header: 'PRN',
      sortable: true,
      className: 'font-mono text-xs'
    },
    {
      key: 'name',
      header: 'Student Name',
      sortable: true,
      render: s => (
        <div>
          <span className="font-bold text-[#182B32]">{s.name}</span>
          <p className="text-[11px] text-[#697780]">{s.email}</p>
        </div>
      )
    },
    {
      key: 'cgpa',
      header: 'CGPA',
      sortable: true,
      className: 'font-tabular font-bold text-[#387A70]',
      render: s => s.cgpa.toFixed(2)
    },
    {
      key: 'activeBacklogs',
      header: 'Active Backlogs',
      sortable: true,
      className: 'font-tabular text-center',
      render: s => (
        <span className={`font-semibold ${s.activeBacklogs > 0 ? 'text-[#B94C45]' : 'text-[#2E7D32]'}`}>
          {s.activeBacklogs}
        </span>
      )
    },
    {
      key: 'isDocumentVerified',
      header: 'Academic Check',
      sortable: true,
      render: s => <StatusBadge status={s.isDocumentVerified ? 'VERIFIED' : 'PENDING'} />
    },
    {
      key: 'placementStatus',
      header: 'Status',
      sortable: true,
      render: s => <StatusBadge status={s.placementStatus} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {myDept} — Candidate Directory
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Department roster for academic verification and placement tracking.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#182B32] font-tabular">
          {deptStudents.length} candidates assigned
        </span>
      </div>

      <DataTable
        data={deptStudents}
        columns={columns}
        searchPlaceholder="Search assigned department students..."
        exportFilename={`${myDept.replace(/\s+/g, '_')}_Candidates`}
        pageSize={10}
      />
    </div>
  );
};
