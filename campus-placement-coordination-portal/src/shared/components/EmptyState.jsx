import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are currently no items matching your criteria in this workspace.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="bg-white border border-[#E0E6ED] rounded-xl p-8 sm:p-12 text-center max-w-lg mx-auto my-6 shadow-xs">
      <div className="w-12 h-12 rounded-xl bg-[#E7EDF5] text-[#17365D] flex items-center justify-center mx-auto mb-4 border border-[#17365D]/10">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-[#172B45] mb-1">{title}</h3>
      <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
