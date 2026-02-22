"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw, Search, Trash2 } from "lucide-react";

interface ActionBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCount: number;
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
  onRefresh: () => void;
  isRefetching: boolean;
  onBulkUnfollow: () => void;
  totalFiltered: number;
}

export function ActionBar({
  searchQuery,
  setSearchQuery,
  selectedCount,
  onSelectAll,
  isAllSelected,
  onRefresh,
  isRefetching,
  onBulkUnfollow,
  totalFiltered,
}: ActionBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 max-w-full overflow-x-auto">
      <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="select-all" 
            checked={isAllSelected && totalFiltered > 0} 
            onCheckedChange={onSelectAll}
            disabled={totalFiltered === 0}
            className="border-zinc-700 data-[state=checked]:bg-[#238636] data-[state=checked]:text-white"
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
          >
            Select All
          </label>
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search username..."
            className="w-full pl-9 bg-zinc-950 border-zinc-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        {selectedCount > 0 && (
          <Button 
            variant="destructive" 
            onClick={onBulkUnfollow}
            className="bg-red-900/40 text-red-500 hover:bg-red-900/60 hover:text-red-400 border border-red-900/50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Unfollow Selected ({selectedCount})
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={onRefresh} 
          disabled={isRefetching}
          className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900 focus:bg-zinc-900 text-zinc-300"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
    </div>
  );
}
