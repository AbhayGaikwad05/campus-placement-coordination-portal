import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  UserAccount,
  StudentProfile,
  Company,
  PlacementDrive,
  Application,
  Assessment,
  Interview,
  Offer,
  NotificationItem,
  AnnouncementItem,
  AuditLogItem,
  InstitutionSettings,
  ApplicationStage,
  UserRole
} from '../types';
import { mockService } from '../services/mockService';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface PlacementContextType {
  currentUser: UserAccount | null;
  studentProfile?: StudentProfile;
  settings: InstitutionSettings;
  students: StudentProfile[];
  companies: Company[];
  drives: PlacementDrive[];
  applications: Application[];
  assessments: Assessment[];
  interviews: Interview[];
  offers: Offer[];
  notifications: NotificationItem[];
  announcements: AnnouncementItem[];
  auditLogs: AuditLogItem[];
  unreadNotificationCount: number;
  
  // Actions
  login: (user: UserAccount) => void;
  loginWithRole: (role: UserRole, customDetails?: { name?: string; email?: string }) => UserAccount;
  logout: () => void;
  switchUser: (roleOrUserId: string) => void;
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  toasts: ToastMessage[];
  refreshData: () => void;
  resetAllDemoData: () => void;

  // Domain mutation methods
  updateStudentProfile: (profile: StudentProfile) => void;
  verifyDocument: (studentId: string, docId: string, status: 'VERIFIED' | 'REJECTED' | 'ACTION_REQUIRED', comment?: string) => void;
  updateCompanyStatus: (companyId: string, status: Company['verificationStatus'], reason?: string) => void;
  createCompany: (data: Omit<Company, 'id' | 'registrationDate' | 'verificationStatus' | 'activeDriveCount' | 'totalHires'>) => Company;
  createDrive: (data: Omit<PlacementDrive, 'id' | 'createdAt'>) => PlacementDrive;
  updateDriveStatus: (driveId: string, status: PlacementDrive['status']) => void;
  applyToDrive: (driveId: string, resumeId: string) => { success: boolean; message: string };
  updateApplicationStage: (appId: string, stage: ApplicationStage, note?: string) => void;
  scheduleInterview: (data: Omit<Interview, 'id' | 'status'>) => Interview;
  submitInterviewEvaluation: (interviewId: string, evaluation: NonNullable<Interview['evaluation']>) => void;
  issueOffer: (data: Omit<Offer, 'id' | 'status' | 'issuedDate'>) => Offer;
  respondToOffer: (offerId: string, decision: 'ACCEPTED' | 'DECLINED', reason?: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  createAnnouncement: (data: Omit<AnnouncementItem, 'id' | 'publishedAt' | 'isArchived'>) => void;
  updateSettings: (data: Partial<InstitutionSettings>) => void;
}

const PlacementContext = createContext<PlacementContextType | undefined>(undefined);

export const PlacementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => mockService.getCurrentUser());
  const [settings, setSettings] = useState<InstitutionSettings>(() => mockService.getSettings());
  const [students, setStudents] = useState<StudentProfile[]>(() => mockService.getStudents());
  const [companies, setCompanies] = useState<Company[]>(() => mockService.getCompanies());
  const [drives, setDrives] = useState<PlacementDrive[]>(() => mockService.getDrives());
  const [applications, setApplications] = useState<Application[]>(() => mockService.getApplications());
  const [assessments, setAssessments] = useState<Assessment[]>(() => mockService.getAssessments());
  const [interviews, setInterviews] = useState<Interview[]>(() => mockService.getInterviews());
  const [offers, setOffers] = useState<Offer[]>(() => mockService.getOffers());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => mockService.getNotifications());
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => mockService.getAnnouncements());
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => mockService.getAuditLogs());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const refreshData = useCallback(() => {
    setCurrentUser(mockService.getCurrentUser());
    setSettings(mockService.getSettings());
    setStudents(mockService.getStudents());
    setCompanies(mockService.getCompanies());
    setDrives(mockService.getDrives());
    setApplications(mockService.getApplications());
    setAssessments(mockService.getAssessments());
    setInterviews(mockService.getInterviews());
    setOffers(mockService.getOffers());
    setNotifications(mockService.getNotifications());
    setAnnouncements(mockService.getAnnouncements());
    setAuditLogs(mockService.getAuditLogs());
  }, []);

  const showToast = useCallback((t: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(item => item.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const login = useCallback((user: UserAccount) => {
    mockService.setCurrentUser(user);
    setCurrentUser(user);
    refreshData();
    showToast({
      type: 'success',
      title: 'Authenticated Successfully',
      message: `Signed in as ${user.name}`
    });
  }, [refreshData, showToast]);

  const loginWithRole = useCallback((role: UserRole, customDetails?: { name?: string; email?: string }) => {
    const user = mockService.loginWithRole(role, customDetails);
    setCurrentUser(user);
    refreshData();
    showToast({
      type: 'success',
      title: 'Authenticated Successfully',
      message: `Session initialized for ${user.name} (${role.replace(/_/g, ' ')})`
    });
    return user;
  }, [refreshData, showToast]);

  const logout = useCallback(() => {
    mockService.logout();
    setCurrentUser(null);
    refreshData();
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out of the portal.'
    });
  }, [refreshData, showToast]);

  const switchUser = useCallback((roleOrUserId: string) => {
    const user = mockService.loginAs(roleOrUserId);
    setCurrentUser(user);
    refreshData();
  }, [refreshData]);

  const resetAllDemoData = useCallback(() => {
    mockService.resetDemoData();
    refreshData();
    showToast({
      type: 'warning',
      title: 'Portal State Reset',
      message: 'Restored original institutional sample records and seed state.'
    });
  }, [refreshData, showToast]);

  const studentProfile = currentUser
    ? students.find(s => s.userId === currentUser.id || s.id === currentUser.studentId)
    : undefined;

  const unreadNotificationCount = notifications.filter(n => {
    if (n.read) return false;
    if (!currentUser) return false;
    if (n.userId && n.userId === currentUser.id) return true;
    if (!n.userId && (!n.targetRole || n.targetRole === 'ALL' || n.targetRole === currentUser.role)) return true;
    return false;
  }).length;

  const updateStudentProfile = (p: StudentProfile) => {
    mockService.updateStudentProfile(p);
    refreshData();
    showToast({ type: 'success', title: 'Profile Updated', message: 'Your student portfolio has been saved.' });
  };

  const verifyDocument = (studentId: string, docId: string, status: 'VERIFIED' | 'REJECTED' | 'ACTION_REQUIRED', comment?: string) => {
    mockService.verifyStudentDocument(studentId, docId, status, comment);
    refreshData();
    showToast({
      type: status === 'VERIFIED' ? 'success' : 'warning',
      title: `Document ${status.replace(/_/g, ' ')}`,
      message: comment || 'Student document record updated.'
    });
  };

  const updateCompanyStatus = (companyId: string, status: Company['verificationStatus'], reason?: string) => {
    mockService.updateCompanyStatus(companyId, status, reason);
    refreshData();
    showToast({ type: 'info', title: `Company ${status}`, message: `Company status updated to ${status}` });
  };

  const createCompany = (data: Omit<Company, 'id' | 'registrationDate' | 'verificationStatus' | 'activeDriveCount' | 'totalHires'>) => {
    const comp = mockService.createCompany(data);
    refreshData();
    showToast({ type: 'success', title: 'Company Registered', message: `${comp.name} registered and pending CRPC approval.` });
    return comp;
  };

  const createDrive = (data: Omit<PlacementDrive, 'id' | 'createdAt'>) => {
    const drive = mockService.createDrive(data);
    refreshData();
    showToast({ type: 'success', title: 'Drive Created', message: `${drive.jobTitle} has been saved.` });
    return drive;
  };

  const updateDriveStatus = (driveId: string, status: PlacementDrive['status']) => {
    mockService.updateDriveStatus(driveId, status);
    refreshData();
    showToast({ type: 'info', title: 'Drive Status Updated', message: `Drive is now ${status}.` });
  };

  const applyToDrive = (driveId: string, resumeId: string) => {
    const activeStudent = studentProfile || students[0];
    const res = mockService.applyToDrive(driveId, activeStudent.id, resumeId);
    if (res.success) {
      refreshData();
      showToast({ type: 'success', title: 'Application Successful', message: res.message });
    } else {
      showToast({ type: 'error', title: 'Application Failed', message: res.message });
    }
    return res;
  };

  const updateApplicationStage = (appId: string, stage: ApplicationStage, note?: string) => {
    mockService.updateApplicationStage(appId, stage, note);
    refreshData();
    showToast({ type: 'success', title: 'Stage Updated', message: `Candidate application moved to ${stage.replace(/_/g, ' ')}.` });
  };

  const scheduleInterview = (data: Omit<Interview, 'id' | 'status'>) => {
    const inv = mockService.scheduleInterview(data);
    refreshData();
    showToast({ type: 'success', title: 'Interview Scheduled', message: `Interview booked for ${inv.studentName} with ${inv.interviewerName}.` });
    return inv;
  };

  const submitInterviewEvaluation = (interviewId: string, evalData: NonNullable<Interview['evaluation']>) => {
    mockService.submitInterviewEvaluation(interviewId, evalData);
    refreshData();
    showToast({ type: 'success', title: 'Evaluation Recorded', message: `Recommendation: ${evalData.recommendation.replace(/_/g, ' ')} submitted.` });
  };

  const issueOffer = (data: Omit<Offer, 'id' | 'status' | 'issuedDate'>) => {
    const off = mockService.issueOffer(data);
    refreshData();
    showToast({ type: 'success', title: 'Offer Issued', message: `Offer of ${off.ctcLpa} LPA issued to ${off.studentName}.` });
    return off;
  };

  const respondToOffer = (offerId: string, decision: 'ACCEPTED' | 'DECLINED', reason?: string) => {
    mockService.respondToOffer(offerId, decision, reason);
    refreshData();
    showToast({
      type: decision === 'ACCEPTED' ? 'success' : 'info',
      title: `Offer ${decision}`,
      message: decision === 'ACCEPTED' ? 'Congratulations! Your campus placement offer is accepted.' : 'Offer declined.'
    });
  };

  const markNotificationAsRead = (id: string) => {
    mockService.markNotificationAsRead(id);
    refreshData();
  };

  const markAllNotificationsAsRead = () => {
    mockService.markAllNotificationsAsRead();
    refreshData();
    showToast({ type: 'info', title: 'Notifications Cleared', message: 'All notifications marked as read.' });
  };

  const createAnnouncement = (data: Omit<AnnouncementItem, 'id' | 'publishedAt' | 'isArchived'>) => {
    mockService.createAnnouncement(data);
    refreshData();
    showToast({ type: 'success', title: 'Announcement Published', message: data.title });
  };

  const updateSettings = (data: Partial<InstitutionSettings>) => {
    mockService.updateSettings(data);
    refreshData();
    showToast({ type: 'success', title: 'Settings Saved', message: 'Institutional configuration updated.' });
  };

  return (
    <PlacementContext.Provider
      value={{
        currentUser,
        studentProfile,
        settings,
        students,
        companies,
        drives,
        applications,
        assessments,
        interviews,
        offers,
        notifications,
        announcements,
        auditLogs,
        unreadNotificationCount,
        login,
        loginWithRole,
        logout,
        switchUser,
        showToast,
        removeToast,
        toasts,
        refreshData,
        resetAllDemoData,
        updateStudentProfile,
        verifyDocument,
        updateCompanyStatus,
        createCompany,
        createDrive,
        updateDriveStatus,
        applyToDrive,
        updateApplicationStage,
        scheduleInterview,
        submitInterviewEvaluation,
        issueOffer,
        respondToOffer,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        createAnnouncement,
        updateSettings
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
};
