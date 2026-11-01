import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../components/common/StatCard';
import { mockService } from '../../services/mockService';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
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

export const PlacementAnalyticsPage: React.FC = () => {
  const { students, companies, drives, applications, offers, settings } = usePlacement();
  const [selectedDept, setSelectedDept] = useState('ALL');

  const stats = mockService.getPlacementSummary(selectedDept, 2026);

  // Conversion funnel counts
  const stageCounts = [
    { name: 'Applied', count: applications.length },
    { name: 'Eligibility Confirmed', count: applications.filter(a => ['ELIGIBILITY_CONFIRMED', 'ASSESSMENT_SCHEDULED', 'ASSESSMENT_COMPLETED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'INTERVIEW_COMPLETED', 'OFFERED', 'OFFER_ACCEPTED'].includes(a.currentStage)).length },
    { name: 'Shortlisted', count: applications.filter(a => ['SHORTLISTED', 'INTERVIEW_SCHEDULED', 'INTERVIEW_COMPLETED', 'OFFERED', 'OFFER_ACCEPTED'].includes(a.currentStage)).length },
    { name: 'Interviews Completed', count: applications.filter(a => ['INTERVIEW_COMPLETED', 'OFFERED', 'OFFER_ACCEPTED'].includes(a.currentStage)).length },
    { name: 'Offers Extended', count: applications.filter(a => ['OFFERED', 'OFFER_ACCEPTED'].includes(a.currentStage)).length },
    { name: 'Offers Accepted', count: applications.filter(a => a.currentStage === 'OFFER_ACCEPTED').length }
  ];

  // Department-wise bar data
  const deptData = settings.departments.map(dept => {
    const deptStudents = students.filter(s => s.department === dept.name);
    const deptOffers = offers.filter(o => o.studentDepartment === dept.name && o.status === 'ACCEPTED');
    const uniquePlaced = new Set(deptOffers.map(o => o.studentId)).size;
    const rate = deptStudents.length > 0 ? Math.round((uniquePlaced / deptStudents.length) * 100) : 0;
    return {
      name: dept.code,
      registered: deptStudents.length,
      placed: uniquePlaced,
      rate
    };
  });

  const COLORS = ['#387A70', '#D5A44D', '#182B32', '#697780', '#2E7D32'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#387A70]" />
            <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
              Institutional Placement Analytics & Conversion Metrics
            </h1>
          </div>
          <p className="text-xs text-[#697780] mt-1">
            Data-driven insights computed from underlying verified candidate and company records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
          >
            <option value="ALL">All Departments</option>
            {settings.departments.map(d => (
              <option key={d.code} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Registered Eligible"
          value={stats.totalEligible}
          subtext="2026 Graduating Batch"
          icon={Users}
        />
        <StatCard
          label="Unique Placed Students"
          value={stats.uniquePlacedStudentsCount}
          badge={`${stats.placementPercentage}% Placed`}
          subtext={`${stats.seekingPlacementCount} seeking opportunities`}
          icon={CheckCircle2}
        />
        <StatCard
          label="Confirmed Offers"
          value={stats.totalOffersAccepted}
          subtext={`${stats.totalOffersIssued} total offers extended`}
          icon={Award}
        />
        <StatCard
          label="Average Package"
          value={`₹${stats.averageCtcLpa} LPA`}
          subtext={`Highest CTC: ₹${stats.highestCtcLpa} LPA`}
          icon={TrendingUp}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Department Placement Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
          <h2 className="text-sm font-bold text-[#182B32] mb-1">
            Department-Wise Placement Progress
          </h2>
          <p className="text-xs text-[#697780] mb-4">Eligible candidates vs confirmed unique placements</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#697780' }} />
                <YAxis tick={{ fontSize: 11, fill: '#697780' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E1E5E2',
                    borderRadius: '8px',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="registered" name="Eligible" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placed" name="Placed" fill="#387A70" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Stage Funnel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
          <h2 className="text-sm font-bold text-[#182B32] mb-1">
            Recruitment Conversion Funnel
          </h2>
          <p className="text-xs text-[#697780] mb-4">Milestone conversion rates across all drives</p>

          <div className="space-y-3 text-xs">
            {stageCounts.map((stage, idx) => {
              const maxVal = stageCounts[0].count || 1;
              const percent = Math.round((stage.count / maxVal) * 100);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#182B32]">{stage.name}</span>
                    <span className="font-bold font-tabular text-[#387A70]">{stage.count} ({percent}%)</span>
                  </div>
                  <div className="w-full bg-[#E1E5E2] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#387A70] h-full rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
