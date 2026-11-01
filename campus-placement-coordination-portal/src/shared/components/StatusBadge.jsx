import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle, Sparkles } from 'lucide-react';

export const StatusBadge = ({
  status,
  size = 'md',
  showIcon = true,
  customLabel
}) => {
  if (!status) return null;

  const normalized = String(status).toUpperCase();

  const getBadgeConfig = () => {
    switch (normalized) {
      case 'VERIFIED':
      case 'APPROVED':
      case 'ACTIVE':
      case 'PUBLISHED':
      case 'ACCEPTED':
      case 'PLACED':
      case 'COMPLETED':
      case 'OFFERED':
        return {
          icon: CheckCircle2,
          label: customLabel || normalized.replace(/_/g, ' '),
          classes: 'bg-[#E8F5EE] text-[#287449] border-[#287449]/20'
        };

      case 'PENDING':
      case 'UNDER_REVIEW':
      case 'IN_PROGRESS':
      case 'SCHEDULED':
      case 'DRAFT':
        return {
          icon: Clock,
          label: customLabel || normalized.replace(/_/g, ' '),
          classes: 'bg-[#FCF6E9] text-[#8A642A] border-[#8A642A]/20'
        };

      case 'REJECTED':
      case 'DECLINED':
      case 'CANCELLED':
      case 'UNPLACED':
      case 'EXPIRED':
        return {
          icon: XCircle,
          label: customLabel || normalized.replace(/_/g, ' '),
          classes: 'bg-[#FEF3F2] text-[#B42318] border-[#B42318]/20'
        };

      case 'ACTION_REQUIRED':
      case 'CHANGES_REQUESTED':
        return {
          icon: AlertCircle,
          label: customLabel || normalized.replace(/_/g, ' '),
          classes: 'bg-amber-50 text-amber-700 border-amber-200'
        };

      case 'SUPER_DREAM':
        return {
          icon: Sparkles,
          label: customLabel || 'Super Dream',
          classes: 'bg-[#FDF9F0] text-[#8A642A] border-[#E0B66D] font-black'
        };

      case 'DREAM':
        return {
          icon: Sparkles,
          label: customLabel || 'Dream',
          classes: 'bg-[#EFF8FF] text-[#175CD3] border-[#175CD3]/20 font-bold'
        };

      case 'SHORTLISTED':
      case 'INTERVIEW':
      case 'ASSESSMENT':
        return {
          icon: Clock,
          label: customLabel || normalized.replace(/_/g, ' '),
          classes: 'bg-[#EFF8FF] text-[#175CD3] border-[#175CD3]/20'
        };

      default:
        return {
          icon: null,
          label: customLabel || normalized.replace(/_/g, ' '),
          classes: 'bg-[#F1F5F9] text-[#64748B] border-[#E0E6ED]'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md border ${sizeClasses} ${config.classes}`}
    >
      {showIcon && Icon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
