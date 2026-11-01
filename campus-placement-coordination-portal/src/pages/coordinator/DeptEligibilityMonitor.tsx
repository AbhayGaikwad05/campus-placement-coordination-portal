import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { mockService } from '../../services/mockService';
import { ShieldCheck, CheckCircle2, XCircle, Briefcase, Users } from 'lucide-react';
import { PlacementDrive } from '../../types';

export const DeptEligibilityMonitor: React.FC = () => {
  const { drives, students, currentUser } = usePlacement();
  if (!currentUser) return null;
  const myDept = currentUser.department || 'Computer Science and Engineering';

  const deptStudents = students.filter(s => s.department === myDept);
  const publishedDrives = drives.filter(d => d.status === 'PUBLISHED');

  const [selectedDriveId, setSelectedDriveId] = useState(publishedDrives[0]?.id || '');

  const selectedDrive = publishedDrives.find(d => d.id === selectedDriveId) || publishedDrives[0];

  const candidateEvals = selectedDrive ? deptStudents.map(student => ({
    student,
    evalResult: mockService.evaluateStudentForDrive(student, selectedDrive)
  })) : [];

  const eligibleCount = candidateEvals.filter(e => e.evalResult.isEligible).length;
  const eligibleRate = deptStudents.length > 0 ? Math.round((eligibleCount / deptStudents.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {myDept} — Drive Eligibility Monitor
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Simulate and audit student eligibility rates against company cut-off criteria.
          </p>
        </div>

        {publishedDrives.length > 0 && (
          <select
            value={selectedDriveId}
            onChange={e => setSelectedDriveId(e.target.value)}
            className="text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32] font-semibold"
          >
            {publishedDrives.map(d => (
              <option key={d.id} value={d.id}>{d.companyName} — {d.jobTitle} (₹{d.ctcLpa} LPA)</option>
            ))}
          </select>
        )}
      </div>

      {selectedDrive && (
        <>
          {/* Drive Eligibility Criteria Overview Card */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E5E2]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#387A70]">Drive Criteria</span>
                <h2 className="text-base font-bold text-[#182B32]">{selectedDrive.companyName} — {selectedDrive.jobTitle}</h2>
                <p className="text-xs text-[#697780] mt-0.5">
                  Min CGPA: <strong>{selectedDrive.eligibility.minCgpa}</strong> · Max Backlogs: <strong>{selectedDrive.eligibility.maxActiveBacklogs}</strong> · Package: <strong>₹{selectedDrive.ctcLpa} LPA</strong>
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#E5EEE8] text-right">
                <span className="text-[10px] uppercase font-bold text-[#182B32]">Department Eligibility</span>
                <p className="text-xl font-black text-[#387A70] font-tabular mt-0.5">{eligibleRate}%</p>
                <p className="text-[11px] text-[#697780] font-semibold">{eligibleCount} of {deptStudents.length} candidates</p>
              </div>
            </div>

            {/* Candidate list for this drive */}
            <div className="divide-y divide-[#E1E5E2] mt-4">
              {candidateEvals.map(({ student, evalResult }) => (
                <div key={student.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#182B32]">{student.name}</span>
                      <span className="text-[#697780] font-mono">({student.studentId})</span>
                      <span className="text-[#387A70] font-bold font-tabular">CGPA: {student.cgpa.toFixed(2)}</span>
                    </div>
                    {evalResult.reasons.length > 0 && (
                      <p className="text-[11px] text-[#B94C45] mt-1 font-medium">
                        Failure reason: {evalResult.reasons.join('; ')}
                      </p>
                    )}
                  </div>

                  <span className={`px-2.5 py-1 rounded font-semibold text-[11px] flex items-center gap-1 self-start sm:self-auto ${
                    evalResult.isEligible ? 'bg-[#F0FDF4] text-[#166534] border border-[#DCFCE7]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FEE2E2]'
                  }`}>
                    {evalResult.isEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{evalResult.isEligible ? 'Eligible' : 'Ineligible'}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
