import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, danger, success, ghost
  size = 'md', // sm, md, lg
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 cursor-pointer focus:outline-none';
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5'
  };

  const variantClasses = {
    primary: 'bg-[#17365D] hover:bg-[#254E7A] text-white shadow-sm hover:shadow active:scale-[0.99] border border-transparent',
    secondary: 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#172B45] border border-[#E0E6ED]',
    outline: 'bg-white hover:bg-[#E7EDF5] text-[#17365D] border border-[#E0E6ED] hover:border-[#3478C5]',
    danger: 'bg-[#B42318] hover:bg-[#91180D] text-white shadow-sm',
    success: 'bg-[#287449] hover:bg-[#1E5737] text-white shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900',
    gold: 'bg-[#E0B66D] hover:bg-[#CFA154] text-[#172B45] font-bold shadow-sm'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${disabled || loading ? disabledClasses : ''} ${widthClasses} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

export default Button;
