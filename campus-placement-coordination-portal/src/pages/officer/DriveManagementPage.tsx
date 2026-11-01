import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  Briefcase,
  Plus,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  AlertCircle
} from 'lucide-react';
import { PlacementDrive, DriveStatus, RecruitmentStageConfig } from '../../types';

export const DriveManagementPage: React.FC = () => {
  const { drives, companies, createDrive, updateDriveStatus, applications, settings, showToast } = usePlacement();

  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Drive form state
  const [formData, setFormData] = useState({
    companyId: companies[0]?.id || '',
    jobTitle: '',
    description: '',
    jobRoleCategory: 'Software Development',
    employmentType: 'FULL_TIME' as const,
    workLocation: 'Pune / Bengaluru',
    workMode: 'HYBRID' as const,
    ctcLpa: 14.0,
    positionsCount: 10,
    requiredSkills: 'TypeScript, Data Structures, Problem Solving, React',
    // Step 2 Eligibility
    minCgpa: 7.5,
    minTenthPercentage: 70.0,
    minTwelfthPercentage: 70.0,
    maxActiveBacklogs: 0,
    allowedDepartments: ['Computer Science and Engineering', 'Information Technology'],
    allowedBatches: [2026],
    requireVerifiedDocuments: true,
    // Step 4 Dates
    applicationDeadline: '2026-11-30T23:59:59',
    driveDate: '2026-12-05'
  });

  const [stages, setStages] = useState<RecruitmentStageConfig[]>([
    { id: 'stg_1', order: 1, name: 'Online Technical MCQ Screening', type: 'ONLINE_TEST', description: '60-min aptitude and technical MCQ assessment' },
    { id: 'stg_2', order: 2, name: 'Technical Interview Round 1 (Problem Solving)', type: 'TECHNICAL_INTERVIEW' },
    { id: 'stg_3', order: 3, name: 'HR & Final Leadership Evaluation', type: 'HR_INTERVIEW' }
  ]);

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.jobTitle.trim()) {
      showToast({ type: 'warning', title: 'Missing Title', message: 'Please enter a job title.' });
      return;
    }
    setCurrentStep(s => Math.min(5, s + 1));
  };

  const handleFinishCreate = () => {
    const selectedCompany = companies.find(c => c.id === formData.companyId) || companies[0];

    createDrive({
      companyId: selectedCompany.id,
      companyName: selectedCompany.name,
      jobTitle: formData.jobTitle,
      description: formData.description,
      jobRoleCategory: formData.jobRoleCategory,
      employmentType: formData.employmentType,
      workLocation: formData.workLocation,
      workMode: formData.workMode,
      ctcLpa: Number(formData.ctcLpa),
      positionsCount: Number(formData.positionsCount),
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()),
      eligibility: {
        minCgpa: Number(formData.minCgpa),
        minTenthPercentage: Number(formData.minTenthPercentage),
        minTwelfthPercentage: Number(formData.minTwelfthPercentage),
        maxActiveBacklogs: Number(formData.maxActiveBacklogs),
        allowedDepartments: formData.allowedDepartments,
        allowedDegrees: ['B.Tech'],
        allowedBatches: formData.allowedBatches,
        requireVerifiedDocuments: formData.requireVerifiedDocuments
      },
      stages,
      applicationDeadline: formData.applicationDeadline,
      driveDate: formData.driveDate,
      status: 'PUBLISHED'
    });

    setWizardOpen(false);
    setCurrentStep(1);
  };

  const columns: Column<PlacementDrive>[] = [
    {
      key: 'jobTitle',
      header: 'Job Title & Role',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.jobTitle}</span>
          <p className="text-[11px] text-[#697780]">{item.companyName} · {item.workLocation}</p>
        </div>
      )
    },
    {
      key: 'ctcLpa',
      header: 'CTC Package',
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
      key: 'applicants',
      header: 'Applicants',
      className: 'font-tabular text-center',
      render: item => (
        <span className="font-bold text-[#182B32]">
          {applications.filter(a => a.driveId === item.id).length}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Drive Status',
      sortable: true,
      render: item => <StatusBadge status={item.status} />
    },
    {
      key: 'actions',
      header: 'Drive Controls',
      render: item => (
        <div className="flex items-center gap-1.5">
          {item.status === 'PUBLISHED' && (
            <button
              onClick={() => updateDriveStatus(item.id, 'PAUSED')}
              className="text-xs text-[#697780] hover:text-[#B94C45] font-semibold"
            >
              Pause
            </button>
          )}
          {item.status === 'PAUSED' && (
            <button
              onClick={() => updateDriveStatus(item.id, 'PUBLISHED')}
              className="text-xs text-[#2E7D32] hover:underline font-semibold"
            >
              Publish
            </button>
          )}
          {item.status !== 'CLOSED' && (
            <button
              onClick={() => updateDriveStatus(item.id, 'CLOSED')}
              className="text-xs text-[#B94C45] hover:underline font-semibold ml-2"
            >
              Close
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
            Campus Placement Drives Management
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Create multi-step placement drives, configure eligibility criteria, and monitor student pipelines.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentStep(1);
            setWizardOpen(true);
          }}
          className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Drive Wizard</span>
        </button>
      </div>

      {/* Drives DataTable */}
      <DataTable
        data={drives}
        columns={columns}
        searchPlaceholder="Search drives by job title, company, or location..."
        exportFilename="Campus_Placement_Drives_Master"
        pageSize={10}
      />

      {/* Multi-Step Drive Creation Wizard Modal */}
      <Modal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        title="Placement Drive Creation Wizard"
        description={`Step ${currentStep} of 5: ${
          currentStep === 1 ? 'Job & Company Profile' :
          currentStep === 2 ? 'Eligibility Rules & Cutoffs' :
          currentStep === 3 ? 'Recruitment Stages Configuration' :
          currentStep === 4 ? 'Deadlines & Openings' : 'Review & Publish'
        }`}
        maxWidth="2xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-xs font-semibold text-[#697780] disabled:opacity-30 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNextStep}
                className="px-4 py-1.5 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishCreate}
                className="px-5 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Publish Drive to Campus</span>
              </button>
            )}
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          {/* Step 1: Job and Company */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Recruiting Company *</label>
                  <select
                    value={formData.companyId}
                    onChange={e => setFormData({ ...formData, companyId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Job Role Category *</label>
                  <select
                    value={formData.jobRoleCategory}
                    onChange={e => setFormData({ ...formData, jobRoleCategory: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Management Consulting">Management Consulting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="e.g. Associate Software Engineer - Cloud Platforms"
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Annual CTC (LPA) *</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.ctcLpa}
                    onChange={e => setFormData({ ...formData, ctcLpa: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular font-bold text-[#387A70]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Work Location</label>
                  <input
                    type="text"
                    value={formData.workLocation}
                    onChange={e => setFormData({ ...formData, workLocation: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Work Mode</label>
                  <select
                    value={formData.workMode}
                    onChange={e => setFormData({ ...formData, workMode: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                  >
                    <option value="HYBRID">Hybrid</option>
                    <option value="IN_OFFICE">In-Office</option>
                    <option value="REMOTE">Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.requiredSkills}
                  onChange={e => setFormData({ ...formData, requiredSkills: e.target.value })}
                  placeholder="Java, Python, System Design..."
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of engineering responsibilities, project scope, and team structure..."
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                />
              </div>
            </div>
          )}

          {/* Step 2: Eligibility Rules */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Minimum CGPA (0-10) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.minCgpa}
                    onChange={e => setFormData({ ...formData, minCgpa: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Min 10th Score (%)</label>
                  <input
                    type="number"
                    value={formData.minTenthPercentage}
                    onChange={e => setFormData({ ...formData, minTenthPercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Max Active Backlogs</label>
                  <input
                    type="number"
                    value={formData.maxActiveBacklogs}
                    onChange={e => setFormData({ ...formData, maxActiveBacklogs: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1.5">Eligible Departments *</label>
                <div className="space-y-1.5">
                  {settings.departments.map(dept => {
                    const checked = formData.allowedDepartments.includes(dept.name);
                    return (
                      <label key={dept.code} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={e => {
                            const updated = e.target.checked
                              ? [...formData.allowedDepartments, dept.name]
                              : formData.allowedDepartments.filter(d => d !== dept.name);
                            setFormData({ ...formData, allowedDepartments: updated });
                          }}
                          className="rounded text-[#387A70]"
                        />
                        <span className="text-[#182B32] font-medium">{dept.name} ({dept.code})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2 border-t border-[#E1E5E2]">
                <input
                  type="checkbox"
                  checked={formData.requireVerifiedDocuments}
                  onChange={e => setFormData({ ...formData, requireVerifiedDocuments: e.target.checked })}
                  className="rounded text-[#387A70]"
                />
                <span className="text-[#182B32] font-semibold">
                  Require verified academic documents from department coordinator before applying
                </span>
              </label>
            </div>
          )}

          {/* Step 3: Stages */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-[#697780]">
                Configure the sequential recruitment hurdles candidates must clear.
              </p>

              <div className="space-y-2">
                {stages.map((stg, idx) => (
                  <div key={stg.id} className="p-3 rounded-lg border border-[#E1E5E2] bg-[#F7F6F2] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#387A70] text-white flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-bold text-[#182B32]">{stg.name}</p>
                        <p className="text-[11px] text-[#697780]">{stg.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Deadlines */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Application Deadline *</label>
                  <input
                    type="datetime-local"
                    value={formData.applicationDeadline.slice(0, 16)}
                    onChange={e => setFormData({ ...formData, applicationDeadline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#182B32] mb-1">Drive Execution Date *</label>
                  <input
                    type="date"
                    value={formData.driveDate}
                    onChange={e => setFormData({ ...formData, driveDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Estimated Number of Positions</label>
                <input
                  type="number"
                  value={formData.positionsCount}
                  onChange={e => setFormData({ ...formData, positionsCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
                />
              </div>
            </div>
          )}

          {/* Step 5: Summary */}
          {currentStep === 5 && (
            <div className="space-y-4 p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2]">
              <div className="flex items-center gap-2 text-[#387A70] font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Ready to Publish Campus Drive</span>
              </div>
              <div className="space-y-1.5 text-xs text-[#182B32]">
                <p><strong>Role:</strong> {formData.jobTitle}</p>
                <p><strong>Package:</strong> ₹{formData.ctcLpa} LPA</p>
                <p><strong>Eligibility:</strong> Min CGPA {formData.minCgpa}, Max Backlogs {formData.maxActiveBacklogs}</p>
                <p><strong>Departments:</strong> {formData.allowedDepartments.join(', ')}</p>
                <p><strong>Deadline:</strong> {new Date(formData.applicationDeadline).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
