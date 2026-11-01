import { INITIAL_COMPANIES } from '../services/seedData';

export const companiesData = INITIAL_COMPANIES;

export const getCompanyById = (id) => {
  return companiesData.find(c => c.id === id);
};

export const getVerifiedCompanies = () => {
  return companiesData.filter(c => c.verificationStatus === 'VERIFIED');
};

export const getPendingCompanies = () => {
  return companiesData.filter(c => c.verificationStatus === 'PENDING');
};

export default companiesData;
