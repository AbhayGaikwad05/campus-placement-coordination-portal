import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { Modal } from '../../components/common/Modal';
import { mockService } from '../../services/mockService';
import {
  Code2,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Github,
  Globe
} from 'lucide-react';
import { CodingProfile } from '../../types';

export const CodingProfilesPage: React.FC = () => {
  const { studentProfile, updateStudentProfile, showToast } = usePlacement();
  const activeStudent = studentProfile || mockService.getStudents()[0];

  const [modalOpen, setModalOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState<CodingProfile['platform']>('LeetCode');
  const [newUsername, setNewUsername] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newSolved, setNewSolved] = useState<number>(100);

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newUrl.trim()) return;

    const newProfile: CodingProfile = {
      platform: newPlatform,
      username: newUsername,
      profileUrl: newUrl,
      solvedCount: Number(newSolved),
      rating: newPlatform === 'LeetCode' ? '1750 (Knight)' : '1400 (Specialist)',
      isVerifiedDemo: true
    };

    const updated = {
      ...activeStudent,
      codingProfiles: [...(activeStudent.codingProfiles || []), newProfile]
    };

    updateStudentProfile(updated);
    setModalOpen(false);
    setNewUsername('');
    setNewUrl('');
    showToast({
      type: 'success',
      title: 'Coding Profile Linked',
      message: `${newPlatform} profile linked for recruiter visibility.`
    });
  };

  const handleRemoveProfile = (platform: string) => {
    const updated = {
      ...activeStudent,
      codingProfiles: activeStudent.codingProfiles.filter(p => p.platform !== platform)
    };
    updateStudentProfile(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Competitive Programming & Coding Profiles
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Showcase your algorithm problem-solving rankings on LeetCode, GitHub, and Codeforces to technical interviewers.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Link Profile</span>
        </button>
      </div>

      {/* Info notice */}
      <div className="p-3 bg-[#EFF5FF] border border-[#BDD5F8] rounded-xl text-xs text-slate-700 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-[#3974C6] shrink-0" />
        <span>
          <strong className="text-slate-900">Notice:</strong> Verified badges and metrics reflect official CRPC validated records. Interviewers can access linked profiles directly during technical evaluations.
        </span>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeStudent.codingProfiles?.map(prof => (
          <div
            key={prof.platform}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-[#3974C6]/60 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-slate-800">{prof.platform}</span>
              </div>

              <p className="text-xs text-[#697780]">Handle: <strong className="text-[#182B32] font-mono">{prof.username}</strong></p>

              <div className="mt-4 p-3 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] space-y-1 text-xs">
                {prof.solvedCount !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-[#697780]">Problems Solved:</span>
                    <strong className="text-[#182B32] font-tabular">{prof.solvedCount}</strong>
                  </div>
                )}
                {prof.rating && (
                  <div className="flex justify-between">
                    <span className="text-[#697780]">Contest Rating:</span>
                    <strong className="text-[#387A70] font-tabular">{prof.rating}</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E1E5E2] flex items-center justify-between text-xs">
              <a
                href={prof.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#387A70] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Visit Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => handleRemoveProfile(prof.platform)}
                className="text-[#94A3B8] hover:text-[#B94C45] p-1"
                title="Remove profile"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Link Profile Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Link Coding Platform Profile"
      >
        <form onSubmit={handleAddProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Select Platform *</label>
            <select
              value={newPlatform}
              onChange={e => setNewPlatform(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md text-[#182B32]"
            >
              <option value="LeetCode">LeetCode</option>
              <option value="GitHub">GitHub</option>
              <option value="Codeforces">Codeforces</option>
              <option value="CodeChef">CodeChef</option>
              <option value="HackerRank">HackerRank</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Username / Handle *</label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={e => {
                setNewUsername(e.target.value);
                if (newPlatform === 'LeetCode') setNewUrl(`https://leetcode.com/${e.target.value}`);
                else if (newPlatform === 'GitHub') setNewUrl(`https://github.com/${e.target.value}`);
                else if (newPlatform === 'Codeforces') setNewUrl(`https://codeforces.com/profile/${e.target.value}`);
              }}
              placeholder="e.g. coder_aarav"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Profile URL *</label>
            <input
              type="url"
              required
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Solved Count (Verified metric)</label>
            <input
              type="number"
              value={newSolved}
              onChange={e => setNewSolved(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular text-[#182B32]"
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
              className="px-4 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
