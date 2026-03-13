import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitHubService } from './github';
import axios from 'axios';

vi.mock('axios');

describe('GitHubService', () => {
  const token = 'test-token';
  let service: GitHubService;

  beforeEach(() => {
    service = new GitHubService(token);
    vi.clearAllMocks();
  });

  it('should format headers correctly', async () => {
    (axios as any).mockResolvedValue({ data: [], headers: {} });
    
    await service.getFollowing('user');
    
    expect(axios).toHaveBeenCalledWith(expect.objectContaining({
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      }
    }));
  });

  it('should throw descriptive error on rate limit', async () => {
    const resetTime = Math.floor(Date.now() / 1000) + 3600;
    (axios as any).mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 403,
        headers: {
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': resetTime.toString()
        }
      }
    });

    // Mock axios.isAxiosError
    (axios as any).isAxiosError = vi.fn().mockReturnValue(true);

    await expect(service.getFollowing('user')).rejects.toThrow(/GitHub Rate Limit Exceeded/);
  });

  it('should throw descriptive error on invalid token', async () => {
    (axios as any).mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 401
      }
    });
    (axios as any).isAxiosError = vi.fn().mockReturnValue(true);

    await expect(service.getFollowing('user')).rejects.toThrow(/Invalid GitHub token/);
  });
});
