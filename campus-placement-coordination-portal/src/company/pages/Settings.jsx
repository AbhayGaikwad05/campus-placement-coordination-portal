import React, { useState } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { Settings, Shield, User, Building, Bell, Video, Save, Mail, Phone, CheckCircle2 } from 'lucide-react';
import Button from '../../shared/components/Button';

export default function CompanySettings() {
  const { currentUser, isRecruiter, isInterviewer } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [accountForm, setAccountForm] = useState({
    name: currentUser?.name || 'Recruitment Officer',
    email: currentUser?.email || 'devika.sen@google.com',
    phone: '+91 98200 11223',
    designation: currentUser?.designation || 'Lead University Recruiter',
    department: 'University Relations & Campus Talent Acquisiton'
  });

  const [interviewPreferences, setInterviewPreferences] = useState({
    defaultPlatform: 'Google Meet',
    defaultDuration: '45 mins',
    sendCalendarInvite: true,
    shareRubricWithCandidate: false,
    interviewerNotesPrivate: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailOnNewApplicant: true,
    emailOnDriveApproval: true,
    emailOnInterviewAcceptance: true,
    dailyDigest: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="company-settings-page">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--navy-prestige)' }}>Portal Settings & Preferences</h2>
          <p className="text-muted mb-0 small">Manage recruiter profile details, interview coordination defaults, and system notifications</p>
        </div>
        {savedSuccess && (
          <div className="alert alert-success py-2 px-3 mb-0 d-flex align-items-center gap-2 small">
            <CheckCircle2 size={16} /> Changes saved successfully!
          </div>
        )}
      </div>

      <div className="row g-4">
        {/* Navigation Tabs */}
        <div className="col-lg-3">
          <div className="card shadow-sm border-0 p-2 bg-white">
            <div className="nav flex-column nav-pills">
              <button 
                className={`nav-link text-start d-flex align-items-center gap-2 py-2.5 ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                <User size={16} /> Recruiter Profile
              </button>
              <button 
                className={`nav-link text-start d-flex align-items-center gap-2 py-2.5 ${activeTab === 'interview' ? 'active' : ''}`}
                onClick={() => setActiveTab('interview')}
              >
                <Video size={16} /> Interview Setup
              </button>
              <button 
                className={`nav-link text-start d-flex align-items-center gap-2 py-2.5 ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={16} /> Notification Alerts
              </button>
              <button 
                className={`nav-link text-start d-flex align-items-center gap-2 py-2.5 ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={16} /> Security & Access
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-lg-9">
          <div className="card shadow-sm border-0 p-4 bg-white">
            {activeTab === 'account' && (
              <form onSubmit={handleSave}>
                <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">Recruiter Contact Information</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={accountForm.name} 
                      onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Corporate Email</label>
                    <input 
                      type="email" 
                      className="form-control bg-light" 
                      value={accountForm.email} 
                      readOnly 
                    />
                    <small className="text-muted">Corporate email tied to SSO domain.</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Official Phone Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={accountForm.phone} 
                      onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Official Designation</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={accountForm.designation} 
                      onChange={(e) => setAccountForm({ ...accountForm, designation: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Division / Talent Acquisition Branch</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={accountForm.department} 
                      onChange={(e) => setAccountForm({ ...accountForm, department: e.target.value })}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary" icon={Save}>
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'interview' && (
              <form onSubmit={handleSave}>
                <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">Interview Coordination Defaults</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Default Meeting Platform</label>
                    <select 
                      className="form-select"
                      value={interviewPreferences.defaultPlatform}
                      onChange={(e) => setInterviewPreferences({ ...interviewPreferences, defaultPlatform: e.target.value })}
                    >
                      <option value="Google Meet">Google Meet</option>
                      <option value="Microsoft Teams">Microsoft Teams</option>
                      <option value="Zoom">Zoom Video Communications</option>
                      <option value="Webex">Cisco Webex</option>
                      <option value="On-Campus">On-Campus Physical Boardroom</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Default Slot Duration</label>
                    <select 
                      className="form-select"
                      value={interviewPreferences.defaultDuration}
                      onChange={(e) => setInterviewPreferences({ ...interviewPreferences, defaultDuration: e.target.value })}
                    >
                      <option value="30 mins">30 minutes</option>
                      <option value="45 mins">45 minutes</option>
                      <option value="60 mins">60 minutes</option>
                      <option value="90 mins">90 minutes</option>
                    </select>
                  </div>
                </div>

                <h6 className="fw-bold mt-4 mb-2 text-dark">Evaluation & Sharing Policies</h6>
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="autoCalendar"
                    checked={interviewPreferences.sendCalendarInvite}
                    onChange={(e) => setInterviewPreferences({ ...interviewPreferences, sendCalendarInvite: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="autoCalendar">
                    Automatically dispatch ICS calendar invites to student upon slot confirmation
                  </label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="privateNotes"
                    checked={interviewPreferences.interviewerNotesPrivate}
                    onChange={(e) => setInterviewPreferences({ ...interviewPreferences, interviewerNotesPrivate: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="privateNotes">
                    Keep interviewer scorecards and rubric marks strictly confidential within company panel (never exposed to student)
                  </label>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <Button type="submit" variant="primary" icon={Save}>
                    Save Interview Settings
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'notifications' && (
              <form onSubmit={handleSave}>
                <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">Email & Push Notifications</h5>
                <p className="text-muted small mb-4">Choose which activities trigger notifications to your registered recruiter email.</p>
                
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="applicantAlert"
                    checked={notificationSettings.emailOnNewApplicant}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailOnNewApplicant: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="applicantAlert">
                    Alert me immediately when verified candidate applies for an active recruitment drive
                  </label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="driveApprovalAlert"
                    checked={notificationSettings.emailOnDriveApproval}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailOnDriveApproval: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="driveApprovalAlert">
                    Alert me when CRPC Placement Directorate reviews, approves, or publishes submitted drives
                  </label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="interviewAcceptanceAlert"
                    checked={notificationSettings.emailOnInterviewAcceptance}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailOnInterviewAcceptance: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="interviewAcceptanceAlert">
                    Alert me when an interviewer submits completed rubric scores for a candidate
                  </label>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <Button type="submit" variant="primary" icon={Save}>
                    Save Notification Preferences
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <div>
                <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">Account Security & Role Authorization</h5>
                <div className="p-3 bg-light rounded mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    <div>
                      <h6 className="fw-bold mb-0">Role Privilege Level: {currentUser?.designation || 'Corporate Recruiter'}</h6>
                      <small className="text-muted">Domain Authorized: {currentUser?.email?.split('@')[1] || 'google.com'}</small>
                    </div>
                  </div>
                </div>

                <p className="text-secondary small mb-3">
                  Two-factor authentication is enforced via enterprise Single Sign-On (SSO). Password resets are coordinated directly through your corporate identity provider.
                </p>

                <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                  <div>
                    <h6 className="fw-bold mb-0 small">Active Corporate Session</h6>
                    <small className="text-muted">Signed in from Chrome on Windows (Current Session)</small>
                  </div>
                  <span className="badge bg-success">Secured Active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
