import React from 'react';

interface MitaoeLogoProps {
  className?: string;
  showSubtext?: boolean;
}

export const MitaoeLogo: React.FC<MitaoeLogoProps> = ({
  className = '',
  showSubtext = true
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* College Official Logo cleanly presented without artificial borders or glow */}
      <img
        src="/assets/brand/mitaoe-logo.jpg"
        alt="MIT Academy of Engineering"
        className="h-8 sm:h-9 w-auto object-contain shrink-0"
      />

      <div className="flex flex-col justify-center min-w-0">
        <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-tight">
          Campus Placement <span style={{ color: 'var(--portal-primary, #3974C6)' }}>Coordination Portal</span>
        </span>
        {showSubtext && (
          <span className="text-[11px] text-slate-500 font-medium truncate hidden sm:block">
            MIT Academy of Engineering · Corporate Relations & Placement Cell
          </span>
        )}
      </div>
    </div>
  );
};
