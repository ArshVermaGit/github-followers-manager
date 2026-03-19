import React from 'react';
import { Link } from 'react-router-dom';
import { RateLimitTracker } from './RateLimitTracker';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24 relative z-50"
    >
      <Link to="/" className="flex items-center gap-5 group transition-all">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-accent/40 group-hover:bg-white/10 transition-all shadow-xl shadow-accent/5 backdrop-blur-sm relative">
            <img src="/logo.png" alt="Logo" width={44} height={44} className="rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter gradient-text leading-none">GitHub Follow Manager</h1>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-text-tertiary mt-2">Professional Network Intelligence</p>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-lg shadow-black/20 hover:border-white/20 transition-all group"
        >
          <RateLimitTracker />
          <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_var(--success)] animate-pulse" />
        </motion.div>
      </div>
    </motion.header>
  );
};
