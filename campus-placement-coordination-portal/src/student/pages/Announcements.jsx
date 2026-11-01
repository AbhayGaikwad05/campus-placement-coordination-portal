import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { BellRing, Calendar, Tag, ShieldCheck } from 'lucide-react';

export const Announcements = () => {
  const { announcements } = usePlacement();

  const studentAnnouncements = announcements.filter(
    a => !a.isArchived && (a.targetAudience === 'ALL' || a.targetAudience === 'STUDENT')
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
            Placement Cell Announcements & Circulars
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Important notices, PPT schedules, and drive guidelines broadcasted by the CRPC Directorate.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#17365D] bg-[#E7EDF5] px-3 py-1 rounded-lg">
          {studentAnnouncements.length} active notices
        </span>
      </div>

      <div className="space-y-4">
        {studentAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs hover:border-[#3478C5] transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold text-[#E0B66D] uppercase tracking-wider flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5" />
                <span>Published on {ann.publishedAt}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E7EDF5] text-[#17365D]">
                Audience: {ann.targetAudience}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#172B45] mb-2">{ann.title}</h3>
            <p className="text-xs text-[#64748B] leading-relaxed whitespace-pre-line mb-4">
              {ann.content}
            </p>

            <div className="pt-3 border-t border-[#E0E6ED] flex items-center justify-between text-[11px] text-[#64748B]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authorized by CRPC Placement Office</span>
              </span>
              <span>MIT Academy of Engineering</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
