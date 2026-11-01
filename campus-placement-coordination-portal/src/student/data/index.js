import { mockStudents } from '../../data/students';
import { mockRecruitmentDrives } from '../../data/recruitmentDrives';
import { mockApplications } from '../../data/applications';
import { mockInterviews } from '../../data/interviews';

export const studentData = {
  getProfile: (studentId) => mockStudents.find(s => s.id === studentId || s.studentId === studentId),
  getApplications: (studentId) => mockApplications.filter(a => a.studentId === studentId),
  getInterviews: (studentId) => mockInterviews.filter(i => i.studentId === studentId),
  getEligibleDrives: (student) => mockRecruitmentDrives.filter(d => 
    d.status === 'PUBLISHED' && 
    (d.eligibility.allowedDepartments.includes(student.department) || d.eligibility.allowedDepartments.includes('ALL')) &&
    student.cgpa >= d.eligibility.minCgpa
  )
};

export default studentData;
