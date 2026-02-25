export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  followers_url: string;
  following_url: string;
}

export type UserState = 'idle' | 'loading' | 'done' | 'error';

export interface UserWithState extends GitHubUser {
  state: UserState;
}

export interface BulkStatus {
  active: boolean;
  current: number;
  total: number;
  stopped: boolean;
}

export interface AppStats {
  following: number;
  followers: number;
  mutual: number;
  nonMutual: number;
  fans: number;
}
