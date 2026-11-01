import { mockStudents } from '../../data/students';
import { mockCompanies } from '../../data/companies';
import { mockRecruitmentDrives } from '../../data/recruitmentDrives';
import { mockApplications } from '../../data/applications';
import { mockInterviews } from '../../data/interviews';
import { mockAnnouncements } from '../../data/announcements';

export const crpcData = {
  getAllStudents: () => mockStudents,
  getStudentsByDept: (dept) => mockStudents.filter(s => s.department === dept),
  getAllCompanies: () => mockCompanies,
  getPendingCompanies: () => mockCompanies.filter(c => c.verificationStatus === 'PENDING_VERIFICATION'),
  getAllDrives: () => mockRecruitmentDrives,
  getPendingDrives: () => mockRecruitmentDrives.filter(d => d.status === 'UNDER_CRPC_REVIEW'),
  getAllApplications: () => mockApplications,
  getAllInterviews: () => mockInterviews,
  getAllAnnouncements: () => mockAnnouncements
};

export default crpcData;
