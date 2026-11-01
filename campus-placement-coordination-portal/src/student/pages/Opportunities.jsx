import React, { useState, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import StatusBadge from '../../shared/components/StatusBadge';
import Modal from '../../shared/components/Modal';
import { mockService } from '../../services/mockService';
import {
  Briefcase,
  Search,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  Layers
} from 'lucide-react';

export const OpportunitiesPage = () => {
  const { drives, studentProfile, applications, applyToDrive, showToast } = usePlacement();

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [minCtc, setMinCtc] = useState(0);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState('');

  const activeStudent = studentProfile || mockService.getStudents()[0];

  const filteredDrives = useMemo(() => {
    return drives.filter(d => {
      if (d.status !== 'PUBLISHED') return false;
      if (selectedDept !== 'ALL') {
        const matches = d.eligibility.allowedDepartments.includes(selectedDept) || d.eligibility.allowedDepartments.includes('ALL');
        if (!matches) return false;
      }
      if (d.ctcLpa < minCtc) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const str = `${d.companyName} ${d.jobTitle} ${d.workLocation} ${d.requiredSkills.join(' ')}`.toLowerCase();
        if (!str.includes(q)) return false;
      }
      return true;
    });
  }, [drives, selectedDept, minCtc, search]);

  const handleOpenDetails = (drive) => {
    setSelectedDrive(drive);
  };

  const handleOpenApply = (drive) => {
    setSelectedDrive(drive);
    setSelectedResumeId(activeStudent.resumes.find(r => r.isDefault)?.id || activeStudent.resumes[0]?.id || '');
    setApplyModalOpen(true);
  };

  const handleConfirmApply = () => {
    if (!selectedDrive) return;
    const res = applyToDrive(selectedDrive.id, selectedResumeId);
    if (res.success) {
      setApplyModalOpen(false);
    }
  };

  const handleToggleBookmark = (driveId) => {
    const isBookmarked = activeStudent.bookmarkedDriveIds.includes(driveId);
    const updatedIds = isBookmarked
      ? activeStudent.bookmarkedDriveIds.filter(id => id !== driveId)
      : [...activeStudent.bookmarkedDriveIds, driveId];
    
    activeStudent.bookmarkedDriveIds = updatedIds;
    mockService.updateStudentProfile(activeStudent);
    showToast({
      type: 'info',
      title: isBookmarked ? 'Bookmark Removed' : 'Drive Bookmarked',
      message: isBookmarked ? 'Removed from saved drives' : 'Saved to your bookmarks'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Campus Placement Drives & Opportunities
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Explore approved corporate campus drives for the 2026 Graduating Batch.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#1E40AF] bg-[#EFF5FF] border border-[#BDD5F8] px-3 py-1 rounded-xl font-tabular">
            {filteredDrives.length} active opportunities
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by company, role, location, or skills..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#DCE9FC] transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:border-[#3974C6]"
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science and Engineering">CSE</option>
            <option value="Information Technology">IT</option>
            <option value="Electronics and Telecommunication Engineering">ENTC</option>
            <option value="Mechanical Engineering">MECH</option>
          </select>

          <select
            value={minCtc}
            onChange={e => setMinCtc(Number(e.target.value))}
            className="text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:border-[#3974C6]"
          >
            <option value={0}>Any CTC</option>
            <option value={8}>≥ ₹8 LPA (Dream)</option>
            <option value={15}>≥ ₹15 LPA (High Dream)</option>
            <option value={20}>≥ ₹20 LPA (Super Dream)</option>
          </select>
        </div>
      </div>

      {/* Drives List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDrives.map(drive => {
          const hasApplied = applications.some(a => a.driveId === drive.id && a.studentId === activeStudent.id);
          const isBookmarked = activeStudent.bookmarkedDriveIds?.includes(drive.id);
          const eligibility = mockService.evaluateStudentForDrive(activeStudent, drive);

          return (
            <div
              key={drive.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between hover:border-[#3974C6]/60 hover:shadow-md transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#EFF5FF] border border-[#BDD5F8] text-[#3974C6]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{drive.companyName}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{drive.workLocation} ({drive.workMode})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleBookmark(drive.id)}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark drive'}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#3974C6]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Job Title and CTC */}
                <h2 className="text-sm font-bold text-slate-900 mt-2 mb-1">
                  {drive.jobTitle}
                </h2>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-black text-[#3974C6] font-tabular">
                    ₹{drive.ctcLpa} LPA
                  </span>
                  <span className="text-xs text-slate-400">CTC</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-medium">{drive.positionsCount} Openings</span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {drive.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {drive.requiredSkills.slice(0, 4).map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                  {drive.requiredSkills.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{drive.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>

                {/* Eligibility Indicator */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-1.5">
                    {eligibility.isEligible ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : eligibility.status === 'PENDING_VERIFICATION' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500" />
                    )}
                    <span className="font-bold text-slate-800">
                      {eligibility.isEligible ? 'Eligible to Apply' : eligibility.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Min CGPA: {drive.eligibility.minCgpa}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => handleOpenDetails(drive)}
                  className="font-bold text-[#3974C6] hover:text-[#2d60a6] flex items-center gap-1 transition-colors"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {hasApplied ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleOpenApply(drive)}
                    className="px-4 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white font-bold rounded-xl shadow-2xs transition-all"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Drive Details Modal */}
      {selectedDrive && !applyModalOpen && (
        <Modal
          isOpen={Boolean(selectedDrive)}
          onClose={() => setSelectedDrive(null)}
          title={selectedDrive.jobTitle}
          description={`${selectedDrive.companyName} · ${selectedDrive.workLocation}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-[#697780]">
                Application Deadline: {new Date(selectedDrive.applicationDeadline).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDrive(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="px-5 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white font-bold rounded-xl text-xs shadow-xs"
                >
                  Proceed to Apply
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-5 text-xs">
            {/* CTC & Location Banner */}
            <div className="p-4.5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compensation Package</span>
                <p className="text-xl font-black text-[#3974C6] font-tabular">₹{selectedDrive.ctcLpa} LPA</p>
                <p className="text-[11px] text-slate-500 font-medium">{selectedDrive.employmentType.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recruitment Stages</span>
                <p className="text-sm font-bold text-slate-900">{selectedDrive.stages.length} Rounds</p>
                <p className="text-[11px] text-slate-500 font-medium">Online Assessment & Technical</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Drive Date</span>
                <p className="text-sm font-bold text-slate-900">{selectedDrive.driveDate}</p>
                <p className="text-[11px] text-slate-500 font-medium">On-Campus / Virtual</p>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Role Description & Responsibilities</h4>
              <p className="text-slate-600 leading-relaxed">{selectedDrive.description}</p>
            </div>

            {/* Detailed Eligibility Rule Breakdown */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3974C6]" />
                <span>Your Eligibility Evaluation Breakdown</span>
              </h4>

              {(() => {
                const evalResult = mockService.evaluateStudentForDrive(activeStudent, selectedDrive);
                return (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="p-3 bg-slate-50 flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        Status: {evalResult.status.replace(/_/g, ' ')}
                      </span>
                      <span className="font-extrabold text-[#3974C6] font-tabular">
                        {evalResult.overallScorePercentage}% Criteria Met
                      </span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {evalResult.ruleDetails.map((rule, idx) => (
                        <div key={idx} className="p-3 flex items-center justify-between bg-white text-[11px]">
                          <div>
                            <span className="font-bold text-slate-800">{rule.ruleName}: </span>
                            <span className="text-slate-500">Required: {rule.expected} · Your Record: {rule.actual}</span>
                          </div>
                          <span className={`font-bold flex items-center gap-1 ${rule.passed ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {rule.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                            <span>{rule.passed ? 'Pass' : 'Fail'}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Stages */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Recruitment Pipeline Stages</h4>
              <div className="space-y-2">
                {selectedDrive.stages.map(stg => (
                  <div key={stg.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#3974C6] text-white flex items-center justify-center text-xs font-bold">
                      {stg.order}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{stg.name}</p>
                      {stg.description && <p className="text-[11px] text-slate-500">{stg.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Apply Modal */}
      {selectedDrive && applyModalOpen && (
        <Modal
          isOpen={applyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          title={`Confirm Application: ${selectedDrive.companyName}`}
          description={`Applying for ${selectedDrive.jobTitle}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Application Snapshot Notice:</strong> When you submit, an immutable snapshot of your academic record, CGPA ({activeStudent.cgpa.toFixed(2)}), skills, and selected resume is permanently saved. Subsequent portfolio edits will not alter this application record.
                </p>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Select Resume Version to Attach *
              </label>
              <div className="space-y-2">
                {activeStudent.resumes.map(r => (
                  <label
                    key={r.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      selectedResumeId === r.id ? 'bg-[#EFF5FF] border-[#3974C6]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="resumeChoice"
                        checked={selectedResumeId === r.id}
                        onChange={() => setSelectedResumeId(r.id)}
                        className="text-[#3974C6] focus:ring-[#3974C6]"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{r.title}</p>
                        <p className="text-[11px] text-slate-500">{r.fileName} · {r.targetRole || 'General'}</p>
                      </div>
                    </div>
                    {r.isDefault && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#3974C6] text-white">
                        Default
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500">
              By confirming, you commit to attend scheduled rounds and honor institutional placement rules.
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setApplyModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApply}
                className="px-5 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white font-bold rounded-xl shadow-xs transition-all"
              >
                Submit Application Snapshot
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const Opportunities = OpportunitiesPage;
export default Opportunities;
