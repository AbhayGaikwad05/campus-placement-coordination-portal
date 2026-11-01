import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DEMO_USERS } from '../../services/seedData';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Users, Shield, UserCheck, Check, ArrowRight } from 'lucide-react';
import { UserAccount, UserRole } from '../../types';

export const UserRoleDirectoryPage: React.FC = () => {
  const { currentUser } = usePlacement();
  const [usersList, setUsersList] = useState<UserAccount[]>(DEMO_USERS);

  const columns: Column<UserAccount>[] = [
    {
      key: 'name',
      header: 'Full Name',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.name}</span>
          <p className="text-[11px] text-[#697780]">{item.email}</p>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Assigned Role',
      sortable: true,
      render: item => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F7F6F2] border border-[#E1E5E2] text-[#182B32]">
          {item.role.replace(/_/g, ' ')}
        </span>
      )
    },
    {
      key: 'designation',
      header: 'Designation / Organization',
      render: item => (
        <span className="text-xs text-[#697780]">
          {item.designation || item.companyName || item.department || 'Student'}
        </span>
      )
    },
    {
      key: 'phone',
      header: 'Contact Phone',
      render: item => <span className="font-mono text-[11px] text-[#697780]">{item.phone || 'N/A'}</span>
    },
    {
      key: 'actions',
      header: 'Account Status',
      render: item => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Check className="w-3 h-3 text-emerald-600" />
          <span>Active & Authorized</span>
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            User Accounts & Institutional Role Access
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Directory of authorized campus placement officers, coordinators, recruiters, and students.
          </p>
        </div>
      </div>

      <DataTable
        data={usersList}
        columns={columns}
        searchPlaceholder="Search users by name, email, or role..."
        exportFilename="Placement_Portal_Users_Directory"
        pageSize={10}
      />
    </div>
  );
};
