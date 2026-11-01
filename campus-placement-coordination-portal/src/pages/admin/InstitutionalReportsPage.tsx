import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { DataTable, Column } from '../../components/common/DataTable';
import { mockService } from '../../services/mockService';
import { BarChart3, Download, FileSpreadsheet, Building2, Users } from 'lucide-react';

export const InstitutionalReportsPage: React.FC = () => {
  const { students, companies, drives, applications, offers, settings } = usePlacement();
  const [reportType, setReportType] = useState<'DEPT' | 'COMPANY' | 'STUDENT'>('DEPT');

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
      cgpa: std.cgpa.toFixed(2),
      applicationsCount: stdApps.length,
      placementStatus: std.placementStatus,
      placedCompany: accepted ? accepted.companyName : 'Seeking',
      acceptedCtc: accepted ? `₹${accepted.ctcLpa} LPA` : '-'
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#387A70]" />
            <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
              Institutional Placement Reports & Export Center
            </h1>
          </div>
          <p className="text-xs text-[#697780] mt-1">
            Official aggregated records for Accreditation, NAAC, NBA, and Annual Institutional Placement Reports.
          </p>
        </div>

        {/* Report Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#F7F6F2] border border-[#E1E5E2] rounded-lg">
          <button
            onClick={() => setReportType('DEPT')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              reportType === 'DEPT' ? 'bg-[#387A70] text-white shadow-2xs' : 'text-[#697780] hover:text-[#182B32]'
            }`}
          >
            Department Summary
          </button>
          <button
            onClick={() => setReportType('COMPANY')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              reportType === 'COMPANY' ? 'bg-[#387A70] text-white shadow-2xs' : 'text-[#697780] hover:text-[#182B32]'
            }`}
          >
            Company Recruitment
          </button>
          <button
            onClick={() => setReportType('STUDENT')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              reportType === 'STUDENT' ? 'bg-[#387A70] text-white shadow-2xs' : 'text-[#697780] hover:text-[#182B32]'
            }`}
          >
            Student Master Ledger
          </button>
        </div>
      </div>

      {reportType === 'DEPT' && (
        <DataTable
          data={deptRows}
          columns={[
            { key: 'name', header: 'Department', sortable: true, render: r => <span className="font-bold text-[#182B32]">{r.name}</span> },
            { key: 'registered', header: 'Registered', sortable: true, className: 'font-tabular' },
            { key: 'placed', header: 'Unique Placed', sortable: true, className: 'font-tabular font-bold text-[#387A70]' },
            { key: 'unplaced', header: 'Seeking', sortable: true, className: 'font-tabular' },
            { key: 'rate', header: 'Placement %', sortable: true, className: 'font-tabular font-bold' },
            { key: 'avgCtc', header: 'Average CTC', sortable: true, className: 'font-tabular' },
            { key: 'maxCtc', header: 'Highest CTC', sortable: true, className: 'font-tabular font-bold text-[#2E7D32]' }
          ]}
          exportFilename={`Department_Placement_Report_${settings.currentAcademicYear}`}
          pageSize={10}
        />
      )}

      {reportType === 'COMPANY' && (
        <DataTable
          data={compRows}
          columns={[
            { key: 'name', header: 'Company Name', sortable: true, render: r => <span className="font-bold text-[#182B32]">{r.name}</span> },
            { key: 'industry', header: 'Industry Sector', sortable: true },
            { key: 'drivesCount', header: 'Drives Conducted', sortable: true, className: 'font-tabular' },
            { key: 'applicationsCount', header: 'Applicants', sortable: true, className: 'font-tabular' },
            { key: 'offersIssued', header: 'Offers Extended', sortable: true, className: 'font-tabular' },
            { key: 'offersAccepted', header: 'Offers Accepted', sortable: true, className: 'font-tabular font-bold text-[#2E7D32]' }
          ]}
          exportFilename={`Company_Recruitment_Report_${settings.currentAcademicYear}`}
          pageSize={10}
        />
      )}

      {reportType === 'STUDENT' && (
        <DataTable
          data={studentRows}
          columns={[
            { key: 'studentId', header: 'Student PRN', sortable: true, className: 'font-mono' },
            { key: 'name', header: 'Candidate Name', sortable: true, render: r => <span className="font-bold text-[#182B32]">{r.name}</span> },
            { key: 'department', header: 'Department', sortable: true },
            { key: 'cgpa', header: 'CGPA', sortable: true, className: 'font-tabular font-bold text-[#387A70]' },
            { key: 'placementStatus', header: 'Status', sortable: true },
            { key: 'placedCompany', header: 'Placed Organization', render: r => <span className="font-semibold text-[#182B32]">{r.placedCompany}</span> },
            { key: 'acceptedCtc', header: 'Accepted CTC', className: 'font-tabular font-bold text-[#2E7D32]' }
          ]}
          exportFilename={`Student_Placement_Ledger_${settings.currentAcademicYear}`}
          pageSize={10}
        />
      )}
    </div>
  );
};
