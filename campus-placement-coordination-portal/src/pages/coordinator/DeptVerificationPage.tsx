import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { FolderCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { DocumentItem } from '../../types';

interface DeptDocRow {
  studentId: string;
  studentName: string;
  prn: string;
  docId: string;
  docName: string;
  fileName: string;
  uploadedAt: string;
  status: DocumentItem['verificationStatus'];
  comment?: string;
}

export const DeptVerificationPage: React.FC = () => {
  const { students, currentUser, verifyDocument, showToast } = usePlacement();
  if (!currentUser) return null;
  const myDept = currentUser.department || 'Computer Science and Engineering';

  const [selectedRow, setSelectedRow] = useState<DeptDocRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  const deptStudents = students.filter(s => s.department === myDept);
  const rows: DeptDocRow[] = deptStudents.flatMap(s =>
    s.documents.map(d => ({
      studentId: s.id,
      studentName: s.name,
      prn: s.studentId,
      docId: d.id,
      docName: d.name,
      fileName: d.fileName,
      uploadedAt: d.uploadedAt,
      status: d.verificationStatus,
      comment: d.verificationComment
    }))
  );

  const handleApprove = (row: DeptDocRow) => {
    verifyDocument(row.studentId, row.docId, 'VERIFIED', `Verified by ${currentUser.name} (${myDept})`);
  };

  const handleOpenAction = (row: DeptDocRow) => {
    setSelectedRow(row);
    setComment('');
    setModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedRow) return;
    verifyDocument(
      selectedRow.studentId,
      selectedRow.docId,
      'ACTION_REQUIRED',
      comment || 'Marksheet scan unclear; please upload official examination copy.'
    );
    setModalOpen(false);
  };

  const columns: Column<DeptDocRow>[] = [
    {
      key: 'studentName',
      header: 'Student Name & PRN',
      sortable: true,
      render: r => (
        <div>
          <span className="font-bold text-[#182B32]">{r.studentName}</span>
          <p className="text-[11px] text-[#697780] font-mono">{r.prn}</p>
        </div>
      )
    },
    {
      key: 'docName',
      header: 'Marksheet / Certificate',
      sortable: true,
      render: r => (
        <div>
          <span className="font-semibold text-[#182B32]">{r.docName}</span>
          <p className="text-[11px] text-[#697780] font-mono">{r.fileName}</p>
        </div>
      )
    },
    {
      key: 'uploadedAt',
      header: 'Uploaded Date',
      sortable: true,
      className: 'font-tabular'
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: r => <StatusBadge status={r.status} />
    },
    {
      key: 'actions',
      header: 'Department Actions',
      render: r => (
        <div className="flex items-center gap-1.5">
          {r.status !== 'VERIFIED' && (
            <button
              onClick={() => handleApprove(r)}
              className="px-2.5 py-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-[11px] font-semibold rounded shadow-2xs transition-colors"
            >
              Verify
            </button>
          )}
          {r.status !== 'ACTION_REQUIRED' && (
            <button
              onClick={() => handleOpenAction(r)}
              className="px-2.5 py-1 bg-white border border-[#D5A44D] text-[#8C6B1F] hover:bg-[#FEFCE8] text-[11px] font-semibold rounded transition-colors"
            >
              Action Needed
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {myDept} — Marksheet Verification Desk
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Validate SGPA, credit fulfillment, and authenticity of student grade cards.
          </p>
        </div>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        searchPlaceholder="Search marksheets by student name or PRN..."
        exportFilename={`${myDept.replace(/\s+/g, '_')}_Verification_Register`}
        pageSize={10}
      />

      {/* Modal */}
      {selectedRow && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Request Student Marksheet Resubmission"
          description={`Student: ${selectedRow.studentName} (${selectedRow.prn})`}
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">
                Correction Instructions *
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="e.g. Scanned grade card lacks the Controller of Examinations stamp..."
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-1.5 bg-[#D5A44D] text-[#182B32] font-semibold rounded-md shadow-xs"
              >
                Send Request
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
