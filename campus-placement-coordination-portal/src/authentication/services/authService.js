/**
 * Authentication Service
 * Manages the consolidated 3-role model (STUDENT, CRPC, COMPANY)
 * with internal designations and permissions.
 */

export const ROLES = {
  STUDENT: 'STUDENT',
  CRPC: 'CRPC',
  COMPANY: 'COMPANY'
};

export const DESIGNATIONS = {
  // CRPC designations
  SUPER_ADMIN: 'SUPER_ADMIN',
  PLACEMENT_OFFICER: 'PLACEMENT_OFFICER',
  DEPT_COORDINATOR: 'DEPT_COORDINATOR',
  
  // Company designations
  RECRUITER: 'RECRUITER',
  INTERVIEWER: 'INTERVIEWER',

  // Student designation
  STUDENT: 'STUDENT'
};

export const DEMO_ACCOUNTS = [
  // Role 1: STUDENT
  {
    id: 'user_student_1',
    role: ROLES.STUDENT,
    designation: DESIGNATIONS.STUDENT,
    name: 'Aarav Sharma',
    email: 'student@mitaoe.ac.in',
    aliases: ['aarav.sharma@mitaoe.ac.in', 'student'],
    department: 'Computer Science and Engineering',
    studentId: 'std_01',
    phone: '+91 98230 44120',
    title: 'Final Year B.Tech CSE',
    permissions: ['apply_drives', 'manage_portfolio', 'view_interviews', 'view_offers']
  },

  // Role 2: CRPC
  {
    id: 'user_admin_1',
    role: ROLES.CRPC,
    designation: DESIGNATIONS.SUPER_ADMIN,
    name: 'Dr. Rajesh Kulkarni',
    email: 'admin@mitaoe.ac.in',
    aliases: ['dean.crpc@mitaoe.ac.in', 'admin'],
    designationLabel: 'Dean, Corporate Relations & Placement Cell',
    phone: '+91 94220 11880',
    permissions: ['*'] // Full institutional control
  },
  {
    id: 'user_officer_1',
    role: ROLES.CRPC,
    designation: DESIGNATIONS.PLACEMENT_OFFICER,
    name: 'Prof. Sunita Patil',
    email: 'officer@mitaoe.ac.in',
    aliases: ['ananya.iyer@mitaoe.ac.in', 'officer'],
    designationLabel: 'Lead Placement Officer (Tech & Core)',
    phone: '+91 98224 88310',
    permissions: [
      'manage_companies',
      'verify_companies',
      'manage_drives',
      'process_approvals',
      'coordinate_interviews',
      'manage_announcements',
      'view_reports',
      'view_all_students',
      'coordinate_offers'
    ]
  },
  {
    id: 'user_coordinator_1',
    role: ROLES.CRPC,
    designation: DESIGNATIONS.DEPT_COORDINATOR,
    name: 'Prof. Anand Joshi',
    email: 'coordinator.comp@mitaoe.ac.in',
    aliases: ['rajesh.kulkarni@mitaoe.ac.in', 'coordinator'],
    department: 'Computer Science and Engineering',
    designationLabel: 'Associate Professor & CSE Placement Coordinator',
    phone: '+91 98232 99014',
    permissions: [
      'view_dept_students',
      'verify_dept_documents',
      'view_dept_eligibility',
      'view_dept_reports',
      'view_relevant_drives'
    ]
  },

  // Role 3: COMPANY
  {
    id: 'user_recruiter_1',
    role: ROLES.COMPANY,
    designation: DESIGNATIONS.RECRUITER,
    name: 'Devika Sen',
    email: 'devika.sen@google.com',
    aliases: ['recruiter'],
    companyId: 'comp_01',
    companyName: 'Google India',
    designationLabel: 'Staff University Talent Lead - APAC',
    phone: '+91 98110 33490',
    permissions: [
      'manage_company_profile',
      'manage_company_verification',
      'create_drives',
      'manage_applicants',
      'schedule_interviews',
      'issue_offers',
      'view_company_announcements'
    ]
  },
  {
    id: 'user_interviewer_1',
    role: ROLES.COMPANY,
    designation: DESIGNATIONS.INTERVIEWER,
    name: 'Siddharth Rao',
    email: 'siddharth.rao@google.com',
    aliases: ['interviewer'],
    companyId: 'comp_01',
    companyName: 'Google India',
    designationLabel: 'Staff Software Engineer & Technical Bar Raiser',
    phone: '+91 98199 44321',
    permissions: [
      'view_assigned_interviews',
      'view_candidate_profiles',
      'submit_interview_evaluations'
    ]
  }
];

export const getDemoAccountsByRole = (role) => {
  return DEMO_ACCOUNTS.filter(acc => acc.role === role);
};

export const findAccountByEmail = (email) => {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find(acc => 
    acc.email.toLowerCase() === cleanEmail ||
    (acc.aliases && acc.aliases.some(alias => alias.toLowerCase() === cleanEmail))
  ) || null;
};

export const hasPermission = (user, requiredPermission) => {
  if (!user || !user.permissions) return false;
  if (user.permissions.includes('*')) return true;
  return user.permissions.includes(requiredPermission);
};
