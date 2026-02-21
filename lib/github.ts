import axios from "axios";
import { GitHubUser } from "@/types/github";

export class GitHubAPIError extends Error {
  status: number;
  retryAfter?: number;

  constructor(message: string, status: number, retryAfter?: number) {
    super(message);
    this.name = "GitHubAPIError";
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

export function createGitHubClient(accessToken: string) {
  return axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

// Internal helper to handle rate limits, auth errors, and transient 5xx retries
async function executeWithRetry<T>(requestFn: () => Promise<T>): Promise<T> {
  const MAX_RETRIES = 2;
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      return await requestFn();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, headers, data } = error.response;
        
        // Handle rate limits (403 or 429)
        if (
          (status === 403 && headers["x-ratelimit-remaining"] === "0") ||
          status === 429
        ) {
          const resetTimeStr = headers["x-ratelimit-reset"];
          const retryAfterHeader = String(headers["retry-after"] || "");
          
          let retryAfter = 60; // default 60 seconds
          
          if (retryAfterHeader) {
            const parsed = parseInt(retryAfterHeader, 10);
            if (!isNaN(parsed)) retryAfter = parsed;
          } else if (resetTimeStr) {
            const resetTime = parseInt(String(resetTimeStr), 10);
            if (!isNaN(resetTime)) {
              retryAfter = Math.max(0, resetTime - Math.floor(Date.now() / 1000));
            }
          }

          throw new GitHubAPIError("GitHub API rate limit exceeded.", status, retryAfter);
        }

        // Handle Auth errors
        if (status === 401) {
          throw new GitHubAPIError("GitHub API authentication failed. Invalid or expired token.", status);
        }

        // Retry on 5xx transient errors
        if (status >= 500 && status < 600 && attempt < MAX_RETRIES) {
          attempt++;
          // Exponential backoff: 1s, 2s
          const backoff = Math.pow(2, attempt - 1) * 1000;
          await new Promise((resolve) => setTimeout(resolve, backoff));
          continue;
        }

        throw new GitHubAPIError(
          data?.message || "GitHub API request failed",
          status
        );
      }
      throw error;
    }
  }
  throw new Error("Unreachable");
}

async function fetchAllPages(token: string, endpoint: string): Promise<GitHubUser[]> {
  const client = createGitHubClient(token);
  let page = 1;
  let allUsers: GitHubUser[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await executeWithRetry(() =>
      client.get<GitHubUser[]>(endpoint, {
        params: { per_page: 100, page },
      })
    );

    allUsers = allUsers.concat(response.data);

    if (response.data.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allUsers;
}

export async function fetchAllFollowers(token: string): Promise<GitHubUser[]> {
  return fetchAllPages(token, "/user/followers");
}

export async function fetchAllFollowing(token: string): Promise<GitHubUser[]> {
  return fetchAllPages(token, "/user/following");
}

export function getNotFollowingBack(followers: GitHubUser[], following: GitHubUser[]): GitHubUser[] {
  const followerLogins = new Set(followers.map((f) => f.login.toLowerCase()));
  return following.filter((user) => !followerLogins.has(user.login.toLowerCase()));
}

export async function unfollowUser(token: string, username: string): Promise<void> {
  const client = createGitHubClient(token);
  try {
    await executeWithRetry(() => client.delete(`/user/following/${username}`));
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      error.message = `Failed to unfollow ${username}: ${error.message}`;
      throw error;
    }
    throw new Error(`Failed to unfollow ${username}`);
  }
}

export async function getAuthenticatedUser(token: string): Promise<GitHubUser> {
  const client = createGitHubClient(token);
  const response = await executeWithRetry(() => client.get<GitHubUser>("/user"));
  return response.data;
}
