import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'success' | 'stop';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  loading, 
  children, 
  disabled,
  ...props 
}) => {
  const variantClass = {
    primary: 'bg-white text-black hover:bg-white/90 shadow-xl shadow-white/5',
    ghost: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
    danger: 'bg-error/10 border border-error/20 text-error hover:bg-error/20',
    success: 'bg-success/10 border border-success/20 text-success hover:bg-success/20',
    stop: 'bg-error text-white hover:bg-error/90 shadow-xl shadow-error/20',
  }[variant];

  return (
    <button 
      className={cn(
        "px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
        variantClass,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </div>
      ) : children}
    </button>
  );
};
