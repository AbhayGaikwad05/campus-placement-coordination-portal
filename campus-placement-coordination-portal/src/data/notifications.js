import { INITIAL_NOTIFICATIONS } from '../services/seedData';

export const notificationsData = INITIAL_NOTIFICATIONS;

export const getNotificationsForUser = (userId, userRole) => {
  return notificationsData.filter(n => {
    if (n.userId && n.userId === userId) return true;
    if (!n.userId && (!n.targetRole || n.targetRole === 'ALL' || n.targetRole === userRole)) return true;
    return false;
  });
};

export default notificationsData;
