import { useState, useCallback, useRef } from 'react';
import { GitHubService } from '../services/github';
import type { GitHubUser, UserWithState, UserState, BulkStatus } from '../types/github';
import { toast } from 'sonner';

export const useGitHubManager = () => {
  const [following, setFollowing] = useState<GitHubUser[]>([]);
  const [followers, setFollowers] = useState<GitHubUser[]>([]);
  const [nonMutual, setNonMutual] = useState<UserWithState[]>([]);
  const [fans, setFans] = useState<UserWithState[]>([]);
  const [mutual, setMutual] = useState<UserWithState[]>([]);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [bulkStatus, setBulkStatus] = useState<BulkStatus>({
    active: false,
    current: 0,
    total: 0,
    stopped: false
  });

  const isStoppedRef = useRef(false);

  const analyze = useCallback(async (token: string, username: string) => {
    setIsAnalyzing(true);
    setError(null);
    setProgress(1);
    setProgressLabel('Establishing link to GitHub...');

    const service = new GitHubService(token);

    try {
      const followingList = await service.getFollowing(username, (p, n) => {
        setProgress(Math.min(5 + p * 12, 45));
        setProgressLabel(`Fetching following... ${n} users identified`);
      });

      setProgress(50);
      setProgressLabel(`Synchronizing following pool (${followingList.length} users)...`);

      const followersList = await service.getFollowers(username, (p, n) => {
        setProgress(Math.min(55 + p * 12, 90));
        setProgressLabel(`Fetching followers... ${n} users identified`);
      });

      setProgress(95);
      setProgressLabel('Analyzing relationship graph...');

      const followerSet = new Set(followersList.map(u => u.login));
      const followingSet = new Set(followingList.map(u => u.login));

      const nonMutualList = followingList
        .filter(u => !followerSet.has(u.login))
        .map(u => ({ ...u, state: 'idle' as UserState }));

      const fansList = followersList
        .filter(u => !followingSet.has(u.login))
        .map(u => ({ ...u, state: 'idle' as UserState }));

      const mutualList = followingList
        .filter(u => followerSet.has(u.login))
        .map(u => ({ ...u, state: 'done' as UserState }));

      setFollowing(followingList);
      setFollowers(followersList);
      setNonMutual(nonMutualList);
      setFans(fansList);
      setMutual(mutualList);

      setProgress(100);
      setProgressLabel(`Analysis complete. ${nonMutualList.length} targets found.`);
      
      setTimeout(() => {
        setProgress(0);
        setProgressLabel('');
      }, 2000);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failure';
      setError(msg);
      toast.error(msg);
      setProgress(0);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleAction = useCallback(async (
    token: string, 
    login: string, 
    action: 'follow' | 'unfollow',
    type: 'nonMutual' | 'fans' | 'mutual'
  ) => {
    const service = new GitHubService(token);
    const updateList = type === 'nonMutual' ? setNonMutual : (type === 'fans' ? setFans : setMutual);

    updateList(prev => prev.map(u => u.login === login ? { ...u, state: 'loading' } : u));

    try {
      if (action === 'unfollow') {
        await service.unfollow(login);
      } else {
        await service.follow(login);
      }
      updateList(prev => prev.map(u => u.login === login ? { ...u, state: 'done' } : u));
    } catch (err: unknown) {
      updateList(prev => prev.map(u => u.login === login ? { ...u, state: 'error' } : u));
      throw err;
    }
  }, []);

  const handleBulkAction = useCallback(async (
    token: string,
    type: 'nonMutual' | 'fans'
  ) => {
    const list = type === 'nonMutual' ? nonMutual : fans;
    const pending = list.filter(u => u.state !== 'done');
    const action = type === 'nonMutual' ? 'unfollow' : 'follow';
    
    isStoppedRef.current = false;
    setBulkStatus({ active: true, current: 0, total: pending.length, stopped: false });

    for (let i = 0; i < pending.length; i++) {
      if (isStoppedRef.current) break;

      setBulkStatus(prev => ({ ...prev, current: i + 1 }));

      try {
        await handleAction(token, pending[i].login, action, type);
      } catch (e) {
        console.error('Bulk element failure', e);
      }
      
      // Dynamic delay to respect GitHub API best practices for bulk actions
      await new Promise(r => setTimeout(r, 800));
    }

    setBulkStatus(prev => ({ ...prev, active: false, stopped: isStoppedRef.current }));
  }, [nonMutual, fans, handleAction]);

  const stopBulkAction = useCallback(() => {
    isStoppedRef.current = true;
    setBulkStatus(prev => ({ ...prev, stopped: true }));
  }, []);

  const reset = () => {
    setFollowing([]);
    setFollowers([]);
    setNonMutual([]);
    setFans([]);
    setMutual([]);
    setProgress(0);
    setProgressLabel('');
    setError(null);
    setBulkStatus({ active: false, current: 0, total: 0, stopped: false });
  };

  return {
    following,
    followers,
    nonMutual,
    fans,
    mutual,
    isAnalyzing,
    progress,
    progressLabel,
    bulkStatus,
    error,
    analyze,
    handleAction,
    handleBulkAction,
    stopBulkAction,
    reset
  };
};
