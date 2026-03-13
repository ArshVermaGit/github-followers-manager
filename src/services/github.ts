import axios from 'axios';
import type { GitHubUser } from '../types/github';

export class GitHubService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async fetch<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'): Promise<T> {
    const url = `https://api.github.com${path}`;
    try {
      const response = await axios({
        url,
        method,
        headers: {
          Authorization: `token ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      // Extract rate limits
      const remaining = response.headers['x-ratelimit-remaining'];
      const limit = response.headers['x-ratelimit-limit'];
      if (remaining) {
        window.dispatchEvent(new CustomEvent('gh-rate-limit', { 
          detail: { remaining: parseInt(remaining), limit: parseInt(limit) } 
        }));
      }

      if (method === 'DELETE' && response.status === 204) {
        return { ok: true } as unknown as T;
      }

      if (method === 'PUT' && (response.status === 204 || response.status === 200)) {
        return { ok: true } as unknown as T;
      }

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403 && err.response?.headers['x-ratelimit-remaining'] === '0') {
          const resetTime = new Date(parseInt(err.response.headers['x-ratelimit-reset']) * 1000).toLocaleTimeString();
          throw new Error(`GitHub Rate Limit Exceeded. Try again after ${resetTime}.`);
        }
        if (err.response?.status === 401) {
          throw new Error('Invalid GitHub token. Please check your credentials.');
        }
      }
      throw err;
    }
  }

  async getAllPages<T>(path: string, onPage?: (page: number, count: number) => void): Promise<T[]> {
    let out: T[] = [];
    let page = 1;
    while (true) {
      if (onPage) onPage(page, out.length);
      const batch = await this.fetch<T[]>(`${path}?per_page=100&page=${page}`);
      if (!Array.isArray(batch) || batch.length === 0) break;
      out = out.concat(batch);
      if (batch.length < 100) break;
      page++;
      // Rate limiting/sleep from original
      await new Promise(r => setTimeout(r, 120));
    }
    return out;
  }

  async getFollowing(username: string, onPage?: (page: number, count: number) => void) {
    return this.getAllPages<GitHubUser>(`/users/${username}/following`, onPage);
  }

  async getFollowers(username: string, onPage?: (page: number, count: number) => void) {
    return this.getAllPages<GitHubUser>(`/users/${username}/followers`, onPage);
  }

  async unfollow(login: string) {
    return this.fetch(`/user/following/${login}`, 'DELETE');
  }

  async follow(login: string) {
    return this.fetch(`/user/following/${login}`, 'PUT');
  }
}
