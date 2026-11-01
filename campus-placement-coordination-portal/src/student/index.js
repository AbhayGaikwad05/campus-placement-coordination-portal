import StudentLayout from './layouts/StudentLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Opportunities from './pages/Opportunities';
import OpportunityDetails from './pages/OpportunityDetails';
import Applications from './pages/Applications';
import Interviews from './pages/Interviews';
import Announcements from './pages/Announcements';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

export {
  StudentLayout,
  Dashboard,
  Dashboard as StudentDashboard,
  Profile,
  Profile as StudentProfile,
  Opportunities,
  Opportunities as StudentOpportunities,
  OpportunityDetails,
  OpportunityDetails as StudentOpportunityDetails,
  Applications,
  Applications as StudentApplications,
  Interviews,
  Interviews as StudentInterviews,
  Announcements,
  Announcements as StudentAnnouncements,
  Notifications,
  Notifications as StudentNotifications,
  Settings,
  Settings as StudentSettings
};

export default {
  StudentLayout,
  StudentDashboard: Dashboard,
  StudentProfile: Profile,
  StudentOpportunities: Opportunities,
  StudentOpportunityDetails: OpportunityDetails,
  StudentApplications: Applications,
  StudentInterviews: Interviews,
  StudentAnnouncements: Announcements,
  StudentNotifications: Notifications,
  StudentSettings: Settings
};
