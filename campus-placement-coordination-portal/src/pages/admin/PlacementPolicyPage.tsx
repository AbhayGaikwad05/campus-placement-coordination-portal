import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Shield, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export const PlacementPolicyPage: React.FC = () => {
  const { settings, students, updateStudentProfile, showToast } = usePlacement();

  const restrictedStudents = students.filter(s => s.placementRestriction?.active);

  const handleLiftRestriction = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    student.placementRestriction = {
      active: false,
      reason: 'Restriction cleared by Dean CRPC review',
      imposedBy: 'Dr. Vikram Sethi',
      imposedDate: new Date().toISOString().split('T')[0]
    };
    student.placementStatus = 'SEEKING';
    updateStudentProfile(student);
    showToast({ type: 'success', title: 'Restriction Lifted', message: `Eligible status restored for ${student.name}.` });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Institutional Placement Policy & Governance
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Rules, CTC category classifications, and disciplinary exception reviews.
          </p>
        </div>
      </div>

      {/* Policy Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#387A70]" />
            <h3 className="text-sm font-bold text-[#182B32]">Tier 1: Super Dream</h3>
          </div>
          <p className="text-xs text-[#697780] leading-relaxed">
            CTC packages <strong className="text-[#182B32]">≥ ₹{settings.placementPolicy.superDreamThresholdCtc} LPA</strong>. Any unplaced student or student with an initial lower tier offer can contest until an acceptance is recorded.
          </p>
        </div>

        <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D5A44D]" />
            <h3 className="text-sm font-bold text-[#182B32]">Tier 2: Dream Roles</h3>
          </div>
          <p className="text-xs text-[#697780] leading-relaxed">
            CTC packages <strong className="text-[#182B32]">between ₹{settings.placementPolicy.dreamThresholdCtc} LPA and ₹{settings.placementPolicy.superDreamThresholdCtc} LPA</strong>. Specialized R&D and core analytics roles.
          </p>
        </div>

        <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#697780]" />
            <h3 className="text-sm font-bold text-[#182B32]">Tier 3: Core & Mass</h3>
          </div>
          <p className="text-xs text-[#697780] leading-relaxed">
            CTC packages <strong className="text-[#182B32]">&lt; ₹{settings.placementPolicy.dreamThresholdCtc} LPA</strong>. Mass IT and Graduate Trainee programs.
          </p>
        </div>
      </div>

      {/* Disciplinary Policy Restrictions */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E1E5E2]">
          <div>
            <h3 className="text-sm font-bold text-[#182B32]">Institutional Policy Restrictions & Exceptions</h3>
            <p className="text-xs text-[#697780]">Candidates with administrative hold or attendance policy notices</p>
          </div>
          <span className="text-xs font-semibold text-[#182B32] font-tabular">
            {restrictedStudents.length} candidates restricted
          </span>
        </div>

        {restrictedStudents.length === 0 ? (
          <p className="text-xs text-[#697780] py-6 text-center bg-[#F7F6F2] rounded-lg border border-[#E1E5E2]">
            No students currently have active placement policy blocks. All registered candidates can contest eligible drives.
          </p>
        ) : (
          <div className="space-y-3">
            {restrictedStudents.map(student => (
              <div key={student.id} className="p-4 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#182B32]">{student.name}</span>
                    <span className="text-[#697780]">({student.studentId} · {student.department})</span>
                    <StatusBadge status="RESTRICTED" />
                  </div>
                  <p className="text-[#991B1B] mt-1 font-medium">
                    Reason: {student.placementRestriction?.reason}
                  </p>
                  <p className="text-[11px] text-[#697780] mt-0.5">
                    Imposed by {student.placementRestriction?.imposedBy} on {student.placementRestriction?.imposedDate}
                  </p>
                </div>

                <button
                  onClick={() => handleLiftRestriction(student.id)}
                  className="px-3 py-1.5 bg-white border border-[#FCA5A5] hover:bg-[#FEE2E2] text-[#991B1B] font-semibold rounded-md shadow-2xs transition-colors self-start sm:self-auto"
                >
                  Clear Restriction & Grant Exception
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
