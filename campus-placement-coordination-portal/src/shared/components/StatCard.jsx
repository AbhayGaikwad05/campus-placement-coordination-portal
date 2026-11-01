import React from 'react';

export const StatCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
  trend,
  colorScheme = 'navy', // navy, blue, gold, green
  onClick
}) => {
  const schemeStyles = {
    navy: {
      iconBg: 'bg-[#E7EDF5]',
      iconBorder: 'border-[#17365D]/15',
      iconColor: 'text-[#17365D]'
    },
    blue: {
      iconBg: 'bg-[#EFF8FF]',
      iconBorder: 'border-[#3478C5]/20',
      iconColor: 'text-[#3478C5]'
    },
    gold: {
      iconBg: 'bg-[#FDF9F0]',
      iconBorder: 'border-[#E0B66D]/30',
      iconColor: 'text-[#8A642A]'
    },
    green: {
      iconBg: 'bg-[#E8F5EE]',
      iconBorder: 'border-[#287449]/20',
      iconColor: 'text-[#287449]'
    }
  };

  const currentScheme = schemeStyles[colorScheme] || schemeStyles.navy;

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-[#3478C5] hover:shadow-md' : 'hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
          {label}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border shrink-0 ${currentScheme.iconBg} ${currentScheme.iconBorder} ${currentScheme.iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#172B45]">
          {value}
        </span>
        {badge && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#E7EDF5] text-[#17365D] border border-[#17365D]/15">
            {badge}
          </span>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#64748B]">
          {trend && (
            <span className={`font-bold ${trend.isPositive ? 'text-[#287449]' : 'text-[#B42318]'}`}>
              {trend.value}
            </span>
          )}
          {subtext && <span>{subtext}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
