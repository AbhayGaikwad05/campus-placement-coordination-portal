import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({
  size = 'md',
  message = 'Loading data...',
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <Loader2 className={`${sizeClasses[size] || sizeClasses.md} animate-spin text-[#17365D]`} />
      {message && <p className="text-xs font-semibold text-[#64748B]">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#F5F7FA]/80 backdrop-blur-xs flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
