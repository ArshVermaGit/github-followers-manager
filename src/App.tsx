import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Footer } from './components/layout/Footer';
import { 
  FeaturesPage, 
  HowItWorksPage, 
  PrivacyPage, 
  TermsPage, 
  FAQPage, 
  ContactPage,
  DisclaimerPage,
  CookiePolicyPage,
  ChangelogPage,
  SitemapPage
} from './pages/support/SupportPages';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
      <Toaster 
        theme="dark" 
        position="top-right" 
        expand={false} 
        richColors 
        toastOptions={{
          style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Support & Legal */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<FAQPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
      </Routes>
      <Footer />
    </Router>
    </ErrorBoundary>
  );
};

export default App;
