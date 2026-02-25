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
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'action-btn-pill danger',
    success: 'action-btn-pill success',
    stop: 'bulk-btn stop',
  }[variant];

  return (
    <button 
      className={cn(variantClass, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="spinner"></span> : children}
    </button>
  );
};
