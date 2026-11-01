import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { Modal } from '../../components/common/Modal';
import { BellRing, Plus, AlertCircle, Calendar } from 'lucide-react';
import { AnnouncementItem } from '../../types';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, createAnnouncement, settings, currentUser } = usePlacement();
  if (!currentUser) return null;

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<AnnouncementItem['priority']>('NORMAL');
  const [targetDept, setTargetDept] = useState('ALL');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createAnnouncement({
      title,
      content,
      priority,
      targetDepartments: [targetDept],
      targetBatches: [2026],
      publishedBy: `${currentUser.name} (${currentUser.designation || 'Placement Officer'})`
    });

    setModalOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Campus Placement Announcements & Circulars
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Broadcast official recruitment notices, drive schedules, and policy advisories to students.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Circular</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E1E5E2] text-xs">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  ann.priority === 'URGENT' ? 'bg-[#FEE2E2] text-[#991B1B]' :
                  ann.priority === 'HIGH' ? 'bg-[#FEFCE8] text-[#8C6B1F]' :
                  'bg-[#E5EEE8] text-[#182B32]'
                }`}>
                  {ann.priority} Priority
                </span>
                <span className="text-[#697780]">
                  Target: {ann.targetDepartments.join(', ')} · Batch {ann.targetBatches.join(', ')}
                </span>
              </div>
              <span className="text-[11px] text-[#697780]">
                Published {new Date(ann.publishedAt).toLocaleDateString()} by {ann.publishedBy}
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#182B32] pt-1">{ann.title}</h3>
            <p className="text-xs text-[#697780] leading-relaxed whitespace-pre-line">{ann.content}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Broadcast Placement Circular"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Circular Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Pre-Placement Briefing Schedule"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              >
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High Priority</option>
                <option value="URGENT">Urgent Action Required</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Target Department</label>
              <select
                value={targetDept}
                onChange={e => setTargetDept(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              >
                <option value="ALL">All Departments</option>
                {settings.departments.map(d => (
                  <option key={d.code} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Content & Instructions *</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Detailed notification text..."
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#387A70] text-white font-semibold rounded-md shadow-xs"
            >
              Publish Announcement
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
