import React, { useState } from 'react';
import { useAuth } from '../../authentication/context/AuthContext';
import { usePlacement } from '../../context/PlacementContext';
import { Button } from '../../shared/components/Button';
import { Settings as SettingsIcon, Shield, Bell, Lock, CheckCircle2 } from 'lucide-react';

export const Settings = () => {
  const { currentUser } = useAuth();
  const { showToast } = usePlacement();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    showToast({
      type: 'success',
      title: 'Preferences Saved',
      message: 'Your account settings have been updated.'
    });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
        <h1 className="text-xl font-bold tracking-tight text-[#172B45]">
          Account & Notification Settings
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Manage your portal visibility, email alerts, and security credentials.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Recruitment Alerts */}
        <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E0E6ED]">
            <Bell className="w-4 h-4 text-[#3478C5]" />
            <h3 className="text-sm font-bold text-[#172B45]">Notification Preferences</h3>
          </div>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-bold text-[#172B45]">Email Notifications for New Drives</p>
              <p className="text-[11px] text-[#64748B]">Receive alerts whenever a new drive matching your eligibility is published.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={e => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-[#17365D] rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#E0E6ED]/60">
            <div>
              <p className="text-xs font-bold text-[#172B45]">Interview SMS & WhatsApp Alerts</p>
              <p className="text-[11px] text-[#64748B]">Receive immediate SMS notifications when an interview slot is confirmed.</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={e => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 text-[#17365D] rounded"
            />
          </label>
        </div>

        {/* Visibility */}
        <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E0E6ED]">
            <Shield className="w-4 h-4 text-[#3478C5]" />
            <h3 className="text-sm font-bold text-[#172B45]">Portfolio Visibility</h3>
          </div>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-bold text-[#172B45]">Visible to Approved Visiting Corporate Partners</p>
              <p className="text-[11px] text-[#64748B]">Allow verified recruiting companies to view your portfolio and coding profiles.</p>
            </div>
            <input
              type="checkbox"
              checked={profileVisible}
              onChange={e => setProfileVisible(e.target.checked)}
              className="w-4 h-4 text-[#17365D] rounded"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-xs text-[#287449] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved successfully!</span>
            </span>
          )}
          <Button type="submit" variant="primary" size="md">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
