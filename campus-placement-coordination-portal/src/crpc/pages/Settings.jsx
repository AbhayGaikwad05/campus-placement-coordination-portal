import React, { useState } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { Button } from '../../shared/components/Button';
import { DataTable } from '../../shared/components/DataTable';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { DESIGNATIONS } from '../../authentication/services/authService';
import {
  Settings as SettingsIcon,
  Shield,
  Building,
  History,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';

export const Settings = () => {
  const { currentUser } = useAuth();
  const { settings, updateSettings, auditLogs, showToast } = usePlacement();

  const isSuperAdmin = currentUser?.designation === DESIGNATIONS.SUPER_ADMIN;

  const [activeTab, setActiveTab] = useState(isSuperAdmin ? 'policy' : 'profile');

  // Policy form state
  const [singleOfferPolicy, setSingleOfferPolicy] = useState(settings.placementPolicy?.singleOfferPolicy ?? true);
  const [dreamThreshold, setDreamThreshold] = useState(settings.placementPolicy?.dreamThresholdCtc ?? 9.0);
  const [superDreamThreshold, setSuperDreamThreshold] = useState(settings.placementPolicy?.superDreamThresholdCtc ?? 18.0);
  const [maxDrives, setMaxDrives] = useState(settings.placementPolicy?.maxDrivesAStudentCanApplyTo ?? 15);

  const handleSavePolicy = (e) => {
    e.preventDefault();
    updateSettings({
      placementPolicy: {
        ...settings.placementPolicy,
        singleOfferPolicy,
        dreamThresholdCtc: Number(dreamThreshold),
        superDreamThresholdCtc: Number(superDreamThreshold),
        maxDrivesAStudentCanApplyTo: Number(maxDrives)
      }
    });
    showToast({
      type: 'success',
      title: 'Placement Policies Updated',
      message: 'New eligibility thresholds and single offer rules saved system-wide.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
            {isSuperAdmin ? 'Institutional Governance & System Settings' : 'Staff Profile & Configuration'}
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            {isSuperAdmin
              ? 'Institutional placement policies, single offer regulations, department configurations, and system audit logs.'
              : 'CRPC staff profile, designated department allocation, and operational settings.'}
          </p>
        </div>

        {isSuperAdmin && (
          <div className="bg-[#E7EDF5] p-1 rounded-lg flex items-center gap-1 border border-[#E0E6ED]">
            <button
              onClick={() => setActiveTab('policy')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeTab === 'policy' ? 'bg-white text-[#17365D] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Placement Policies
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeTab === 'departments' ? 'bg-white text-[#17365D] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeTab === 'audit' ? 'bg-white text-[#17365D] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Audit Logs
            </button>
          </div>
        )}
      </div>

      {/* Super Admin: Policy Governance Tab */}
      {isSuperAdmin && activeTab === 'policy' && (
        <form onSubmit={handleSavePolicy} className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E0E6ED]">
            <Shield className="w-5 h-5 text-[#3478C5]" />
            <div>
              <h3 className="text-sm font-bold text-[#172B45]">Institutional Placement Policy Matrix</h3>
              <p className="text-xs text-[#64748B]">These rules govern automated student drive eligibility and offer rules across all branches.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-[#E0E6ED] bg-[#F8FAFC] space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#172B45] block">Strict Single Offer Policy</span>
                  <span className="text-[11px] text-[#64748B] block mt-0.5">
                    Once a student accepts an offer, they become ineligible for subsequent standard drives.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={singleOfferPolicy}
                  onChange={e => setSingleOfferPolicy(e.target.checked)}
                  className="w-4 h-4 text-[#17365D] rounded"
                />
              </label>
            </div>

            <div className="p-4 rounded-xl border border-[#E0E6ED] bg-[#F8FAFC] space-y-2">
              <label className="block text-xs font-bold text-[#172B45]">
                Dream Package Threshold (₹ LPA)
              </label>
              <input
                type="number"
                step="0.5"
                value={dreamThreshold}
                onChange={e => setDreamThreshold(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#E0E6ED] rounded-lg font-bold"
              />
              <span className="text-[11px] text-[#64748B] block">
                Placed students may apply to Dream drives offering at least this CTC package.
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#E0E6ED] bg-[#F8FAFC] space-y-2">
              <label className="block text-xs font-bold text-[#172B45]">
                Super-Dream Package Threshold (₹ LPA)
              </label>
              <input
                type="number"
                step="0.5"
                value={superDreamThreshold}
                onChange={e => setSuperDreamThreshold(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#E0E6ED] rounded-lg font-bold"
              />
              <span className="text-[11px] text-[#64748B] block">
                Open to all candidates irrespective of prior placements if package equals or exceeds this CTC.
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#E0E6ED] bg-[#F8FAFC] space-y-2">
              <label className="block text-xs font-bold text-[#172B45]">
                Maximum Drives Per Student Limit
              </label>
              <input
                type="number"
                value={maxDrives}
                onChange={e => setMaxDrives(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#E0E6ED] rounded-lg font-bold"
              />
              <span className="text-[11px] text-[#64748B] block">
                Caps concurrent active drive applications to prevent candidate hoards.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E0E6ED] flex items-center justify-end">
            <Button type="submit" variant="primary" size="md">
              Save Institutional Policies
            </Button>
          </div>
        </form>
      )}

      {/* Super Admin: Departments Tab */}
      {isSuperAdmin && activeTab === 'departments' && (
        <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#172B45]">Engineering Departments & Assigned Coordinators</h3>
          <div className="divide-y divide-[#E0E6ED]">
            {settings.departments?.map(dept => (
              <div key={dept.code} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#172B45] text-sm block">{dept.name} ({dept.code})</span>
                  <span className="text-[#64748B] block mt-0.5">Coordinator: {dept.coordinatorName}</span>
                </div>
                <span className="px-2.5 py-1 bg-[#E7EDF5] text-[#17365D] font-bold rounded-md">
                  {dept.totalStudents} Registered Students
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Super Admin: Audit Logs Tab */}
      {isSuperAdmin && activeTab === 'audit' && (
        <DataTable
          data={auditLogs}
          columns={[
            { key: 'timestamp', header: 'Timestamp', sortable: true, className: 'font-mono text-[11px]' },
            { key: 'userName', header: 'Actor Name', sortable: true },
            { key: 'action', header: 'Action Performed', sortable: true },
            { key: 'target', header: 'Target Entity', sortable: true },
            { key: 'details', header: 'Audit Narrative' }
          ]}
          exportFilename="MITAOE_CRPC_System_Audit_Log"
        />
      )}

      {/* Non-Admin Staff Profile Tab */}
      {!isSuperAdmin && (
        <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-[#E0E6ED]">
            <div className="w-12 h-12 rounded-xl bg-[#E7EDF5] text-[#17365D] flex items-center justify-center font-bold text-lg">
              {currentUser?.name?.charAt(0) || 'P'}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172B45]">{currentUser?.name}</h3>
              <p className="text-xs text-[#64748B]">{currentUser?.designationLabel || currentUser?.designation}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#172B45]">
            <p><span className="text-[#64748B]">Official Email:</span> <strong className="font-mono">{currentUser?.email}</strong></p>
            <p><span className="text-[#64748B]">Assigned Department:</span> <strong>{currentUser?.department || 'Directorate Central'}</strong></p>
            <p><span className="text-[#64748B]">Institutional Phone:</span> <strong>{currentUser?.phone || '+91 020 30253500'}</strong></p>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E0E6ED] rounded-xl text-xs text-[#64748B]">
            <p className="font-semibold text-[#172B45] mb-1">Administrative Role Scoping</p>
            System policies, single offer thresholds, and batch creation are governed centrally by the Dean (CRPC Super Admin). Department coordinators have full operational authorization to audit and verify student semester transcripts.
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
