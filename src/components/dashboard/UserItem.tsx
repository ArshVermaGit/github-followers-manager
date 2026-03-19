import { motion } from 'framer-motion';
import { ExternalLink, Check, RotateCcw, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { UserWithState } from '../../types/github';
import { cn } from '../../utils/cn';

interface UserItemProps {
  user: UserWithState;
  onAction: (login: string) => void;
  onViewProfile?: (login: string) => void;
  actionLabel: string;
  badgeLabel: string;
  badgeType: 'danger' | 'success';
  index: number;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  onAction,
  onViewProfile,
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: Math.min(index * 0.04, 0.4), 
        duration: 0.5,
        ease: "easeOut" 
      }}
    >
      <Card 
        className={cn(
          "user-item-card group relative p-5 transition-all duration-300", 
          isDone ? "bg-white/[0.01] border-white/5 opacity-60" : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
        )} 
        noHover={isDone}
        glass={!isDone}
      >
        <div className="flex items-center gap-6 w-full relative z-10">
          <div 
            className="relative cursor-pointer shrink-0" 
            onClick={() => onViewProfile?.(user.login)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src={`${user.avatar_url}&s=100`} 
                alt={user.login} 
                className={cn(
                  "user-avatar w-16 h-16 rounded-2xl border-2 transition-all relative z-10",
                  isDone ? "border-white/5 grayscale" : "border-white/10 group-hover:border-accent/40 group-hover:shadow-lg"
                )} 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white z-20">
                <Search size={18} />
              </div>
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "font-black text-xl tracking-tighter hover:text-accent transition-colors truncate",
                  isDone ? "text-text-tertiary" : "text-white"
                )}
              >
                {user.login}
              </a>
              <ExternalLink size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {user.name && (
                <span className="text-sm font-medium text-text-tertiary truncate max-w-[200px]">
                  {user.name}
                </span>
              )}
              <Badge variant={isDone ? 'done' : badgeType} className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
                {isDone ? `✓ ${badgeLabel === 'Mutual' ? 'mutual' : (badgeType === 'danger' ? 'unfollowed' : 'followed')}` : badgeLabel}
              </Badge>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAction(user.login);
              }}
              variant={isDone ? 'primary' : isError ? 'primary' : badgeType === 'success' ? 'success' : 'danger'}
              loading={isLoading}
              disabled={isDone}
              className={cn(
                "h-11 px-8 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                isDone && "bg-white/5 text-text-tertiary border border-white/5 shadow-none opacity-50 cursor-not-allowed",
                !isDone && "shadow-xl active:scale-[0.98]"
              )}
            >
              {isDone ? (
                <Check size={20} className="text-success" />
              ) : isError ? (
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} />
                  <span>Retry</span>
                </div>
              ) : (
                actionLabel
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
