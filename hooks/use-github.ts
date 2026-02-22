"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import type { StatsResponse, UnfollowResponse } from "@/types/api";

export function useStats() {
  return useQuery<StatsResponse>({
    queryKey: ["github-stats"],
    queryFn: async () => {
      const { data } = await axios.get("/api/github/stats");
      return data;
    },
  });
}

export function useUnfollow() {
  const queryClient = useQueryClient();

  return useMutation<UnfollowResponse, Error, string, { previousStats: StatsResponse | undefined }>({
    mutationFn: async (username: string) => {
      const { data } = await axios.delete(`/api/github/unfollow/${username}`);
      return data;
    },
    onMutate: async (username: string) => {
      await queryClient.cancelQueries({ queryKey: ["github-stats"] });

      const previousStats = queryClient.getQueryData<StatsResponse>(["github-stats"]);

      if (previousStats) {
        queryClient.setQueryData<StatsResponse>(["github-stats"], {
          ...previousStats,
          following: Math.max(0, previousStats.following - 1),
          notFollowingBack: previousStats.notFollowingBack.filter((u) => u.login !== username),
        });
      }

      return { previousStats };
    },
    onError: (error: unknown, username, context) => {
      const err = error as { response?: { status: number } };
      if (context?.previousStats) {
        queryClient.setQueryData(["github-stats"], context.previousStats);
      }
      if (err.response?.status === 429) {
        toast.error("GitHub rate limit reached. Pausing for 60 seconds...");
      } else {
        toast.error(`Failed to unfollow @${username} — try again`);
      }
    },
    onSuccess: (data, username) => {
      toast.success(`Unfollowed @${username}`);
    },
    onSettled: () => {
      // Optional: invalidate queries to ensure consistency
      // queryClient.invalidateQueries({ queryKey: ["github-stats"] });
    },
  });
}
