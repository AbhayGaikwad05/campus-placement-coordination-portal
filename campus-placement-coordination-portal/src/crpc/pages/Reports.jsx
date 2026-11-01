import React, { useState } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../shared/components/StatCard';
import { DataTable } from '../../shared/components/DataTable';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { mockService } from '../../services/mockService';
import { DESIGNATIONS } from '../../authentication/services/authService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Building2,
  Download,
  FileSpreadsheet
} from 'lucide-react';

export const Reports = () => {
  const { currentUser } = useAuth();
  const { students, companies, drives, applications, offers, settings } = usePlacement();

  const isCoordinator = currentUser?.designation === DESIGNATIONS.DEPT_COORDINATOR;
  const coordinatorDept = currentUser?.department || 'Computer Science and Engineering';

  const [selectedDept, setSelectedDept] = useState(isCoordinator ? coordinatorDept : 'ALL');
  const [reportTab, setReportTab] = useState('ANALYTICS'); // ANALYTICS, DEPT_TABLE, COMP_TABLE, STD_TABLE

  // Department report rows
  const deptRows = settings.departments.map(dept => {
    const deptStudents = students.filter(s => s.department === dept.name);
    const deptOffers = offers.filter(o => o.studentDepartment === dept.name && o.status === 'ACCEPTED');
    const uniquePlaced = new Set(deptOffers.map(o => o.studentId)).size;
    const rate = deptStudents.length > 0 ? ((uniquePlaced / deptStudents.length) * 100).toFixed(1) : '0';
    const ctcs = deptOffers.map(o => o.ctcLpa);
    const avgCtc = ctcs.length > 0 ? (ctcs.reduce((a, b) => a + b, 0) / ctcs.length).toFixed(2) : '0';
    const maxCtc = ctcs.length > 0 ? Math.max(...ctcs) : 0;

    return {
      id: dept.code,
      name: dept.name,
      registered: deptStudents.length,
      placed: uniquePlaced,
      unplaced: Math.max(0, deptStudents.length - uniquePlaced),
      rate: `${rate}%`,
      avgCtc: `₹${avgCtc} LPA`,
      maxCtc: `₹${maxCtc} LPA`
    };
  });

  // Department chart data
  const deptChartData = settings.departments.map(dept => {
    const deptStudents = students.filter(s => s.department === dept.name);
    const deptOffers = offers.filter(o => o.studentDepartment === dept.name && o.status === 'ACCEPTED');
    const uniquePlaced = new Set(deptOffers.map(o => o.studentId)).size;
    const rate = deptStudents.length > 0 ? Math.round((uniquePlaced / deptStudents.length) * 100) : 0;
    return {
      name: dept.code,
      rate,
      placed: uniquePlaced,
      registered: deptStudents.length
    };
  });

  // Company report rows
  const compRows = companies.map(comp => {
    const compDrives = drives.filter(d => d.companyId === comp.id);
    const compApps = applications.filter(a => a.companyId === comp.id);
    const compOffers = offers.filter(o => o.companyId === comp.id);
    const accepted = compOffers.filter(o => o.status === 'ACCEPTED').length;

    return {
      id: comp.id,
      name: comp.name,
      industry: comp.industry,
      drivesCount: compDrives.length,
      applicationsCount: compApps.length,
      offersIssued: compOffers.length,
      offersAccepted: accepted,
      status: comp.verificationStatus
    };
  });

  // Student report rows
  const studentRows = students.map(std => {
    const stdApps = applications.filter(a => a.studentId === std.id);
    const stdOffers = offers.filter(o => o.studentId === std.id);
    const accepted = stdOffers.find(o => o.status === 'ACCEPTED');

    return {
      id: std.id,
      studentId: std.studentId,
      name: std.name,
      department: std.department,
      cgpa: std.cgpa,
      appliedCount: stdApps.length,
      status: std.placementStatus,
      placedCompany: accepted ? accepted.companyName : '-',
      offeredCtc: accepted ? `₹${accepted.ctcLpa} LPA` : '-'
    };
  });

  const totalRegistered = isCoordinator
    ? students.filter(s => s.department.toLowerCase().includes(coordinatorDept.toLowerCase())).length
    : students.length;

  const totalPlaced = isCoordinator
    ? students.filter(s => s.department.toLowerCase().includes(coordinatorDept.toLowerCase()) && s.placementStatus === 'PLACED').length
    : students.filter(s => s.placementStatus === 'PLACED').length;

  const overallRate = totalRegistered > 0 ? Math.round((totalPlaced / totalRegistered) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
              {isCoordinator ? `${coordinatorDept} - Placement Reports` : 'Institutional Placement Reports & Analytics'}
            </h1>
            {isCoordinator && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#EFF8FF] text-[#175CD3] border border-[#175CD3]/20">
                Department Scoped
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Comprehensive placement analytics, department benchmarks, CTC packages, and corporate hiring trends.
          </p>
        </div>

        {/* Tab switch */}
        <div className="bg-[#E7EDF5] p-1 rounded-lg flex items-center gap-1 border border-[#E0E6ED]">
          <button
            onClick={() => setReportTab('ANALYTICS')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              reportTab === 'ANALYTICS' ? 'bg-white text-[#17365D] shadow-xs' : 'text-[#64748B] hover:text-[#172B45]'
            }`}
          >
            Visual Analytics
          </button>
          {!isCoordinator && (
            <button
              onClick={() => setReportTab('DEPT_TABLE')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                reportTab === 'DEPT_TABLE' ? 'bg-white text-[#17365D] shadow-xs' : 'text-[#64748B] hover:text-[#172B45]'
              }`}
            >
              Branch Breakdown
            </button>
          )}
          <button
            onClick={() => setReportTab('COMP_TABLE')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              reportTab === 'COMP_TABLE' ? 'bg-white text-[#17365D] shadow-xs' : 'text-[#64748B] hover:text-[#172B45]'
            }`}
          >
            Company Stats
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Overall Placement Rate"
          value={`${overallRate}%`}
          subtext={`${totalPlaced} placed out of ${totalRegistered}`}
          icon={Award}
          colorScheme="gold"
        />
        <StatCard
          label="Highest CTC Package"
          value="₹44.0 LPA"
          subtext="Google India (Super-Dream)"
          icon={TrendingUp}
          colorScheme="navy"
        />
        <StatCard
          label="Average CTC"
          value="₹8.65 LPA"
          subtext="Across all engineering branches"
          icon={BarChart3}
          colorScheme="blue"
        />
        <StatCard
          label="Visiting Corporate Partners"
          value={companies.length}
          subtext="Approved recruitment drives"
          icon={Building2}
          colorScheme="green"
        />
      </div>

      {reportTab === 'ANALYTICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branch-wise Placement Rate Bar Chart */}
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#172B45] mb-1">Department-wise Placement Percentage</h3>
            <p className="text-xs text-[#64748B] mb-4">Placement rates compared across engineering departments</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptChartData}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E0E6ED',
                      borderRadius: '8px',
                      fontSize: '11px'
                    }}
                  />
                  <Bar dataKey="rate" name="Placement Rate (%)" fill="#17365D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Placement Comparison Table Preview */}
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#172B45] mb-1">Branch Placement Summary</h3>
            <p className="text-xs text-[#64748B] mb-3">Key metrics across departments</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E0E6ED]">
                  <tr>
                    <th className="p-2.5">Branch</th>
                    <th className="p-2.5">Registered</th>
                    <th className="p-2.5">Placed</th>
                    <th className="p-2.5">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E6ED]">
                  {deptRows.map(row => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#172B45]">{row.id}</td>
                      <td className="p-2.5">{row.registered}</td>
                      <td className="p-2.5 text-[#287449] font-bold">{row.placed}</td>
                      <td className="p-2.5 font-extrabold text-[#17365D]">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {reportTab === 'DEPT_TABLE' && (
        <DataTable
          data={deptRows}
          columns={[
            { key: 'name', header: 'Department Name', sortable: true },
            { key: 'registered', header: 'Registered Students', sortable: true },
            { key: 'placed', header: 'Placed Count', sortable: true },
            { key: 'unplaced', header: 'Unplaced', sortable: true },
            { key: 'rate', header: 'Placement Rate', sortable: true },
            { key: 'avgCtc', header: 'Average CTC', sortable: true },
            { key: 'maxCtc', header: 'Highest CTC', sortable: true }
          ]}
          exportFilename="MITAOE_Branch_Placement_Report"
        />
      )}

      {reportTab === 'COMP_TABLE' && (
        <DataTable
          data={compRows}
          columns={[
            { key: 'name', header: 'Company Name', sortable: true },
            { key: 'industry', header: 'Industry Domain', sortable: true },
            { key: 'drivesCount', header: 'Drives Conducted', sortable: true },
            { key: 'applicationsCount', header: 'Applications Received', sortable: true },
            { key: 'offersIssued', header: 'Offers Issued', sortable: true },
            { key: 'offersAccepted', header: 'Offers Accepted', sortable: true }
          ]}
          exportFilename="MITAOE_Corporate_Recruiter_Hires_Report"
        />
      )}
    </div>
  );
};

export default Reports;
