import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import DataTable from '../../shared/components/DataTable';
import StatusBadge from '../../shared/components/StatusBadge';
import Modal from '../../shared/components/Modal';
import {
  Calendar,
  Clock,
  Plus,
  Video,
  UserCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const InterviewCoordinationPage = () => {
  const { interviews, applications, scheduleInterview, showToast } = usePlacement();

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(applications[0]?.id || '');
  const [roundType, setRoundType] = useState('TECHNICAL');
  const [roundTitle, setRoundTitle] = useState('Technical Interview Round 1 (Data Structures)');
  const [dateTime, setDateTime] = useState('2026-11-05T10:30');
  const [duration, setDuration] = useState(45);
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/xyz-mitaoe-placement');
  const [interviewerName, setInterviewerName] = useState('Siddharth Rao');
  const [interviewerEmail, setInterviewerEmail] = useState('siddharth.rao@google.com');

  const handleCreateInterview = (e) => {
    e.preventDefault();
    const app = applications.find(a => a.id === selectedAppId);
    if (!app) return;

    scheduleInterview({
      applicationId: app.id,
      driveId: app.driveId,
      companyId: app.companyId,
      companyName: app.companyName,
      studentId: app.studentId,
      studentName: app.studentName,
      studentDepartment: app.studentDepartment,
      roundType,
      roundTitle,
      scheduledTime: dateTime,
      durationMinutes: Number(duration),
      mode: 'VIRTUAL',
      meetingUrlOrVenue: meetingUrl,
      interviewerId: 'user_interviewer_1',
      interviewerName,
      interviewerEmail
    });

    setScheduleModalOpen(false);
  };

  const columns = [
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
      key: 'companyName',
      header: 'Company & Round',
      sortable: true,
      render: item => (
        <div>
          <span className="font-semibold text-[#182B32]">{item.companyName}</span>
          <p className="text-[11px] text-[#697780]">{item.roundTitle}</p>
        </div>
      )
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
      header: 'Assigned Interviewer',
      render: item => (
        <div>
          <p className="font-medium text-[#182B32]">{item.interviewerName}</p>
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
      key: 'meetingUrlOrVenue',
      header: 'Meeting Link',
      render: item => item.meetingUrlOrVenue ? (
        <a
          href={item.meetingUrlOrVenue}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#387A70] hover:underline flex items-center gap-1 font-medium"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Meeting URL</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      ) : (
        <span className="text-[#94A3B8]">In-Person Venue</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Interview Scheduling & Slot Coordination
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Book candidate interview slots, assign corporate panellists, and monitor completed evaluations.
          </p>
        </div>

        <button
          onClick={() => setScheduleModalOpen(true)}
          className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Candidate Slot</span>
        </button>
      </div>

      <DataTable
        data={interviews}
        columns={columns}
        searchPlaceholder="Search interviews by candidate, company, or interviewer..."
        exportFilename="Campus_Interviews_Schedule"
        pageSize={10}
      />

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule Interview Round"
        description="Assign candidate to interviewer slot and link video meeting."
      >
        <form onSubmit={handleCreateInterview} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Select Candidate Application *</label>
            <select
              value={selectedAppId}
              onChange={e => setSelectedAppId(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
            >
              {applications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.studentName} ({app.studentDepartment}) — {app.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Round Type *</label>
              <select
                value={roundType}
                onChange={e => setRoundType(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              >
                <option value="TECHNICAL">Technical Interview</option>
                <option value="SYSTEM_DESIGN">System Design</option>
                <option value="HR_LEADERSHIP">HR & Behavioral</option>
                <option value="MANAGERIAL">Managerial</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Round Title *</label>
              <input
                type="text"
                required
                value={roundTitle}
                onChange={e => setRoundTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Scheduled Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={dateTime}
                onChange={e => setDateTime(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Interviewer Name *</label>
              <input
                type="text"
                required
                value={interviewerName}
                onChange={e => setInterviewerName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Interviewer Email *</label>
              <input
                type="email"
                required
                value={interviewerEmail}
                onChange={e => setInterviewerEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Video Meeting URL / Physical Venue</label>
            <input
              type="text"
              value={meetingUrl}
              onChange={e => setMeetingUrl(e.target.value)}
              placeholder="https://meet.google.com/..."
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setScheduleModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs"
            >
              Confirm Interview Slot
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export const Interviews = InterviewCoordinationPage;
export default Interviews;
