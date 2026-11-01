import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Calendar, Video, ExternalLink } from 'lucide-react';
import { Interview } from '../../types';

export const CompanyInterviewsPage: React.FC = () => {
  const { currentUser, companies, interviews } = usePlacement();
  if (!currentUser) return null;
  const companyId = currentUser.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0];

  const myInterviews = interviews.filter(i => i.companyId === company.id);

  const columns: Column<Interview>[] = [
    {
      key: 'studentName',
      header: 'Candidate Name',
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
      header: 'Recruitment Round',
      sortable: true,
      render: item => <span className="font-semibold text-[#182B32]">{item.roundTitle}</span>
    },
    {
      key: 'scheduledTime',
      header: 'Scheduled Slot',
      sortable: true,
      className: 'font-tabular',
      render: item => (
        <div>
          <span className="font-medium text-[#182B32]">
            {new Date(item.scheduledTime).toLocaleDateString()}
          </span>
          <p className="text-[11px] text-[#697780]">
            {new Date(item.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({item.durationMinutes}m)
          </p>
        </div>
      )
    },
    {
      key: 'interviewerName',
      header: 'Assigned Panellist',
      sortable: true,
      render: item => (
        <div>
          <span className="font-medium text-[#182B32]">{item.interviewerName}</span>
          <p className="text-[11px] text-[#697780]">{item.interviewerEmail}</p>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: item => <StatusBadge status={item.status} />
    },
    {
      key: 'evaluation',
      header: 'Feedback / Outcome',
      render: item => item.evaluation ? (
        <span className="text-xs font-semibold text-[#166534]">
          {item.evaluation.recommendation.replace(/_/g, ' ')} ({item.evaluation.overallRating}/5)
        </span>
      ) : (
        <span className="text-xs text-[#94A3B8]">Awaiting Evaluation</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            {company.name} — Scheduled Candidate Interviews
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Track live interviews and interviewer rubric submissions.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#182B32] font-tabular">
          {myInterviews.length} total interview rounds
        </span>
      </div>

      <DataTable
        data={myInterviews}
        columns={columns}
        searchPlaceholder="Search interviews by candidate or panellist..."
        exportFilename={`${company.name.replace(/\s+/g, '_')}_Interviews`}
        pageSize={10}
      />
    </div>
  );
};
