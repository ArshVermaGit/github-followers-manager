"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { GitHubUser } from "@/types";

export function useFollowers() {
  return useQuery<GitHubUser[]>({
    queryKey: ["followers"],
    queryFn: async () => {
      const { data } = await axios.get("/api/github?type=followers");
      return data;
    },
  });
}

export function useFollowing() {
  return useQuery<GitHubUser[]>({
    queryKey: ["following"],
    queryFn: async () => {
      const { data } = await axios.get("/api/github?type=following");
      return data;
    },
  });
}

export function useUnfollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      await axios.delete(`/api/github?username=${username}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
    },
  });
}
