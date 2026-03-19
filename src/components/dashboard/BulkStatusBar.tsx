import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Loader2, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';

interface BulkStatusBarProps {
  current: number;
  total: number;
  isActive: boolean;
  onStop: () => void;
  onStart: () => void;
  type: 'unfollow' | 'follow';
}

export const BulkStatusBar: React.FC<BulkStatusBarProps> = ({
  current,
  total,
  isActive,
  onStop,
  onStart,
  type
}) => {
  const percent = total > 0 ? (current / total) * 100 : 0;
  const isComplete = !isActive && current > 0 && current === total;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bulk-status-container mb-10"
    >
      <Card glass className="p-6 md:p-8" noHover>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
                  isActive ? "bg-accent/20 text-accent animate-pulse" : 
                  isComplete ? "bg-success/20 text-success" :
                  type === 'unfollow' ? "bg-error/20 text-error" : "bg-success/20 text-success"
                )}>
                  {isActive ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : isComplete ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Play size={20} className="ml-0.5" />
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight">
                    Bulk {type === 'unfollow' ? 'Unfollow' : 'Follow'} Action
                  </h3>
                  <p className="text-xs font-mono text-tertiary uppercase tracking-widest mt-0.5">
                    {isActive ? 'Processing queue...' : isComplete ? 'Action complete!' : 'Ready to start'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-mono tracking-tighter">
                  {current} <span className="text-tertiary text-lg">/ {total}</span>
                </div>
                <div className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">
                  Users Processed
                </div>
              </div>
            </div>
            
            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={clsx(
                  "absolute inset-y-0 left-0 transition-colors",
                  type === 'unfollow' ? "bg-error" : "bg-success"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" 
                   style={{ backgroundSize: '200% 100%' }} />
            </div>
          </div>

          <div className="flex shrink-0">
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="stop"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <Button 
                    variant="danger" 
                    onClick={onStop}
                    className="h-14 px-8 rounded-2xl bg-error/10 text-error border-error/20 hover:bg-error hover:text-white"
                  >
                    <Square size={20} fill="currentColor" />
                    <span className="font-black uppercase tracking-widest ml-2">Stop Action</span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="start"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <Button 
                    variant={type === 'unfollow' ? 'danger' : 'success'} 
                    onClick={onStart}
                    disabled={total === 0 || isComplete}
                    className="h-14 px-8 rounded-2xl shadow-xl active:scale-95"
                  >
                    <Play size={20} fill="currentColor" className="mr-2" />
                    <span className="font-black uppercase tracking-widest">
                      {isComplete ? 'Finished' : type === 'unfollow' ? 'Unfollow All' : 'Follow All'}
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
