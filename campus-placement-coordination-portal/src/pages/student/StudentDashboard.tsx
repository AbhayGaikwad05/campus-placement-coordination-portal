import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { calculateProfileCompleteness } from '../../utils/rules';
import {
  Briefcase,
  Calendar,
  Gift,
  FileText,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Clock
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentUser, studentProfile, drives, applications, interviews, offers, announcements } = usePlacement();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const student = studentProfile || {
    id: 'std_01',
    name: currentUser.name,
    studentId: 'MIT2022CS042',
    department: currentUser.department || 'Computer Science and Engineering',
    graduationBatch: 2026,
    cgpa: 8.85,
    placementStatus: 'SEEKING',
    skills: ['TypeScript', 'React.js', 'Python'],
    projects: [{ title: 'Campus Tracker' }],
    resumes: [{ isDefault: true }],
    documents: [{ verificationStatus: 'VERIFIED' }],
    codingProfiles: [{ platform: 'LeetCode' }],
    certifications: [{ name: 'AWS Cloud' }]
  };

  const completeness = calculateProfileCompleteness({
    hasPersonalInfo: true,
    hasAcademicInfo: true,
    hasMarksheets: Boolean(student.documents?.some((d: any) => d.type === 'MARKSHEET' && d.verificationStatus === 'VERIFIED')),
    hasResume: Boolean(student.resumes?.length > 0),
    skillsCount: student.skills?.length || 0,
    projectsCount: student.projects?.length || 0,
    hasCodingProfiles: Boolean(student.codingProfiles?.length > 0),
    hasCertifications: Boolean(student.certifications?.length > 0)
  });

  const myApplications = applications.filter(a => a.studentId === student.id);
  const myInterviews = interviews.filter(i => i.studentId === student.id && i.status === 'SCHEDULED');
  const myOffers = offers.filter(o => o.studentId === student.id);
  const publishedDrives = drives.filter(d => d.status === 'PUBLISHED');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Welcome back, {student.name}
            </h1>
            <StatusBadge status={student.placementStatus || 'SEEKING'} />
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {student.department} · Batch of {student.graduationBatch} · PRN: <span className="font-mono text-slate-800 font-bold">{student.studentId}</span>
          </p>
        </div>

        {/* Profile Completeness Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 min-w-[260px]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800">Portfolio Completeness</span>
            <span className="font-extrabold text-[#3974C6] font-tabular">{completeness.percentage}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#3974C6] to-blue-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${completeness.percentage}%` }}
            />
          </div>
          {completeness.missingSections.length > 0 && (
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Missing: {completeness.missingSections[0]}</span>
            </p>
          )}
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Drives"
          value={publishedDrives.length}
          subtext="Open for campus application"
          icon={Briefcase}
          onClick={() => navigate('/student/opportunities')}
        />
        <StatCard
          label="My Applications"
          value={myApplications.length}
          subtext={`${myApplications.filter(a => a.currentStage !== 'REJECTED').length} active in pipeline`}
          icon={FileText}
          onClick={() => navigate('/student/applications')}
        />
        <StatCard
          label="Upcoming Rounds"
          value={myInterviews.length}
          subtext={myInterviews.length > 0 ? 'Next round scheduled' : 'No pending rounds'}
          icon={Calendar}
          onClick={() => navigate('/student/interviews')}
        />
        <StatCard
          label="Offers Extended"
          value={myOffers.length}
          subtext={myOffers.some(o => o.status === 'ACCEPTED') ? 'Offer accepted!' : 'Pending your review'}
          icon={Gift}
          onClick={() => navigate('/student/offers')}
        />
      </div>

      {/* Main Grid: Recommended Drives + Upcoming Interviews & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recommended Drives (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Opportunities Section */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Recommended Placement Drives
                </h2>
                <p className="text-xs text-slate-500">
                  Opportunities aligned with your department and academic standing
                </p>
              </div>
              <Link
                to="/student/opportunities"
                className="text-xs font-bold text-[#3974C6] hover:text-[#2d60a6] flex items-center gap-1 transition-colors"
              >
                <span>View All ({publishedDrives.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {publishedDrives.slice(0, 3).map(drive => {
                const hasApplied = myApplications.some(a => a.driveId === drive.id);
                return (
                  <div key={drive.id} className="py-4.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{drive.companyName}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs font-medium text-slate-500">{drive.workLocation}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{drive.jobTitle}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="font-extrabold text-[#3974C6] font-tabular">
                          ₹{drive.ctcLpa} LPA
                        </span>
                        <span>·</span>
                        <span>Min CGPA: {drive.eligibility.minCgpa}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Deadline: {new Date(drive.applicationDeadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {hasApplied ? (
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Applied
                        </span>
                      ) : (
                        <Link
                          to={`/student/opportunities`}
                          className="px-4 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-bold rounded-xl shadow-2xs transition-all"
                        >
                          Check & Apply
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Application Stages */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">
                Active Application Pipelines
              </h2>
              <Link
                to="/student/applications"
                className="text-xs font-bold text-[#3974C6] hover:text-[#2d60a6] transition-colors"
              >
                Full Tracker
              </Link>
            </div>

            {myApplications.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                You haven't submitted any applications yet. Explore placement drives to apply.
              </p>
            ) : (
              <div className="space-y-3">
                {myApplications.map(app => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{app.companyName}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500 font-medium">{app.driveTitle}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Current Milestone:{' '}
                        <span className="font-bold text-slate-900">
                          {app.currentStageName}
                        </span>
                      </p>
                    </div>

                    <StatusBadge status={app.currentStage} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Schedule & Institutional Announcements (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interviews Widget */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-sm font-bold text-slate-900">
                Upcoming Interviews
              </h2>
              <Link to="/student/interviews" className="text-xs text-[#3974C6] font-bold hover:text-[#2d60a6] transition-colors">
                Schedule
              </Link>
            </div>

            {myInterviews.length === 0 ? (
              <div className="py-7 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-slate-200/80">
                <Calendar className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                <p>No upcoming interviews booked.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myInterviews.map(inv => (
                  <div key={inv.id} className="p-3.5 rounded-xl border border-[#BDD5F8] bg-[#EFF5FF]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-900">{inv.companyName}</span>
                      <StatusBadge status={inv.status} />
                    </div>
                    <p className="text-xs font-bold text-[#3974C6]">{inv.roundTitle}</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Interviewer: {inv.interviewerName}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-[#BDD5F8]/60 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-800">
                        {new Date(inv.scheduledTime).toLocaleDateString()} at{' '}
                        {new Date(inv.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {inv.meetingUrlOrVenue && (
                        <a
                          href={inv.meetingUrlOrVenue}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#3974C6] font-bold hover:underline flex items-center gap-0.5"
                        >
                          <span>Join Meet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Placement Cell Announcements */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 mb-3.5">
              Campus Announcements
            </h2>

            <div className="space-y-3">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="font-bold uppercase tracking-wider text-[#1E40AF] bg-[#EFF5FF] px-1.5 py-0.5 rounded-md border border-[#BDD5F8]">
                      {ann.priority} Priority
                    </span>
                    <span>{new Date(ann.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{ann.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
