import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { RateLimitTracker } from './RateLimitTracker';

export const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  ];

  return (
    <header className="header-container">
      <div className="logo-group">
        <Link to="/" className="logo-box">
          <Github size={32} />
        </Link>
        <div className="header-text">
          <h1 className="gradient-text">GitHub Follow Manager</h1>
          <p>The professional way to manage your GitHub network.</p>
        </div>
      </div>

      <nav className="header-nav">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={clsx(
              "nav-link",
              location.pathname === item.path && "active"
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
            {location.pathname === item.path && (
              <motion.div 
                layoutId="nav-pill"
                className="nav-active-pill"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>
        ))}
        <div className="version-pill">
          <RateLimitTracker />
          <div className="status-dot animate-pulse" />
        </div>
      </nav>
    </header>
  );
};
