import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button } from '../../shared/components/Button';
import { DESIGNATIONS } from '../../authentication/services/authService';
import {
  Building2,
  Briefcase,
  Users,
  Calendar,
  Gift,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Video
} from 'lucide-react';
import '../styles/company.css';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { companies, drives, applications, interviews, offers } = usePlacement();
  const navigate = useNavigate();

  const isInterviewer = currentUser?.designation === DESIGNATIONS.INTERVIEWER;
  const companyId = currentUser?.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0] || {
    id: 'comp_01',
    name: 'Google India',
    verificationStatus: 'VERIFIED',
    tier: 'TIER_1',
    headquarters: 'Bengaluru, India',
    totalHires: 14
  };

  const myDrives = drives.filter(d => d.companyId === company.id);
  const myApplications = applications.filter(a => a.companyId === company.id);
  const myInterviews = interviews.filter(i => i.companyId === company.id);
  const myOffers = offers.filter(o => o.companyId === company.id);

  // If interviewer, filter to assigned interviews
  const assignedInterviews = isInterviewer
    ? interviews.filter(i =>
        i.interviewerEmail?.toLowerCase() === currentUser?.email?.toLowerCase() ||
        i.interviewerName?.toLowerCase().includes(currentUser?.name?.toLowerCase()) ||
        i.interviewerId === currentUser?.id
      )
    : myInterviews;

  const awaitingReview = myApplications.filter(a => a.currentStage === 'APPLIED' || a.currentStage === 'ELIGIBILITY_CONFIRMED');
  const shortlisted = myApplications.filter(a => a.currentStage === 'SHORTLISTED');
  const acceptedOffers = myOffers.filter(o => o.status === 'ACCEPTED');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-[#172B45] tracking-tight">
              {company.name} — {isInterviewer ? 'Interviewer Evaluation Center' : 'Campus Recruitment Hub'}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E7EDF5] text-[#17365D] border border-[#17365D]/20">
              {isInterviewer ? 'Technical Bar Raiser' : 'University Talent'}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            {isInterviewer
              ? 'Evaluate assigned candidates via standardized problem solving and system design rubrics.'
              : `Managing campus drives, applicant shortlisting, and candidate offer letters at MITAOE.`}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {isInterviewer ? (
            <Button
              variant="primary"
              size="sm"
              icon={Calendar}
              onClick={() => navigate('/company/interviews')}
            >
              Start Interview Rubrics ({assignedInterviews.filter(i => i.status === 'SCHEDULED').length})
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/company/create-drive')}
            >
              Post Recruitment Drive
            </Button>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      {isInterviewer ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Assigned Interviews"
            value={assignedInterviews.length}
            subtext="Confirmed campus slots"
            icon={Calendar}
            colorScheme="navy"
            onClick={() => navigate('/company/interviews')}
          />
          <StatCard
            label="Pending Evaluations"
            value={assignedInterviews.filter(i => !i.evaluation).length}
            subtext="Rubrics awaiting submission"
            icon={Clock}
            colorScheme="gold"
            onClick={() => navigate('/company/interviews')}
          />
          <StatCard
            label="Completed Evaluations"
            value={assignedInterviews.filter(i => Boolean(i.evaluation)).length}
            subtext="Scores logged & submitted"
            icon={CheckCircle2}
            colorScheme="green"
            onClick={() => navigate('/company/interviews')}
          />
          <StatCard
            label="Company Campus Hires"
            value={company.totalHires}
            subtext="Total MITAOE hires"
            icon={Gift}
            colorScheme="blue"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Active Campus Drives"
            value={myDrives.filter(d => d.status === 'PUBLISHED').length}
            subtext={`${myDrives.length} total posted`}
            icon={Briefcase}
            colorScheme="navy"
            onClick={() => navigate('/company/drives')}
          />
          <StatCard
            label="Total Applicants"
            value={myApplications.length}
            subtext={`${awaitingReview.length} awaiting screening`}
            icon={Users}
            colorScheme="blue"
            onClick={() => navigate('/company/applicants')}
          />
          <StatCard
            label="Interviews Scheduled"
            value={myInterviews.length}
            subtext="Active assessment rounds"
            icon={Calendar}
            colorScheme="gold"
            onClick={() => navigate('/company/interviews')}
          />
          <StatCard
            label="Offers Accepted"
            value={acceptedOffers.length}
            subtext={`${myOffers.length} offers issued`}
            icon={Gift}
            colorScheme="green"
            onClick={() => navigate('/company/applicants')}
          />
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main View */}
        <div className="lg:col-span-2 space-y-6">
          {isInterviewer ? (
            /* Interviewer Workspace Feed */
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E0E6ED]">
                <div>
                  <h3 className="text-sm font-bold text-[#172B45]">Today's Assigned Candidate Interviews</h3>
                  <p className="text-xs text-[#64748B]">Conduct interview rounds and submit rubrics</p>
                </div>
                <Link to="/company/interviews" className="text-xs font-bold text-[#3478C5] hover:underline">
                  Open Workspace →
                </Link>
              </div>

              {assignedInterviews.length === 0 ? (
                <p className="text-xs text-[#64748B] py-6 text-center">No assigned interviews scheduled at this time.</p>
              ) : (
                <div className="space-y-3">
                  {assignedInterviews.slice(0, 3).map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3.5 bg-[#F8FAFC] border border-[#E0E6ED] rounded-lg flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#172B45]">{inv.studentName}</p>
                          <StatusBadge status={inv.status} size="sm" />
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5">
                          {inv.roundType} · {inv.scheduledDate} at {inv.scheduledTime}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {inv.meetingUrl && (
                          <a
                            href={inv.meetingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[#E0E6ED] bg-white text-[#17365D] hover:bg-slate-50 flex items-center gap-1"
                          >
                            <Video className="w-3.5 h-3.5 text-[#3478C5]" />
                            <span>Join</span>
                          </a>
                        )}
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate('/company/interviews')}
                        >
                          {inv.evaluation ? 'View Rubric' : 'Grade Candidate'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Recruiter Active Drives & Applicants */
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E0E6ED]">
                <div>
                  <h3 className="text-sm font-bold text-[#172B45]">Active Recruitment Drives</h3>
                  <p className="text-xs text-[#64748B]">Approved campus drives open to 2026 Batch</p>
                </div>
                <Link to="/company/drives" className="text-xs font-bold text-[#3478C5] hover:underline">
                  View All Drives →
                </Link>
              </div>

              <div className="space-y-3">
                {myDrives.map((drive) => {
                  const driveApps = myApplications.filter(a => a.driveId === drive.id);
                  return (
                    <div
                      key={drive.id}
                      className="p-3.5 bg-white border border-[#E0E6ED] rounded-lg hover:border-slate-300 transition-all flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs font-bold text-[#172B45]">{drive.jobTitle}</p>
                          <StatusBadge status={drive.status} size="sm" />
                        </div>
                        <p className="text-[11px] text-[#64748B]">
                          ₹{drive.ctcLpa} LPA · {driveApps.length} Applicants · Deadline: {drive.applicationDeadline || drive.registrationDeadline || 'Ongoing'}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/company/applicants')}
                      >
                        View Applicants
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Verification Status & Partner Info */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#172B45] mb-2 pb-2 border-b border-[#E0E6ED]">
              Partner Verification Status
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">CRPC Clearance:</span>
                <StatusBadge status={company.verificationStatus} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Corporate Tier:</span>
                <span className="font-bold text-[#17365D]">{company.tier || 'TIER_1'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Headquarters:</span>
                <span className="font-bold text-[#172B45]">{company.headquarters}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
