import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  width, 
  height, 
  circle 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={clsx(
        "bg-white/5",
        circle ? "rounded-full" : "rounded-xl",
        className
      )}
      style={{ width, height }}
    />
  );
};

export const UserItemSkeleton = () => (
  <div className="premium-card p-5 flex items-center gap-5">
    <Skeleton circle width="3.5rem" height="3.5rem" />
    <div className="flex-1 space-y-2">
      <Skeleton width="120px" height="1.25rem" />
      <Skeleton width="180px" height="0.875rem" />
    </div>
    <div className="flex items-center gap-3">
      <Skeleton width="80px" height="1.5rem" className="rounded-full" />
      <Skeleton width="100px" height="2.5rem" className="rounded-xl" />
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="premium-card p-6 flex flex-col items-center text-center">
     <Skeleton circle width="32px" height="32px" className="mb-4" />
     <Skeleton width="64px" height="2.5rem" className="mb-2" />
     <Skeleton width="80px" height="10px" className="rounded-full" />
  </div>
);
