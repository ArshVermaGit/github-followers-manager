import React, { useState } from 'react';
import { Eye, EyeOff, Search, RotateCcw } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="p-8 md:p-12 mb-16 relative group" glass noHover>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Input 
              label="GitHub Personal Access Token"
              type={showToken ? 'text' : 'password'}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              autoComplete="off"
              className="h-14"
              icon={
                <button 
                  type="button" 
                  onClick={() => setShowToken(!showToken)}
                  className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  title={showToken ? "Hide token" : "Show token"}
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
              placeholder="e.g. ArshVermaGit"
              autoComplete="off"
              className="h-14"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              type="submit" 
              loading={isLoading}
              disabled={!token || !username}
              className="w-full sm:flex-[2] h-14 bg-white text-black hover:bg-white/90 font-black text-sm uppercase tracking-widest shadow-xl shadow-white/10 group active:scale-[0.98] transition-all"
            >
              {!isLoading && <Search size={20} className="mr-3 group-hover:scale-110 transition-transform" />}
              <span>{isLoading ? 'Analyzing Architecture...' : 'Fetch & Analyze Profile'}</span>
            </Button>
            
            <Button 
              type="button" 
              onClick={handleReset}
              disabled={isLoading}
              className="w-full sm:flex-1 h-14 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-sm uppercase tracking-widest active:scale-[0.98] transition-all"
            >
              <RotateCcw size={18} className="mr-2" />
              Reset
            </Button>
          </div>
        </form>

        <AnimatePresence>
          {progress > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 40 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden border-t border-white/5 pt-8"
            >
              <div className="flex justify-between items-end mb-4 group">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Active Analysis</p>
                  <p className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                    {progressLabel}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-2xl font-black gradient-text tabular-nums">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-accent via-accent to-success rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
