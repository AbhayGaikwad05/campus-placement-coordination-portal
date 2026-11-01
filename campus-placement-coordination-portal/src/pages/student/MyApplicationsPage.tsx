import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { mockService } from '../../services/mockService';
import {
  FileText,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Award
} from 'lucide-react';
import { Application } from '../../types';

export const MyApplicationsPage: React.FC = () => {
  const { applications, studentProfile } = usePlacement();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const activeStudent = studentProfile || mockService.getStudents()[0];
  const myApplications = applications.filter(a => a.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            My Application Pipelines
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Track stage progress, assessment results, interview calls, and recruitment milestones.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#182B32] font-tabular">
          {myApplications.length} applications tracked
        </span>
      </div>

      {/* Applications List */}
      {myApplications.length === 0 ? (
        <div className="bg-white border border-[#E1E5E2] rounded-xl p-12 text-center">
          <FileText className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#182B32]">No Applications Submitted Yet</h3>
          <p className="text-xs text-[#697780] mt-1 max-w-sm mx-auto">
            Browse active corporate placement drives on the Opportunities tab and apply to roles matching your eligibility.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map(app => (
            <div
              key={app.id}
              className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs hover:border-[#387A70] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#182B32]">{app.companyName}</span>
                  <span className="text-xs text-[#697780]">·</span>
                  <span className="text-xs text-[#697780]">
                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#182B32]">{app.driveTitle}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#697780]">
                  <span>Resume Attached: <strong className="text-[#182B32]">{app.resumeFileName}</strong></span>
                  <span>·</span>
                  <span>CGPA at submission: <strong className="text-[#387A70] font-tabular">{app.snapshot.cgpa.toFixed(2)}</strong></span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="text-left sm:text-right">
                  <div className="text-[11px] font-bold text-[#697780] uppercase tracking-wider mb-1">
                    Current Milestone
                  </div>
                  <StatusBadge status={app.currentStage} />
                </div>

                <button
                  onClick={() => setSelectedApp(app)}
                  className="px-4 py-2 bg-[#F7F6F2] hover:bg-[#E5EEE8] border border-[#E1E5E2] text-[#182B32] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#697780]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Snapshot & Progress Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          title={`Application Details: ${selectedApp.companyName}`}
          description={selectedApp.driveTitle}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Stage Milestone Banner */}
            <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#697780]">Current Stage</span>
                <p className="text-base font-bold text-[#182B32] mt-0.5">{selectedApp.currentStageName}</p>
                <p className="text-[11px] text-[#697780]">Application ID: {selectedApp.id}</p>
              </div>
              <StatusBadge status={selectedApp.currentStage} />
            </div>

            {/* Assessment Score if applicable */}
            {selectedApp.assessmentScore && (
              <div className="p-3.5 rounded-lg bg-[#F0FDF9] border border-[#99F6E4] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#115E59]">Official Assessment Score</h4>
                  <p className="text-[11px] text-[#0F766E] mt-0.5">
                    Proctored MCQ Screening: {selectedApp.assessmentScore.score}/{selectedApp.assessmentScore.maxScore} marks ({selectedApp.assessmentScore.percentage}%)
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-[#0F766E] border border-[#99F6E4]">
                  {selectedApp.assessmentScore.isQualified ? 'Passed Qualification' : 'Below Threshold'}
                </span>
              </div>
            )}

            {/* Submitted Snapshot Card */}
            <div className="border border-[#E1E5E2] rounded-lg p-4 bg-white">
              <div className="flex items-center gap-1.5 mb-2 font-bold text-[#182B32]">
                <ShieldCheck className="w-4 h-4 text-[#387A70]" />
                <span>Submitted Application Snapshot</span>
              </div>
              <p className="text-[#697780] mb-3 leading-relaxed">
                Immutable record preserved exactly as it was when submitted on {new Date(selectedApp.snapshot.appliedAt).toLocaleString()}:
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#F7F6F2] rounded-md text-[11px] mb-3">
                <div>
                  <span className="text-[#697780]">Applicant Name:</span>
                  <p className="font-semibold text-[#182B32]">{selectedApp.snapshot.studentName}</p>
                </div>
                <div>
                  <span className="text-[#697780]">Department & CGPA:</span>
                  <p className="font-semibold text-[#182B32]">{selectedApp.snapshot.department} ({selectedApp.snapshot.cgpa.toFixed(2)})</p>
                </div>
                <div>
                  <span className="text-[#697780]">Resume Version:</span>
                  <p className="font-semibold text-[#182B32]">{selectedApp.snapshot.resumeTitle}</p>
                </div>
                <div>
                  <span className="text-[#697780]">Eligibility Score:</span>
                  <p className="font-semibold text-[#387A70]">{selectedApp.eligibilitySnapshot.overallScore}% Met</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#182B32]">Skills Snapshot: </span>
                <span className="text-[11px] text-[#697780]">{selectedApp.snapshot.skillsSnapshot.join(', ')}</span>
              </div>
            </div>

            {/* Stage Transition History Timeline */}
            <div>
              <h4 className="font-bold text-[#182B32] mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#3974C6]" />
                <span>Recruitment Stage Milestones Timeline</span>
              </h4>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E1E5E2]">
                {selectedApp.stageHistory.map((hist, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#3974C6] ring-4 ring-white" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#182B32]">{hist.stage.replace(/_/g, ' ')}</span>
                      <span className="text-[11px] text-[#697780] font-tabular">
                        {new Date(hist.changedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#697780] mt-0.5">Updated by {hist.changedBy}</p>
                    {hist.note && (
                      <p className="text-[11px] text-[#182B32] mt-1 bg-[#F7F6F2] p-2 rounded border border-[#E1E5E2]">
                        {hist.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
