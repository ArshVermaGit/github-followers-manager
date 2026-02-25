import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-info">
          <div className="footer-brand">
            <h3 className="gradient-text">GitHub Follow Manager</h3>
            <p className="footer-tagline">Built for developers who care about their GitHub social presence.</p>
          </div>
          <div className="footer-socials">
            <a href="https://x.com/TheArshVerma" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/ArshVermaGit" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/arshvermadev/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:arshverma.dev@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/changelog">Changelog</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-group">
          <p>© {currentYear} Arsh Verma. All rights reserved.</p>
          <a 
            href="https://github.com/ArshVermaGit/github-nonfollowers-cleaner" 
            target="_blank" 
            rel="noreferrer" 
            className="footer-repo-link"
          >
            <Github size={16} />
          </a>
          <p className="footer-credit">Built with ❤️ by <strong>Arsh Verma</strong></p>
        </div>
        
        <div className="footer-badge">
           <div className="badge-dot" />
           <span>Processing 100% locally in your browser</span>
        </div>
      </div>
    </footer>
  );
};
