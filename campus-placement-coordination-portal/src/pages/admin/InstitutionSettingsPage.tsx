import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { Settings, Save, Building2, Shield, Check } from 'lucide-react';

export const InstitutionSettingsPage: React.FC = () => {
  const { settings, updateSettings, showToast } = usePlacement();

  const [institutionName, setInstitutionName] = useState(settings.institutionName);
  const [institutionCode, setInstitutionCode] = useState(settings.institutionCode);
  const [academicYear, setAcademicYear] = useState(settings.currentAcademicYear);
  const [season, setSeason] = useState(settings.currentPlacementSeason);

  const [singleOffer, setSingleOffer] = useState(settings.placementPolicy.singleOfferPolicy);
  const [superDreamCtc, setSuperDreamCtc] = useState(settings.placementPolicy.superDreamThresholdCtc);
  const [dreamCtc, setDreamCtc] = useState(settings.placementPolicy.dreamThresholdCtc);
  const [maxDrives, setMaxDrives] = useState(settings.placementPolicy.maxDrivesAStudentCanApplyTo);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      institutionName,
      institutionCode,
      currentAcademicYear: academicYear,
      currentPlacementSeason: season,
      placementPolicy: {
        ...settings.placementPolicy,
        singleOfferPolicy: singleOffer,
        superDreamThresholdCtc: Number(superDreamCtc),
        dreamThresholdCtc: Number(dreamCtc),
        maxDrivesAStudentCanApplyTo: Number(maxDrives)
      }
    });
    showToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Institution profile and placement policies updated.'
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Institution Profile & Placement Settings
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Configure college identifiers, academic calendars, and placement regulations.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* College Branding */}
        <div className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E1E5E2]">
            <Building2 className="w-5 h-5 text-[#387A70]" />
            <h2 className="text-sm font-bold text-[#182B32]">Institution Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Institution Legal Name *</label>
              <input
                type="text"
                required
                value={institutionName}
                onChange={e => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Institution Code / AISHE Code *</label>
              <input
                type="text"
                required
                value={institutionCode}
                onChange={e => setInstitutionCode(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Current Academic Year *</label>
              <input
                type="text"
                required
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Current Placement Season Phase *</label>
              <input
                type="text"
                required
                value={season}
                onChange={e => setSeason(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Placement Policies */}
        <div className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E1E5E2]">
            <Shield className="w-5 h-5 text-[#387A70]" />
            <h2 className="text-sm font-bold text-[#182B32]">Placement Policy Rules</h2>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] cursor-pointer">
              <input
                type="checkbox"
                checked={singleOffer}
                onChange={e => setSingleOffer(e.target.checked)}
                className="mt-0.5 rounded text-[#387A70] focus:ring-[#387A70]"
              />
              <div>
                <span className="font-bold text-[#182B32]">Enforce Single-Offer Policy</span>
                <p className="text-[#697780] mt-0.5 leading-relaxed">
                  When enabled, students who accept an offer are automatically marked Placed and cannot apply to standard category drives, ensuring equitable opportunity distribution across the batch.
                </p>
              </div>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Dream Offer Threshold (LPA)</label>
                <input
                  type="number"
                  step="0.5"
                  value={dreamCtc}
                  onChange={e => setDreamCtc(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Super Dream Threshold (LPA)</label>
                <input
                  type="number"
                  step="0.5"
                  value={superDreamCtc}
                  onChange={e => setSuperDreamCtc(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Max Concurrent Drive Applications</label>
                <input
                  type="number"
                  value={maxDrives}
                  onChange={e => setMaxDrives(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Institutional Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
