import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CheckSquare } from 'lucide-react';
import { Interview } from '../../types';

export const EvaluationHistoryPage: React.FC = () => {
  const { currentUser, interviews } = usePlacement();
  if (!currentUser) return null;

  const completed = interviews.filter(i =>
    i.evaluation &&
    (i.interviewerId === currentUser.id ||
     i.interviewerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
     i.interviewerName.toLowerCase().includes(currentUser.name.toLowerCase()))
  );

  const columns: Column<Interview>[] = [
    {
      key: 'studentName',
      header: 'Candidate',
      sortable: true,
      render: item => (
        <div>
          <span className="font-bold text-[#182B32]">{item.studentName}</span>
          <p className="text-[11px] text-[#697780]">{item.studentDepartment}</p>
        </div>
      )
    },
    {
      key: 'roundTitle',
      header: 'Round Evaluated',
      sortable: true,
      render: item => <span className="font-semibold text-[#182B32]">{item.roundTitle}</span>
    },
    {
      key: 'completedAt',
      header: 'Evaluation Date',
      sortable: true,
      className: 'font-tabular',
      render: item => item.evaluation ? (
        <span className="text-xs text-[#697780]">
          {new Date(item.evaluation.completedAt).toLocaleDateString()}
        </span>
      ) : null
    },
    {
      key: 'overallRating',
      header: 'Rating (out of 5)',
      sortable: true,
      className: 'font-tabular font-bold text-[#387A70]',
      render: item => item.evaluation ? `${item.evaluation.overallRating} / 5.0` : '—'
    },
    {
      key: 'recommendation',
      header: 'Hiring Decision',
      sortable: true,
      render: item => item.evaluation ? (
        <span className={`text-xs font-bold ${
          item.evaluation.recommendation === 'STRONGLY_RECOMMEND' || item.evaluation.recommendation === 'RECOMMEND'
            ? 'text-[#2E7D32]'
            : 'text-[#B94C45]'
        }`}>
          {item.evaluation.recommendation.replace(/_/g, ' ')}
        </span>
      ) : null
    },
    {
      key: 'feedback',
      header: 'Feedback Summary',
      render: item => item.evaluation ? (
        <p className="text-xs text-[#697780] line-clamp-2 max-w-xs">{item.evaluation.detailedFeedback}</p>
      ) : null
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Interviewer Evaluation Records Archive
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Historical rubric scorecards and written candidate assessments submitted by you.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#182B32] font-tabular">
          {completed.length} completed scorecards
        </span>
      </div>

      <DataTable
        data={completed}
        columns={columns}
        searchPlaceholder="Search evaluation history..."
        exportFilename="Interviewer_Evaluation_History"
        pageSize={10}
        emptyMessage="No evaluations completed yet. Evaluate candidates from your Workspace tab."
      />
    </div>
  );
};
