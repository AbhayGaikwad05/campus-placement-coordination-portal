/**
 * Student Domain Services
 * Business rules and client helpers for student portal operations.
 */
import { calculateProfileCompleteness } from '../../shared/utils';

export const studentService = {
  getCompletenessScore(profile) {
    return calculateProfileCompleteness(profile);
  },

  formatApplicationSnapshot(profile, resume) {
    return {
      appliedAt: new Date().toISOString(),
      studentId: profile.studentId,
      studentName: profile.name,
      department: profile.department,
      cgpa: profile.cgpa,
      activeBacklogs: profile.activeBacklogs,
      skillsSnapshot: [...(profile.skills || [])],
      resumeId: resume?.id || '',
      resumeTitle: resume?.title || 'Default Resume',
      resumeFileName: resume?.fileName || 'resume.pdf'
    };
  }
};

export default studentService;
