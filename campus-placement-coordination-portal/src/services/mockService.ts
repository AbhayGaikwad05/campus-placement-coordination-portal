import {
  UserAccount,
  StudentProfile,
  Company,
  PlacementDrive,
  Application,
  Assessment,
  AssessmentAttempt,
  Interview,
  Offer,
  NotificationItem,
  AnnouncementItem,
  AuditLogItem,
  InstitutionSettings,
  UserRole,
  ApplicationStage
} from '../types';
import {
  DEMO_USERS,
  INITIAL_INSTITUTION_SETTINGS,
  INITIAL_COMPANIES,
  INITIAL_STUDENTS,
  INITIAL_DRIVES,
  INITIAL_APPLICATIONS,
  INITIAL_ASSESSMENTS,
  INITIAL_INTERVIEWS,
  INITIAL_OFFERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_AUDIT_LOGS
} from './seedData';
import {
  evaluateStudentEligibility,
  calculatePlacementSummary,
  calculateProfileCompleteness,
  scoreAssessment,
  EligibilityResult
} from '../utils/rules';

const STORAGE_KEYS = {
  CURRENT_USER: 'cpcp_current_user',
  SETTINGS: 'cpcp_settings',
  COMPANIES: 'cpcp_companies',
  STUDENTS: 'cpcp_students',
  DRIVES: 'cpcp_drives',
  APPLICATIONS: 'cpcp_applications',
  ASSESSMENTS: 'cpcp_assessments',
  ATTEMPTS: 'cpcp_attempts',
  INTERVIEWS: 'cpcp_interviews',
  OFFERS: 'cpcp_offers',
  NOTIFICATIONS: 'cpcp_notifications',
  ANNOUNCEMENTS: 'cpcp_announcements',
  AUDIT_LOGS: 'cpcp_audit_logs'
};

function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Failed to parse localStorage key ${key}`, e);
    return fallback;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to set localStorage key ${key}`, e);
  }
}

export class MockPlacementService {
  private static instance: MockPlacementService;

  public static getInstance(): MockPlacementService {
    if (!MockPlacementService.instance) {
      MockPlacementService.instance = new MockPlacementService();
    }
    return MockPlacementService.instance;
  }

  // --- Auth & Session ---
  public getCurrentUser(): UserAccount | null {
    return safeGetItem<UserAccount | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  public setCurrentUser(user: UserAccount | null): void {
    if (!user) {
      try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      } catch (e) {
        console.warn('Failed to remove current user', e);
      }
    } else {
      safeSetItem(STORAGE_KEYS.CURRENT_USER, user);
    }
  }

  public logout(): void {
    this.setCurrentUser(null);
  }

  public getDemoUsers(): UserAccount[] {
    return DEMO_USERS;
  }

  public getSessionUser(): UserAccount {
    return this.getCurrentUser() || DEMO_USERS[0];
  }

  public loginWithRole(role: UserRole, customDetails?: { name?: string; email?: string }): UserAccount {
    const matched = DEMO_USERS.find(u => u.role === role);
    const user: UserAccount = matched
      ? {
          ...matched,
          ...(customDetails?.name ? { name: customDetails.name } : {}),
          ...(customDetails?.email ? { email: customDetails.email } : {})
        }
      : {
          id: `usr_${Date.now()}`,
          name: customDetails?.name || `${role.replace(/_/g, ' ')} User`,
          email: customDetails?.email || `${role.toLowerCase()}@mitaoe.ac.in`,
          role: role
        };
    this.setCurrentUser(user);
    this.logAction(user.name, user.role, 'LOGIN', 'SESSION', user.role, `Authenticated to ${user.role} workspace`);
    return user;
  }

  public loginAs(roleOrUserId: string): UserAccount {
    const key = (roleOrUserId || '').trim();
    let found = DEMO_USERS.find(u => u.id === key);
    if (!found) {
      found = DEMO_USERS.find(u => u.role === key);
    }
    if (!found) {
      const lower = key.toLowerCase();
      if (lower.includes('admin') || lower.includes('dean')) {
        found = DEMO_USERS.find(u => u.role === 'CRPC_SUPER_ADMIN');
      } else if (lower.includes('officer')) {
        found = DEMO_USERS.find(u => u.role === 'CRPC_OFFICER');
      } else if (lower.includes('coord')) {
        found = DEMO_USERS.find(u => u.role === 'DEPT_COORDINATOR');
      } else if (lower.includes('recruiter')) {
        found = DEMO_USERS.find(u => u.role === 'COMPANY_RECRUITER');
      } else if (lower.includes('interviewer')) {
        found = DEMO_USERS.find(u => u.role === 'COMPANY_INTERVIEWER');
      } else if (lower.includes('student_2') || lower.includes('placed') || lower.includes('neha')) {
        found = DEMO_USERS.find(u => u.id === 'user_student_2');
      } else if (lower.includes('student')) {
        found = DEMO_USERS.find(u => u.role === 'STUDENT');
      }
    }
    const user = found || DEMO_USERS[0];
    this.setCurrentUser(user);
    this.logAction(user.name, user.role, 'LOGIN', 'SESSION', user.role, `Established session as ${user.role} (${user.name})`);
    return user;
  }

  // --- Settings ---
  public getSettings(): InstitutionSettings {
    return safeGetItem<InstitutionSettings>(STORAGE_KEYS.SETTINGS, INITIAL_INSTITUTION_SETTINGS);
  }

  public updateSettings(newSettings: Partial<InstitutionSettings>): InstitutionSettings {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    safeSetItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // --- Students ---
  public getStudents(): StudentProfile[] {
    return safeGetItem<StudentProfile[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  }

  public getStudentById(id: string): StudentProfile | undefined {
    return this.getStudents().find(s => s.id === id || s.userId === id || s.studentId === id);
  }

  public getCurrentStudentProfile(): StudentProfile | undefined {
    const user = this.getSessionUser();
    return this.getStudents().find(s => s.userId === user.id || s.id === user.studentId);
  }

  public updateStudentProfile(updatedProfile: StudentProfile): void {
    const list = this.getStudents();
    const idx = list.findIndex(s => s.id === updatedProfile.id);
    if (idx !== -1) {
      list[idx] = updatedProfile;
    } else {
      list.push(updatedProfile);
    }
    safeSetItem(STORAGE_KEYS.STUDENTS, list);

    const user = this.getSessionUser();
    this.logAction(user.name, user.role, 'PROFILE_UPDATED', 'STUDENT', updatedProfile.name, 'Updated academic portfolio and profile details');
  }

  public verifyStudentDocument(
    studentId: string,
    docId: string,
    status: 'VERIFIED' | 'REJECTED' | 'ACTION_REQUIRED',
    comment?: string
  ): void {
    const list = this.getStudents();
    const student = list.find(s => s.id === studentId);
    if (!student) return;

    const doc = student.documents.find(d => d.id === docId);
    const currentUser = this.getSessionUser();
    if (doc) {
      doc.verificationStatus = status;
      doc.verificationComment = comment;
      doc.verifiedBy = currentUser.name;
      doc.verifiedAt = new Date().toISOString();
    }

    // Check if all marksheets/documents are verified
    student.isDocumentVerified = student.documents.length > 0 && student.documents.every(d => d.verificationStatus === 'VERIFIED');
    safeSetItem(STORAGE_KEYS.STUDENTS, list);

    this.logAction(
      currentUser.name,
      currentUser.role,
      `DOCUMENT_${status}`,
      'STUDENT',
      student.name,
      `Document ${doc?.name || docId} status set to ${status}. Note: ${comment || 'Verified'}`
    );
  }

  // --- Companies ---
  public getCompanies(): Company[] {
    return safeGetItem<Company[]>(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
  }

  public getCompanyById(id: string): Company | undefined {
    return this.getCompanies().find(c => c.id === id);
  }

  public updateCompanyStatus(companyId: string, status: Company['verificationStatus'], reason?: string): void {
    const list = this.getCompanies();
    const company = list.find(c => c.id === companyId);
    if (!company) return;

    company.verificationStatus = status;
    if (status === 'REJECTED') company.rejectionReason = reason;
    if (status === 'SUSPENDED') company.suspensionReason = reason;
    safeSetItem(STORAGE_KEYS.COMPANIES, list);

    const currentUser = this.getSessionUser();
    this.logAction(
      currentUser.name,
      currentUser.role,
      `COMPANY_${status}`,
      'COMPANY',
      company.name,
      `Company registration ${status}. ${reason ? 'Reason: ' + reason : ''}`
    );
  }

  public createCompany(newComp: Omit<Company, 'id' | 'registrationDate' | 'verificationStatus' | 'activeDriveCount' | 'totalHires'>): Company {
    const list = this.getCompanies();
    const company: Company = {
      ...newComp,
      id: `comp_${Date.now()}`,
      registrationDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'PENDING',
      activeDriveCount: 0,
      totalHires: 0
    };
    list.push(company);
    safeSetItem(STORAGE_KEYS.COMPANIES, list);

    this.logAction(company.primaryContactName, 'COMPANY_RECRUITER', 'COMPANY_REGISTERED', 'COMPANY', company.name, 'Submitted partnership onboarding registration');
    return company;
  }

  // --- Placement Drives ---
  public getDrives(): PlacementDrive[] {
    return safeGetItem<PlacementDrive[]>(STORAGE_KEYS.DRIVES, INITIAL_DRIVES);
  }

  public getDriveById(id: string): PlacementDrive | undefined {
    return this.getDrives().find(d => d.id === id);
  }

  public createDrive(driveData: Omit<PlacementDrive, 'id' | 'createdAt'>): PlacementDrive {
    const list = this.getDrives();
    const drive: PlacementDrive = {
      ...driveData,
      id: `drive_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(drive);
    safeSetItem(STORAGE_KEYS.DRIVES, list);

    // Update company active count
    const comps = this.getCompanies();
    const c = comps.find(co => co.id === drive.companyId);
    if (c) {
      c.activeDriveCount = (c.activeDriveCount || 0) + 1;
      safeSetItem(STORAGE_KEYS.COMPANIES, comps);
    }

    const sessionUser = this.getSessionUser();
    this.logAction(sessionUser.name, sessionUser.role, 'DRIVE_CREATED', 'DRIVE', drive.jobTitle, `Created placement drive for ${drive.companyName} (${drive.ctcLpa} LPA)`);
    return drive;
  }

  public updateDriveStatus(driveId: string, status: PlacementDrive['status']): void {
    const list = this.getDrives();
    const drive = list.find(d => d.id === driveId);
    if (!drive) return;

    drive.status = status;
    safeSetItem(STORAGE_KEYS.DRIVES, list);

    const sessionUser = this.getSessionUser();
    this.logAction(sessionUser.name, sessionUser.role, `DRIVE_${status}`, 'DRIVE', drive.jobTitle, `Drive status transitioned to ${status}`);
  }

  // --- Eligibility Evaluation ---
  public evaluateStudentForDrive(student: StudentProfile, drive: PlacementDrive): EligibilityResult {
    return evaluateStudentEligibility(
      {
        id: student.id,
        name: student.name,
        department: student.department,
        degree: student.degree,
        graduationBatch: student.graduationBatch,
        cgpa: student.cgpa,
        tenthPercentage: student.tenthPercentage,
        twelfthPercentage: student.twelfthPercentage,
        activeBacklogs: student.activeBacklogs,
        historicalBacklogs: student.historicalBacklogs,
        isDocumentVerified: student.isDocumentVerified,
        hasPlacementRestriction: student.placementRestriction?.active,
        restrictionReason: student.placementRestriction?.reason
      },
      drive.eligibility
    );
  }

  // --- Applications ---
  public getApplications(): Application[] {
    return safeGetItem<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }

  public getApplicationById(id: string): Application | undefined {
    return this.getApplications().find(a => a.id === id);
  }

  public getApplicationsByStudent(studentId: string): Application[] {
    return this.getApplications().filter(a => a.studentId === studentId);
  }

  public getApplicationsByDrive(driveId: string): Application[] {
    return this.getApplications().filter(a => a.driveId === driveId);
  }

  public applyToDrive(driveId: string, studentId: string, resumeId: string): { success: boolean; message: string; application?: Application } {
    const drives = this.getDrives();
    const drive = drives.find(d => d.id === driveId);
    if (!drive) return { success: false, message: 'Drive not found' };

    const students = this.getStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) return { success: false, message: 'Student profile not found' };

    const existing = this.getApplications().find(a => a.driveId === driveId && a.studentId === studentId);
    if (existing) {
      return { success: false, message: 'You have already submitted an application for this recruitment drive.' };
    }

    const eligibility = this.evaluateStudentForDrive(student, drive);
    if (!eligibility.isEligible && eligibility.status !== 'PENDING_VERIFICATION') {
      return {
        success: false,
        message: `Cannot apply: Ineligible based on criteria (${eligibility.reasons.join('; ')})`
      };
    }

    const selectedResume = student.resumes.find(r => r.id === resumeId) || student.resumes[0] || {
      id: 'res_default',
      title: `${student.name}_Resume.pdf`,
      fileName: `${student.name}_Resume.pdf`,
      uploadedAt: new Date().toISOString(),
      isDefault: true
    };

    const newApp: Application = {
      id: `app_${Date.now()}`,
      driveId: drive.id,
      driveTitle: drive.jobTitle,
      companyId: drive.companyId,
      companyName: drive.companyName,
      studentId: student.id,
      studentName: student.name,
      studentDepartment: student.department,
      studentBatch: student.graduationBatch,
      studentCgpa: student.cgpa,
      appliedAt: new Date().toISOString(),
      currentStage: 'APPLIED',
      currentStageName: 'Application Received',
      resumeVersionId: selectedResume.id,
      resumeFileName: selectedResume.fileName,
      snapshot: {
        appliedAt: new Date().toISOString(),
        studentId: student.id,
        studentName: student.name,
        department: student.department,
        cgpa: student.cgpa,
        resumeId: selectedResume.id,
        resumeTitle: selectedResume.title,
        skillsSnapshot: [...student.skills],
        projectsSummary: student.projects.map(p => p.title).join(', ')
      },
      eligibilitySnapshot: {
        isEligible: eligibility.isEligible,
        overallScore: eligibility.overallScorePercentage,
        reasons: eligibility.reasons
      },
      stageHistory: [
        {
          stage: 'APPLIED',
          changedAt: new Date().toISOString(),
          changedBy: `${student.name} (Student)`,
          note: `Applied using snapshot of resume ${selectedResume.title}`
        }
      ]
    };

    const apps = this.getApplications();
    apps.unshift(newApp);
    safeSetItem(STORAGE_KEYS.APPLICATIONS, apps);

    this.logAction(student.name, 'STUDENT', 'APPLICATION_SUBMITTED', 'APPLICATION', `${drive.companyName} - ${drive.jobTitle}`, 'Submitted application with snapshot credentials');
    
    // Add notification
    this.addNotification({
      userId: student.userId,
      title: `Applied to ${drive.companyName}`,
      message: `Your application for ${drive.jobTitle} has been submitted for CRPC review.`,
      category: 'APPLICATION',
      linkUrl: '/student/applications'
    });

    return { success: true, message: 'Application submitted successfully!', application: newApp };
  }

  public updateApplicationStage(applicationId: string, newStage: ApplicationStage, note?: string): void {
    const apps = this.getApplications();
    const app = apps.find(a => a.id === applicationId);
    if (!app) return;

    const stageNames: Record<ApplicationStage, string> = {
      APPLIED: 'Applied',
      ELIGIBILITY_CONFIRMED: 'Eligibility Confirmed',
      UNDER_REVIEW: 'Under Review',
      ASSESSMENT_SCHEDULED: 'Assessment Scheduled',
      ASSESSMENT_COMPLETED: 'Assessment Completed',
      SHORTLISTED: 'Shortlisted',
      INTERVIEW_SCHEDULED: 'Interview Scheduled',
      INTERVIEW_COMPLETED: 'Interview Completed',
      OFFERED: 'Offer Extended',
      OFFER_ACCEPTED: 'Offer Accepted (Placed)',
      OFFER_DECLINED: 'Offer Declined',
      REJECTED: 'Application Closed',
      WAITLISTED: 'Waitlisted',
      WITHDRAWN: 'Withdrawn'
    };

    const sessionUser = this.getSessionUser();
    app.currentStage = newStage;
    app.currentStageName = stageNames[newStage] || newStage;
    app.stageHistory.push({
      stage: newStage,
      changedAt: new Date().toISOString(),
      changedBy: `${sessionUser.name} (${sessionUser.role})`,
      note
    });

    safeSetItem(STORAGE_KEYS.APPLICATIONS, apps);
    this.logAction(sessionUser.name, sessionUser.role, `STAGE_${newStage}`, 'APPLICATION', `${app.studentName} - ${app.companyName}`, note || `Moved to ${newStage}`);
  }

  // --- Assessments ---
  public getAssessments(): Assessment[] {
    return safeGetItem<Assessment[]>(STORAGE_KEYS.ASSESSMENTS, INITIAL_ASSESSMENTS);
  }

  public getAssessmentById(id: string): Assessment | undefined {
    return this.getAssessments().find(a => a.id === id);
  }

  public getAttempts(): AssessmentAttempt[] {
    return safeGetItem<AssessmentAttempt[]>(STORAGE_KEYS.ATTEMPTS, []);
  }

  public submitAssessmentAttempt(
    assessmentId: string,
    studentId: string,
    userAnswers: Record<string, string>,
    startedAt: string
  ): AssessmentAttempt {
    const assess = this.getAssessmentById(assessmentId);
    if (!assess) throw new Error('Assessment not found');

    const student = this.getStudentById(studentId) || this.getCurrentStudentProfile()!;
    const scored = scoreAssessment(userAnswers, assess.questions);

    const attempt: AssessmentAttempt = {
      id: `att_${Date.now()}`,
      assessmentId: assess.id,
      studentId: student?.id || studentId,
      studentName: student?.name || 'Student Candidate',
      startedAt,
      submittedAt: new Date().toISOString(),
      userAnswers,
      score: scored.score,
      maxScore: scored.maxScore,
      percentage: scored.percentage,
      isQualified: scored.isQualified
    };

    const attempts = this.getAttempts();
    attempts.unshift(attempt);
    safeSetItem(STORAGE_KEYS.ATTEMPTS, attempts);

    // If official assessment linked to drive, update corresponding application
    if (assess.isOfficial && assess.linkedDriveId) {
      const apps = this.getApplications();
      const app = apps.find(a => a.driveId === assess.linkedDriveId && a.studentId === student.id);
      if (app) {
        app.assessmentScore = {
          score: scored.score,
          maxScore: scored.maxScore,
          percentage: scored.percentage,
          isQualified: scored.isQualified
        };
        const nextStage: ApplicationStage = scored.isQualified ? 'SHORTLISTED' : 'ASSESSMENT_COMPLETED';
        this.updateApplicationStage(app.id, nextStage, `Completed official assessment scoring ${scored.score}/${scored.maxScore} (${scored.percentage}%). Status: ${scored.isQualified ? 'Qualified' : 'Did not meet cut-off'}`);
      }
    }

    this.logAction(student.name, 'STUDENT', 'ASSESSMENT_SUBMITTED', 'ASSESSMENT', assess.title, `Scored ${scored.score}/${scored.maxScore} (${scored.percentage}%). Qualified: ${scored.isQualified}`);
    return attempt;
  }

  // --- Interviews ---
  public getInterviews(): Interview[] {
    return safeGetItem<Interview[]>(STORAGE_KEYS.INTERVIEWS, INITIAL_INTERVIEWS);
  }

  public scheduleInterview(interviewData: Omit<Interview, 'id' | 'status'>): Interview {
    const list = this.getInterviews();
    const interview: Interview = {
      ...interviewData,
      id: `int_${Date.now()}`,
      status: 'SCHEDULED'
    };
    list.unshift(interview);
    safeSetItem(STORAGE_KEYS.INTERVIEWS, list);

    // Update application stage
    this.updateApplicationStage(interview.applicationId, 'INTERVIEW_SCHEDULED', `Scheduled ${interview.roundTitle} with ${interview.interviewerName}`);

    const sessionUser = this.getSessionUser();
    this.logAction(sessionUser.name, sessionUser.role, 'INTERVIEW_SCHEDULED', 'INTERVIEW', `${interview.studentName} - ${interview.companyName}`, `Scheduled ${interview.roundTitle} for ${interview.scheduledTime}`);
    return interview;
  }

  public submitInterviewEvaluation(interviewId: string, evaluation: NonNullable<Interview['evaluation']>): void {
    const list = this.getInterviews();
    const interview = list.find(i => i.id === interviewId);
    if (!interview) return;

    interview.status = 'COMPLETED';
    interview.evaluation = evaluation;
    safeSetItem(STORAGE_KEYS.INTERVIEWS, list);

    // Update application stage to INTERVIEW_COMPLETED
    this.updateApplicationStage(interview.applicationId, 'INTERVIEW_COMPLETED', `Completed evaluation: ${evaluation.recommendation}. Rating: ${evaluation.overallRating}/5`);

    this.logAction(interview.interviewerName, 'COMPANY_INTERVIEWER', 'INTERVIEW_EVALUATION', 'INTERVIEW', `${interview.studentName} - ${interview.roundTitle}`, `Submitted evaluation recommendation: ${evaluation.recommendation}`);
  }

  // --- Offers & Placements ---
  public getOffers(): Offer[] {
    return safeGetItem<Offer[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  }

  public issueOffer(offerData: Omit<Offer, 'id' | 'status' | 'issuedDate'>): Offer {
    const list = this.getOffers();
    const offer: Offer = {
      ...offerData,
      id: `off_${Date.now()}`,
      issuedDate: new Date().toISOString().split('T')[0],
      status: 'ISSUED'
    };
    list.unshift(offer);
    safeSetItem(STORAGE_KEYS.OFFERS, list);

    // Update application stage
    this.updateApplicationStage(offer.applicationId, 'OFFERED', `Job offer extended: ${offer.ctcLpa} LPA for ${offer.jobRole}`);

    const sessionUser = this.getSessionUser();
    this.logAction(sessionUser.name, 'COMPANY_RECRUITER', 'OFFER_EXTENDED', 'OFFER', `${offer.studentName} - ${offer.companyName}`, `Issued official campus offer (${offer.ctcLpa} LPA)`);
    return offer;
  }

  public respondToOffer(offerId: string, decision: 'ACCEPTED' | 'DECLINED', reason?: string): void {
    const list = this.getOffers();
    const offer = list.find(o => o.id === offerId);
    if (!offer) return;

    offer.status = decision;
    offer.decisionDate = new Date().toISOString().split('T')[0];
    offer.decisionReason = reason;
    safeSetItem(STORAGE_KEYS.OFFERS, list);

    const nextStage: ApplicationStage = decision === 'ACCEPTED' ? 'OFFER_ACCEPTED' : 'OFFER_DECLINED';
    this.updateApplicationStage(offer.applicationId, nextStage, `Student ${decision.toLowerCase()} offer. Reason: ${reason || 'N/A'}`);

    if (decision === 'ACCEPTED') {
      const students = this.getStudents();
      const student = students.find(s => s.id === offer.studentId);
      if (student) {
        student.placementStatus = 'PLACED';
        safeSetItem(STORAGE_KEYS.STUDENTS, students);
      }
    }

    this.logAction(offer.studentName, 'STUDENT', `OFFER_${decision}`, 'OFFER', `${offer.companyName} (${offer.ctcLpa} LPA)`, `Candidate ${decision.toLowerCase()} offer`);
  }

  // --- Analytics & Summary ---
  public getPlacementSummary(departmentFilter?: string, batchFilter?: number) {
    let students = this.getStudents();
    let offers = this.getOffers();

    if (departmentFilter && departmentFilter !== 'ALL') {
      students = students.filter(s => s.department === departmentFilter);
      offers = offers.filter(o => o.studentDepartment === departmentFilter);
    }
    if (batchFilter) {
      students = students.filter(s => s.graduationBatch === batchFilter);
    }

    const totalRegistered = students.length;
    const eligibleStudents = students.filter(s => s.placementStatus !== 'RESTRICTED' && s.placementStatus !== 'OPTED_OUT').length;

    return calculatePlacementSummary(totalRegistered, eligibleStudents, offers);
  }

  // --- Notifications ---
  public getNotifications(): NotificationItem[] {
    return safeGetItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  public addNotification(notif: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>): void {
    const list = this.getNotifications();
    const newItem: NotificationItem = {
      ...notif,
      id: `notif_${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };
    list.unshift(newItem);
    safeSetItem(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  public markNotificationAsRead(id: string): void {
    const list = this.getNotifications();
    const found = list.find(n => n.id === id);
    if (found) {
      found.read = true;
      safeSetItem(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  }

  public markAllNotificationsAsRead(): void {
    const list = this.getNotifications();
    list.forEach(n => n.read = true);
    safeSetItem(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  // --- Announcements ---
  public getAnnouncements(): AnnouncementItem[] {
    return safeGetItem<AnnouncementItem[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }

  public createAnnouncement(announcement: Omit<AnnouncementItem, 'id' | 'publishedAt' | 'isArchived'>): AnnouncementItem {
    const list = this.getAnnouncements();
    const newItem: AnnouncementItem = {
      ...announcement,
      id: `ann_${Date.now()}`,
      publishedAt: new Date().toISOString(),
      isArchived: false
    };
    list.unshift(newItem);
    safeSetItem(STORAGE_KEYS.ANNOUNCEMENTS, list);

    const sessionUser = this.getSessionUser();
    this.logAction(sessionUser.name, sessionUser.role, 'ANNOUNCEMENT_PUBLISHED', 'POLICY', newItem.title, 'Broadcasted campus announcement');
    return newItem;
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLogItem[] {
    return safeGetItem<AuditLogItem[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  public logAction(
    actorName: string,
    actorRole: UserRole,
    action: string,
    targetType: AuditLogItem['targetType'],
    targetName: string,
    details: string
  ): void {
    const logs = this.getAuditLogs();
    const logItem: AuditLogItem = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actorName,
      actorRole,
      action,
      targetType,
      targetName,
      details
    };
    logs.unshift(logItem);
    safeSetItem(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 100)); // Keep latest 100 logs
  }

  // --- Demo Data Reset ---
  public resetDemoData(): void {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    safeSetItem(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0]);
    safeSetItem(STORAGE_KEYS.SETTINGS, INITIAL_INSTITUTION_SETTINGS);
    safeSetItem(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    safeSetItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
    safeSetItem(STORAGE_KEYS.DRIVES, INITIAL_DRIVES);
    safeSetItem(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    safeSetItem(STORAGE_KEYS.ASSESSMENTS, INITIAL_ASSESSMENTS);
    safeSetItem(STORAGE_KEYS.INTERVIEWS, INITIAL_INTERVIEWS);
    safeSetItem(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
    safeSetItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    safeSetItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
    safeSetItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  // --- CSV Export Helper ---
  public exportToCsv(filename: string, headers: string[], rows: (string | number)[][]): void {
    const escapeCsv = (val: string | number) => {
      const str = String(val ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const mockService = MockPlacementService.getInstance();
