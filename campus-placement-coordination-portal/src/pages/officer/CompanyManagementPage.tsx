import React, { useState, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { Company } from '../../types';

export const CompanyManagementPage: React.FC = () => {
  const { companies, updateCompanyStatus, createCompany, showToast } = usePlacement();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New company form state
  const [newComp, setNewComp] = useState({
    name: '',
    website: '',
    industry: 'Technology & Cloud Computing',
    description: '',
    headquarters: 'Bengaluru, India',
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    tier: 'TIER_1' as const,
    notes: ''
  });

  const filteredCompanies = useMemo(() => {
    if (statusFilter === 'ALL') return companies;
    return companies.filter(c => c.verificationStatus === statusFilter);
  }, [companies, statusFilter]);

  const handleApprove = (company: Company) => {
    updateCompanyStatus(company.id, 'VERIFIED');
    showToast({
      type: 'success',
      title: 'Company Verified',
      message: `${company.name} is now approved to publish placement drives.`
    });
  };

  const handleOpenReject = (company: Company) => {
    setSelectedCompany(company);
    setRejectReason('');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!selectedCompany) return;
    updateCompanyStatus(selectedCompany.id, 'REJECTED', rejectReason || 'Did not meet institutional partnership criteria');
    setRejectModalOpen(false);
  };

  const handleSuspend = (company: Company) => {
    const newStatus = company.verificationStatus === 'SUSPENDED' ? 'VERIFIED' : 'SUSPENDED';
    updateCompanyStatus(company.id, newStatus, newStatus === 'SUSPENDED' ? 'Administrative suspension' : undefined);
    showToast({
      type: 'info',
      title: `Company ${newStatus}`,
      message: `${company.name} status updated to ${newStatus}.`
    });
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    createCompany(newComp);
    setCreateModalOpen(false);
    setNewComp({
      name: '',
      website: '',
      industry: 'Technology & Cloud Computing',
      description: '',
      headquarters: 'Bengaluru, India',
      primaryContactName: '',
      primaryContactEmail: '',
      primaryContactPhone: '',
      tier: 'TIER_1',
      notes: ''
    });
  };

  const columns: Column<Company>[] = [
    {
      key: 'name',
      header: 'Company Name',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.name}</span>
          <a
            href={item.website}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-[#387A70] hover:underline flex items-center gap-1 mt-0.5"
          >
            <span>{item.website.replace('https://', '')}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      )
    },
    {
      key: 'industry',
      header: 'Industry',
      sortable: true,
      render: item => <span className="text-xs text-[#697780]">{item.industry}</span>
    },
    {
      key: 'verificationStatus',
      header: 'Status',
      sortable: true,
      render: item => <StatusBadge status={item.verificationStatus} />
    },
    {
      key: 'activeDriveCount',
      header: 'Active Drives',
      sortable: true,
      className: 'font-tabular text-center',
      render: item => <span className="font-bold text-[#182B32]">{item.activeDriveCount}</span>
    },
    {
      key: 'primaryContactName',
      header: 'Recruiter Contact',
      render: item => (
        <div>
          <p className="font-medium text-[#182B32]">{item.primaryContactName}</p>
          <p className="text-[11px] text-[#697780]">{item.primaryContactEmail}</p>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Verification Actions',
      render: item => (
        <div className="flex items-center gap-1.5">
          {item.verificationStatus === 'PENDING' && (
            <>
              <button
                onClick={() => handleApprove(item)}
                className="px-2.5 py-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-[11px] rounded transition-colors shadow-2xs"
              >
                Approve
              </button>
              <button
                onClick={() => handleOpenReject(item)}
                className="px-2.5 py-1 bg-white border border-[#B94C45] text-[#B94C45] hover:bg-[#FEF2F2] font-semibold text-[11px] rounded transition-colors"
              >
                Reject
              </button>
            </>
          )}

          {item.verificationStatus === 'VERIFIED' && (
            <button
              onClick={() => handleSuspend(item)}
              className="text-[11px] text-[#697780] hover:text-[#B94C45] font-medium underline"
            >
              Suspend
            </button>
          )}

          {item.verificationStatus === 'SUSPENDED' && (
            <button
              onClick={() => handleSuspend(item)}
              className="text-[11px] text-[#2E7D32] hover:underline font-semibold"
            >
              Reactivate
            </button>
          )}
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
            Corporate Partners & Company Verification Directory
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Review partner credentials, authorize campus recruitment drives, and manage recruiter accounts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
          >
            <option value="ALL">All Verification States</option>
            <option value="PENDING">Pending Review</option>
            <option value="VERIFIED">Verified & Active</option>
            <option value="REJECTED">Rejected</option>
            <option value="SUSPENDED">Suspended</option>
          </select>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Partner</span>
          </button>
        </div>
      </div>

      {/* Companies Table */}
      <DataTable
        data={filteredCompanies}
        columns={columns}
        searchPlaceholder="Search companies by name, recruiter, or industry..."
        exportFilename="Campus_Recruiting_Companies_Directory"
        pageSize={10}
      />

      {/* Rejection Modal */}
      {selectedCompany && (
        <Modal
          isOpen={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          title={`Reject Partnership: ${selectedCompany.name}`}
          description="Provide a formal institutional reason for denying campus drive onboarding."
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">
                Rejection Reason *
              </label>
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="e.g. Incomplete corporate verification documents or CTC package below minimum college baseline..."
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 bg-[#B94C45] text-white font-semibold rounded-md shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Partner Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Onboard Corporate Partner"
      >
        <form onSubmit={handleCreateNew} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={newComp.name}
              onChange={e => setNewComp({ ...newComp, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Website URL *</label>
              <input
                type="url"
                required
                value={newComp.website}
                onChange={e => setNewComp({ ...newComp, website: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Industry Sector</label>
              <input
                type="text"
                value={newComp.industry}
                onChange={e => setNewComp({ ...newComp, industry: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Recruiter Name *</label>
              <input
                type="text"
                required
                value={newComp.primaryContactName}
                onChange={e => setNewComp({ ...newComp, primaryContactName: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Recruiter Email *</label>
              <input
                type="email"
                required
                value={newComp.primaryContactEmail}
                onChange={e => setNewComp({ ...newComp, primaryContactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs"
            >
              Save Partner
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
