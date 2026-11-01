export type UserRole = 
  | 'STUDENT'
  | 'CRPC_SUPER_ADMIN'
  | 'CRPC_OFFICER'
  | 'DEPT_COORDINATOR'
  | 'COMPANY_RECRUITER'
  | 'COMPANY_INTERVIEWER';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  companyId?: string;
  companyName?: string;
  studentId?: string;
  designation?: string;
  phone?: string;
}

export type VerificationStatus = 'VERIFIED' | 'PENDING' | 'REJECTED' | 'ACTION_REQUIRED';

export interface SemesterMarksheet {
  semester: number;
  sgpa: number;
  creditsEarned: number;
  marksheetDocName?: string;
  verificationStatus: VerificationStatus;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'RESUME' | 'MARKSHEET' | 'CERTIFICATE' | 'ID_PROOF' | 'OTHER';
  fileName: string;
  fileSizeKb: number;
  uploadedAt: string;
  verificationStatus: VerificationStatus;
  verificationComment?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface ResumeVersion {
  id: string;
  title: string;
  fileName: string;
  uploadedAt: string;
  isDefault: boolean;
  targetRole?: string;
}

export interface CodingProfile {
  platform: 'LeetCode' | 'GitHub' | 'Codeforces' | 'CodeChef' | 'HackerRank';
  username: string;
  profileUrl: string;
  solvedCount?: number;
  rating?: string | number;
  isVerifiedDemo?: boolean;
  isVerifiedCrpc?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface InternshipItem {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  certificateDocId?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: number;
  description: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface StudentProfile {
  id: string;
  studentId: string; // e.g. MIT2022CS042
  userId: string;
  name: string;
  email: string;
  personalEmail?: string;
  phone: string;
  alternatePhone?: string;
  emergencyContact?: EmergencyContact;
  photoUrl?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string; // YYYY-MM-DD
  bloodGroup?: string;
  category?: string;
  nationality?: string;
  currentAddress?: string;
  permanentAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
  department: string;
  degree: string;
  graduationBatch: number;
  cgpa: number;
  tenthPercentage: number;
  tenthBoard: string;
  twelfthPercentage: number;
  twelfthBoard: string;
  activeBacklogs: number;
  historicalBacklogs: number;
  semesters: SemesterMarksheet[];
  skills: string[];
  projects: ProjectItem[];
  internships: InternshipItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  codingProfiles: CodingProfile[];
  resumes: ResumeVersion[];
  documents: DocumentItem[];
  isDocumentVerified: boolean;
  placementStatus: 'SEEKING' | 'PLACED' | 'RESTRICTED' | 'OPTED_OUT';
  placementRestriction?: {
    active: boolean;
    reason: string;
    imposedBy: string;
    imposedDate: string;
  };
  preferences: {
    preferredRoles: string[];
    preferredLocations: string[];
    expectedCtcMin: number;
  };
  visibilitySettings: {
    visibleToAllRecruiters: boolean;
    showPhoneToRecruiters: boolean;
    showAcademicPercentages: boolean;
  };
  bookmarkedDriveIds: string[];
}

export interface Company {
  id: string;
  name: string;
  website: string;
  industry: string;
  description: string;
  headquarters: string;
  registrationDate: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'SUSPENDED';
  rejectionReason?: string;
  suspensionReason?: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  notes?: string;
  tier: 'TIER_1' | 'TIER_2' | 'TIER_3';
  activeDriveCount: number;
  totalHires: number;
}

export type DriveStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'PAUSED' | 'CLOSED' | 'CANCELLED';

export interface RecruitmentStageConfig {
  id: string;
  order: number;
  name: string; // e.g. "Online Aptitude Assessment", "Technical Interview Round 1", "HR & Final Discussion"
  type: 'ONLINE_TEST' | 'CODING_TEST' | 'TECHNICAL_INTERVIEW' | 'HR_INTERVIEW' | 'GROUP_DISCUSSION' | 'DOCUMENT_VERIFICATION';
  description?: string;
}

export interface PlacementDrive {
  id: string;
  companyId: string;
  companyName: string;
  jobTitle: string;
  description: string;
  jobRoleCategory: string; // e.g. "Software Development", "Data Analytics", "Core Engineering"
  employmentType: 'FULL_TIME' | 'INTERNSHIP_PLUS_FTE' | 'SUMMER_INTERNSHIP';
  workLocation: string;
  workMode: 'IN_OFFICE' | 'HYBRID' | 'REMOTE';
  ctcLpa: number; // in LPA e.g. 18.5
  stipendPerMonth?: number;
  positionsCount: number;
  requiredSkills: string[];
  eligibility: {
    minCgpa: number;
    minTenthPercentage?: number;
    minTwelfthPercentage?: number;
    maxActiveBacklogs: number;
    maxHistoricalBacklogs?: number;
    allowedDepartments: string[];
    allowedDegrees: string[];
    allowedBatches: number[];
    requireVerifiedDocuments: boolean;
  };
  stages: RecruitmentStageConfig[];
  applicationDeadline: string;
  driveDate: string;
  status: DriveStatus;
  createdAt: string;
  linkedAssessmentId?: string;
}

export type ApplicationStage = 
  | 'APPLIED'
  | 'ELIGIBILITY_CONFIRMED'
  | 'UNDER_REVIEW'
  | 'ASSESSMENT_SCHEDULED'
  | 'ASSESSMENT_COMPLETED'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'INTERVIEW_COMPLETED'
  | 'OFFERED'
  | 'OFFER_ACCEPTED'
  | 'OFFER_DECLINED'
  | 'REJECTED'
  | 'WAITLISTED'
  | 'WITHDRAWN';

export interface ApplicationSnapshot {
  appliedAt: string;
  studentId: string;
  studentName: string;
  department: string;
  cgpa: number;
  resumeId: string;
  resumeTitle: string;
  skillsSnapshot: string[];
  projectsSummary: string;
}

export interface Application {
  id: string;
  driveId: string;
  driveTitle: string;
  companyId: string;
  companyName: string;
  studentId: string;
  studentName: string;
  studentDepartment: string;
  studentBatch: number;
  studentCgpa: number;
  appliedAt: string;
  currentStage: ApplicationStage;
  currentStageName: string;
  resumeVersionId: string;
  resumeFileName: string;
  snapshot: ApplicationSnapshot;
  eligibilitySnapshot: {
    isEligible: boolean;
    overallScore: number;
    reasons: string[];
  };
  assessmentScore?: {
    score: number;
    maxScore: number;
    percentage: number;
    isQualified: boolean;
  };
  stageHistory: Array<{
    stage: ApplicationStage;
    changedAt: string;
    changedBy: string;
    note?: string;
  }>;
}

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  options: { key: string; text: string }[];
  correctOption: string;
  marks: number;
  negativeMarks?: number;
  topic: string;
  explanation?: string;
}

export interface Assessment {
  id: string;
  title: string;
  isOfficial: boolean; // false = Practice test, true = Official recruitment assessment
  linkedDriveId?: string;
  companyName?: string;
  topic: string; // e.g. "Quantitative Aptitude", "CS Fundamentals", "Logical Reasoning"
  durationMinutes: number;
  passThresholdPercentage: number;
  questions: AssessmentQuestion[];
  instructions: string[];
  status: 'ACTIVE' | 'ARCHIVED' | 'UPCOMING';
  scheduledStart?: string;
  scheduledEnd?: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  submittedAt: string;
  userAnswers: Record<string, string>;
  score: number;
  maxScore: number;
  percentage: number;
  isQualified: boolean;
}

export type InterviewRoundType = 'TECHNICAL' | 'SYSTEM_DESIGN' | 'CODING_DISCUSSION' | 'HR_LEADERSHIP' | 'MANAGERIAL';
export type InterviewStatus = 'SCHEDULED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type InterviewRecommendation = 'STRONGLY_RECOMMEND' | 'RECOMMEND' | 'HOLD' | 'REJECT';

export interface Interview {
  id: string;
  applicationId: string;
  driveId: string;
  companyId: string;
  companyName: string;
  studentId: string;
  studentName: string;
  studentDepartment: string;
  roundType: InterviewRoundType;
  roundTitle: string;
  scheduledTime: string;
  durationMinutes: number;
  mode: 'VIRTUAL' | 'IN_PERSON';
  meetingUrlOrVenue: string;
  interviewerId: string;
  interviewerName: string;
  interviewerEmail: string;
  status: InterviewStatus;
  rescheduleReason?: string;
  evaluation?: {
    completedAt: string;
    technicalRating: number; // 1 to 5
    problemSolvingRating: number; // 1 to 5
    communicationRating: number; // 1 to 5
    roleFitRating: number; // 1 to 5
    overallRating: number;
    detailedFeedback: string;
    recommendation: InterviewRecommendation;
    attendance: 'PRESENT' | 'ABSENT' | 'RESCHEDULE_REQUESTED';
  };
}

export type OfferStatus = 'DRAFT' | 'ISSUED' | 'ACCEPTED' | 'DECLINED' | 'WITHDRAWN' | 'EXPIRED';

export interface Offer {
  id: string;
  applicationId: string;
  studentId: string;
  studentName: string;
  studentDepartment: string;
  companyId: string;
  companyName: string;
  driveId: string;
  jobRole: string;
  ctcLpa: number;
  baseSalaryLpa: number;
  variableBonusLpa?: number;
  joiningBonusLpa?: number;
  workLocation: string;
  issuedDate: string;
  acceptanceDeadline: string;
  expectedJoiningDate: string;
  status: OfferStatus;
  decisionDate?: string;
  decisionReason?: string;
  offerLetterFileName: string;
}

export interface NotificationItem {
  id: string;
  userId?: string; // empty means broadcast to role or all
  targetRole?: UserRole | 'ALL';
  title: string;
  message: string;
  category: 'DRIVE' | 'APPLICATION' | 'ASSESSMENT' | 'INTERVIEW' | 'OFFER' | 'VERIFICATION' | 'GENERAL';
  linkUrl?: string;
  createdAt: string;
  read: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  targetDepartments: string[]; // ["ALL"] or specific
  targetBatches: number[];
  publishedBy: string;
  publishedAt: string;
  isArchived: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetType: 'COMPANY' | 'DRIVE' | 'APPLICATION' | 'STUDENT' | 'INTERVIEW' | 'OFFER' | 'POLICY' | 'ASSESSMENT' | 'SESSION';
  targetName: string;
  details: string;
}

export interface InstitutionSettings {
  institutionName: string;
  institutionCode: string;
  placementPolicy: {
    singleOfferPolicy: boolean; // One offer per student rule
    superDreamThresholdCtc: number; // if offer >= 18 LPA, student can attempt Super Dream
    dreamThresholdCtc: number; // 10 LPA
    allowMultipleInternships: boolean;
    maxDrivesAStudentCanApplyTo: number;
  };
  currentAcademicYear: string;
  currentPlacementSeason: string;
  departments: Array<{ code: string; name: string; coordinatorName: string; totalStudents: number }>;
  batches: number[];
}
