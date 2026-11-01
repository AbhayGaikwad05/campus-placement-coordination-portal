import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  FileText,
  Calendar,
  BellRing,
  Inbox,
  Settings
} from 'lucide-react';

export const getStudentNavLinks = ({ drivesCount = 0, applicationsCount = 0, unreadCount = 0 }) => [
  {
    to: '/student/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    to: '/student/profile',
    label: 'Profile & Marksheets',
    icon: GraduationCap
  },
  {
    to: '/student/opportunities',
    label: 'Placement Drives',
    icon: Briefcase,
    count: drivesCount
  },
  {
    to: '/student/applications',
    label: 'My Applications',
    icon: FileText,
    count: applicationsCount
  },
  {
    to: '/student/interviews',
    label: 'Interview Schedules',
    icon: Calendar
  },
  {
    to: '/student/announcements',
    label: 'Announcements',
    icon: BellRing
  },
  {
    to: '/student/notifications',
    label: 'Notifications',
    icon: Inbox,
    count: unreadCount
  },
  {
    to: '/student/settings',
    label: 'Settings',
    icon: Settings
  }
];

export default getStudentNavLinks;
