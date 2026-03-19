import React from 'react';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

interface SupportPageProps {
  title: string;
  description: string;
}

export const SupportPageLayout: React.FC<SupportPageProps & { children: React.ReactNode }> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="container-max py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter gradient-text leading-tight">{title}</h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">{description}</p>
        </motion.div>
        
        <Card 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="support-content p-10 md:p-20 relative overflow-hidden backdrop-blur-3xl bg-white/[0.01] border-white/5 min-h-[600px] prose prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-headings:gradient-text prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none shadow-2xl" 
          glass
          noHover
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] -mr-48 -mt-48 rounded-full opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/5 blur-[100px] -ml-32 -mb-32 rounded-full opacity-30" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {children}
          </div>
        </Card>
      </main>
    </div>
  );
};
