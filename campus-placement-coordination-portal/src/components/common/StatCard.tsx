import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  badge?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
  trend,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-slate-400 hover:shadow-md hover:bg-slate-50/50' : 'hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {Icon && (
          <div
            className="p-2 rounded-xl border shrink-0"
            style={{
              backgroundColor: 'var(--portal-secondary-bg, #DCE9FC)',
              borderColor: 'var(--portal-border, #BDD5F8)',
              color: 'var(--portal-primary, #3974C6)'
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-black font-tabular tracking-tight text-slate-900">
          {value}
        </span>
        {badge && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-lg border"
            style={{
              backgroundColor: 'var(--portal-page-bg, #EFF5FF)',
              color: 'var(--portal-text, #1E40AF)',
              borderColor: 'var(--portal-border, #BDD5F8)'
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
          {trend && (
            <span
              className={`font-bold ${
                trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trend.value}
            </span>
          )}
          {subtext && <span>{subtext}</span>}
        </div>
      )}
    </div>
  );
};
