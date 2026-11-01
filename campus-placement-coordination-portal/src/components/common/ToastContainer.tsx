import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePlacement();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-[#B94C45] shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-[#D5A44D] shrink-0" />,
          info: <Info className="w-5 h-5 text-[#387A70] shrink-0" />
        };

        const borderColors = {
          success: 'border-[#DCFCE7]',
          error: 'border-[#FEE2E2]',
          warning: 'border-[#FEF08A]',
          info: 'border-[#CCFBF1]'
        };

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto bg-white border ${borderColors[toast.type]} shadow-lg rounded-lg p-3.5 flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-[#182B32]">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-[#697780] mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-[#94A3B8] hover:text-[#182B32] transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
