import React, { useState, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Users, GraduationCap, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { StudentProfile } from '../../types';

export const StudentDirectoryPage: React.FC = () => {
  const { students, settings } = usePlacement();
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (selectedDept !== 'ALL' && s.department !== selectedDept) return false;
      if (selectedStatus !== 'ALL' && s.placementStatus !== selectedStatus) return false;
      return true;
    });
  }, [students, selectedDept, selectedStatus]);

  const columns: Column<StudentProfile>[] = [
    {
      key: 'studentId',
      header: 'PRN / ID',
      sortable: true,
      className: 'font-mono text-xs'
    },
    {
      key: 'name',
      header: 'Candidate Name',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.name}</span>
          <p className="text-[11px] text-[#697780]">{item.email}</p>
        </div>
      )
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: item => <span className="text-xs">{item.department}</span>
    },
    {
      key: 'cgpa',
      header: 'CGPA',
      sortable: true,
      className: 'font-tabular font-bold text-[#387A70]',
      render: item => item.cgpa.toFixed(2)
    },
    {
      key: 'activeBacklogs',
      header: 'Backlogs',
      sortable: true,
      className: 'font-tabular text-center',
      render: item => (
        <span className={`font-semibold ${item.activeBacklogs > 0 ? 'text-[#B94C45]' : 'text-[#2E7D32]'}`}>
          {item.activeBacklogs}
        </span>
      )
    },
    {
      key: 'isDocumentVerified',
      header: 'Document Check',
      sortable: true,
      render: item => <StatusBadge status={item.isDocumentVerified ? 'VERIFIED' : 'PENDING'} />
    },
    {
      key: 'placementStatus',
      header: 'Placement Status',
      sortable: true,
      render: item => <StatusBadge status={item.placementStatus} />
    },
    {
      key: 'actions',
      header: 'Profile',
      render: item => (
        <button
          onClick={() => setSelectedStudent(item)}
          className="px-2.5 py-1 rounded bg-[#F7F6F2] hover:bg-[#E5EEE8] border border-[#E1E5E2] text-xs font-semibold text-[#182B32]"
        >
          View Portfolio
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Campus Student Placement Master Directory
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Browse and monitor eligible candidates for the 2026 Graduating Batch.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
          >
            <option value="ALL">All Departments</option>
            {settings.departments.map(d => (
              <option key={d.code} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
          >
            <option value="ALL">All Statuses</option>
            <option value="SEEKING">Seeking Placement</option>
            <option value="PLACED">Placed</option>
            <option value="RESTRICTED">Restricted</option>
          </select>
        </div>
      </div>

      <DataTable
        data={filteredStudents}
        columns={columns}
        searchPlaceholder="Search candidates by name, PRN, or email..."
        exportFilename="Student_Placement_Directory"
        pageSize={10}
      />

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          title={`Candidate Portfolio: ${selectedStudent.name}`}
          description={`${selectedStudent.studentId} · ${selectedStudent.department}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2]">
              <div>
                <span className="text-[#697780]">Overall CGPA</span>
                <p className="text-base font-bold text-[#387A70] font-tabular mt-0.5">{selectedStudent.cgpa.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-[#697780]">10th / 12th Score</span>
                <p className="text-sm font-bold text-[#182B32] font-tabular mt-0.5">{selectedStudent.tenthPercentage}% / {selectedStudent.twelfthPercentage}%</p>
              </div>
              <div>
                <span className="text-[#697780]">Active Backlogs</span>
                <p className="text-sm font-bold text-[#182B32] font-tabular mt-0.5">{selectedStudent.activeBacklogs}</p>
              </div>
              <div>
                <span className="text-[#697780]">Placement Status</span>
                <p className="text-sm font-bold text-[#182B32] mt-0.5">{selectedStudent.placementStatus}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#182B32] mb-1.5">Technical Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#E5EEE8] text-[#182B32] font-medium border border-[#C2D6CC]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#182B32] mb-1.5">Projects ({selectedStudent.projects.length})</h4>
              <div className="space-y-2">
                {selectedStudent.projects.map(p => (
                  <div key={p.id} className="p-3 rounded border border-[#E1E5E2] bg-[#F7F6F2]">
                    <p className="font-bold text-[#182B32]">{p.title}</p>
                    <p className="text-[#697780] mt-0.5 leading-relaxed">{p.description}</p>
                    <div className="flex gap-1.5 mt-2">
                      {p.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.2 rounded bg-white border border-[#E1E5E2]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
