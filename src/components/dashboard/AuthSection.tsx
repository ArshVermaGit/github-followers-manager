import React, { useState } from 'react';
import { Eye, EyeOff, Search, RotateCcw } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { motion } from 'framer-motion';

interface AuthSectionProps {
  onAnalyze: (token: string, username: string) => void;
  onReset: () => void;
  isLoading: boolean;
  progress: number;
  progressLabel: string;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ 
  onAnalyze, 
  onReset, 
  isLoading, 
  progress, 
  progressLabel 
}) => {
  const [token, setToken] = useState(() => localStorage.getItem('gh_token') || '');
  const [username, setUsername] = useState(() => localStorage.getItem('gh_user') || '');
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token && username) {
      localStorage.setItem('gh_token', token.trim());
      localStorage.setItem('gh_user', username.trim());
      onAnalyze(token.trim(), username.trim());
    }
  };

  const handleReset = () => {
    localStorage.removeItem('gh_token');
    localStorage.removeItem('gh_user');
    setToken('');
    setUsername('');
    onReset();
  };

  return (
    <Card className="auth-card" noHover>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-row">
          <Input 
            label="Personal Access Token"
            type={showToken ? 'text' : 'password'}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxx"
            autoComplete="off"
            icon={
              <button 
                type="button" 
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          
          <Input 
            label="Your GitHub Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-username"
            autoComplete="off"
          />
        </div>

        <div className="auth-actions">
          <Button 
            type="submit" 
            loading={isLoading}
            disabled={!token || !username}
            className="btn-primary"
          >
            {!isLoading && <Search size={18} />}
            Fetch & Analyze
          </Button>
          
          <Button 
            type="button" 
            variant="ghost"
            onClick={handleReset}
            disabled={isLoading}
            className="btn-ghost"
          >
            <RotateCcw size={18} />
            Reset
          </Button>
        </div>
      </form>

      {progress > 0 && (
        <div className="progress-container">
          <div className="progress-track">
            <motion.div 
              className="progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
          <div className="progress-info">
             <p className="progress-label">{progressLabel}</p>
             <span className="progress-percent">{Math.round(progress)}%</span>
          </div>
        </div>
      )}
    </Card>
  );
};
