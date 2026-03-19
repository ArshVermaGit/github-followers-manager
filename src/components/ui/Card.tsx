import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLMotionProps<"div"> {
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
    <motion.div 
      className={cn(
        "premium-card relative overflow-hidden",
        glass && "glass backdrop-blur-xl bg-white/[0.02] border-white/10",
        !noHover && "hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5",
        noHover && "no-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
