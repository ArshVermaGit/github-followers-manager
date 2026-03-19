import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'danger' | 'success' | 'done' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}) => {
  return (
    <span 
      className={cn(
        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
        variant === 'danger' && 'bg-error/10 border-error/20 text-error shadow-[0_0_10px_rgba(239, 68, 68, 0.1)]',
        variant === 'success' && 'bg-success/10 border-success/20 text-success shadow-[0_0_10px_rgba(16, 185, 129, 0.1)]',
        variant === 'done' && 'bg-white/5 border-white/10 text-text-tertiary',
        variant === 'default' && 'bg-white/5 border-white/10 text-white/50',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
