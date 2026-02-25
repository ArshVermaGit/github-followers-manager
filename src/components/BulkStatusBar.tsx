import React from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Loader2 } from 'lucide-react';

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

  return (
    <div className="bulk-status-container">
      <div className="premium-card glass bulk-bar">
        <div className="bulk-content">
          <div className="bulk-main">
            <div className="bulk-header">
              <div className="bulk-title">
                {isActive ? (
                  <Loader2 size={16} className="animate-spin accent-blue" />
                ) : (
                  <Play size={16} className={type === 'unfollow' ? 'accent-red' : 'accent-green'} />
                )}
                <h3>Bulk {type === 'unfollow' ? 'Unfollow' : 'Follow'}</h3>
              </div>
              <span className="bulk-counter">{current} / {total} users</span>
            </div>
            
            <div className="bulk-progress-track">
              <motion.div 
                className={`bulk-progress-fill ${type}`}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
            </div>
          </div>

          <div className="bulk-controls">
            {isActive ? (
              <button className="bulk-btn stop" onClick={onStop}>
                <Square size={14} fill="currentColor" />
                Stop
              </button>
            ) : (
              <button 
                className={`bulk-btn start ${type}`} 
                onClick={onStart}
                disabled={total === 0}
              >
                <Play size={14} fill="currentColor" />
                Start All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
