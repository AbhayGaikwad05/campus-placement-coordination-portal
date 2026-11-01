/**
 * Company Domain Services
 * Business logic for corporate recruitment and candidate pipelines.
 */
export const companyService = {
  calculateHiringFunnel(applications) {
    const total = applications.length;
    const shortlisted = applications.filter(a => a.currentStage === 'SHORTLISTED' || a.currentStage === 'INTERVIEW_SCHEDULED').length;
    const interviewed = applications.filter(a => a.currentStage === 'INTERVIEW_COMPLETED').length;
    const offered = applications.filter(a => a.currentStage === 'OFFERED' || a.currentStage === 'OFFER_ACCEPTED').length;
    return { total, shortlisted, interviewed, offered };
  }
};

export default companyService;
