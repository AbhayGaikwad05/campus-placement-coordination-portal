import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockService } from '../../services/mockService';
import {
  Users,
  FolderCheck,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const DeptDashboard: React.FC = () => {
  const { currentUser, students, offers, settings } = usePlacement();
  const navigate = useNavigate();

  if (!currentUser) return null;
  const myDeptName = currentUser.department || 'Computer Science and Engineering';
  const deptStudents = students.filter(s => s.department === myDeptName);
  const pendingDocs = deptStudents.flatMap(s => s.documents.filter(d => d.verificationStatus === 'PENDING' || d.verificationStatus === 'ACTION_REQUIRED'));
  
  const stats = mockService.getPlacementSummary(myDeptName, 2026);
  const deptOffers = offers.filter(o => o.studentDepartment === myDeptName);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#A77735] text-white shadow-2xs">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {myDeptName} — Placement Coordination
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Department Placement Coordination & Academic Clearances · {settings.institutionName}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Link
            to="/coordinator/verification"
            className="px-4 py-2.5 bg-[#A77735] hover:bg-[#8a5f25] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <FolderCheck className="w-4 h-4" />
            <span>Verify Documents ({pendingDocs.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Department Candidates"
          value={deptStudents.length}
          subtext="2026 Batch registered"
          icon={Users}
          onClick={() => navigate('/coordinator/students')}
        />
        <StatCard
          label="Pending Marksheets"
          value={pendingDocs.length}
          subtext="Requires department check"
          badge={pendingDocs.length > 0 ? 'Action Needed' : undefined}
          icon={FolderCheck}
          onClick={() => navigate('/coordinator/verification')}
        />
        <StatCard
          label="Department Placed"
          value={stats.uniquePlacedStudentsCount}
          badge={`${stats.placementPercentage}% Rate`}
          subtext={`${stats.seekingPlacementCount} seeking roles`}
          icon={CheckCircle2}
          onClick={() => navigate('/coordinator/reports')}
        />
        <StatCard
          label="Average Dept CTC"
          value={`₹${stats.averageCtcLpa} LPA`}
          subtext={`Highest: ₹${stats.highestCtcLpa} LPA`}
          icon={Award}
          onClick={() => navigate('/coordinator/reports')}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Assigned Candidates List (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Assigned Department Students</h2>
              <p className="text-xs text-slate-500">Current academic records and placement status</p>
            </div>
            <Link to="/coordinator/students" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All ({deptStudents.length})
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {deptStudents.slice(0, 5).map(std => {
              const stdOffers = deptOffers.filter(o => o.studentId === std.id);
              const accepted = stdOffers.find(o => o.status === 'ACCEPTED');
              return (
                <div key={std.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{std.name}</span>
                      <span className="text-slate-400 font-mono">({std.studentId})</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">
                      CGPA: <strong className="text-indigo-600 font-tabular">{std.cgpa.toFixed(2)}</strong> · Active Backlogs: <strong>{std.activeBacklogs}</strong>
                    </p>
                    {accepted && (
                      <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
                        Placed at {accepted.companyName} (₹{accepted.ctcLpa} LPA)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={std.isDocumentVerified ? 'VERIFIED' : 'PENDING'} />
                    <StatusBadge status={std.placementStatus} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Alert & Shortcuts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-3.5">
            <h2 className="text-sm font-bold text-slate-900">Verification Backlog</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Companies require verified marksheets prior to scheduling technical interviews. Review student semester uploads promptly.
            </p>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
              <span className="font-bold">{pendingDocs.length} documents</span> awaiting verification in {myDeptName}.
            </div>
            <Link
              to="/coordinator/verification"
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Review Department Marksheets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
