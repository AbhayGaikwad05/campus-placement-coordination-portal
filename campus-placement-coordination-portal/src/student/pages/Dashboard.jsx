import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button } from '../../shared/components/Button';
import { calculateProfileCompleteness } from '../../utils/rules';
import {
  Briefcase,
  Calendar,
  Gift,
  FileText,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import '../styles/student.css';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { studentProfile, drives, applications, interviews, offers, announcements } = usePlacement();
  const navigate = useNavigate();

  const student = studentProfile || {
    id: 'std_01',
    name: currentUser?.name || 'Aarav Sharma',
    studentId: 'MIT2022CS042',
    department: currentUser?.department || 'Computer Science and Engineering',
    graduationBatch: 2026,
    cgpa: 8.94,
    placementStatus: 'SEEKING',
    skills: ['React.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'],
    projects: [{ title: 'Campus Placement Portal' }],
    resumes: [{ isDefault: true, fileName: 'Aarav_Sharma_Resume_2026.pdf' }],
    documents: [{ verificationStatus: 'VERIFIED' }],
    codingProfiles: [{ platform: 'LeetCode' }],
    certifications: [{ name: 'AWS Certified Cloud Practitioner' }]
  };

  const completeness = calculateProfileCompleteness({
    hasPersonalInfo: true,
    hasAcademicInfo: true,
    hasMarksheets: Boolean(student.documents?.some(d => d.type === 'MARKSHEET' && d.verificationStatus === 'VERIFIED')),
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
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-[#172B45] tracking-tight">
              Welcome back, {student.name}
            </h1>
            <StatusBadge status={student.placementStatus || 'SEEKING'} />
          </div>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            {student.department} · Batch of {student.graduationBatch} · PRN: <span className="font-mono text-[#172B45] font-bold">{student.studentId}</span>
          </p>
        </div>

        {/* Profile Completeness Card */}
        <div className="bg-[#F8FAFC] border border-[#E0E6ED] rounded-xl p-4 min-w-[260px]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-[#172B45]">Portfolio Completeness</span>
            <span className="font-extrabold text-[#3478C5]">{completeness.percentage}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#17365D] h-full rounded-full transition-all duration-300"
              style={{ width: `${completeness.percentage}%` }}
            />
          </div>
          {completeness.missingSections.length > 0 ? (
            <p className="text-[11px] text-[#64748B] mt-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Recommended: {completeness.missingSections[0]}</span>
            </p>
          ) : (
            <p className="text-[11px] text-[#287449] mt-2 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Transcripts & Marksheets Verified</span>
            </p>
          )}
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Drives"
          value={publishedDrives.length}
          subtext="Open for campus application"
          icon={Briefcase}
          colorScheme="navy"
          onClick={() => navigate('/student/opportunities')}
        />

        <StatCard
          label="My Applications"
          value={myApplications.length}
          subtext={`${myApplications.filter(a => (a.currentStage || a.stage) === 'OFFERED').length} offers in pipeline`}
          icon={FileText}
          colorScheme="blue"
          onClick={() => navigate('/student/applications')}
        />

        <StatCard
          label="Upcoming Interviews"
          value={myInterviews.length}
          subtext="Scheduled rounds"
          icon={Calendar}
          colorScheme="gold"
          onClick={() => navigate('/student/interviews')}
        />

        <StatCard
          label="Received Offers"
          value={myOffers.length}
          subtext={myOffers.length > 0 ? `Highest: ₹${Math.max(...myOffers.map(o => o.ctcLpa || 0))} LPA` : 'Awaiting rollout'}
          icon={Gift}
          colorScheme="green"
          onClick={() => navigate('/student/applications')}
        />
      </div>

      {/* Main Grid: Opportunities Preview & Upcoming Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recommended Placement Drives */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#172B45]">Active Placement Drives</h2>
              <p className="text-xs text-[#64748B]">Approved campus opportunities matching your profile</p>
            </div>
            <Link
              to="/student/opportunities"
              className="text-xs font-bold text-[#3478C5] hover:underline flex items-center gap-1"
            >
              <span>View All ({publishedDrives.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {publishedDrives.slice(0, 3).map((drive) => {
              const hasApplied = myApplications.some(a => a.driveId === drive.id);
              const minCgpa = drive.eligibility?.minCgpa ?? drive.eligibilityCriteria?.minCgpa ?? 7.0;
              const deadline = drive.applicationDeadline || drive.registrationDeadline || 'Ongoing';
              return (
                <div
                  key={drive.id}
                  className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs hover:border-[#3478C5] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-bold text-[#172B45] truncate">{drive.jobTitle}</h3>
                      <StatusBadge status={drive.tier || 'STANDARD'} size="sm" />
                    </div>
                    <p className="text-xs font-semibold text-[#17365D] mb-1">{drive.companyName}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
                      <span>Package: <strong className="text-[#172B45]">₹{drive.ctcLpa} LPA</strong></span>
                      <span>•</span>
                      <span>Min CGPA: <strong>{minCgpa}</strong></span>
                      <span>•</span>
                      <span>Deadline: {deadline}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {hasApplied ? (
                      <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#E8F5EE] text-[#287449] border border-[#287449]/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/student/opportunities')}
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Upcoming Interviews & Cell Announcements */}
        <div className="space-y-6">
          {/* Scheduled Interviews */}
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E0E6ED]">
              <h3 className="text-sm font-bold text-[#172B45] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3478C5]" />
                <span>Next Interview Rounds</span>
              </h3>
              <Link to="/student/interviews" className="text-xs font-semibold text-[#3478C5] hover:underline">
                View all
              </Link>
            </div>

            {myInterviews.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#64748B]">
                <Clock className="w-6 h-6 mx-auto mb-2 text-slate-300" />
                <p>No interview rounds scheduled today.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myInterviews.slice(0, 2).map((inv) => (
                  <div key={inv.id} className="p-3 bg-[#F8FAFC] border border-[#E0E6ED] rounded-lg">
                    <p className="text-xs font-bold text-[#172B45]">{inv.companyName} · {inv.roundType}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{inv.scheduledDate} at {inv.scheduledTime}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">Interviewer: {inv.interviewerName}</span>
                      {inv.meetingUrl && (
                        <a
                          href={inv.meetingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-[#3478C5] hover:underline flex items-center gap-1"
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

          {/* CRPC Circulars */}
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#172B45] mb-3 pb-2 border-b border-[#E0E6ED]">
              Placement Cell Circulars
            </h3>
            <div className="space-y-3">
              {announcements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="text-xs">
                  <span className="text-[10px] font-bold text-[#E0B66D] uppercase block">
                    {ann.publishedAt}
                  </span>
                  <p className="font-bold text-[#172B45] hover:text-[#3478C5] cursor-pointer">
                    {ann.title}
                  </p>
                  <p className="text-[#64748B] line-clamp-2 mt-0.5">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
