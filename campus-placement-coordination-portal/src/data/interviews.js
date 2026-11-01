import { INITIAL_INTERVIEWS } from '../services/seedData';

export const interviewsData = INITIAL_INTERVIEWS;

export const getInterviewsByStudentId = (studentId) => {
  return interviewsData.filter(i => i.studentId === studentId);
};

export const getInterviewsByInterviewer = (interviewerName) => {
  return interviewsData.filter(i => i.interviewerName === interviewerName);
};

export const getInterviewsByCompanyId = (companyId) => {
  return interviewsData.filter(i => i.companyId === companyId);
};

export default interviewsData;
