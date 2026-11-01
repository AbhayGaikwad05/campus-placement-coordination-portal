import { INITIAL_APPLICATIONS } from '../services/seedData';

export const applicationsData = INITIAL_APPLICATIONS;

export const getApplicationsByStudentId = (studentId) => {
  return applicationsData.filter(a => a.studentId === studentId);
};

export const getApplicationsByDriveId = (driveId) => {
  return applicationsData.filter(a => a.driveId === driveId);
};

export default applicationsData;
