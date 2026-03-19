import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Link as LinkIcon, Calendar, Users, Github, ExternalLink, Briefcase, UserCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import axios from 'axios';

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  blog: string;
  company: string;
  created_at: string;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
}

interface UserProfileModalProps {
  login: string;
  token: string;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ login, token, onClose }) => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://api.github.com/users/${login}`, {
          headers: { Authorization: `token ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [login, token]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-xl z-10"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Card noHover className="bg-surface border-white/10 shadow-2xl overflow-hidden relative">
          <button 
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-tertiary hover:bg-white/10 hover:text-white transition-all active:scale-90" 
            onClick={onClose}
          >
            <X size={20} />
          </button>
          
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
              <p className="text-sm font-bold font-mono text-tertiary uppercase tracking-widest">Identifying @{login}...</p>
            </div>
          ) : data ? (
            <div className="flex flex-col">
              <div className="h-32 bg-gradient-to-r from-accent/20 via-primary/10 to-transparent relative">
                <div className="absolute -bottom-12 left-10">
                  <motion.img 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    src={data.avatar_url} 
                    alt={login} 
                    className="w-24 h-24 rounded-3xl border-4 border-surface shadow-2xl"
                  />
                </div>
              </div>

              <div className="pt-16 pb-10 px-10 space-y-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-black tracking-tight">{data.name || login}</h2>
                    <a href={data.html_url} target="_blank" rel="noreferrer" className="text-tertiary hover:text-accent transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <p className="text-accent font-bold font-mono tracking-tight text-lg">@{login}</p>
                </div>

                {data.bio && (
                  <p className="text-secondary text-lg leading-relaxed italic border-l-2 border-white/5 pl-4">
                    "{data.bio}"
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: MapPin, value: data.location },
                    { icon: Briefcase, value: data.company },
                    { icon: LinkIcon, value: data.blog, isLink: true },
                    { icon: Calendar, value: `Joined ${new Date(data.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}` }
                  ].map((meta, i) => meta.value && (
                    <div key={i} className="flex items-center gap-3 text-sm text-tertiary font-medium">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <meta.icon size={14} className="opacity-50" />
                      </div>
                      {meta.isLink ? (
                        <a href={meta.value.startsWith('http') ? meta.value : `https://${meta.value}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors truncate">
                          {meta.value.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        <span className="truncate">{meta.value}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { label: 'Followers', value: data.followers, icon: Users },
                    { label: 'Following', value: data.following, icon: UserCheck },
                    { label: 'Repos', value: data.public_repos, icon: Github }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center group hover:bg-white/[0.08] transition-colors">
                      <div className="text-2xl font-black tracking-tighter mb-1 font-mono">{stat.value}</div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-tertiary group-hover:text-secondary transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => window.open(data.html_url, '_blank')}
                  className="w-full h-14 rounded-2xl text-lg font-black shadow-xl accent-shimmer hover:scale-[1.02]"
                >
                  <Github size={20} className="mr-3" />
                  Explore on GitHub
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center">
              <h3 className="text-xl font-bold text-error">Anomaly Detected</h3>
              <p className="text-tertiary mt-2">Could not synchronize user identity from GitHub network.</p>
              <Button onClick={onClose} variant="ghost" className="mt-6">Retreat</Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};
