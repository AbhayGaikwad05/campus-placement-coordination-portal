import React, { useState, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { History, Shield, Download, Info } from 'lucide-react';
import { AuditLogItem } from '../../types';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = usePlacement();
  const [filterRole, setFilterRole] = useState('ALL');

  const filteredLogs = useMemo(() => {
    if (filterRole === 'ALL') return auditLogs;
    return auditLogs.filter(l => l.actorRole === filterRole);
  }, [auditLogs, filterRole]);

  const columns: Column<AuditLogItem>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: item => (
        <span className="font-mono text-[11px] text-[#697780]">
          {new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'medium' })}
        </span>
      )
    },
    {
      key: 'actorName',
      header: 'Actor & Role',
      sortable: true,
      render: item => (
        <div>
          <p className="font-semibold text-[#182B32]">{item.actorName}</p>
          <span className="text-[10px] text-[#697780] font-mono">{item.actorRole.replace(/_/g, ' ')}</span>
        </div>
      )
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      render: item => (
        <span className="font-semibold text-[#387A70]">{item.action.replace(/_/g, ' ')}</span>
      )
    },
    {
      key: 'targetName',
      header: 'Target Record',
      render: item => (
        <div>
          <span className="text-[10px] uppercase font-bold text-[#697780] block">{item.targetType}</span>
          <span className="font-medium text-[#182B32]">{item.targetName}</span>
        </div>
      )
    },
    {
      key: 'details',
      header: 'Details & Changes',
      render: item => (
        <span className="text-xs text-[#697780] leading-relaxed">{item.details}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#387A70]" />
            <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
              Administrative System Audit Trail
            </h1>
          </div>
          <p className="text-xs text-[#697780] mt-1">
            Chronological audit log tracking company verifications, drive updates, offers, and policy decisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
            className="text-xs px-3 py-1.5 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
          >
            <option value="ALL">All Roles</option>
            <option value="CRPC_SUPER_ADMIN">Super Admin</option>
            <option value="CRPC_OFFICER">Placement Officer</option>
            <option value="DEPT_COORDINATOR">Dept Coordinator</option>
            <option value="COMPANY_RECRUITER">Recruiter</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      </div>

      {/* Institutional audit ledger notice */}
      <div className="p-3 bg-blue-950/60 border border-blue-900/80 rounded-xl text-xs text-blue-200/80 flex items-center gap-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong className="text-blue-100">Institutional Ledger Note:</strong> Audit log records are securely recorded in the placement ledger. Actions performed across all portals append here in real-time.
        </span>
      </div>

      {/* Audit Data Table */}
      <DataTable
        data={filteredLogs}
        columns={columns}
        searchPlaceholder="Search audit events by actor or target..."
        exportFilename="Placement_Portal_Audit_Log"
        pageSize={10}
      />
    </div>
  );
};
