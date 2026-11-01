import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockService } from '../../services/mockService';
import {
  Briefcase,
  Building2,
  FolderCheck,
  Award,
  AlertTriangle,
  ArrowRight,
  Plus
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const { companies, drives, applications, students, interviews, settings } = usePlacement();
  const navigate = useNavigate();

  const pendingCompanies = companies.filter(c => c.verificationStatus === 'PENDING');
  const pendingDocs = students.flatMap(s => s.documents.filter(d => d.verificationStatus === 'PENDING' || d.verificationStatus === 'ACTION_REQUIRED'));
  const activeDrives = drives.filter(d => d.status === 'PUBLISHED');
  const scheduledInterviews = interviews.filter(i => i.status === 'SCHEDULED');

  const stats = mockService.getPlacementSummary('ALL', 2026);

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#328477] text-white shadow-2xs">
              <Briefcase className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Placement Coordination Operations Hub
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Central Corporate Relations & Placement Operations · {settings.institutionName}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Link
            to="/officer/drives"
            className="px-4 py-2.5 bg-[#328477] hover:bg-[#26695e] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Drive</span>
          </Link>
        </div>
      </div>

      {/* Operational Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pending Company Approvals"
          value={pendingCompanies.length}
          subtext="Requires verification review"
          badge={pendingCompanies.length > 0 ? 'Action Needed' : undefined}
          icon={Building2}
          onClick={() => navigate('/officer/companies')}
        />
        <StatCard
          label="Pending Marksheet Verifications"
          value={pendingDocs.length}
          subtext="Awaiting coordinator review"
          icon={FolderCheck}
          onClick={() => navigate('/officer/verification')}
        />
        <StatCard
          label="Active Published Drives"
          value={activeDrives.length}
          subtext={`${drives.reduce((a, d) => a + d.positionsCount, 0)} open positions`}
          icon={Briefcase}
          onClick={() => navigate('/officer/drives')}
        />
        <StatCard
          label="Unique Placed Students"
          value={stats.uniquePlacedStudentsCount}
          badge={`${stats.placementPercentage}% Rate`}
          subtext={`${stats.totalOffersAccepted} offers accepted`}
          icon={Award}
          onClick={() => navigate('/officer/offers')}
        />
      </div>

      {/* Actionable Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Action Required queues (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pending Company Approvals Queue */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-bold text-slate-900">
                  Company Registrations Awaiting Verification ({pendingCompanies.length})
                </h2>
              </div>
              <Link to="/officer/companies" className="text-xs font-bold text-[#328477] hover:text-[#26695e] transition-colors">
                View Directory
              </Link>
            </div>

            {pendingCompanies.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center bg-slate-50 rounded-xl border border-slate-200/80">
                No pending company onboarding requests. All corporate partners verified.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingCompanies.map(comp => (
                  <div
                    key={comp.id}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{comp.name}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{comp.industry}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Primary Contact: {comp.primaryContactName} ({comp.primaryContactEmail})
                      </p>
                      {comp.notes && (
                        <p className="text-[11px] text-amber-800 mt-1 font-semibold">
                          Review Note: {comp.notes}
                        </p>
                      )}
                    </div>

                    <Link
                      to="/officer/companies"
                      className="px-3.5 py-1.5 bg-[#328477] hover:bg-[#26695e] text-white font-bold rounded-xl shadow-2xs transition-all self-start sm:self-auto shrink-0"
                    >
                      Review & Verify
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Drives Status */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">
                Active Recruitment Drives Overview
              </h2>
              <Link to="/officer/drives" className="text-xs font-bold text-[#328477] hover:text-[#26695e] transition-colors">
                Manage Drives
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {activeDrives.slice(0, 4).map(drive => {
                const driveApps = applications.filter(a => a.driveId === drive.id);
                return (
                  <div key={drive.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{drive.companyName}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500 font-medium">{drive.jobTitle}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 mt-1 font-tabular">
                        <span className="font-extrabold text-[#328477]">₹{drive.ctcLpa} LPA</span>
                        <span>·</span>
                        <span>{driveApps.length} Applicants</span>
                        <span>·</span>
                        <span>Deadline: {new Date(drive.applicationDeadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <StatusBadge status={drive.status} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Today's Interview Schedule & Quick Tasks (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Scheduled Interviews */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-sm font-bold text-slate-900">
                Scheduled Interviews
              </h2>
              <Link to="/officer/interviews" className="text-xs font-bold text-[#328477] hover:text-[#26695e] transition-colors">
                All Slots
              </Link>
            </div>

            {scheduledInterviews.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center bg-slate-50 rounded-xl border border-slate-200/80">
                No pending interviews requiring coordination today.
              </p>
            ) : (
              <div className="space-y-3">
                {scheduledInterviews.map(inv => (
                  <div key={inv.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{inv.studentName}</span>
                      <StatusBadge status={inv.status} />
                    </div>
                    <p className="text-[#328477] font-bold">{inv.companyName} · {inv.roundTitle}</p>
                    <p className="text-slate-500 mt-1 font-tabular">
                      {new Date(inv.scheduledTime).toLocaleDateString()} at{' '}
                      {new Date(inv.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Interviewer: {inv.interviewerName}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Institutional Actions */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-2.5 text-xs">
            <h2 className="font-bold text-slate-900 mb-2">Coordination Shortcuts</h2>
            <Link
              to="/officer/drives"
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-[#EEF8F6] hover:border-[#B4DDD6] flex items-center justify-between font-bold text-slate-800 transition-colors"
            >
              <span>Publish Placement Drive Wizard</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#328477]" />
            </Link>
            <Link
              to="/officer/verification"
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-[#EEF8F6] hover:border-[#B4DDD6] flex items-center justify-between font-bold text-slate-800 transition-colors"
            >
              <span>Batch Academic Document Verification</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#328477]" />
            </Link>
            <Link
              to="/officer/announcements"
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-[#EEF8F6] hover:border-[#B4DDD6] flex items-center justify-between font-bold text-slate-800 transition-colors"
            >
              <span>Broadcast Campus Announcement</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#328477]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
