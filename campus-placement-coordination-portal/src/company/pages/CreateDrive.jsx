import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { Button } from '../../shared/components/Button';
import { Briefcase, ArrowLeft, PlusCircle, CheckCircle2 } from 'lucide-react';

export const CreateDrive = () => {
  const { currentUser } = useAuth();
  const { createDrive, settings, showToast } = usePlacement();
  const navigate = useNavigate();

  const companyId = currentUser?.companyId || 'comp_01';
  const companyName = currentUser?.companyName || 'Google India';

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [ctcLpa, setCtcLpa] = useState(18.0);
  const [workLocation, setWorkLocation] = useState('Bangalore / Pune, India');
  const [minCgpa, setMinCgpa] = useState(7.5);
  const [maxBacklogs, setMaxBacklogs] = useState(0);
  const [registrationDeadline, setRegistrationDeadline] = useState('2026-03-31');
  const [allowedDepartments, setAllowedDepartments] = useState([
    'Computer Science and Engineering',
    'Information Technology'
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tier = ctcLpa >= 18.0 ? 'SUPER_DREAM' : ctcLpa >= 9.0 ? 'DREAM' : 'CORE';

    const newDrive = createDrive({
      companyId,
      companyName,
      jobTitle,
      jobDescription,
      jobRole: jobTitle,
      workLocation,
      employmentType: 'FULL_TIME',
      ctcLpa: Number(ctcLpa),
      tier,
      eligibilityCriteria: {
        minCgpa: Number(minCgpa),
        maxActiveBacklogs: Number(maxBacklogs),
        allowedDepartments,
        allowedDegrees: ['B.Tech'],
        allowedBatches: [2026]
      },
      eligibility: {
        minCgpa: Number(minCgpa),
        maxActiveBacklogs: Number(maxBacklogs),
        allowedDepartments,
        allowedDegrees: ['B.Tech'],
        allowedBatches: [2026]
      },
      requiredSkills: ['Problem Solving', 'Data Structures', 'Cloud Systems'],
      registrationDeadline,
      status: 'UNDER_REVIEW',
      rounds: [
        { roundNumber: 1, name: 'Online Technical Screening', type: 'ASSESSMENT' },
        { roundNumber: 2, name: 'Technical Interview I', type: 'TECHNICAL_INTERVIEW' },
        { roundNumber: 3, name: 'Technical Bar Raiser', type: 'TECHNICAL_INTERVIEW' },
        { roundNumber: 4, name: 'Culture & HR Fit', type: 'HR_ROUND' }
      ]
    });

    showToast({
      type: 'success',
      title: 'Drive Submitted for Approval',
      message: `${jobTitle} submitted to MITAOE CRPC Directorate for review.`
    });

    navigate('/company/drives');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/company/drives')}
          className="p-2 rounded-lg bg-white border border-[#E0E6ED] text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-black text-[#172B45]">Post New Campus Recruitment Drive</h1>
          <p className="text-xs text-[#64748B]">{companyName} · 2026 Graduating Batch</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">Drive Position Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#172B45] mb-1">Job Role Title *</label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Software Development Engineer"
                className="w-full text-xs px-3.5 py-2 border border-[#E0E6ED] rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172B45] mb-1">Work Location *</label>
              <input
                type="text"
                required
                value={workLocation}
                onChange={e => setWorkLocation(e.target.value)}
                placeholder="e.g. Bengaluru / Pune, India"
                className="w-full text-xs px-3.5 py-2 border border-[#E0E6ED] rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172B45] mb-1">Annual CTC Package (₹ LPA) *</label>
              <input
                type="number"
                step="0.5"
                required
                value={ctcLpa}
                onChange={e => setCtcLpa(e.target.value)}
                className="w-full text-xs px-3.5 py-2 border border-[#E0E6ED] rounded-lg font-bold text-[#17365D]"
              />
              <span className="text-[10px] text-[#64748B] mt-0.5 block">
                {ctcLpa >= 18 ? 'Super-Dream Tier (Open to all)' : ctcLpa >= 9 ? 'Dream Tier' : 'Standard Core'}
              </span>
            </div>

            <div>
              <label className="block font-bold text-[#172B45] mb-1">Registration Cutoff Date *</label>
              <input
                type="date"
                required
                value={registrationDeadline}
                onChange={e => setRegistrationDeadline(e.target.value)}
                className="w-full text-xs px-3.5 py-2 border border-[#E0E6ED] rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#172B45] mb-1">Detailed Job Description *</label>
          <textarea
            rows={4}
            required
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Roles, responsibilities, engineering expectations, technology stacks..."
            className="w-full text-xs p-3 border border-[#E0E6ED] rounded-lg"
          />
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">Candidate Eligibility Parameters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#172B45] mb-1">Minimum CGPA (0.0 - 10.0)</label>
              <input
                type="number"
                step="0.1"
                value={minCgpa}
                onChange={e => setMinCgpa(e.target.value)}
                className="w-full text-xs px-3.5 py-2 border border-[#E0E6ED] rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172B45] mb-1">Maximum Allowed Active Backlogs</label>
              <input
                type="number"
                value={maxBacklogs}
                onChange={e => setMaxBacklogs(e.target.value)}
                className="w-full text-xs px-3.5 py-2 border border-[#E0E6ED] rounded-lg font-bold"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E0E6ED] flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/company/drives')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={PlusCircle}
            iconPosition="right"
          >
            Submit for CRPC Clearance
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDrive;
