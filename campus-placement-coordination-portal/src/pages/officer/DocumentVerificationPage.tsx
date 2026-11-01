import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { FolderCheck, CheckCircle2, XCircle, FileText, AlertCircle } from 'lucide-react';
import { DocumentItem, StudentProfile } from '../../types';

interface VerificationRow {
  studentId: string;
  studentName: string;
  department: string;
  cgpa: number;
  docId: string;
  docName: string;
  docType: string;
  fileName: string;
  uploadedAt: string;
  status: DocumentItem['verificationStatus'];
  comment?: string;
}

export const DocumentVerificationPage: React.FC = () => {
  const { students, verifyDocument, showToast } = usePlacement();
  const [selectedRow, setSelectedRow] = useState<VerificationRow | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  // Flatten documents from all students
  const rows: VerificationRow[] = students.flatMap(s =>
    s.documents.map(d => ({
      studentId: s.id,
      studentName: s.name,
      department: s.department,
      cgpa: s.cgpa,
      docId: d.id,
      docName: d.name,
      docType: d.type,
      fileName: d.fileName,
      uploadedAt: d.uploadedAt,
      status: d.verificationStatus,
      comment: d.verificationComment
    }))
  );

  const handleApprove = (row: VerificationRow) => {
    verifyDocument(row.studentId, row.docId, 'VERIFIED', 'Verified against college examination records');
  };

  const handleOpenActionRequired = (row: VerificationRow) => {
    setSelectedRow(row);
    setCommentInput('');
    setRejectModalOpen(true);
  };

  const handleConfirmActionRequired = () => {
    if (!selectedRow) return;
    verifyDocument(
      selectedRow.studentId,
      selectedRow.docId,
      'ACTION_REQUIRED',
      commentInput || 'Please re-upload a clearer scanned copy with visible official stamp.'
    );
    setRejectModalOpen(false);
  };

  const columns: Column<VerificationRow>[] = [
    {
      key: 'studentName',
      header: 'Student Name',
      sortable: true,
      render: r => (
        <div>
          <span className="font-bold text-[#182B32]">{r.studentName}</span>
          <p className="text-[11px] text-[#697780]">{r.department} · CGPA {r.cgpa.toFixed(2)}</p>
        </div>
      )
    },
    {
      key: 'docName',
      header: 'Document Name & Type',
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
      header: 'Verification Status',
      sortable: true,
      render: r => <StatusBadge status={r.status} />
    },
    {
      key: 'comment',
      header: 'Coordinator Remark',
      render: r => <span className="text-xs text-[#697780]">{r.comment || '—'}</span>
    },
    {
      key: 'actions',
      header: 'Actions',
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
              onClick={() => handleOpenActionRequired(r)}
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
          <div className="flex items-center gap-2">
            <FolderCheck className="w-5 h-5 text-[#387A70]" />
            <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
              Academic Records & Marksheet Verification
            </h1>
          </div>
          <p className="text-xs text-[#697780] mt-1">
            Authenticate semester grade cards, SSC, and HSC certificates for company eligibility clearance.
          </p>
        </div>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        searchPlaceholder="Search by student name, document, or department..."
        exportFilename="Student_Document_Verification_Register"
        pageSize={10}
      />

      {/* Action Required Modal */}
      {selectedRow && (
        <Modal
          isOpen={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          title="Request Document Correction"
          description={`Student: ${selectedRow.studentName} · Document: ${selectedRow.docName}`}
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">
                Correction Instructions for Candidate *
              </label>
              <textarea
                rows={3}
                required
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="e.g. Scanned copy is illegible. Please scan original college transcript showing seal and sign."
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmActionRequired}
                className="px-4 py-1.5 bg-[#D5A44D] text-[#182B32] font-semibold rounded-md shadow-xs"
              >
                Send Correction Request
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
