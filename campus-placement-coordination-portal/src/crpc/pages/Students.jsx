import React, { useState, useMemo } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable } from '../../shared/components/DataTable';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Modal } from '../../shared/components/Modal';
import { Button } from '../../shared/components/Button';
import { DESIGNATIONS } from '../../authentication/services/authService';
import { Users, GraduationCap, CheckCircle2, XCircle, FileText, FolderCheck, Eye, ShieldCheck } from 'lucide-react';

export const Students = () => {
  const { currentUser } = useAuth();
  const { students, settings, verifyDocument } = usePlacement();

  const isCoordinator = currentUser?.designation === DESIGNATIONS.DEPT_COORDINATOR;
  const coordinatorDept = currentUser?.department || 'Computer Science and Engineering';

  const [selectedDept, setSelectedDept] = useState(isCoordinator ? coordinatorDept : 'ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verifyComment, setVerifyComment] = useState('');

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (isCoordinator) {
        if (!s.department.toLowerCase().includes(coordinatorDept.toLowerCase())) return false;
      } else if (selectedDept !== 'ALL') {
        if (s.department !== selectedDept) return false;
      }
      if (selectedStatus !== 'ALL' && s.placementStatus !== selectedStatus) return false;
      return true;
    });
  }, [students, isCoordinator, coordinatorDept, selectedDept, selectedStatus]);

  const handleVerifyMarksheet = (status) => {
    if (!selectedStudent) return;
    const docId = selectedStudent.documents?.[0]?.id || 'doc_marksheet_default';
    verifyDocument(selectedStudent.id, docId, status, verifyComment);
    setVerificationModalOpen(false);
    setVerifyComment('');
  };

  const columns = [
    {
      key: 'studentId',
      header: 'PRN / Roll',
      sortable: true,
      className: 'font-mono text-xs'
    },
    {
      key: 'name',
      header: 'Student Name',
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-bold text-[#172B45]">{item.name}</span>
          <p className="text-[11px] text-[#64748B]">{item.email}</p>
        </div>
      )
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (item) => <span className="text-xs text-[#172B45]">{item.department}</span>
    },
    {
      key: 'cgpa',
      header: 'CGPA',
      sortable: true,
      className: 'font-tabular font-bold text-[#17365D]',
      render: (item) => Number(item.cgpa).toFixed(2)
    },
    {
      key: 'activeBacklogs',
      header: 'Backlogs',
      sortable: true,
      className: 'font-tabular text-center',
      render: (item) => (
        <span className={`font-semibold ${item.activeBacklogs > 0 ? 'text-[#B42318]' : 'text-[#287449]'}`}>
          {item.activeBacklogs}
        </span>
      )
    },
    {
      key: 'isDocumentVerified',
      header: 'Marksheets',
      sortable: true,
      render: (item) => (
        <StatusBadge status={item.isDocumentVerified ? 'VERIFIED' : 'PENDING'} size="sm" />
      )
    },
    {
      key: 'placementStatus',
      header: 'Status',
      sortable: true,
      render: (item) => <StatusBadge status={item.placementStatus} size="sm" />
    },
    {
      key: 'actions',
      header: 'Action',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setSelectedStudent(item);
              setVerificationModalOpen(true);
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[#E0E6ED] bg-white text-[#17365D] hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            <FolderCheck className="w-3.5 h-3.5 text-[#3478C5]" />
            <span>Audit</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
              {isCoordinator ? `${coordinatorDept} - Student Directory` : 'Institutional Student Directory'}
            </h1>
            {isCoordinator && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#EFF8FF] text-[#175CD3] border border-[#175CD3]/20">
                Department Restricted
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Academic marksheet verification records, CGPA audits, and placement status tracking.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {!isCoordinator && (
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="text-xs px-3 py-1.5 bg-white border border-[#E0E6ED] rounded-lg text-[#172B45] focus:outline-none"
            >
              <option value="ALL">All Departments</option>
              {settings.departments?.map(d => (
                <option key={d.code} value={d.name}>{d.name}</option>
              ))}
            </select>
          )}

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="text-xs px-3 py-1.5 bg-white border border-[#E0E6ED] rounded-lg text-[#172B45] focus:outline-none"
          >
            <option value="ALL">All Placement Statuses</option>
            <option value="SEEKING">Seeking Opportunities</option>
            <option value="PLACED">Placed Candidates</option>
            <option value="RESTRICTED">Policy Restricted</option>
          </select>
        </div>
      </div>

      <DataTable
        data={filteredStudents}
        columns={columns}
        searchPlaceholder="Search by name, PRN, or email..."
        exportFilename="MITAOE_Students_Report"
      />

      {/* Marksheet Audit & Verification Modal */}
      {selectedStudent && (
        <Modal
          isOpen={verificationModalOpen}
          onClose={() => setVerificationModalOpen(false)}
          title={`Academic Transcript Audit: ${selectedStudent.name}`}
          subtitle={`PRN: ${selectedStudent.studentId} · ${selectedStudent.department}`}
          maxWidth="max-w-2xl"
          footer={
            <div className="flex items-center justify-end gap-2.5 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVerificationModalOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={XCircle}
                onClick={() => handleVerifyMarksheet('REJECTED')}
              >
                Reject / Discrepancy
              </Button>
              <Button
                variant="success"
                size="sm"
                icon={CheckCircle2}
                onClick={() => handleVerifyMarksheet('VERIFIED')}
              >
                Verify & Approve Marksheets
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-[#172B45]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E0E6ED]">
              <div>
                <span className="text-[#64748B] block text-[11px]">Cumulative CGPA</span>
                <strong className="text-base text-[#17365D]">{selectedStudent.cgpa}</strong>
              </div>
              <div>
                <span className="text-[#64748B] block text-[11px]">Active Backlogs</span>
                <strong>{selectedStudent.activeBacklogs}</strong>
              </div>
              <div>
                <span className="text-[#64748B] block text-[11px]">10th Percentage</span>
                <strong>{selectedStudent.tenthPercentage}%</strong>
              </div>
              <div>
                <span className="text-[#64748B] block text-[11px]">12th Percentage</span>
                <strong>{selectedStudent.twelfthPercentage}%</strong>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#172B45] mb-2 uppercase tracking-wider text-[11px]">
                Semester-wise SGPA Breakdown
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                {selectedStudent.semesters?.map(sem => (
                  <div key={sem.semester} className="p-2 bg-white border border-[#E0E6ED] rounded-lg">
                    <span className="text-[10px] text-[#64748B] block">Sem {sem.semester}</span>
                    <strong className="text-xs text-[#17365D]">{sem.sgpa}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172B45] mb-1">
                Coordinator Audit Verification Comment
              </label>
              <input
                type="text"
                value={verifyComment}
                onChange={e => setVerifyComment(e.target.value)}
                placeholder="e.g. Transcripts verified against Savitribai Phule Pune University ledger."
                className="w-full text-xs px-3 py-2 border border-[#E0E6ED] rounded-lg"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Students;
