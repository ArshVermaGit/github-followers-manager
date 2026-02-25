import React from 'react';
import { UserMinus, UserPlus } from 'lucide-react';
import { clsx } from 'clsx';

interface ManagerTabsProps {
  activeTab: 'nonMutual' | 'fans';
  onTabChange: (tab: 'nonMutual' | 'fans') => void;
  nonMutualCount: number;
  fansCount: number;
}

export const ManagerTabs: React.FC<ManagerTabsProps> = ({
  activeTab,
  onTabChange,
  nonMutualCount,
  fansCount
}) => {
  return (
    <div className="tabs-container">
      <button
        onClick={() => onTabChange('nonMutual')}
        className={clsx(
          "tab-item",
          activeTab === 'nonMutual' && "active-tab danger"
        )}
      >
        <UserMinus size={18} />
        <span>Unfollow Non-Followers</span>
        <span className="tab-badge">{nonMutualCount}</span>
      </button>

      <button
        onClick={() => onTabChange('fans')}
        className={clsx(
          "tab-item",
          activeTab === 'fans' && "active-tab success"
        )}
      >
        <UserPlus size={18} />
        <span>Follow Back Fans</span>
        <span className="tab-badge">{fansCount}</span>
      </button>
    </div>
  );
};
