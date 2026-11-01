import {
  LayoutDashboard,
  Users,
  Building2,
  CheckSquare,
  Briefcase,
  FileText,
  Calendar,
  BellRing,
  BarChart3,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { DESIGNATIONS } from '../../authentication/services/authService';

export const getCRPCNavLinks = ({ designation, pendingApprovalsCount = 0, pendingCompaniesCount = 0 }) => {
  const isSuperAdmin = designation === DESIGNATIONS.SUPER_ADMIN;
  const isOfficer = designation === DESIGNATIONS.PLACEMENT_OFFICER;
  const isCoordinator = designation === DESIGNATIONS.DEPT_COORDINATOR;

  const links = [
    {
      to: '/crpc/dashboard',
      label: isCoordinator ? 'Department Overview' : 'Directorate Hub',
      icon: LayoutDashboard
    },
    {
      to: '/crpc/students',
      label: isCoordinator ? 'Department Students' : 'Student Directory',
      icon: Users
    }
  ];

  // Companies Directory & Approvals (for Super Admin & Placement Officer)
  if (isSuperAdmin || isOfficer) {
    links.push({
      to: '/crpc/companies',
      label: 'Corporate Partners',
      icon: Building2,
      count: pendingCompaniesCount
    });

    links.push({
      to: '/crpc/approvals',
      label: 'Drive Approvals',
      icon: CheckSquare,
      count: pendingApprovalsCount
    });
  }

  // All Drives
  links.push({
    to: '/crpc/drives',
    label: isCoordinator ? 'Department Drives' : 'Placement Drives',
    icon: Briefcase
  });

  // Applications
  links.push({
    to: '/crpc/applications',
    label: 'Applications Pipeline',
    icon: FileText
  });

  // Interviews
  links.push({
    to: '/crpc/interviews',
    label: 'Interview Schedules',
    icon: Calendar
  });

  // Announcements (Admin & Officer)
  if (isSuperAdmin || isOfficer) {
    links.push({
      to: '/crpc/announcements',
      label: 'Announcements',
      icon: BellRing
    });
  }

  // Reports
  links.push({
    to: '/crpc/reports',
    label: isCoordinator ? 'Department Reports' : 'Placement Analytics',
    icon: BarChart3
  });

  // Settings
  links.push({
    to: '/crpc/settings',
    label: isSuperAdmin ? 'Institutional Governance' : 'Account Settings',
    icon: Settings
  });

  return links;
};

export default getCRPCNavLinks;
