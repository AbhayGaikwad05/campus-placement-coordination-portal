import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { Building2, Plus, Users, GraduationCap } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const DepartmentsBatchesPage: React.FC = () => {
  const { settings, updateSettings, showToast } = usePlacement();
  const [modalOpen, setModalOpen] = useState(false);
  const [deptCode, setDeptCode] = useState('');
  const [deptName, setDeptName] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [intake, setIntake] = useState(60);

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptCode.trim() || !deptName.trim()) return;

    const newDept = {
      code: deptCode.toUpperCase(),
      name: deptName,
      coordinatorName: coordinator || 'To be assigned',
      totalStudents: Number(intake)
    };

    updateSettings({
      departments: [...settings.departments, newDept]
    });
    setModalOpen(false);
    setDeptCode('');
    setDeptName('');
    setCoordinator('');
    showToast({ type: 'success', title: 'Department Added', message: `${deptName} added to institutional directory.` });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Academic Departments & Batches Management
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Configure participating departments, coordinator assignments, and active graduation batches.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settings.departments.map(dept => (
          <div key={dept.code} className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#E5EEE8] text-[#182B32] font-mono">
                  {dept.code}
                </span>
                <span className="text-xs text-[#697780] font-tabular">
                  {dept.totalStudents} Intake
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#182B32] mt-1">{dept.name}</h3>
              <p className="text-xs text-[#697780] mt-2">
                Faculty Coordinator: <strong className="text-[#182B32]">{dept.coordinatorName}</strong>
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E1E5E2] flex items-center justify-between text-[11px] text-[#697780]">
              <span>Batch 2026 Eligible</span>
              <span className="text-[#387A70] font-semibold">Active in Phase 1</span>
            </div>
          </div>
        ))}
      </div>

      {/* Batches Overview */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-[#182B32]">Active Graduation Batches</h2>
        <div className="flex flex-wrap gap-3">
          {settings.batches.map(batch => (
            <div key={batch} className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] min-w-[140px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Batch Year</span>
              <p className="text-xl font-black text-[#182B32] font-tabular mt-0.5">{batch}</p>
              <p className="text-[11px] text-[#387A70] font-semibold mt-1">
                {batch === 2026 ? 'Primary Placement Batch' : 'Archived Records'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Participating Department"
      >
        <form onSubmit={handleAddDept} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Department Code *</label>
            <input
              type="text"
              required
              value={deptCode}
              onChange={e => setDeptCode(e.target.value)}
              placeholder="e.g. AI_DS"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Department Full Name *</label>
            <input
              type="text"
              required
              value={deptName}
              onChange={e => setDeptName(e.target.value)}
              placeholder="e.g. Artificial Intelligence and Data Science"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Assigned Coordinator Name</label>
            <input
              type="text"
              value={coordinator}
              onChange={e => setCoordinator(e.target.value)}
              placeholder="Prof. Name"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Student Intake Capacity</label>
            <input
              type="number"
              value={intake}
              onChange={e => setIntake(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
            />
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
              Add Department
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
