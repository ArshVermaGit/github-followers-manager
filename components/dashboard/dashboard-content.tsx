"use client";

import { useState, useMemo } from "react";
import { useStats } from "@/hooks/use-github";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActionBar } from "@/components/dashboard/action-bar";
import { NonFollowersTable } from "@/components/dashboard/non-followers-table";
import { BulkProgress } from "@/components/dashboard/bulk-progress";
import { UserNav } from "@/components/dashboard/user-nav";
import { Github } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export function DashboardContent() {
  const { data: session } = useSession();
  const { data: stats, isLoading, refetch, isRefetching } = useStats();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  
  // Bulk state
  const [isBulkRunning, setIsBulkRunning] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  const [bulkResults, setBulkResults] = useState<Array<{ username: string; success: boolean; error?: string }>>([]);
  const [cancelBulk, setCancelBulk] = useState(false);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!stats?.notFollowingBack) return [];
    return stats.notFollowingBack.filter((u) => 
      u.login.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stats?.notFollowingBack, searchQuery]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.login)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectOne = (username: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (checked) {
      newSelected.add(username);
    } else {
      newSelected.delete(username);
    }
    setSelectedUsers(newSelected);
  };

  const startBulkUnfollow = async () => {
    if (selectedUsers.size === 0) return;
    
    setIsBulkRunning(true);
    setCancelBulk(false);
    setBulkProgress({ current: 0, total: selectedUsers.size });
    setBulkResults([]);

    const usersToUnfollow = Array.from(selectedUsers);
    
    for (let i = 0; i < usersToUnfollow.length; i++) {
      if (cancelBulk) break; // We need a ref for this to work synchronously or handle it differently
      
      const username = usersToUnfollow[i];
      try {
        await axios.delete(`/api/github/unfollow/${username}`);
        setBulkResults(prev => [...prev, { username, success: true }]);
      } catch (error) {
        const err = error as { response?: { status: number } };
        setBulkResults(prev => [...prev, { 
          username, 
          success: false, 
          error: err.response?.status === 429 ? "Rate limited" : "Failed" 
        }]);
        if (err.response?.status === 429) {
          toast.error("GitHub rate limit reached. Run cancelled.");
          break;
        }
      }
      setBulkProgress(prev => ({ ...prev, current: i + 1 }));
      
      // Artificial delay to prevent aggressive rate limits if needed
      await new Promise(r => setTimeout(r, 500));
    }

    setIsBulkRunning(false);
    refetch(); // refresh stats
    setSelectedUsers(new Set());
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur">
        <div className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight">GitClean Dashboard</span>
        </div>
        {session?.user && <UserNav user={session.user} />}
      </header>

      <main className="flex-1 space-y-4 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <StatsCards />

        {isBulkRunning ? (
          <BulkProgress 
            progress={bulkProgress} 
            results={bulkResults} 
            onCancel={() => setCancelBulk(true)} 
          />
        ) : (
          <div className="space-y-4">
            <ActionBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCount={selectedUsers.size}
              onSelectAll={handleSelectAll}
              isAllSelected={selectedUsers.size > 0 && selectedUsers.size === filteredUsers.length}
              onRefresh={() => refetch()}
              isRefetching={isRefetching}
              onBulkUnfollow={startBulkUnfollow}
              totalFiltered={filteredUsers.length}
            />
            
            <NonFollowersTable
              users={filteredUsers}
              isLoading={isLoading}
              selectedUsers={selectedUsers}
              onSelectOne={handleSelectOne}
            />
          </div>
        )}
      </main>
    </div>
  );
}
