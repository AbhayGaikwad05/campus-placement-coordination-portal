import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  FileCheck2,
  Calendar,
  Clock,
  Video,
  ExternalLink
} from 'lucide-react';
import { Interview, InterviewRecommendation } from '../../types';

export const InterviewerWorkspacePage: React.FC = () => {
  const { currentUser, interviews, submitInterviewEvaluation } = usePlacement();
  if (!currentUser) return null;

  // Filter only interviews assigned to this interviewer!
  const myInterviews = interviews.filter(i =>
    i.interviewerId === currentUser.id ||
    i.interviewerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
    i.interviewerName.toLowerCase().includes(currentUser.name.toLowerCase())
  );

  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [evalModalOpen, setEvalModalOpen] = useState(false);

  // Rubric state
  const [techRating, setTechRating] = useState(4);
  const [problemRating, setProblemRating] = useState(4);
  const [commRating, setCommRating] = useState(4);
  const [fitRating, setFitRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [recommendation, setRecommendation] = useState<InterviewRecommendation>('RECOMMEND');
  const [attendance, setAttendance] = useState<'PRESENT' | 'ABSENT' | 'RESCHEDULE_REQUESTED'>('PRESENT');

  const handleOpenEvaluation = (inv: Interview) => {
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

  const handleSubmitEvaluation = (e: React.FormEvent) => {
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
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#348397] text-white shadow-2xs">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Assigned Candidate Interview Workspace
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Technical Assessment & Evaluation Panel · {currentUser.companyName || 'Campus Recruitment Partner'}
          </p>
        </div>
        <span className="text-xs font-bold text-[#165361] bg-[#EFF8FA] border border-[#B4DFE8] px-3 py-1.5 rounded-xl font-tabular">
          {myInterviews.length} assigned interviews
        </span>
      </div>

      {myInterviews.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center">
          <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-900">No Active Interviews Assigned</h3>
          <p className="text-xs text-slate-500 mt-1">
            When placement officers or your recruiting team schedule candidates with you, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myInterviews.map(inv => (
            <div
              key={inv.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#348397]/60 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-base text-slate-900">{inv.studentName}</span>
                  <span className="text-xs text-slate-400 font-medium">({inv.studentDepartment})</span>
                  <StatusBadge status={inv.status} />
                </div>

                <h3 className="text-xs font-bold text-[#348397]">{inv.roundTitle}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-[#348397]" />
                    {new Date(inv.scheduledTime).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-[#348397]" />
                    {new Date(inv.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({inv.durationMinutes}m)
                  </span>
                  {inv.meetingUrlOrVenue && (
                    <a
                      href={inv.meetingUrlOrVenue}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-600 hover:text-cyan-700 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Open Meeting URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                {inv.evaluation && (
                  <div className="mt-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <p className="font-bold text-emerald-900">
                      Evaluation Recorded · Overall Rating: {inv.evaluation.overallRating}/5 ({inv.evaluation.recommendation.replace(/_/g, ' ')})
                    </p>
                    <p className="text-emerald-800 mt-1 leading-relaxed">
                      "{inv.evaluation.detailedFeedback}"
                    </p>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => handleOpenEvaluation(inv)}
                  className="px-4 py-2.5 bg-[#348397] hover:bg-[#296a7a] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {inv.evaluation ? 'Edit Rubric Evaluation' : 'Evaluate Candidate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Evaluation Rubric Modal */}
      {selectedInterview && (
        <Modal
          isOpen={evalModalOpen}
          onClose={() => setEvalModalOpen(false)}
          title={`Candidate Evaluation Rubric: ${selectedInterview.studentName}`}
          description={`${selectedInterview.companyName} · ${selectedInterview.roundTitle}`}
          maxWidth="2xl"
        >
          <form onSubmit={handleSubmitEvaluation} className="space-y-4 text-xs">
            {/* Candidate Overview */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">{selectedInterview.studentName}</p>
                <p className="text-[11px] text-slate-500">{selectedInterview.studentDepartment}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Attendance:</span>
                <select
                  value={attendance}
                  onChange={e => setAttendance(e.target.value as any)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="PRESENT">Present</option>
                  <option value="ABSENT">Absent / No-Show</option>
                  <option value="RESCHEDULE_REQUESTED">Reschedule Requested</option>
                </select>
              </div>
            </div>

            {/* Rubric Criteria 1 to 5 Ratings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Technical Knowledge & DSA (1-5)</label>
                <select
                  value={techRating}
                  onChange={e => setTechRating(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#165361] focus:bg-white focus:outline-hidden focus:border-[#348397] focus:ring-2 focus:ring-[#EFF8FA]"
                >
                  <option value={5}>5 - Exceptional Mastery</option>
                  <option value={4}>4 - Solid Understanding</option>
                  <option value={3}>3 - Acceptable Baseline</option>
                  <option value={2}>2 - Marginal Gaps</option>
                  <option value={1}>1 - Unacceptable</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Problem Solving & Logic (1-5)</label>
                <select
                  value={problemRating}
                  onChange={e => setProblemRating(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#165361] focus:bg-white focus:outline-hidden focus:border-[#348397] focus:ring-2 focus:ring-[#EFF8FA]"
                >
                  <option value={5}>5 - Solved with optimal complexity</option>
                  <option value={4}>4 - Solved with minor hints</option>
                  <option value={3}>3 - Brute force approach</option>
                  <option value={2}>2 - Incomplete logic</option>
                  <option value={1}>1 - Unable to formulate</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Communication & Articulation (1-5)</label>
                <select
                  value={commRating}
                  onChange={e => setCommRating(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#165361] focus:bg-white focus:outline-hidden focus:border-[#348397] focus:ring-2 focus:ring-[#EFF8FA]"
                >
                  <option value={5}>5 - Highly articulate & collaborative</option>
                  <option value={4}>4 - Clear and structured</option>
                  <option value={3}>3 - Adequate</option>
                  <option value={2}>2 - Needs guidance to clarify</option>
                  <option value={1}>1 - Ineffective communication</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Role & Cultural Fit (1-5)</label>
                <select
                  value={fitRating}
                  onChange={e => setFitRating(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#165361] focus:bg-white focus:outline-hidden focus:border-[#348397] focus:ring-2 focus:ring-[#EFF8FA]"
                >
                  <option value={5}>5 - Strong culture addition</option>
                  <option value={4}>4 - Good alignment</option>
                  <option value={3}>3 - Moderate fit</option>
                  <option value={2}>2 - Weak alignment</option>
                  <option value={1}>1 - Poor fit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Final Hiring Recommendation *
              </label>
              <select
                value={recommendation}
                onChange={e => setRecommendation(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#165361] focus:bg-white focus:outline-hidden focus:border-[#348397] focus:ring-2 focus:ring-[#EFF8FA]"
              >
                <option value="STRONGLY_RECOMMEND">Strongly Recommend (High Hire Bar)</option>
                <option value="RECOMMEND">Recommend (Standard Hire)</option>
                <option value="HOLD">Hold (Requires Comparison)</option>
                <option value="REJECT">Reject (Does not meet bar)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Detailed Feedback & Justification *
              </label>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                required
                rows={4}
                placeholder="Explain the candidate's code quality, edge case handling, response to trade-off questions, and specific reasoning for your recommendation..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#348397] focus:ring-2 focus:ring-[#EFF8FA] transition-all leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEvalModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#348397] hover:bg-[#296a7a] text-white rounded-xl font-bold shadow-xs transition-all cursor-pointer"
              >
                Submit Official Evaluation
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
