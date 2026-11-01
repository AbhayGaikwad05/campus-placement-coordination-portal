import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateStudentEligibility,
  calculatePlacementSummary,
  calculateProfileCompleteness,
  scoreAssessment,
  StudentEligibilityInput,
  EligibilityCriteriaInput,
  OfferRecord
} from './rules';

test('evaluateStudentEligibility returns true for fully compliant student', () => {
  const student: StudentEligibilityInput = {
    id: 'std_01',
    name: 'Aarav Sharma',
    department: 'Computer Science and Engineering',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 8.85,
    tenthPercentage: 92.5,
    twelfthPercentage: 89.0,
    activeBacklogs: 0,
    historicalBacklogs: 0,
    isDocumentVerified: true
  };

  const criteria: EligibilityCriteriaInput = {
    minCgpa: 7.5,
    minTenthPercentage: 70,
    minTwelfthPercentage: 70,
    maxActiveBacklogs: 0,
    allowedDepartments: ['Computer Science and Engineering', 'Information Technology'],
    allowedDegrees: ['B.Tech'],
    allowedBatches: [2026],
    requireVerifiedDocuments: true
  };

  const result = evaluateStudentEligibility(student, criteria);
  assert.equal(result.isEligible, true);
  assert.equal(result.status, 'ELIGIBLE');
  assert.equal(result.reasons.length, 0);
  assert.equal(result.overallScorePercentage, 100);
});

test('evaluateStudentEligibility catches low CGPA and active backlogs with detailed reasons', () => {
  const student: StudentEligibilityInput = {
    id: 'std_02',
    name: 'Rohan Deshmukh',
    department: 'Mechanical Engineering',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 6.4,
    tenthPercentage: 80.0,
    twelfthPercentage: 75.0,
    activeBacklogs: 1,
    historicalBacklogs: 2,
    isDocumentVerified: true
  };

  const criteria: EligibilityCriteriaInput = {
    minCgpa: 7.0,
    maxActiveBacklogs: 0,
    allowedDepartments: ['Mechanical Engineering'],
    allowedDegrees: ['B.Tech'],
    allowedBatches: [2026]
  };

  const result = evaluateStudentEligibility(student, criteria);
  assert.equal(result.isEligible, false);
  assert.equal(result.status, 'INELIGIBLE');
  assert.ok(result.reasons.some(r => r.includes('CGPA 6.40 is below minimum')));
  assert.ok(result.reasons.some(r => r.includes('Has 1 active backlogs')));
});

test('calculatePlacementSummary accurately calculates unique placed students and metrics', () => {
  const offers: OfferRecord[] = [
    // Student 1 has 2 accepted offers (e.g. Dream & Super Dream) -> Must count as 1 placed student!
    { id: 'off_1', studentId: 'std_01', companyName: 'Google', jobRole: 'SWE', ctcLpa: 32, status: 'ACCEPTED' },
    { id: 'off_2', studentId: 'std_01', companyName: 'Microsoft', jobRole: 'SDE', ctcLpa: 28, status: 'ACCEPTED' },
    // Student 2 has 1 accepted offer
    { id: 'off_3', studentId: 'std_02', companyName: 'TCS', jobRole: 'Innovator', ctcLpa: 9, status: 'ACCEPTED' },
    // Student 3 declined an offer
    { id: 'off_4', studentId: 'std_03', companyName: 'Bajaj', jobRole: 'Graduate Engineer', ctcLpa: 11, status: 'DECLINED' },
    // Student 4 has a pending issued offer
    { id: 'off_5', studentId: 'std_04', companyName: 'Rakuten', jobRole: 'Software Engineer', ctcLpa: 14, status: 'ISSUED' },
  ];

  const summary = calculatePlacementSummary(100, 80, offers);
  // Total accepted offers = 3 (std_01 x 2, std_02 x 1)
  assert.equal(summary.totalOffersAccepted, 3);
  // CRITICAL: unique placed students count must be 2, NOT 3!
  assert.equal(summary.uniquePlacedStudentsCount, 2);
  // Placed percentage = (2 / 80) * 100 = 2.5%
  assert.equal(summary.placementPercentage, 2.5);
  // Seeking placement = 80 - 2 = 78
  assert.equal(summary.seekingPlacementCount, 78);
  // Highest CTC amongst accepted offers = 32
  assert.equal(summary.highestCtcLpa, 32);
});

test('scoreAssessment scores attempted answers, applies negative marking, and computes qualification', () => {
  const questions = [
    { id: 'q1', correctOption: 'A', marks: 4, negativeMarks: 1 },
    { id: 'q2', correctOption: 'B', marks: 4, negativeMarks: 1 },
    { id: 'q3', correctOption: 'C', marks: 4, negativeMarks: 1 },
    { id: 'q4', correctOption: 'D', marks: 4, negativeMarks: 1 },
  ];

  // User answers q1 correctly (A), q2 incorrectly (C), leaves q3 and q4 unattempted
  const userAnswers = {
    q1: 'A',
    q2: 'C'
  };

  const result = scoreAssessment(userAnswers, questions);
  // Score: 4 (from q1) - 1 (from q2) = 3
  assert.equal(result.score, 3);
  assert.equal(result.maxScore, 16);
  assert.equal(result.attemptedCount, 2);
  assert.equal(result.correctCount, 1);
  assert.equal(result.incorrectCount, 1);
  assert.equal(result.percentage, Math.round((3 / 16) * 100)); // 19%
  assert.equal(result.isQualified, false); // Below 60%
});
