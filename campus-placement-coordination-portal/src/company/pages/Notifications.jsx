import React, { useState } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { Bell, CheckCheck, Trash2, Calendar, UserCheck, Briefcase, Info, CheckCircle2 } from 'lucide-react';
import EmptyState from '../../shared/components/EmptyState';
import Button from '../../shared/components/Button';

export default function CompanyNotifications() {
  const { notifications, markNotificationRead, clearNotifications } = useAuth();
  const [filter, setFilter] = useState('ALL');

  // Filter company relevant notifications
  const userNotifications = (notifications || []).filter(n => {
    // Show all or role filtered
    return true;
  });

  const filtered = userNotifications.filter(n => {
    if (filter === 'UNREAD') return !n.read;
    if (filter === 'READ') return n.read;
    return true;
  });

  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'APPLICATION':
        return <UserCheck className="text-info" size={18} />;
      case 'DRIVE':
        return <Briefcase className="text-primary" size={18} />;
      case 'INTERVIEW':
        return <Calendar className="text-warning" size={18} />;
      default:
        return <Info className="text-secondary" size={18} />;
    }
  };

  return (
    <div className="company-notifications-page">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--navy-prestige)' }}>Notification Center</h2>
          <p className="text-muted mb-0 small">Real-time alerts regarding drive approvals, student applications, and evaluation submissions</p>
        </div>
        <div className="d-flex gap-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => userNotifications.forEach(n => markNotificationRead?.(n.id))}
              icon={CheckCheck}
            >
              Mark All as Read
            </Button>
          )}
          {userNotifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearNotifications}
              icon={Trash2}
              className="text-danger"
            >
              Clear Log
            </Button>
          )}
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4 bg-white p-2">
        <div className="d-flex gap-2 flex-wrap">
          <button 
            className={`btn btn-sm ${filter === 'ALL' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setFilter('ALL')}
          >
            All Notifications ({userNotifications.length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'UNREAD' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setFilter('UNREAD')}
          >
            Unread ({unreadCount})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'READ' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setFilter('READ')}
          >
            Read ({userNotifications.length - unreadCount})
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState 
          icon={Bell}
          title="No Notifications Found"
          message={filter === 'UNREAD' ? "You're all caught up! No unread notifications." : "There are no notifications in your log."}
        />
      ) : (
        <div className="list-group shadow-sm border-0">
          {filtered.map(item => (
            <div 
              key={item.id}
              className={`list-group-item p-3 border-0 border-bottom d-flex align-items-start gap-3 transition-all ${
                !item.read ? 'bg-light border-start border-primary border-4' : 'bg-white'
              }`}
            >
              <div className="p-2 rounded-circle bg-white shadow-sm border d-flex align-items-center justify-content-center">
                {getIcon(item.type)}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-1 flex-wrap">
                  <h6 className={`mb-0 ${!item.read ? 'fw-bold text-dark' : 'text-secondary'}`}>
                    {item.title}
                  </h6>
                  <span className="text-muted small font-monospace">
                    {item.timestamp || item.createdAt || 'Just now'}
                  </span>
                </div>
                <p className="mb-1 text-muted small" style={{ lineHeight: '1.5' }}>
                  {item.message}
                </p>
                {item.actionUrl && (
                  <a href={item.actionUrl} className="btn btn-sm btn-link p-0 text-decoration-none text-primary small fw-semibold">
                    View Associated Details &rarr;
                  </a>
                )}
              </div>
              {!item.read && (
                <button 
                  className="btn btn-sm btn-link text-muted p-1 hover-primary"
                  title="Mark as read"
                  onClick={() => markNotificationRead?.(item.id)}
                >
                  <CheckCircle2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
