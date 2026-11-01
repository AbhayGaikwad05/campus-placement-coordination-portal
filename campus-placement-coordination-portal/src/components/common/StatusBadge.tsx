import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant,
  size = 'md'
}) => {
  if (!status) return null;
  const normalized = status.toUpperCase().replace(/\s+/g, '_');

  // Remove verification tags and verified tags as requested
  if (normalized === 'VERIFIED' || normalized === 'CRPC_VERIFIED' || normalized.includes('VERIF')) {
    return null;
  }

  // Infer variant if not provided
  let finalVariant = variant;
  if (!finalVariant) {
    if (['PUBLISHED', 'OFFER_ACCEPTED', 'COMPLETED', 'ACCEPTED', 'ELIGIBLE', 'ACTIVE', 'PRESENT'].includes(normalized)) {
      finalVariant = 'success';
    } else if (['REJECTED', 'CANCELLED', 'RESTRICTED', 'INELIGIBLE', 'NO_SHOW', 'WITHDRAWN', 'DECLINED'].includes(normalized)) {
      finalVariant = 'error';
    } else if (['PENDING', 'PENDING_APPROVAL', 'PENDING_VERIFICATION', 'ACTION_REQUIRED', 'HOLD', 'PAUSED'].includes(normalized)) {
      finalVariant = 'warning';
    } else if (['APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'ASSESSMENT_SCHEDULED', 'SCHEDULED'].includes(normalized)) {
      finalVariant = 'info';
    } else {
      finalVariant = 'neutral';
    }
  }

  const dotColor = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-400'
  }[finalVariant];

  const textColor = {
    success: 'text-emerald-700',
    warning: 'text-amber-700',
    error: 'text-rose-700',
    info: 'text-blue-700',
    neutral: 'text-slate-700'
  }[finalVariant];

  const bgColor = {
    success: 'bg-emerald-50 border-emerald-200/80',
    warning: 'bg-amber-50 border-amber-200/80',
    error: 'bg-rose-50 border-rose-200/80',
    info: 'bg-blue-50 border-blue-200/80',
    neutral: 'bg-slate-100 border-slate-200'
  }[finalVariant];

  const formattedText = status.replace(/_/g, ' ');

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border rounded-lg ${
        size === 'sm' ? 'text-[11px]' : 'text-xs'
      } font-semibold tracking-tight ${bgColor} ${textColor}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} aria-hidden="true" />
      <span>{formattedText}</span>
    </span>
  );
};
