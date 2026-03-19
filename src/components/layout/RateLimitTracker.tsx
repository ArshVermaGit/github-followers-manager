import React, { useEffect, useState } from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export const RateLimitTracker: React.FC = () => {
  const [stats, setStats] = useState<{ remaining: number; limit: number; reset: number } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setStats(detail);
    };
    window.addEventListener('gh-rate-limit', handler);
    return () => window.removeEventListener('gh-rate-limit', handler);
  }, []);

  if (!stats) return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 opacity-30">
      <Zap size={10} className="fill-current" />
      <span className="text-[10px] font-black uppercase tracking-widest">API Status Unknown</span>
    </div>
  );

  const percent = (stats.remaining / stats.limit) * 100;
  const isLow = percent < 20;
  const isCritical = percent < 5;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx(
          "flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-md border transition-all shadow-lg",
          isCritical ? "bg-error/10 border-error/20 text-error shadow-error/10" :
          isLow ? "bg-warning/10 border-warning/20 text-warning shadow-warning/10" :
          "bg-white/5 border-white/10 text-secondary hover:border-white/20"
        )}
      >
        <div className="relative">
          <Zap 
            size={14} 
            className={clsx(
              "fill-current",
              isCritical && "animate-bounce",
              !isLow && "opacity-70"
            )} 
          />
          {isLow && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-white rounded-full p-0.5"
            >
              <AlertCircle size={8} className="text-current" />
            </motion.div>
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">
              {stats.remaining} API Credits
            </span>
            <span className="text-[10px] opacity-40 font-mono">/ {stats.limit}</span>
          </div>
          <div className="w-20 h-1 bg-current/10 rounded-full mt-1 overflow-hidden">
            <motion.div 
              className="h-full bg-current"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
