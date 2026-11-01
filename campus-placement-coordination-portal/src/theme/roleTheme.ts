import { UserRole } from '../types';
import {
  GraduationCap,
  Shield,
  Briefcase,
  UserCheck,
  Building2,
  FileCheck2,
  LucideIcon
} from 'lucide-react';

export interface RoleTheme {
  role: UserRole;
  roleKey: string;
  name: string;
  portalTitle: string;
  shortRole: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  homePath: string;
  loginPath: string;
  primaryColor: string;
  primaryHover: string;
  pageBg: string;
  secondaryBg: string;
  borderColor: string;
  textColor: string;
  accentBadge: string;
  badgeClass: string;
  activeNavClass: string;
  identifierLabel: string;
  identifierPlaceholder: string;
  identifierExample: string;
}

export const ROLE_THEMES: Record<UserRole, RoleTheme> = {
  STUDENT: {
    role: 'STUDENT',
    roleKey: 'student',
    name: 'Student',
    portalTitle: 'Student Placement & Career Portal',
    shortRole: 'Student',
    subtitle: 'Career Opportunities & Assessment Space',
    description: 'Manage placement portfolio, personal details, verified academic records, apply to campus drives, practice assessments, and track job offers.',
    icon: GraduationCap,
    homePath: '/student/dashboard',
    loginPath: '/login/student',
    primaryColor: '#3974C6',
    primaryHover: '#2d60a6',
    pageBg: '#EFF5FF',
    secondaryBg: '#DCE9FC',
    borderColor: '#BDD5F8',
    textColor: '#1E40AF',
    accentBadge: 'bg-blue-50 text-blue-800 border-blue-200',
    badgeClass: 'bg-[#EFF5FF] text-[#1E40AF] border-[#BDD5F8]',
    activeNavClass: 'bg-[#DCE9FC] text-[#1E40AF] font-bold shadow-2xs',
    identifierLabel: 'PRN / Student Institutional Email',
    identifierPlaceholder: 'e.g. 20220104001@mitaoe.ac.in or 20220104001',
    identifierExample: 'prn.candidate@mitaoe.ac.in'
  },
  CRPC_SUPER_ADMIN: {
    role: 'CRPC_SUPER_ADMIN',
    roleKey: 'crpc-admin',
    name: 'CRPC Super Admin',
    portalTitle: 'CRPC Executive Super Admin Console',
    shortRole: 'Super Admin',
    subtitle: 'Institutional Governance & Oversight',
    description: 'Campus-wide placement governance, department quotas, institutional policy compliance, system role permissions, and executive analytics.',
    icon: Shield,
    homePath: '/admin/overview',
    loginPath: '/login/crpc-admin',
    primaryColor: '#765BC0',
    primaryHover: '#6147a8',
    pageBg: '#F3F0FC',
    secondaryBg: '#E4DCF9',
    borderColor: '#D4C6F4',
    textColor: '#5B21B6',
    accentBadge: 'bg-purple-50 text-purple-800 border-purple-200',
    badgeClass: 'bg-[#F3F0FC] text-[#5B21B6] border-[#D4C6F4]',
    activeNavClass: 'bg-[#E4DCF9] text-[#5B21B6] font-bold shadow-2xs',
    identifierLabel: 'Institutional Administrative ID / Email',
    identifierPlaceholder: 'e.g. admin.crpc@mitaoe.ac.in',
    identifierExample: 'admin.crpc@mitaoe.ac.in'
  },
  CRPC_OFFICER: {
    role: 'CRPC_OFFICER',
    roleKey: 'placement-officer',
    name: 'CRPC Placement Officer',
    portalTitle: 'CRPC Placement Operations Desk',
    shortRole: 'Placement Officer',
    subtitle: 'Corporate Relations & Drive Coordination',
    description: 'Corporate relationship management, publishing recruitment drives, student clearance rosters, test coordination, and offer validation.',
    icon: Briefcase,
    homePath: '/officer/dashboard',
    loginPath: '/login/placement-officer',
    primaryColor: '#328477',
    primaryHover: '#266c61',
    pageBg: '#EDF7F4',
    secondaryBg: '#D3ECE6',
    borderColor: '#B0DFD4',
    textColor: '#115E59',
    accentBadge: 'bg-teal-50 text-teal-800 border-teal-200',
    badgeClass: 'bg-[#EDF7F4] text-[#115E59] border-[#B0DFD4]',
    activeNavClass: 'bg-[#D3ECE6] text-[#115E59] font-bold shadow-2xs',
    identifierLabel: 'Officer Staff ID / Email',
    identifierPlaceholder: 'e.g. officer.placement@mitaoe.ac.in',
    identifierExample: 'officer.placement@mitaoe.ac.in'
  },
  DEPT_COORDINATOR: {
    role: 'DEPT_COORDINATOR',
    roleKey: 'department-coordinator',
    name: 'Department Coordinator',
    portalTitle: 'Department Academic Coordinator Portal',
    shortRole: 'Dept Coordinator',
    subtitle: 'Academic Clearances & Eligibility Monitoring',
    description: 'Departmental student verification, academic marksheet audit, student attendance approvals, and department-level placement reporting.',
    icon: UserCheck,
    homePath: '/coordinator/dashboard',
    loginPath: '/login/department-coordinator',
    primaryColor: '#A77735',
    primaryHover: '#8a5f25',
    pageBg: '#FAF4E9',
    secondaryBg: '#F5E7CE',
    borderColor: '#E8D4B0',
    textColor: '#92400E',
    accentBadge: 'bg-amber-50 text-amber-800 border-amber-200',
    badgeClass: 'bg-[#FAF4E9] text-[#92400E] border-[#E8D4B0]',
    activeNavClass: 'bg-[#F5E7CE] text-[#92400E] font-bold shadow-2xs',
    identifierLabel: 'Faculty Institutional ID / Email',
    identifierPlaceholder: 'e.g. coord.comp@mitaoe.ac.in',
    identifierExample: 'coord.comp@mitaoe.ac.in'
  },
  COMPANY_RECRUITER: {
    role: 'COMPANY_RECRUITER',
    roleKey: 'company-recruiter',
    name: 'Company Recruiter',
    portalTitle: 'Corporate Recruitment Partner Workspace',
    shortRole: 'Recruiter',
    subtitle: 'Talent Acquisition & Drive Pipeline',
    description: 'Corporate hiring portal for publishing campus hiring requirements, reviewing eligible candidates, managing applicant rounds, and issuing offer letters.',
    icon: Building2,
    homePath: '/company/dashboard',
    loginPath: '/login/company-recruiter',
    primaryColor: '#38865B',
    primaryHover: '#2a6946',
    pageBg: '#EFF7F0',
    secondaryBg: '#D6EED9',
    borderColor: '#B7E2BE',
    textColor: '#166534',
    accentBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    badgeClass: 'bg-[#EFF7F0] text-[#166534] border-[#B7E2BE]',
    activeNavClass: 'bg-[#D6EED9] text-[#166534] font-bold shadow-2xs',
    identifierLabel: 'Corporate Work Email',
    identifierPlaceholder: 'e.g. recruiter@company.com',
    identifierExample: 'recruiter@company.com'
  },
  COMPANY_INTERVIEWER: {
    role: 'COMPANY_INTERVIEWER',
    roleKey: 'company-interviewer',
    name: 'Company Interviewer',
    portalTitle: 'Technical Evaluator & Interviewer Workspace',
    shortRole: 'Interviewer',
    subtitle: 'Candidate Assessment & Scoring Workspace',
    description: 'Technical evaluation workspace for assigned candidate interviews, rubric grading, live technical assessment, and hiring decision submissions.',
    icon: FileCheck2,
    homePath: '/interviewer/workspace',
    loginPath: '/login/company-interviewer',
    primaryColor: '#348397',
    primaryHover: '#27697b',
    pageBg: '#EDF6F8',
    secondaryBg: '#D1EDF2',
    borderColor: '#ADDCE5',
    textColor: '#155E75',
    accentBadge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    badgeClass: 'bg-[#EDF6F8] text-[#155E75] border-[#ADDCE5]',
    activeNavClass: 'bg-[#D1EDF2] text-[#155E75] font-bold shadow-2xs',
    identifierLabel: 'Assigned Evaluator Email',
    identifierPlaceholder: 'e.g. interviewer@company.com',
    identifierExample: 'interviewer@company.com'
  }
};

export const getThemeForRole = (role: UserRole): RoleTheme => {
  return ROLE_THEMES[role] || ROLE_THEMES.STUDENT;
};

export const getThemeByRoleKey = (roleKey: string): RoleTheme => {
  const match = Object.values(ROLE_THEMES).find(t => t.roleKey === roleKey);
  return match || ROLE_THEMES.STUDENT;
};
