import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Zap, Heart, UserMinus } from 'lucide-react';
import { Card } from '../ui/Card';
import type { AppStats } from '../../types/github';
// import { HealthCircle } from './HealthCircle';

export const StatsSection: React.FC<AppStats> = ({
  following,
  followers,
  mutual,
  nonMutual,
  fans
}) => {
  // const healthScore = following > 0 ? (mutual / following) * 100 : 0;

  const stats = [
    { label: 'Following', value: following, color: 'var(--accent)', icon: Users },
    { label: 'Followers', value: followers, color: '#a855f7', icon: UserCheck },
    { label: 'Mutual', value: mutual, color: 'var(--success)', icon: Zap },
    { label: 'Fans', value: fans, color: '#f59e0b', icon: Heart },
    { label: 'Not Following', value: nonMutual, color: 'var(--error)', icon: UserMinus },
  ];

  return (
    <div className="mb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
          >
            <Card className="p-8 flex flex-col items-center justify-center text-center group relative overflow-hidden h-full" glass>
              <div 
                className="absolute inset-x-0 bottom-0 h-1 transition-all duration-300 opacity-30 group-hover:opacity-100" 
                style={{ background: stat.color }} 
              />
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.15 }}
                className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:bg-white/[0.08] group-hover:border-white/10 transition-all shadow-lg"
                style={{ color: stat.color }}
              >
                <stat.icon size={24} />
              </motion.div>
              <div className="stat-value text-4xl font-black tracking-tighter tabular-nums mb-2" style={{ color: stat.color }}>
                {stat.value.toLocaleString()}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-text-tertiary group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
