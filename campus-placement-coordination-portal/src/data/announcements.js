import { INITIAL_ANNOUNCEMENTS } from '../services/seedData';

export const announcementsData = INITIAL_ANNOUNCEMENTS;

export const getActiveAnnouncements = () => {
  return announcementsData.filter(a => !a.isArchived);
};

export const getAnnouncementsByRole = (role) => {
  return announcementsData.filter(a => !a.isArchived && (a.targetAudience === 'ALL' || a.targetAudience === role));
};

export default announcementsData;
