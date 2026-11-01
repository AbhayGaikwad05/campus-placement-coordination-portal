import { mockCompanies } from '../../data/companies';
import { mockRecruitmentDrives } from '../../data/recruitmentDrives';
import { mockApplications } from '../../data/applications';
import { mockInterviews } from '../../data/interviews';

export const companyData = {
  getCompany: (companyId) => mockCompanies.find(c => c.id === companyId),
  getDrivesByCompany: (companyId) => mockRecruitmentDrives.filter(d => d.companyId === companyId),
  getApplicantsByCompany: (companyId) => mockApplications.filter(a => a.companyId === companyId),
  getInterviewsByCompany: (companyId) => mockInterviews.filter(i => i.companyId === companyId)
};

export default companyData;
