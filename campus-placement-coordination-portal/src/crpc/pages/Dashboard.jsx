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
  Users,
  Briefcase,
  CheckSquare,
  Award,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FolderCheck,
  Calendar,
  ShieldCheck,
  FileText
} from 'lucide-react';
import '../styles/crpc.css';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const {
    students,
    companies,
    drives,
    applications,
    interviews,
    offers,
    auditLogs
  } = usePlacement();
  const navigate = useNavigate();

  const isSuperAdmin = currentUser?.designation === DESIGNATIONS.SUPER_ADMIN;
  const isOfficer = currentUser?.designation === DESIGNATIONS.PLACEMENT_OFFICER;
  const isCoordinator = currentUser?.designation === DESIGNATIONS.DEPT_COORDINATOR;

  // Filter students if coordinator
  const coordinatorDept = currentUser?.department || 'Computer Science and Engineering';
  const relevantStudents = isCoordinator
    ? students.filter(s => s.department.toLowerCase().includes(coordinatorDept.toLowerCase()))
    : students;

  const placedStudents = relevantStudents.filter(s => s.placementStatus === 'PLACED');
  const placementRate = relevantStudents.length > 0
    ? Math.round((placedStudents.length / relevantStudents.length) * 100)
    : 0;

  const pendingDriveApprovals = drives.filter(d => d.status === 'UNDER_REVIEW' || d.status === 'DRAFT');
  const pendingCompanies = companies.filter(c => c.verificationStatus === 'PENDING');
  const verifiedStudentsCount = relevantStudents.filter(s => s.isDocumentVerified).length;
  const verifiedPercentage = relevantStudents.length > 0
    ? Math.round((verifiedStudentsCount / relevantStudents.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Designation Header */}
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-[#172B45] tracking-tight">
              {isSuperAdmin
                ? 'Institutional Governance Overview'
                : isCoordinator
                ? `${coordinatorDept} Placement Center`
                : 'CRPC Placement Operations Hub'}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E7EDF5] text-[#17365D] border border-[#17365D]/20">
              {currentUser?.designationLabel || currentUser?.designation}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            {isSuperAdmin
              ? 'Real-time institutional recruitment metrics, multi-department compliance, and policy governance.'
              : isCoordinator
              ? `Monitoring marksheet verifications, eligibility, and placement progress for ${coordinatorDept}.`
              : 'Active corporate recruitment drives, visiting partners, candidate pipelines, and interview coordination.'}
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2">
          {isCoordinator ? (
            <Button
              variant="primary"
              size="sm"
              icon={FolderCheck}
              onClick={() => navigate('/crpc/students')}
            >
              Verify Marksheets
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={CheckSquare}
              onClick={() => navigate('/crpc/approvals')}
            >
              Review Approvals ({pendingDriveApprovals.length})
            </Button>
          )}
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={isCoordinator ? 'Dept Placement Rate' : 'Institutional Placement'}
          value={`${placementRate}%`}
          subtext={`${placedStudents.length} of ${relevantStudents.length} candidates placed`}
          icon={Award}
          colorScheme="gold"
          onClick={() => navigate('/crpc/reports')}
        />

        <StatCard
          label={isCoordinator ? 'Dept Students' : 'Total Registered Students'}
          value={relevantStudents.length}
          subtext={`${verifiedPercentage}% marksheets verified`}
          icon={Users}
          colorScheme="blue"
          onClick={() => navigate('/crpc/students')}
        />

        <StatCard
          label={isCoordinator ? 'Relevant Drives' : 'Active Placement Drives'}
          value={drives.filter(d => d.status === 'PUBLISHED').length}
          subtext={`${pendingDriveApprovals.length} pending CRPC approval`}
          icon={Briefcase}
          colorScheme="navy"
          onClick={() => navigate('/crpc/drives')}
        />

        <StatCard
          label={isCoordinator ? 'Verified Transcripts' : 'Corporate Partners'}
          value={isCoordinator ? `${verifiedStudentsCount}` : companies.length}
          subtext={isCoordinator ? 'Academic audit cleared' : `${pendingCompanies.length} pending verification`}
          icon={isCoordinator ? ShieldCheck : Building2}
          colorScheme="green"
          onClick={() => navigate(isCoordinator ? '/crpc/students' : '/crpc/companies')}
        />
      </div>

      {/* Main Grid: Approvals Queue & Live Pipelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Operational Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Queue / Approvals */}
          {!isCoordinator && pendingDriveApprovals.length > 0 && (
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E0E6ED]">
                <div>
                  <h3 className="text-sm font-bold text-[#172B45] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#8A642A]" />
                    <span>Recruitment Drives Awaiting Approval</span>
                  </h3>
                  <p className="text-xs text-[#64748B]">Company drives submitted for CRPC criteria validation</p>
                </div>
                <Link to="/crpc/approvals" className="text-xs font-bold text-[#3478C5] hover:underline">
                  Manage Approvals →
                </Link>
              </div>

              <div className="space-y-3">
                {pendingDriveApprovals.slice(0, 3).map((drive) => (
                  <div
                    key={drive.id}
                    className="p-3.5 bg-[#F8FAFC] border border-[#E0E6ED] rounded-lg flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#172B45]">{drive.jobTitle}</p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {drive.companyName} · ₹{drive.ctcLpa} LPA · Deadline: {drive.applicationDeadline || drive.registrationDeadline || 'Ongoing'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/crpc/approvals')}
                    >
                      Audit & Approve
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Department Students Summary (For Coordinator) */}
          {isCoordinator && (
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E0E6ED]">
                <div>
                  <h3 className="text-sm font-bold text-[#172B45]">Department Marksheet Audit Queue</h3>
                  <p className="text-xs text-[#64748B]">Verify student semester transcripts and SGPA records</p>
                </div>
                <Link to="/crpc/students" className="text-xs font-bold text-[#3478C5] hover:underline">
                  View Student Directory →
                </Link>
              </div>

              <div className="space-y-2.5">
                {relevantStudents.slice(0, 4).map((st) => (
                  <div
                    key={st.id}
                    className="p-3 bg-[#F8FAFC] border border-[#E0E6ED] rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#172B45]">{st.name}</p>
                      <p className="text-[11px] text-[#64748B]">PRN: {st.studentId} · CGPA: <strong>{st.cgpa}</strong></p>
                    </div>
                    <StatusBadge
                      status={st.isDocumentVerified ? 'VERIFIED' : 'PENDING'}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Published Drives Summary */}
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E0E6ED]">
              <h3 className="text-sm font-bold text-[#172B45]">Active Campus Recruitment Drives</h3>
              <Link to="/crpc/drives" className="text-xs font-bold text-[#3478C5] hover:underline">
                View All Drives →
              </Link>
            </div>

            <div className="space-y-3">
              {drives.filter(d => d.status === 'PUBLISHED').slice(0, 4).map((drive) => (
                <div
                  key={drive.id}
                  className="p-3 bg-white border border-[#E0E6ED] rounded-lg hover:border-slate-300 transition-all flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#172B45] truncate">{drive.jobTitle}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5 truncate">{drive.companyName} · ₹{drive.ctcLpa} LPA</p>
                  </div>
                  <StatusBadge status={drive.tier || 'STANDARD'} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Interviews & Audit Trail */}
        <div className="space-y-6">
          {/* Upcoming Campus Interviews */}
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E0E6ED]">
              <h3 className="text-sm font-bold text-[#172B45] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3478C5]" />
                <span>Interview Coordination</span>
              </h3>
              <Link to="/crpc/interviews" className="text-xs font-bold text-[#3478C5] hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2.5">
              {interviews.slice(0, 3).map((inv) => (
                <div key={inv.id} className="p-3 bg-[#F8FAFC] border border-[#E0E6ED] rounded-lg text-xs">
                  <p className="font-bold text-[#172B45]">{inv.studentName}</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{inv.companyName} · {inv.roundType}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{inv.scheduledDate} ({inv.scheduledTime})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Feed (Super Admin & Placement Officer) */}
          {!isCoordinator && (
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-[#172B45] mb-3 pb-2 border-b border-[#E0E6ED]">
                Institutional Audit Feed
              </h3>
              <div className="space-y-3">
                {auditLogs.slice(0, 3).map((log) => (
                  <div key={log.id} className="text-xs border-b border-slate-100 pb-2 last:border-b-0">
                    <p className="font-bold text-[#172B45]">{log.action}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{log.details}</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
