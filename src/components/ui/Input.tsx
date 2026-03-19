import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  className, 
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-tertiary mb-2 block">{label}</label>}
      <div className="input-wrapper relative group">
        <input 
          className={cn(
            "w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white font-mono transition-all focus:border-accent/50 focus:bg-black/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] outline-none",
            className
          )} 
          {...props} 
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary group-hover:text-secondary transition-colors">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
