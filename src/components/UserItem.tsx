import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, RefreshCw, XCircle } from 'lucide-react';
import type { UserWithState } from '../hooks/useGitHubManager';

interface UserItemProps {
  user: UserWithState;
  onAction: (login: string) => void;
  actionLabel: string;
  badgeLabel: string;
  badgeType: 'danger' | 'success';
  index: number;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  onAction,
  actionLabel,
  badgeLabel,
  badgeType,
  index
}) => {
  const isDone = user.state === 'done';
  const isLoading = user.state === 'loading';
  const isError = user.state === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      className={`premium-card user-item-card ${isDone ? 'done' : ''}`}
    >
      <div className="user-avatar-wrap">
        <img src={`${user.avatar_url}&s=80`} alt={user.login} className="user-avatar" loading="lazy" />
      </div>

      <div className="user-details">
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noreferrer" 
          className="user-login-link"
        >
          @{user.login}
          <ExternalLink size={12} />
        </a>
        {user.name && <div className="user-full-name">{user.name}</div>}
      </div>

      <div className={`user-badge ${badgeType} ${isDone ? 'done' : ''}`}>
        {isDone ? `✓ ${badgeType === 'danger' ? 'unfollowed' : 'following'}` : badgeLabel}
      </div>

      <button
        onClick={() => onAction(user.login)}
        disabled={isDone || isLoading}
        className={`action-btn-pill ${isDone ? 'action-done' : isError ? 'action-retry' : badgeType === 'danger' ? 'danger' : 'success'}`}
      >
        {isLoading ? (
          <RefreshCw size={14} className="animate-spin" />
        ) : isDone ? (
          <Check size={14} />
        ) : isError ? (
          <XCircle size={14} />
        ) : (
          actionLabel
        )}
      </button>
    </motion.div>
  );
};
