import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export const RateLimitTracker: React.FC = () => {
  const [stats, setStats] = useState<{ remaining: number; limit: number } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setStats(detail);
    };
    window.addEventListener('gh-rate-limit', handler);
    return () => window.removeEventListener('gh-rate-limit', handler);
  }, []);

  if (!stats) return null;

  const percent = (stats.remaining / stats.limit) * 100;
  const isLow = percent < 20;

  return (
    <div className={`rate-limit-pill ${isLow ? 'low' : ''}`}>
       <Zap size={12} fill={isLow ? "var(--accent-red)" : "currentColor"} />
       <span>{stats.remaining} API left</span>
       <div className="rate-limit-mini-bar">
          <div className="bar-fill" style={{ width: `${percent}%` }} />
       </div>
    </div>
  );
};
