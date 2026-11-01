import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatCard } from '../../components/common/StatCard';
import { mockService } from '../../services/mockService';
import {
  Shield,
  Building2,
  Briefcase,
  AlertTriangle,
  Download,
  Calendar
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

export const AdminOverviewPage: React.FC = () => {
  const { students, companies, drives, offers, settings } = usePlacement();
  const [selectedSeason] = useState(settings.currentPlacementSeason);

  const placementStats = mockService.getPlacementSummary('ALL', 2026);

  // Department-wise stats for chart
  const deptData = settings.departments.map(dept => {
    const deptStudents = students.filter(s => s.department === dept.name);
    const deptOffers = offers.filter(o => o.studentDepartment === dept.name && o.status === 'ACCEPTED');
    const uniquePlaced = new Set(deptOffers.map(o => o.studentId)).size;
    const rate = deptStudents.length > 0 ? Math.round((uniquePlaced / deptStudents.length) * 100) : 0;
    return {
      name: dept.code,
      fullName: dept.name,
      registered: deptStudents.length,
      placed: uniquePlaced,
      rate
    };
  });

  const COLORS = ['#4F46E5', '#F59E0B', '#06B6D4', '#64748B', '#10B981'];

  const offerCategoryData = [
    { name: 'Super Dream (>18 LPA)', value: offers.filter(o => o.ctcLpa >= 18).length },
    { name: 'Dream (9-18 LPA)', value: offers.filter(o => o.ctcLpa >= 9 && o.ctcLpa < 18).length },
    { name: 'Standard (<9 LPA)', value: offers.filter(o => o.ctcLpa < 9).length },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-slate-900 text-amber-300">
              <Shield className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Institutional Placement Administration Overview
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {settings.institutionName} · Campus Recruitment Season {settings.currentAcademicYear}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-[#765BC0]" />
            <span>2026 Graduating Batch</span>
          </div>

          <button
            onClick={() => {
              mockService.exportToCsv(
                `Institutional_Placement_Summary_${settings.currentAcademicYear}`,
                ['Department', 'Registered Students', 'Placed Students', 'Placement Rate %'],
                deptData.map(d => [d.fullName, d.registered, d.placed, `${d.rate}%`])
              );
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#765BC0] hover:bg-[#5e45a0] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Institutional Report</span>
          </button>
        </div>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Registered Eligible"
          value={placementStats.totalEligible}
          subtext={`Across ${settings.departments.length} departments`}
        />
        <StatCard
          label="Unique Placed Students"
          value={placementStats.uniquePlacedStudentsCount}
          badge={`${placementStats.placementPercentage}% Rate`}
          subtext={`${placementStats.seekingPlacementCount} students seeking`}
          trend={{ value: `${placementStats.placementPercentage}%`, isPositive: true }}
        />
        <StatCard
          label="Total Offers Issued"
          value={placementStats.totalOffersIssued}
          subtext={`${placementStats.totalOffersAccepted} accepted · ${placementStats.totalOffersDeclined} declined`}
        />
        <StatCard
          label="Highest CTC Package"
          value={`₹${placementStats.highestCtcLpa} LPA`}
          subtext={`Average: ₹${placementStats.averageCtcLpa} LPA`}
        />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Department Comparison Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Department-Wise Placement Progress
              </h2>
              <p className="text-xs text-slate-500">
                Registered vs confirmed placed students
              </p>
            </div>
            <span className="text-xs font-bold text-[#452A85] bg-[#F4F0FD] border border-[#D3C6F3] px-2.5 py-1 rounded-lg">
              Batch of 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#CBD5E1',
                    borderRadius: '12px',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="registered" name="Registered" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="placed" name="Placed" fill="#765BC0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Offer Category Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Offer Tier Distribution</h2>
          <p className="text-xs text-slate-500 mb-4">Categorized by compensation bands</p>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={offerCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {offerCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#CBD5E1',
                    borderRadius: '12px',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-2 text-xs">
            {offerCategoryData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-extrabold text-slate-900 font-tabular">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Building2 className="w-4 h-4 text-[#765BC0]" />
            <span>Corporate Partners</span>
          </div>
          <p className="text-2xl font-black font-tabular text-slate-900">{companies.length}</p>
          <p className="text-[11px] text-slate-500">
            {companies.filter(c => c.verificationStatus === 'VERIFIED').length} verified campus recruiters
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Briefcase className="w-4 h-4 text-[#765BC0]" />
            <span>Active Placement Drives</span>
          </div>
          <p className="text-2xl font-black font-tabular text-slate-900">
            {drives.filter(d => d.status === 'PUBLISHED').length}
          </p>
          <p className="text-[11px] text-slate-500">
            {drives.reduce((acc, d) => acc + d.positionsCount, 0)} total positions configured
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Pending Authorizations</span>
          </div>
          <p className="text-2xl font-black font-tabular text-slate-900">
            {companies.filter(c => c.verificationStatus === 'PENDING').length}
          </p>
          <p className="text-[11px] text-slate-500">
            Company partnerships awaiting administrative sign-off
          </p>
        </div>
      </div>
    </div>
  );
};
