import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { UserItem } from './UserItem';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { UserWithState, BulkStatus } from '../../types/github';

interface FollowersSearchProps {
  onViewProfile: (login: string) => void;
  followers: UserWithState[];
  isSearching: boolean;
  searchProgress: number;
  searchProgressLabel: string;
  bulkStatus: BulkStatus;
  searchAccount: (username: string) => Promise<void>;
  handleFollowAction: (login: string) => Promise<void>;
}

export const FollowersSearch: React.FC<FollowersSearchProps> = ({ 
  onViewProfile,
  followers,
  isSearching,
  searchProgress,
  searchProgressLabel,
  searchAccount,
  handleFollowAction
}) => {
  const [username, setUsername] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    try {
      await searchAccount(username);
    } catch (err) {
      console.error(err);
      toast.error('Search failed');
    }
  };

  return (
    <div className="followers-search-section space-y-12">
      <Card noHover className="p-10 md:p-16 relative overflow-hidden group mb-12" glass>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] -mr-48 -mt-48 rounded-full transition-all duration-700 group-hover:bg-accent/20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/5 blur-[100px] -ml-32 -mb-32 rounded-full transition-all duration-700 group-hover:bg-success/10" />
        
        <form onSubmit={handleSearch} className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter gradient-text">Find New Connections</h2>
            <p className="text-text-secondary text-base md:text-lg max-w-lg mx-auto leading-relaxed">Discover followers from any GitHub account and expand your professional network with a single click.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="GitHub Username (e.g. torvalds)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSearching}
                className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl px-8 font-bold text-xl focus:border-accent/40 focus:bg-white/[0.06] transition-all outline-none placeholder:text-text-tertiary/30 shadow-inner"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-text-tertiary">
                <Search size={24} className="opacity-20 group-focus-within:opacity-100 group-focus-within:text-accent transition-all animate-in" />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isSearching || !username}
              className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-white/90 shadow-2xl shadow-white/10 font-black text-sm uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center"
            >
              {isSearching ? <Loader2 className="animate-spin mr-2" size={24} /> : <Search size={22} className="mr-2" />}
              <span>{isSearching ? 'Fetching Data...' : 'Explore Profile'}</span>
            </Button>
          </div>

          <AnimatePresence>
            {isSearching && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 40 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden space-y-5"
              >
                <div className="flex justify-between items-end mb-2">
                  <div className="text-left space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Active Exploration</p>
                    <p className="text-sm font-medium text-text-secondary">{searchProgressLabel}</p>
                  </div>
                  <span className="text-2xl font-black gradient-text tabular-nums">{Math.round(searchProgress)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${searchProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Card>

      <div className="user-list space-y-4">
        <AnimatePresence mode="popLayout">
          {followers.map((user, idx) => (
            <UserItem 
              key={user.login}
              user={user}
              index={idx}
              onAction={(login) => handleFollowAction(login)}
              onViewProfile={onViewProfile}
              actionLabel="Follow"
              badgeLabel="Follower"
              badgeType="success"
            />
          ))}
        </AnimatePresence>

        {!isSearching && followers.length === 0 && username && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border-2 border-dashed border-white/5 rounded-3xl"
          >
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-text-tertiary">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-white px-2">No accounts found</h3>
            <p className="text-text-tertiary mt-2">Try searching for another username or check for typos.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
