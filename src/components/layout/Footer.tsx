import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, Github, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container relative overflow-hidden mt-32">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto py-20 px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-2xl group-hover:border-accent/40 transition-colors shadow-lg shadow-accent/5">
                <img src="/logo.png" alt="Logo" width={32} height={32} className="rounded-lg" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter gradient-text">GitHub Follow Manager</h3>
            </Link>
            <p className="text-text-secondary max-w-md leading-relaxed text-base">
              Professional-grade network intelligence for GitHub. Manage your relationships, clean your timeline, and grow your audience with data-driven precision.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "https://x.com/TheArshVerma", label: "Twitter" },
                { icon: Github, href: "https://github.com/ArshVermaGit", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/arshvermadev/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:arshverma.dev@gmail.com", label: "Email" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-text-tertiary hover:text-white transition-all"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/50">Application</h4>
              <ul className="space-y-3">
                <li><Link to="/features" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">How It Works</Link></li>
                <li><Link to="/changelog" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/50">Support</h4>
              <ul className="space-y-3">
                <li><Link to="/contact" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">Contact</Link></li>
                <li><Link to="/support" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">Help Center</Link></li>
                <li><Link to="/faq" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/50">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm font-medium text-text-tertiary hover:text-accent transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-xs font-bold text-text-tertiary">
            <span>© {currentYear} Arsh Verma</span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
              Made with <Heart size={12} className="text-error fill-current animate-pulse" /> by Arsh
            </span>
          </div>
          
          <div className="flex items-center gap-2.5 px-4 py-2 bg-accent/5 border border-accent/10 rounded-full text-[10px] font-black uppercase tracking-widest text-accent">
             <div className="w-2 h-2 bg-success rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
             <span>100% Secure Client-Side Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
