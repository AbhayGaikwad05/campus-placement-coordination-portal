import React, { useState } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Modal } from '../../shared/components/Modal';
import { Button } from '../../shared/components/Button';
import { DESIGNATIONS } from '../../authentication/services/authService';
import {
  Calendar,
  Clock,
  Video,
  ExternalLink,
  CheckCircle2,
  FileCheck2,
  Users,
  Building2,
  Award,
  AlertCircle
} from 'lucide-react';

export const Interviews = () => {
  const { currentUser } = useAuth();
  const { interviews, submitInterviewEvaluation, scheduleInterview, students, showToast } = usePlacement();

  const isInterviewer = currentUser?.designation === DESIGNATIONS.INTERVIEWER;
  const companyId = currentUser?.companyId || 'comp_01';

  // Filter based on designation
  const relevantInterviews = isInterviewer
    ? interviews.filter(i =>
        i.interviewerEmail?.toLowerCase() === currentUser?.email?.toLowerCase() ||
        i.interviewerName?.toLowerCase().includes(currentUser?.name?.toLowerCase()) ||
        i.interviewerId === currentUser?.id
      )
    : interviews.filter(i => i.companyId === companyId);

  const [selectedInterview, setSelectedInterview] = useState(null);
  const [evalModalOpen, setEvalModalOpen] = useState(false);

  // Rubric state
  const [techRating, setTechRating] = useState(4);
  const [problemRating, setProblemRating] = useState(4);
  const [commRating, setCommRating] = useState(4);
  const [fitRating, setFitRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [recommendation, setRecommendation] = useState('RECOMMEND');
  const [attendance, setAttendance] = useState('PRESENT');

  const handleOpenEvaluation = (inv) => {
    setSelectedInterview(inv);
    if (inv.evaluation) {
      setTechRating(inv.evaluation.technicalRating);
      setProblemRating(inv.evaluation.problemSolvingRating);
      setCommRating(inv.evaluation.communicationRating);
      setFitRating(inv.evaluation.roleFitRating);
      setFeedback(inv.evaluation.detailedFeedback);
      setRecommendation(inv.evaluation.recommendation);
      setAttendance(inv.evaluation.attendance);
    } else {
      setTechRating(4);
      setProblemRating(4);
      setCommRating(4);
      setFitRating(4);
      setFeedback('');
      setRecommendation('RECOMMEND');
      setAttendance('PRESENT');
    }
    setEvalModalOpen(true);
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!selectedInterview) return;

    const overall = Number(((techRating + problemRating + commRating + fitRating) / 4).toFixed(1));

    submitInterviewEvaluation(selectedInterview.id, {
      completedAt: new Date().toISOString(),
      technicalRating: techRating,
      problemSolvingRating: problemRating,
      communicationRating: commRating,
      roleFitRating: fitRating,
      overallRating: overall,
      detailedFeedback: feedback,
      recommendation,
      attendance
    });

    setEvalModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
            {isInterviewer ? 'Candidate Technical Evaluation Workspace' : 'Campus Interview Schedules'}
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            {isInterviewer
              ? 'Assess candidate technical acumen, system design capability, and problem solving using structured rubrics.'
              : 'Confirmed interview schedules with students and assigned corporate panel members.'}
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-[#E7EDF5] text-[#17365D] rounded-lg">
          {relevantInterviews.length} rounds scheduled
        </span>
      </div>

      {relevantInterviews.length === 0 ? (
        <div className="bg-white border border-[#E0E6ED] rounded-xl p-12 text-center shadow-xs">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#172B45]">No Interviews Scheduled</h3>
          <p className="text-xs text-[#64748B] mt-1">
            {isInterviewer
              ? 'When recruitment leads schedule candidate interviews with you, they will appear here.'
              : 'Schedule interview rounds for shortlisted applicants on the Candidate Pipeline tab.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {relevantInterviews.map((inv) => (
            <div
              key={inv.id}
              className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#3478C5] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#172B45]">{inv.studentName}</span>
                  <span className="text-xs text-[#64748B]">({inv.studentDepartment || 'Computer Engineering'})</span>
                  <StatusBadge status={inv.status} size="sm" />
                </div>

                <p className="text-xs font-semibold text-[#17365D]">{inv.roundType || inv.roundTitle}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1 font-semibold text-[#172B45]">
                    <Calendar className="w-3.5 h-3.5 text-[#3478C5]" />
                    <span>{inv.scheduledDate || new Date(inv.scheduledTime).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#172B45]">
                    <Clock className="w-3.5 h-3.5 text-[#3478C5]" />
                    <span>{inv.scheduledTime}</span>
                  </span>
                  {inv.meetingUrl && (
                    <a
                      href={inv.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3478C5] font-bold hover:underline flex items-center gap-1"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {inv.evaluation && (
                  <div className="mt-2.5 p-3 rounded-lg bg-[#E8F5EE] border border-[#287449]/20 text-xs">
                    <p className="font-bold text-[#287449]">
                      Evaluation Logged · Overall Score: {inv.evaluation.overallRating} / 5.0 ({inv.evaluation.recommendation})
                    </p>
                    <p className="text-[#172B45] mt-0.5">
                      "{inv.evaluation.detailedFeedback}"
                    </p>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenEvaluation(inv)}
                >
                  {inv.evaluation ? 'Edit Rubric Scores' : 'Evaluate Candidate'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidate Rubric Evaluation Modal */}
      {selectedInterview && (
        <Modal
          isOpen={evalModalOpen}
          onClose={() => setEvalModalOpen(false)}
          title={`Interview Evaluation Rubric: ${selectedInterview.studentName}`}
          subtitle={`${selectedInterview.companyName} · ${selectedInterview.roundType || 'Technical Interview'}`}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleSubmitEvaluation} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#172B45] mb-1">Candidate Attendance</label>
              <select
                value={attendance}
                onChange={e => setAttendance(e.target.value)}
                className="w-full text-xs p-2 border border-[#E0E6ED] rounded-lg"
              >
                <option value="PRESENT">Present for Interview</option>
                <option value="ABSENT">Absent / No Show</option>
                <option value="RESCHEDULE_REQUESTED">Reschedule Requested</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#172B45] mb-1">Technical Acumen (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={techRating}
                  onChange={e => setTechRating(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-[#E0E6ED] rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#172B45] mb-1">Problem Solving & DSA (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={problemRating}
                  onChange={e => setProblemRating(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-[#E0E6ED] rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#172B45] mb-1">Communication Skills (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={commRating}
                  onChange={e => setCommRating(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-[#E0E6ED] rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#172B45] mb-1">Culture & Values Fit (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={fitRating}
                  onChange={e => setFitRating(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-[#E0E6ED] rounded-lg font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#172B45] mb-1">Hiring Recommendation</label>
              <select
                value={recommendation}
                onChange={e => setRecommendation(e.target.value)}
                className="w-full text-xs p-2 border border-[#E0E6ED] rounded-lg font-bold text-[#17365D]"
              >
                <option value="STRONGLY_RECOMMEND">Strong Hire (Top 5% Candidate)</option>
                <option value="RECOMMEND">Hire (Meets Technical Bar)</option>
                <option value="LEAN_RECOMMEND">Lean Hire</option>
                <option value="LEAN_REJECT">Lean No Hire</option>
                <option value="REJECT">No Hire (Does not meet bar)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#172B45] mb-1">Detailed Technical Feedback & Notes</label>
              <textarea
                rows={3}
                required
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Candidate's approach to complexity, coding cleanliness, response to hints..."
                className="w-full text-xs p-3 border border-[#E0E6ED] rounded-lg"
              />
            </div>

            <div className="pt-3 border-t border-[#E0E6ED] flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEvalModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Submit Rubric Evaluation
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Interviews;
