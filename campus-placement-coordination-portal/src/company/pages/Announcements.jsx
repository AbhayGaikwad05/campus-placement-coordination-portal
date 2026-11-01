import React, { useState } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { Megaphone, Search, Filter, Pin, Calendar, Building2, User } from 'lucide-react';
import StatusBadge from '../../shared/components/StatusBadge';
import SearchBar from '../../shared/components/SearchBar';
import EmptyState from '../../shared/components/EmptyState';

export default function CompanyAnnouncements() {
  const { announcements } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Filter announcements for company audience or all
  const companyAnnouncements = (announcements || []).filter(a => {
    const aud = a.targetAudience || a.audience || 'ALL';
    return aud === 'ALL' || aud === 'COMPANIES' || aud === 'RECRUITERS';
  });

  const filtered = companyAnnouncements.filter(item => {
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.postedBy?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="company-announcements-page">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--navy-prestige)' }}>CRPC Official Bulletins</h2>
          <p className="text-muted mb-0 small">Direct policy advisories, campus drive schedules, and coordination notices from CRPC Office</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-primary px-3 py-2 rounded-pill font-monospace">
            {filtered.length} Notice{filtered.length !== 1 ? 's' : ''} Active
          </span>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4 p-3 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search announcements by subject, keyword, or author..."
            />
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2">
              <Filter size={16} className="text-muted" />
              <select 
                className="form-select form-select-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                <option value="POLICY">Placement Policy</option>
                <option value="DRIVE">Drive Coordination</option>
                <option value="INFRASTRUCTURE">Campus Infrastructure</option>
                <option value="GENERAL">General Notice</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState 
          icon={Megaphone}
          title="No Announcements Found"
          message="There are no official bulletins matching your query or active for corporate partners."
        />
      ) : (
        <div className="d-flex flex-column gap-3">
          {filtered.map(item => (
            <div 
              key={item.id} 
              className={`card shadow-sm border-0 border-start ${item.isPinned ? 'border-primary border-4' : 'border-2'} p-4 bg-white`}
              style={{ transition: 'all 0.2s ease' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                <div className="d-flex align-items-center gap-2">
                  {item.isPinned && (
                    <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
                      <Pin size={12} /> Pinned Advisory
                    </span>
                  )}
                  <span className="badge bg-light text-dark border">
                    {item.category || 'BULLETIN'}
                  </span>
                  <h5 className="fw-bold mb-0 text-dark">{item.title}</h5>
                </div>
                <div className="text-muted small d-flex align-items-center gap-1 font-monospace">
                  <Calendar size={14} />
                  {item.createdAt || item.date || 'Recent'}
                </div>
              </div>

              <p className="text-secondary mb-3 mt-1" style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {item.content}
              </p>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top text-muted small">
                <div className="d-flex align-items-center gap-2">
                  <Building2 size={14} className="text-primary" />
                  <span>Authority: <strong className="text-dark">{item.postedBy || 'Central CRPC Office, MIT AOE'}</strong></span>
                </div>
                <span className="badge bg-soft-info text-info rounded-pill px-3">
                  Audience: Corporate Recruiters
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
