import React, { useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { AuthSection } from '../components/dashboard/AuthSection';
import { StatsSection } from '../components/dashboard/StatsSection';
import { ManagerTabs } from '../components/dashboard/ManagerTabs';
import { FollowersSearch } from '../components/dashboard/FollowersSearch';
import { UserItem } from '../components/dashboard/UserItem';
import { BulkStatusBar } from '../components/dashboard/BulkStatusBar';
import { useGitHubManager } from '../hooks/useGitHubManager';
import { useFollowersSearch } from '../hooks/useFollowersSearch';
import { Filter, SortAsc, Copy } from 'lucide-react';
import { UserItemSkeleton, StatCardSkeleton } from '../components/ui/Skeleton';
import { UserProfileModal } from '../components/ui/UserProfileModal';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

export const HomePage: React.FC = () => {
  const {
    following,
    followers,
    nonMutual,
    fans,
    mutual,
    isAnalyzing,
    progress,
    progressLabel,
    bulkStatus,
    analyze,
    handleAction,
    handleBulkAction,
    stopBulkAction,
    reset
  } = useGitHubManager();

  const [activeTab, setActiveTab] = useState<'nonMutual' | 'fans' | 'search' | 'mutual'>('nonMutual');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'alpha' | 'z' | 'pending'>('pending');
  const [token, setToken] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const search = useFollowersSearch(token);

  const handleAnalyzeWithToken = async (t: string, u: string) => {
    setToken(t);
    try {
      await analyze(t, u);
      toast.success('Analysis complete');
    } catch (err) {
      toast.error('Analysis failed', {
        description: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  };

  const filteredData = useMemo(() => {
    const data = activeTab === 'nonMutual' ? nonMutual : (activeTab === 'fans' ? fans : mutual);
    const list = [...data].filter(u => 
      u.login.toLowerCase().includes(filter.toLowerCase()) || 
      (u.name || '').toLowerCase().includes(filter.toLowerCase())
    );

    if (sortBy === 'alpha') list.sort((a, b) => a.login.localeCompare(b.login));
    if (sortBy === 'z') list.sort((a, b) => b.login.localeCompare(a.login));
    if (sortBy === 'pending') {
      list.sort((a, b) => {
        if (a.state === 'done' && b.state !== 'done') return 1;
        if (a.state !== 'done' && b.state === 'done') return -1;
        return 0;
      });
    }

    return list;
  }, [activeTab, nonMutual, fans, mutual, filter, sortBy]);

  const stats = useMemo(() => ({
    following: following.length,
    followers: followers.length,
    mutual: mutual.length,
    nonMutual: nonMutual.filter(u => u.state !== 'done').length,
    fans: fans.filter(u => u.state !== 'done').length
  }), [following, followers, nonMutual, fans, mutual]);

  const handleCopyLogins = () => {
    const logins = filteredData.map(u => u.login).join('\n');
    navigator.clipboard.writeText(logins);
    toast.success('Logins copied to clipboard');
  };

  const hasData = following.length > 0 || followers.length > 0;

  return (
    <div className="app-container min-h-screen">
      <Header />
      
      <main className="space-y-12 pb-20">
        <AuthSection 
          onAnalyze={handleAnalyzeWithToken}
          onReset={() => { reset(); setToken(''); }}
          isLoading={isAnalyzing}
          progress={progress}
          progressLabel={progressLabel}
        />

        <AnimatePresence mode="wait">
          {isAnalyzing && !hasData && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="results-section space-y-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                 {[1, 2, 3, 4, 5].map(i => <StatCardSkeleton key={i} />)}
              </div>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => <UserItemSkeleton key={i} />)}
              </div>
            </motion.div>
          )}

          {hasData && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="results-section space-y-10"
            >
              <StatsSection {...stats} />

              <div className="manager-section">
                <AnimatePresence mode="wait">
                  {activeTab === 'search' ? (
                    <BulkStatusBar 
                      key="search-bulk"
                      current={search.bulkStatus.current}
                      total={search.bulkStatus.active ? search.bulkStatus.total : search.followers.filter(u => u.state !== 'done').length}
                      isActive={search.bulkStatus.active}
                      onStop={search.stopBulkFollow}
                      onStart={() => {
                        toast.promise(search.handleBulkFollow(), {
                          loading: 'Bulk following...',
                          success: 'Bulk follow action finished',
                          error: 'Bulk action failed'
                        });
                      }}
                      type="follow"
                    />
                  ) : (
                    activeTab !== 'mutual' && (
                      <BulkStatusBar 
                        key="manager-bulk"
                        current={bulkStatus.current}
                        total={bulkStatus.active ? bulkStatus.total : (activeTab === 'nonMutual' ? nonMutual.filter(u => u.state !== 'done').length : fans.filter(u => u.state !== 'done').length)}
                        isActive={bulkStatus.active}
                        onStop={stopBulkAction}
                        onStart={() => {
                          toast.promise(handleBulkAction(token, activeTab as 'nonMutual' | 'fans'), {
                            loading: `Bulk ${activeTab === 'nonMutual' ? 'unfollowing' : 'following'}...`,
                            success: 'Bulk action finished',
                            error: 'Bulk action failed'
                          });
                        }}
                        type={activeTab === 'nonMutual' ? 'unfollow' : 'follow'}
                      />
                    )
                  )}
                </AnimatePresence>

                <div className="sticky top-4 z-50 mb-8">
                  <ManagerTabs 
                    activeTab={activeTab}
                    onTabChange={(t) => { setActiveTab(t); setFilter(''); }}
                    nonMutualCount={stats.nonMutual}
                    fansCount={stats.fans}
                    mutualCount={stats.mutual}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'search' ? (
                    <motion.div
                      key="search-view"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <FollowersSearch 
                        onViewProfile={(login) => setSelectedUser(login)}
                        followers={search.followers}
                        isSearching={search.isSearching}
                        searchProgress={search.searchProgress}
                        searchProgressLabel={search.searchProgressLabel}
                        bulkStatus={search.bulkStatus}
                        searchAccount={search.searchAccount}
                        handleFollowAction={search.handleFollowAction}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list-view"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 relative group max-w-md">
                          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary group-focus-within:text-accent transition-colors" />
                          <input 
                            type="text" 
                            placeholder="Search by username or name..." 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:border-accent/40 focus:bg-white/10 outline-none transition-all"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <button onClick={handleCopyLogins} className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-colors">
                            <Copy size={16} />
                            <span>Copy Logins</span>
                          </button>

                          <div className="h-12 px-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 group">
                            <SortAsc size={16} className="text-tertiary group-hover:text-accent transition-colors" />
                            <select 
                              value={sortBy} 
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as 'alpha' | 'z' | 'pending')}
                              className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                            >
                              <option value="pending">Pending First</option>
                              <option value="alpha">Name (A-Z)</option>
                              <option value="z">Name (Z-A)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="user-list">
                        <AnimatePresence mode="popLayout">
                          {filteredData.length > 0 ? (
                            filteredData.map((user, idx) => (
                              <UserItem 
                                key={user.login}
                                user={user}
                                index={idx}
                                onAction={(login) => handleAction(
                                  token, 
                                  login, 
                                  activeTab === 'nonMutual' ? 'unfollow' : 'follow', 
                                  activeTab
                                )}
                                onViewProfile={(login) => setSelectedUser(login)}
                                actionLabel={activeTab === 'nonMutual' ? 'Unfollow' : 'Follow Back'}
                                badgeLabel={activeTab === 'nonMutual' ? 'Not Following' : (activeTab === 'fans' ? 'Fan' : 'Mutual')}
                                badgeType={activeTab === 'nonMutual' ? 'danger' : 'success'}
                              />
                            ))
                          ) : (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl"
                            >
                              <h3 className="text-xl font-bold text-tertiary">No matching users</h3>
                              <p className="text-tertiary/50 mt-1">Try adjusting your filter or search query</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedUser && (
          <UserProfileModal 
            login={selectedUser} 
            token={token} 
            onClose={() => setSelectedUser(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
