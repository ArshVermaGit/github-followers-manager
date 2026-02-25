import React from 'react';
import { Link } from 'react-router-dom';
import { RateLimitTracker } from './RateLimitTracker';

export const Header: React.FC = () => {
  return (
    <header className="header-container">
      <Link to="/" className="logo-group">
        <div className="logo-box">
          <img src="/logo.png" alt="GitHub Follow Manager Logo" width={40} height={40} />
        </div>
        <div className="header-text">
          <h1 className="gradient-text">GitHub Follow Manager</h1>
          <p>Professional GitHub Network Management</p>
        </div>
      </Link>

      <div className="header-nav">
        <div className="version-pill">
          <RateLimitTracker />
          <div className="status-dot animate-pulse" />
        </div>
      </div>
    </header>
  );
};
