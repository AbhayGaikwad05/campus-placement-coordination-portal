import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Building2,
  Briefcase,
  Users,
  Calendar,
  Gift,
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const { currentUser, companies, drives, applications, interviews, offers, settings } = usePlacement();
  const navigate = useNavigate();

  if (!currentUser) return null;
  const companyId = currentUser.companyId || 'comp_01';
  const company = companies.find(c => c.id === companyId) || companies[0];

  const myDrives = drives.filter(d => d.companyId === company.id);
  const myApplications = applications.filter(a => a.companyId === company.id);
  const myInterviews = interviews.filter(i => i.companyId === company.id);
  const myOffers = offers.filter(o => o.companyId === company.id);

  const awaitingReview = myApplications.filter(a => a.currentStage === 'APPLIED' || a.currentStage === 'ELIGIBILITY_CONFIRMED');
  const shortlisted = myApplications.filter(a => a.currentStage === 'SHORTLISTED');
  const acceptedOffers = myOffers.filter(o => o.status === 'ACCEPTED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EFF7F0] text-[#38865B]">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
              {company.name} — Campus Talent Portal
            </h1>
          </div>
          <p className="text-xs text-[#697780] mt-1">
            Campus Recruitment Partner Workspace · {settings.institutionName}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Link
            to="/company/applications"
            className="px-3.5 py-2 bg-[#38865B] hover:bg-[#2e6d4a] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Review Applicants ({awaitingReview.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Drives"
          value={myDrives.filter(d => d.status === 'PUBLISHED').length}
          subtext={`${myDrives.reduce((a, d) => a + d.positionsCount, 0)} open positions`}
          icon={Briefcase}
          onClick={() => navigate('/company/drives')}
        />
        <StatCard
          label="Candidates in Review"
          value={awaitingReview.length}
          badge={awaitingReview.length > 0 ? 'Action Needed' : undefined}
          subtext={`${myApplications.length} total applications`}
          icon={Users}
          onClick={() => navigate('/company/applications')}
        />
        <StatCard
          label="Upcoming Interviews"
          value={myInterviews.filter(i => i.status === 'SCHEDULED').length}
          subtext={`${myInterviews.filter(i => i.status === 'COMPLETED').length} completed`}
          icon={Calendar}
          onClick={() => navigate('/company/interviews')}
        />
        <StatCard
          label="Offers Accepted"
          value={acceptedOffers.length}
          badge={`${myOffers.length} Issued`}
          subtext="Confirmed campus hires"
          icon={Gift}
          onClick={() => navigate('/company/offers')}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Applicant Pipeline Overview (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E1E5E2]">
            <div>
              <h2 className="text-sm font-bold text-[#182B32]">Recent Candidate Applications</h2>
              <p className="text-xs text-[#697780]">Applicants for {company.name} recruitment drives</p>
            </div>
            <Link to="/company/applications" className="text-xs font-semibold text-[#387A70] hover:underline">
              Full Pipeline
            </Link>
          </div>

          {myApplications.length === 0 ? (
            <p className="text-xs text-[#697780] py-6 text-center bg-[#F7F6F2] rounded-lg border border-[#E1E5E2]">
              No applications submitted yet for your drives.
            </p>
          ) : (
            <div className="divide-y divide-[#E1E5E2]">
              {myApplications.slice(0, 4).map(app => (
                <div key={app.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#182B32]">{app.studentName}</span>
                      <span className="text-[#697780] font-mono">({app.studentDepartment})</span>
                      <span className="text-[#387A70] font-bold font-tabular">CGPA: {app.studentCgpa.toFixed(2)}</span>
                    </div>
                    <p className="text-[#697780] mt-0.5">{app.driveTitle} · Resume: {app.resumeFileName}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={app.currentStage} />
                    <Link
                      to="/company/applications"
                      className="px-2.5 py-1 rounded bg-[#F7F6F2] hover:bg-[#E5EEE8] border border-[#E1E5E2] font-semibold text-xs text-[#182B32]"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Interview Sessions (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E1E5E2]">
            <h2 className="text-sm font-bold text-[#182B32]">Interviews Scheduled</h2>
            <Link to="/company/interviews" className="text-xs font-semibold text-[#387A70] hover:underline">
              View Schedule
            </Link>
          </div>

          {myInterviews.length === 0 ? (
            <p className="text-xs text-[#697780] py-6 text-center bg-[#F7F6F2] rounded-lg border border-[#E1E5E2]">
              No interviews scheduled currently.
            </p>
          ) : (
            <div className="space-y-3">
              {myInterviews.map(inv => (
                <div key={inv.id} className="p-3 rounded-lg border border-[#E1E5E2] bg-[#F7F6F2] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#182B32]">{inv.studentName}</span>
                    <StatusBadge status={inv.status} />
                  </div>
                  <p className="text-[#387A70] font-semibold">{inv.roundTitle}</p>
                  <p className="text-[#697780] mt-1 font-tabular">
                    {new Date(inv.scheduledTime).toLocaleDateString()} at{' '}
                    {new Date(inv.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-[11px] text-[#697780]">Interviewer: {inv.interviewerName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
