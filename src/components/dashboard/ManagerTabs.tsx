import { UserMinus, UserPlus, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ManagerTabsProps {
  activeTab: 'nonMutual' | 'fans' | 'search' | 'mutual';
  onTabChange: (tab: 'nonMutual' | 'fans' | 'search' | 'mutual') => void;
  nonMutualCount: number;
  fansCount: number;
  mutualCount: number;
}

export const ManagerTabs: React.FC<ManagerTabsProps> = ({
  activeTab,
  onTabChange,
  nonMutualCount,
  fansCount,
  mutualCount
}) => {
  const tabs = [
    { id: 'nonMutual', label: 'Non-Followers', icon: UserMinus, count: nonMutualCount, color: 'text-error' },
    { id: 'fans', label: 'Fans', icon: UserPlus, count: fansCount, color: 'text-success' },
    { id: 'mutual', label: 'Mutual', icon: ShieldCheck, count: mutualCount, color: 'text-accent' },
    { id: 'search', label: 'Search', icon: Search, count: null, color: 'text-secondary' },
  ];

  return (
    <div className="tabs-container relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as 'nonMutual' | 'fans' | 'search' | 'mutual')}
            className={cn(
              "flex-1 min-w-[140px] relative px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300",
              isActive ? "text-white" : "text-text-tertiary hover:text-text-secondary hover:bg-white/[0.02]"
            )}
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              <tab.icon size={16} className={cn("transition-colors duration-300", isActive ? tab.color : 'opacity-40')} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-black tabular-nums transition-colors duration-300",
                  isActive ? "bg-white/10 text-white" : "bg-white/5 text-text-tertiary"
                )}>
                  {tab.count}
                </span>
              )}
            </div>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
