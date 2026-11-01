import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CheckSquare, ShieldCheck, Plus, Clock, Users } from 'lucide-react';
import { Assessment, AssessmentAttempt } from '../../types';
import { mockService } from '../../services/mockService';

export const AssessmentCoordinationPage: React.FC = () => {
  const { assessments } = usePlacement();
  const attempts = mockService.getAttempts();

  const [activeTab, setActiveTab] = useState<'TESTS' | 'ATTEMPTS'>('TESTS');

  const testColumns: Column<Assessment>[] = [
    {
      key: 'title',
      header: 'Assessment Title',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.title}</span>
          <p className="text-[11px] text-[#697780]">{item.topic} {item.companyName && `· Linked to ${item.companyName}`}</p>
        </div>
      )
    },
    {
      key: 'isOfficial',
      header: 'Category',
      sortable: true,
      render: item => (
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${item.isOfficial ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5]' : 'bg-[#E5EEE8] text-[#387A70]'}`}>
          {item.isOfficial ? 'Official Screening' : 'Practice Test'}
        </span>
      )
    },
    {
      key: 'durationMinutes',
      header: 'Duration',
      sortable: true,
      className: 'font-tabular',
      render: item => <span>{item.durationMinutes} mins</span>
    },
    {
      key: 'questionsCount',
      header: 'Questions',
      className: 'font-tabular text-center',
      render: item => <span className="font-semibold text-[#182B32]">{item.questions.length}</span>
    },
    {
      key: 'passThresholdPercentage',
      header: 'Cut-off Threshold',
      sortable: true,
      className: 'font-tabular font-bold text-[#387A70]',
      render: item => `${item.passThresholdPercentage}%`
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: item => <StatusBadge status={item.status} />
    }
  ];

  const attemptColumns: Column<AssessmentAttempt>[] = [
    {
      key: 'studentName',
      header: 'Student Candidate',
      sortable: true,
      render: item => <span className="font-bold text-[#182B32]">{item.studentName}</span>
    },
    {
      key: 'submittedAt',
      header: 'Submission Time',
      sortable: true,
      render: item => <span className="font-mono text-xs">{new Date(item.submittedAt).toLocaleString()}</span>
    },
    {
      key: 'score',
      header: 'Score',
      sortable: true,
      className: 'font-tabular font-bold',
      render: item => `${item.score} / ${item.maxScore}`
    },
    {
      key: 'percentage',
      header: 'Percentage',
      sortable: true,
      className: 'font-tabular font-bold text-[#387A70]',
      render: item => `${item.percentage}%`
    },
    {
      key: 'isQualified',
      header: 'Qualification',
      sortable: true,
      render: item => <StatusBadge status={item.isQualified ? 'VERIFIED' : 'REJECTED'} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Assessments & Question Bank Coordination
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Configure official online screening tests, question banks, and candidate qualification cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#F7F6F2] border border-[#E1E5E2] rounded-lg">
          <button
            onClick={() => setActiveTab('TESTS')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'TESTS' ? 'bg-[#387A70] text-white shadow-2xs' : 'text-[#697780]'
            }`}
          >
            Assessments ({assessments.length})
          </button>
          <button
            onClick={() => setActiveTab('ATTEMPTS')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'ATTEMPTS' ? 'bg-[#387A70] text-white shadow-2xs' : 'text-[#697780]'
            }`}
          >
            Candidate Submissions ({attempts.length})
          </button>
        </div>
      </div>

      {activeTab === 'TESTS' ? (
        <DataTable
          data={assessments}
          columns={testColumns}
          searchPlaceholder="Search assessments by title or topic..."
          exportFilename="Assessment_Question_Bank"
          pageSize={10}
        />
      ) : (
        <DataTable
          data={attempts}
          columns={attemptColumns}
          searchPlaceholder="Search attempts by candidate..."
          exportFilename="Assessment_Attempts_Register"
          pageSize={10}
          emptyMessage="No candidate submissions recorded yet. Students can take tests from their portal."
        />
      )}
    </div>
  );
};
