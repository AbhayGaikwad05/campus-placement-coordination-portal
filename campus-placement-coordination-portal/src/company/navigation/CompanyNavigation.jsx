import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  Briefcase,
  FileText,
  Calendar,
  BellRing,
  Inbox,
  Settings,
  PlusCircle
} from 'lucide-react';
import { DESIGNATIONS } from '../../authentication/services/authService';

export const getCompanyNavLinks = ({ designation, applicantsCount = 0, drivesCount = 0 }) => {
  const isInterviewer = designation === DESIGNATIONS.INTERVIEWER;

  if (isInterviewer) {
    return [
      {
        to: '/company/dashboard',
        label: 'Evaluation Center',
        icon: LayoutDashboard
      },
      {
        to: '/company/interviews',
        label: 'Assigned Interviews',
        icon: Calendar
      },
      {
        to: '/company/announcements',
        label: 'CRPC Notices',
        icon: BellRing
      },
      {
        to: '/company/notifications',
        label: 'Notifications',
        icon: Inbox
      }
    ];
  }

  // Recruiter navigation
  return [
    {
      to: '/company/dashboard',
      label: 'Recruitment Hub',
      icon: LayoutDashboard
    },
    {
      to: '/company/profile',
      label: 'Company Profile',
      icon: Building2
    },
    {
      to: '/company/verification',
      label: 'CRPC Verification',
      icon: ShieldCheck
    },
    {
      to: '/company/drives',
      label: 'Recruitment Drives',
      icon: Briefcase,
      count: drivesCount
    },
    {
      to: '/company/applicants',
      label: 'Candidate Pipeline',
      icon: FileText,
      count: applicantsCount
    },
    {
      to: '/company/interviews',
      label: 'Interview Schedules',
      icon: Calendar
    },
    {
      to: '/company/announcements',
      label: 'Announcements',
      icon: BellRing
    },
    {
      to: '/company/notifications',
      label: 'Notifications',
      icon: Inbox
    },
    {
      to: '/company/settings',
      label: 'Hiring Settings',
      icon: Settings
    }
  ];
};

export default getCompanyNavLinks;
