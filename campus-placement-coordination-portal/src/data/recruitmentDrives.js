import { INITIAL_DRIVES } from '../services/seedData';

export const recruitmentDrivesData = INITIAL_DRIVES;

export const getDriveById = (id) => {
  return recruitmentDrivesData.find(d => d.id === id);
};

export const getDrivesByCompanyId = (companyId) => {
  return recruitmentDrivesData.filter(d => d.companyId === companyId);
};

export const getPublishedDrives = () => {
  return recruitmentDrivesData.filter(d => d.status === 'PUBLISHED');
};

export const getPendingDrives = () => {
  return recruitmentDrivesData.filter(d => d.status === 'UNDER_REVIEW' || d.status === 'DRAFT');
};

export default recruitmentDrivesData;
