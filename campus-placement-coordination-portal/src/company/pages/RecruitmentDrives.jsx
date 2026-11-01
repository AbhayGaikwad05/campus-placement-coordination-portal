import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import DataTable from '../../shared/components/DataTable';
import StatusBadge from '../../shared/components/StatusBadge';
import { Briefcase, Plus, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompanyDrivesPage = () => {
  const { currentUser, companies, drives, applications } = usePlacement();
  if (!currentUser) return null;
  const companyId = currentUser.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0];

  const myDrives = drives.filter(d => d.companyId === company.id);

  const columns = [
    {
      key: 'jobTitle',
      header: 'Job Title',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.jobTitle}</span>
          <p className="text-[11px] text-[#697780]">{item.workLocation} ({item.workMode})</p>
        </div>
      )
    },
    {
      key: 'ctcLpa',
      header: 'Package',
      sortable: true,
      className: 'font-tabular',
      render: item => <span className="font-bold text-[#387A70]">₹{item.ctcLpa} LPA</span>
    },
    {
      key: 'positionsCount',
      header: 'Openings',
      sortable: true,
      className: 'font-tabular text-center',
      render: item => <span className="font-semibold">{item.positionsCount}</span>
    },
    {
      key: 'applicantsCount',
      header: 'Applicants',
      className: 'font-tabular text-center',
      render: item => (
        <span className="font-bold text-[#182B32]">
          {applications.filter(a => a.driveId === item.id).length}
        </span>
      )
    },
    {
      key: 'applicationDeadline',
      header: 'Deadline',
      sortable: true,
      render: item => (
        <span className="text-xs text-[#697780] font-tabular">
          {new Date(item.applicationDeadline).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: item => <StatusBadge status={item.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {company.name} — Recruitment Drives
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Active and archived recruitment drives approved for the 2026 campus season.
          </p>
        </div>

        <Link
          to="/officer/drives"
          className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Campus Drive</span>
        </Link>
      </div>

      <DataTable
        data={myDrives}
        columns={columns}
        searchPlaceholder="Search company drives..."
        exportFilename={`${company.name.replace(/\s+/g, '_')}_Drives`}
        pageSize={10}
      />
    </div>
  );
};

export const RecruitmentDrives = CompanyDrivesPage;
export default RecruitmentDrives;
