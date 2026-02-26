import React from 'react';
import { UserMinus, UserPlus, Search } from 'lucide-react';
import { clsx } from 'clsx';

interface ManagerTabsProps {
  activeTab: 'nonMutual' | 'fans' | 'search';
  onTabChange: (tab: 'nonMutual' | 'fans' | 'search') => void;
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
        <UserMinus size={20} />
        <span>Non-Followers</span>
        <span className="tab-badge">{nonMutualCount}</span>
      </button>

      <button
        onClick={() => onTabChange('fans')}
        className={clsx(
          "tab-item",
          activeTab === 'fans' && "active-tab success"
        )}
      >
        <UserPlus size={20} />
        <span>Fans</span>
        <span className="tab-badge">{fansCount}</span>
      </button>

      <button
        onClick={() => onTabChange('search')}
        className={clsx(
          "tab-item",
          activeTab === 'search' && "active-tab primary"
        )}
      >
        <Search size={20} />
        <span>Search</span>
      </button>
    </div>
  );
};
