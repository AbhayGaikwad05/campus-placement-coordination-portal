/**
 * Pure business logic rules for Campus Placement Coordination Portal
 * Decoupled from React UI for deterministic testing and rock-solid validation.
 */

export interface StudentEligibilityInput {
  id: string;
  name: string;
  department: string;
  degree: string;
  graduationBatch: number;
  cgpa: number;
  tenthPercentage: number;
  twelfthPercentage: number;
  activeBacklogs: number;
  historicalBacklogs: number;
  isDocumentVerified: boolean;
  hasPlacementRestriction?: boolean;
  restrictionReason?: string;
}

export interface EligibilityCriteriaInput {
  minCgpa: number;
  minTenthPercentage?: number;
  minTwelfthPercentage?: number;
  maxActiveBacklogs: number;
  maxHistoricalBacklogs?: number;
  allowedDepartments: string[];
  allowedDegrees: string[];
  allowedBatches: number[];
  requireVerifiedDocuments?: boolean;
}

export interface RuleEvaluationDetail {
  ruleName: string;
  expected: string;
  actual: string;
  passed: boolean;
  isCritical: boolean;
  note?: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  status: 'ELIGIBLE' | 'INELIGIBLE' | 'PENDING_VERIFICATION' | 'RESTRICTED';
  overallScorePercentage: number;
  reasons: string[];
  ruleDetails: RuleEvaluationDetail[];
  evaluatedAt: string;
}

export function evaluateStudentEligibility(
  student: StudentEligibilityInput,
  criteria: EligibilityCriteriaInput
): EligibilityResult {
  const ruleDetails: RuleEvaluationDetail[] = [];
  const reasons: string[] = [];

  // Check institutional restrictions
  if (student.hasPlacementRestriction) {
    return {
      isEligible: false,
      status: 'RESTRICTED',
      overallScorePercentage: 0,
      reasons: [student.restrictionReason || 'Institutional placement policy restriction active'],
      ruleDetails: [
        {
          ruleName: 'Institutional Standing',
          expected: 'No active disciplinary or policy block',
          actual: 'Policy restriction applied',
          passed: false,
          isCritical: true,
          note: student.restrictionReason
        }
      ],
      evaluatedAt: new Date().toISOString()
    };
  }

  // 1. Department
  const deptPassed = criteria.allowedDepartments.length === 0 || 
    criteria.allowedDepartments.includes('ALL') || 
    criteria.allowedDepartments.includes(student.department);
  ruleDetails.push({
    ruleName: 'Department',
    expected: criteria.allowedDepartments.join(', '),
    actual: student.department,
    passed: deptPassed,
    isCritical: true
  });
  if (!deptPassed) reasons.push(`Department ${student.department} is not in eligible departments list`);

  // 2. Degree
  const degreePassed = criteria.allowedDegrees.length === 0 ||
    criteria.allowedDegrees.includes('ALL') ||
    criteria.allowedDegrees.includes(student.degree);
  ruleDetails.push({
    ruleName: 'Degree Program',
    expected: criteria.allowedDegrees.join(', '),
    actual: student.degree,
    passed: degreePassed,
    isCritical: true
  });
  if (!degreePassed) reasons.push(`Degree ${student.degree} is not in eligible degree programs`);

  // 3. Batch
  const batchPassed = criteria.allowedBatches.length === 0 ||
    criteria.allowedBatches.includes(student.graduationBatch);
  ruleDetails.push({
    ruleName: 'Graduating Batch',
    expected: criteria.allowedBatches.join(', '),
    actual: student.graduationBatch.toString(),
    passed: batchPassed,
    isCritical: true
  });
  if (!batchPassed) reasons.push(`Graduation batch ${student.graduationBatch} is not eligible`);

  // 4. CGPA
  const cgpaPassed = student.cgpa >= criteria.minCgpa;
  ruleDetails.push({
    ruleName: 'Minimum CGPA',
    expected: `>= ${criteria.minCgpa.toFixed(2)}`,
    actual: student.cgpa.toFixed(2),
    passed: cgpaPassed,
    isCritical: true
  });
  if (!cgpaPassed) reasons.push(`CGPA ${student.cgpa.toFixed(2)} is below minimum requirement of ${criteria.minCgpa.toFixed(2)}`);

  // 5. 10th Percentage
  if (criteria.minTenthPercentage !== undefined && criteria.minTenthPercentage > 0) {
    const tenthPassed = student.tenthPercentage >= criteria.minTenthPercentage;
    ruleDetails.push({
      ruleName: '10th Standard Score',
      expected: `>= ${criteria.minTenthPercentage}%`,
      actual: `${student.tenthPercentage}%`,
      passed: tenthPassed,
      isCritical: false
    });
    if (!tenthPassed) reasons.push(`10th score ${student.tenthPercentage}% is below ${criteria.minTenthPercentage}%`);
  }

  // 6. 12th Percentage
  if (criteria.minTwelfthPercentage !== undefined && criteria.minTwelfthPercentage > 0) {
    const twelfthPassed = student.twelfthPercentage >= criteria.minTwelfthPercentage;
    ruleDetails.push({
      ruleName: '12th Standard Score',
      expected: `>= ${criteria.minTwelfthPercentage}%`,
      actual: `${student.twelfthPercentage}%`,
      passed: twelfthPassed,
      isCritical: false
    });
    if (!twelfthPassed) reasons.push(`12th score ${student.twelfthPercentage}% is below ${criteria.minTwelfthPercentage}%`);
  }

  // 7. Active Backlogs
  const activeBacklogsPassed = student.activeBacklogs <= criteria.maxActiveBacklogs;
  ruleDetails.push({
    ruleName: 'Active Backlogs',
    expected: `<= ${criteria.maxActiveBacklogs}`,
    actual: student.activeBacklogs.toString(),
    passed: activeBacklogsPassed,
    isCritical: true
  });
  if (!activeBacklogsPassed) reasons.push(`Has ${student.activeBacklogs} active backlogs (max allowed: ${criteria.maxActiveBacklogs})`);

  // 8. Historical Backlogs
  if (criteria.maxHistoricalBacklogs !== undefined) {
    const histPassed = student.historicalBacklogs <= criteria.maxHistoricalBacklogs;
    ruleDetails.push({
      ruleName: 'Historical Backlogs',
      expected: `<= ${criteria.maxHistoricalBacklogs}`,
      actual: student.historicalBacklogs.toString(),
      passed: histPassed,
      isCritical: false
    });
    if (!histPassed) reasons.push(`Has ${student.historicalBacklogs} total history backlogs (max allowed: ${criteria.maxHistoricalBacklogs})`);
  }

  // 9. Document Verification
  let docVerificationPassed = true;
  if (criteria.requireVerifiedDocuments) {
    docVerificationPassed = student.isDocumentVerified;
    ruleDetails.push({
      ruleName: 'Academic Document Verification',
      expected: 'Verified by Placement Office',
      actual: student.isDocumentVerified ? 'Verified' : 'Pending Verification',
      passed: docVerificationPassed,
      isCritical: false
    });
    if (!docVerificationPassed) reasons.push('Academic records and certificates await departmental verification');
  }

  const passedCount = ruleDetails.filter(r => r.passed).length;
  const overallScorePercentage = Math.round((passedCount / ruleDetails.length) * 100);

  const isEligible = ruleDetails.every(r => r.passed);
  
  let status: 'ELIGIBLE' | 'INELIGIBLE' | 'PENDING_VERIFICATION' = 'ELIGIBLE';
  if (!isEligible) {
    if (!docVerificationPassed && ruleDetails.filter(r => r.ruleName !== 'Academic Document Verification').every(r => r.passed)) {
      status = 'PENDING_VERIFICATION';
    } else {
      status = 'INELIGIBLE';
    }
  }

  return {
    isEligible,
    status,
    overallScorePercentage,
    reasons,
    ruleDetails,
    evaluatedAt: new Date().toISOString()
  };
}

/**
 * Unique placed students calculation
 * CRITICAL RULE: A student holding multiple offers must ONLY be counted as 1 placed student.
 */
export interface OfferRecord {
  id: string;
  studentId: string;
  companyName: string;
  jobRole: string;
  ctcLpa: number;
  status: 'DRAFT' | 'ISSUED' | 'ACCEPTED' | 'DECLINED' | 'WITHDRAWN' | 'EXPIRED';
}

export interface PlacementSummaryCalculation {
  totalRegistered: number;
  totalEligible: number;
  totalOffersIssued: number;
  totalOffersAccepted: number;
  totalOffersDeclined: number;
  uniquePlacedStudentsCount: number;
  placementPercentage: number;
  seekingPlacementCount: number;
  averageCtcLpa: number;
  highestCtcLpa: number;
  medianCtcLpa: number;
}

export function calculatePlacementSummary(
  registeredStudentsCount: number,
  eligibleStudentsCount: number,
  offers: OfferRecord[]
): PlacementSummaryCalculation {
  const acceptedOffers = offers.filter(o => o.status === 'ACCEPTED');
  const issuedOffers = offers.filter(o => o.status === 'ISSUED' || o.status === 'ACCEPTED' || o.status === 'DECLINED');
  const declinedOffers = offers.filter(o => o.status === 'DECLINED');

  // Deduplicate placed students: set of student IDs with accepted offers
  const uniquePlacedStudentIds = new Set<string>();
  acceptedOffers.forEach(o => uniquePlacedStudentIds.add(o.studentId));

  const uniquePlacedCount = uniquePlacedStudentIds.size;
  const seekingCount = Math.max(0, eligibleStudentsCount - uniquePlacedCount);
  const placementPercentage = eligibleStudentsCount > 0 
    ? Number(((uniquePlacedCount / eligibleStudentsCount) * 100).toFixed(1))
    : 0;

  // CTC stats on accepted offers
  const acceptedCtcs = acceptedOffers.map(o => o.ctcLpa).sort((a, b) => a - b);
  const highestCtc = acceptedCtcs.length > 0 ? Math.max(...acceptedCtcs) : 0;
  const averageCtc = acceptedCtcs.length > 0 
    ? Number((acceptedCtcs.reduce((acc, c) => acc + c, 0) / acceptedCtcs.length).toFixed(2))
    : 0;
  
  let medianCtc = 0;
  if (acceptedCtcs.length > 0) {
    const mid = Math.floor(acceptedCtcs.length / 2);
    medianCtc = acceptedCtcs.length % 2 !== 0 
      ? acceptedCtcs[mid] 
      : Number(((acceptedCtcs[mid - 1] + acceptedCtcs[mid]) / 2).toFixed(2));
  }

  return {
    totalRegistered: registeredStudentsCount,
    totalEligible: eligibleStudentsCount,
    totalOffersIssued: issuedOffers.length,
    totalOffersAccepted: acceptedOffers.length,
    totalOffersDeclined: declinedOffers.length,
    uniquePlacedStudentsCount: uniquePlacedCount,
    placementPercentage,
    seekingPlacementCount: seekingCount,
    averageCtcLpa: averageCtc,
    highestCtcLpa: highestCtc,
    medianCtcLpa: medianCtc
  };
}

/**
 * Profile Completeness Calculation
 */
export function calculateProfileCompleteness(profile: {
  hasPersonalInfo: boolean;
  hasAcademicInfo: boolean;
  hasMarksheets: boolean;
  hasResume: boolean;
  skillsCount: number;
  projectsCount: number;
  hasCodingProfiles: boolean;
  hasCertifications: boolean;
}): { percentage: number; missingSections: string[] } {
  let score = 0;
  const missing: string[] = [];

  if (profile.hasPersonalInfo) score += 20;
  else missing.push('Personal Details');

  if (profile.hasAcademicInfo) score += 20;
  else missing.push('Academic History');

  if (profile.hasMarksheets) score += 15;
  else missing.push('Verified Marksheets');

  if (profile.hasResume) score += 15;
  else missing.push('Default Resume');

  if (profile.skillsCount >= 3) score += 10;
  else missing.push('At least 3 Technical Skills');

  if (profile.projectsCount >= 1) score += 10;
  else missing.push('Key Projects');

  if (profile.hasCodingProfiles) score += 5;
  else missing.push('Coding Profiles (GitHub/LeetCode)');

  if (profile.hasCertifications) score += 5;
  else missing.push('Certifications/Achievements');

  return {
    percentage: Math.min(100, score),
    missingSections: missing
  };
}

/**
 * Assessment Scoring
 */
export function scoreAssessment(
  userAnswers: Record<string, string>,
  questions: Array<{ id: string; correctOption: string; marks: number; negativeMarks?: number }>
): {
  score: number;
  maxScore: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  isQualified: boolean;
  percentage: number;
  passThreshold: number;
} {
  let score = 0;
  let maxScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let attemptedCount = 0;

  for (const q of questions) {
    maxScore += q.marks;
    const answered = userAnswers[q.id];
    if (answered) {
      attemptedCount++;
      if (answered === q.correctOption) {
        score += q.marks;
        correctCount++;
      } else {
        const penalty = q.negativeMarks || 0;
        score -= penalty;
        incorrectCount++;
      }
    }
  }

  // Floor score at 0
  score = Math.max(0, score);
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const passThreshold = 60; // 60% standard cutoff
  const isQualified = percentage >= passThreshold;

  return {
    score,
    maxScore,
    attemptedCount,
    correctCount,
    incorrectCount,
    isQualified,
    percentage,
    passThreshold
  };
}
