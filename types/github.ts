export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

export interface FollowStats {
  followers: GitHubUser[];
  following: GitHubUser[];
  notFollowingBack: GitHubUser[];
}
