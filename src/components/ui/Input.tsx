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
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        <input 
          className={cn("", className)} 
          {...props} 
        />
        {icon && <div className="input-icon-btn">{icon}</div>}
      </div>
    </div>
  );
};
