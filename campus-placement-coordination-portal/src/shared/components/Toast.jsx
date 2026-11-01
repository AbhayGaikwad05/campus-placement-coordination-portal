import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({
  id,
  type = 'info', // success, error, warning, info
  title,
  message,
  onClose
}) => {
  const configs = {
    success: {
      icon: CheckCircle2,
      border: 'border-[#287449]/20',
      bg: 'bg-white',
      iconColor: 'text-[#287449]',
      titleColor: 'text-[#172B45]'
    },
    error: {
      icon: AlertCircle,
      border: 'border-[#B42318]/20',
      bg: 'bg-white',
      iconColor: 'text-[#B42318]',
      titleColor: 'text-[#172B45]'
    },
    warning: {
      icon: AlertTriangle,
      border: 'border-[#8A642A]/20',
      bg: 'bg-white',
      iconColor: 'text-[#8A642A]',
      titleColor: 'text-[#172B45]'
    },
    info: {
      icon: Info,
      border: 'border-[#3478C5]/20',
      bg: 'bg-white',
      iconColor: 'text-[#3478C5]',
      titleColor: 'text-[#172B45]'
    }
  };

  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${config.border} ${config.bg} shadow-lg max-w-sm w-full transition-all transform duration-200 pointer-events-auto`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 min-w-0">
        <h4 className={`text-xs font-bold ${config.titleColor}`}>{title}</h4>
        {message && <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={() => onClose(id)}
          className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
