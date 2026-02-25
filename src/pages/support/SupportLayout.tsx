import React from 'react';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';

interface SupportPageProps {
  title: string;
  description: string;
}

export const SupportPageLayout: React.FC<SupportPageProps & { children: React.ReactNode }> = ({ title, description, children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="page-header">
        <h2 className="gradient-text">{title}</h2>
        <p>{description}</p>
      </div>
      <Card className="support-content" noHover style={{ padding: '3rem', minHeight: '400px' }}>
        {children}
      </Card>
    </div>
  );
};
