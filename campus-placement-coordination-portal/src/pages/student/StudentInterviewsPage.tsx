import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockService } from '../../services/mockService';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  UserCheck,
  Video,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

export const StudentInterviewsPage: React.FC = () => {
  const { interviews, studentProfile } = usePlacement();
  const activeStudent = studentProfile || mockService.getStudents()[0];

  const myInterviews = interviews.filter(i => i.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            My Interview Schedule & Coordination
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Confirmed interview rounds scheduled with corporate recruitment panels.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#182B32] font-tabular">
          {myInterviews.length} rounds scheduled
        </span>
      </div>

      {/* Interviews List */}
      {myInterviews.length === 0 ? (
        <div className="bg-white border border-[#E1E5E2] rounded-xl p-12 text-center">
          <Calendar className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#182B32]">No Interviews Scheduled</h3>
          <p className="text-xs text-[#697780] mt-1 max-w-sm mx-auto">
            Once you qualify in assessment screenings or get shortlisted by companies, your interview slots will appear here with video links.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myInterviews.map(inv => (
            <div
              key={inv.id}
              className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#182B32]">{inv.companyName}</span>
                  <span className="text-xs text-[#697780]">·</span>
                  <StatusBadge status={inv.status} />
                </div>

                <h3 className="text-base font-bold text-[#182B32]">{inv.roundTitle}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#697780]">
                  <span className="flex items-center gap-1 font-semibold text-[#182B32]">
                    <Calendar className="w-3.5 h-3.5 text-[#387A70]" />
                    {new Date(inv.scheduledTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#182B32]">
                    <Clock className="w-3.5 h-3.5 text-[#387A70]" />
                    {new Date(inv.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({inv.durationMinutes} Mins)
                  </span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#697780]" />
                    Interviewer: {inv.interviewerName}
                  </span>
                </div>

                {inv.evaluation && (
                  <div className="mt-3 p-3 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] text-xs">
                    <p className="font-bold text-[#166534] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Round Completed · Recommendation: {inv.evaluation.recommendation.replace(/_/g, ' ')}
                    </p>
                    <p className="text-[#14532D] mt-1 leading-relaxed">
                      "{inv.evaluation.detailedFeedback}"
                    </p>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                {inv.meetingUrlOrVenue && (
                  <a
                    href={inv.meetingUrlOrVenue}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Video Meeting</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
