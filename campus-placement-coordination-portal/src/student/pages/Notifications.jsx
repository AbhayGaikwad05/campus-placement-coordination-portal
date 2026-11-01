import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { Button } from '../../shared/components/Button';
import { Bell, Check, Inbox, CheckCircle2, Clock } from 'lucide-react';

export const Notifications = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, currentUser } = usePlacement();

  const userNotifications = notifications.filter(n => {
    if (n.userId && n.userId === currentUser?.id) return true;
    if (!n.userId && (!n.targetRole || n.targetRole === 'ALL' || n.targetRole === 'STUDENT')) return true;
    return false;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
            Notifications Center
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time updates regarding application stages, document verifications, and interview invites.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Check}
          onClick={markAllNotificationsAsRead}
        >
          Mark All as Read
        </Button>
      </div>

      {userNotifications.length === 0 ? (
        <div className="bg-white border border-[#E0E6ED] rounded-xl p-12 text-center shadow-xs">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#172B45]">No Notifications</h3>
          <p className="text-xs text-[#64748B] mt-1">You're all caught up with campus recruitment updates!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {userNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                notif.read
                  ? 'bg-white border-[#E0E6ED] opacity-75'
                  : 'bg-white border-[#3478C5] shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg mt-0.5 ${notif.read ? 'bg-slate-100 text-slate-500' : 'bg-[#E7EDF5] text-[#17365D]'}`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172B45]">{notif.title}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block font-mono">{notif.timestamp}</span>
                </div>
              </div>

              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#3478C5] shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
