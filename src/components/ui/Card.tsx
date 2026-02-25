import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  noHover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  glass, 
  noHover, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "premium-card",
        glass && "glass",
        noHover && "no-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
