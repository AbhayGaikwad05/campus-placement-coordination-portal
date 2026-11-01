import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button } from '../../shared/components/Button';
import { ArrowLeft, User, FolderCheck, Mail, Phone, Calendar } from 'lucide-react';

export const StudentDetails = () => {
  const { id } = useParams();
  const { students } = usePlacement();
  const navigate = useNavigate();

  const student = students.find(s => s.id === id || s.studentId === id) || students[0];

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-[#E0E6ED]">
        <h3 className="text-sm font-bold text-[#172B45]">Student Record Not Found</h3>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate('/crpc/students')}>
          Back to Students
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/crpc/students')}
          className="p-2 rounded-lg bg-white border border-[#E0E6ED] text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-black text-[#172B45]">{student.name}</h1>
          <p className="text-xs text-[#64748B]">PRN: {student.studentId} · {student.department}</p>
        </div>
      </div>

      <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E6ED]">
          <div>
            <span className="text-xs text-[#64748B] block">Placement Status</span>
            <StatusBadge status={student.placementStatus} />
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-[#17365D] font-tabular">{student.cgpa} CGPA</span>
            <span className="text-[11px] text-[#64748B] block">Cumulative Academic Standing</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">Academic Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E0E6ED] text-xs">
            <div>
              <span className="text-[#64748B] block text-[11px]">Degree</span>
              <strong className="text-[#172B45]">{student.degree || 'B.Tech'}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Batch</span>
              <strong className="text-[#172B45]">{student.graduationBatch}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Active Backlogs</span>
              <strong className="text-[#172B45]">{student.activeBacklogs}</strong>
            </div>
            <div>
              <span className="text-[#64748B] block text-[11px]">Verification</span>
              <StatusBadge status={student.isDocumentVerified ? 'VERIFIED' : 'PENDING'} size="sm" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">Technical Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {student.skills?.map((sk, idx) => (
              <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E7EDF5] text-[#17365D]">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
