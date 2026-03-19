import { useState, useCallback, useRef } from 'react';
import { GitHubService } from '../services/github';
import type { UserWithState, UserState, BulkStatus } from '../types/github';
import { toast } from 'sonner';

export const useFollowersSearch = (token: string) => {
  const [followers, setFollowers] = useState<UserWithState[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchProgressLabel, setSearchProgressLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [bulkStatus, setBulkStatus] = useState<BulkStatus>({
    active: false,
    current: 0,
    total: 0,
    stopped: false
  });

  const isStoppedRef = useRef(false);

  const searchAccount = useCallback(async (username: string) => {
    if (!token || !username) return;

    setIsSearching(true);
    setError(null);
    setSearchProgress(1);
    setSearchProgressLabel(`Locating @${username} on the network...`);
    setFollowers([]);

    const service = new GitHubService(token);

    try {
      const followersList = await service.getFollowers(username, (p, n) => {
        setSearchProgress(Math.min(5 + p * 15, 95));
        setSearchProgressLabel(`Extracting followers... ${n} connections found`);
      });

      const listWithState = followersList.map(u => ({ ...u, state: 'idle' as UserState }));
      setFollowers(listWithState);
      setSearchProgress(100);
      setSearchProgressLabel(`${followersList.length} followers of @${username} synchronized`);
      
      setTimeout(() => {
        setSearchProgress(0);
        setSearchProgressLabel('');
      }, 3000);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Search operation failed';
      setError(msg);
      setSearchProgress(0);
      toast.error(msg);
    } finally {
      setIsSearching(false);
    }
  }, [token]);

  const handleFollowAction = useCallback(async (login: string) => {
    if (!token) return;
    const service = new GitHubService(token);

    setFollowers(prev => prev.map(u => u.login === login ? { ...u, state: 'loading' } : u));

    try {
      await service.follow(login);
      setFollowers(prev => prev.map(u => u.login === login ? { ...u, state: 'done' } : u));
    } catch (err: unknown) {
      setFollowers(prev => prev.map(u => u.login === login ? { ...u, state: 'error' } : u));
      throw err;
    }
  }, [token]);

  const handleBulkFollow = useCallback(async () => {
    if (!token) return;
    const pending = followers.filter(u => u.state !== 'done');
    
    isStoppedRef.current = false;
    setBulkStatus({ active: true, current: 0, total: pending.length, stopped: false });

    for (let i = 0; i < pending.length; i++) {
      if (isStoppedRef.current) break;

      setBulkStatus(prev => ({ ...prev, current: i + 1 }));

      try {
        await handleFollowAction(pending[i].login);
      } catch (err) {
        console.error('Action failed for bulk item', err);
      }
      
      await new Promise(r => setTimeout(r, 800));
    }

    setBulkStatus(prev => ({ ...prev, active: false, stopped: isStoppedRef.current }));
  }, [token, followers, handleFollowAction]);

  const stopBulkFollow = useCallback(() => {
    isStoppedRef.current = true;
    setBulkStatus(prev => ({ ...prev, stopped: true }));
  }, []);

  return {
    followers,
    isSearching,
    searchProgress,
    searchProgressLabel,
    bulkStatus,
    error,
    searchAccount,
    handleFollowAction,
    handleBulkFollow,
    stopBulkFollow
  };
};
