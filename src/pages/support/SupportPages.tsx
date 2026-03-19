import { Link } from 'react-router-dom';
import { SupportPageLayout } from './SupportLayout';

export const FeaturesPage = () => (
  <SupportPageLayout title="Strategic Features" description="Harness the full power of the GitHub network with our professional-grade tools.">
    <div className="space-y-16">
      <section>
        <h3 className="text-3xl font-black mb-6 tracking-tighter text-white">Network Analysis</h3>
        <p className="text-text-secondary text-lg leading-relaxed">Our advanced algorithm synchronizes your following and followers list to identify exactly who is contributing to your network and who is just taking up space.</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 list-none p-0">
          {[
            'Identify non-mutual connections instantly',
            'Discover hidden fans waiting for follow-backs',
            'Synchronize relationship graphs in real-time',
            'Analyze account health with relative precision'
          ].map((item, i) => (
            <li key={i} className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl flex items-center gap-4 group transition-all hover:bg-white/[0.05] hover:border-accent/30">
              <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform" />
              <span className="text-base font-bold text-text-secondary group-hover:text-white transition-colors">{item}</span>
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h3 className="text-3xl font-black mb-6 tracking-tighter text-white">High-Throughput Bulk Actions</h3>
        <p className="text-text-secondary text-lg leading-relaxed">Stop wasting time on individual follow actions. Our bulk management system allows for high-velocity network cleanup while respecting GitHub's rate limits.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
           <div className="p-8 bg-error/5 border border-error/10 rounded-3xl group transition-all hover:bg-error/10">
              <h4 className="text-error text-xl font-black tracking-tight mb-3 uppercase">Bulk Unfollow</h4>
              <p className="text-sm text-error/70 leading-relaxed">Securely disconnect from non-mutual accounts at scale with a single click. Ideal for high-velocity network purging.</p>
           </div>
           <div className="p-8 bg-success/5 border border-success/10 rounded-3xl group transition-all hover:bg-success/10">
              <h4 className="text-success text-xl font-black tracking-tight mb-3 uppercase">Bulk Follow Back</h4>
              <p className="text-sm text-success/70 leading-relaxed">Instantly connect with your faithful fans to build a more engaged audience. Reward loyalty with automation.</p>
           </div>
        </div>
      </section>
    </div>
  </SupportPageLayout>
);

export const HowItWorksPage = () => (
  <SupportPageLayout title="How It Works" description="Transparent, secure, and decentralized by design.">
    <div className="space-y-10">
      <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
        <h3 className="text-2xl font-black mb-4 tracking-tight text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-accent text-black text-sm flex items-center justify-center font-black">1</span>
          Secure Authentication
        </h3>
        <p className="text-text-secondary text-lg leading-relaxed">You generate a Personal Access Token (Classic) on GitHub with <code className="bg-white/10 px-2 py-0.5 rounded text-accent">read:user</code> and <code className="bg-white/10 px-2 py-0.5 rounded text-accent">user:follow</code>. This token functions as your secure key—it is never sent to our servers and remains encrypted in your local machine's storage.</p>
      </div>
      <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-success/10 blur-3xl rounded-full" />
        <h3 className="text-2xl font-black mb-4 tracking-tight text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-success text-black text-sm flex items-center justify-center font-black">2</span>
          Direct Peer-to-Peer Link
        </h3>
        <p className="text-text-secondary text-lg leading-relaxed">Your browser establishes a direct, encrypted connection to the GitHub API. This bypasses the need for any intermediary storage or third-party data handlers, ensuring maximum privacy.</p>
      </div>
      <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
        <h3 className="text-2xl font-black mb-4 tracking-tight text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-accent text-black text-sm flex items-center justify-center font-black">3</span>
          Edge Computing
        </h3>
        <p className="text-text-secondary text-lg leading-relaxed">All analysis happens on the edge—right in your browser. This ensures that your network data is processed privately and at maximum speed without the latency of cloud-based analysis.</p>
      </div>
    </div>
  </SupportPageLayout>
);

export const PrivacyPage = () => (
  <SupportPageLayout title="Privacy Architecture" description="Privacy is a feature, not an afterthought.">
    <div className="space-y-12 text-text-secondary max-w-3xl">
      <section className="space-y-4">
        <h3 className="text-white text-3xl font-black tracking-tighter">Zero-Knowledge Platform</h3>
        <p className="text-lg leading-relaxed">This application is built as a static utility. We have zero servers, zero databases, and zero tracking pixels. Your data is your own, and it stays where it belongs: with you.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white text-3xl font-black tracking-tighter">Local-First Persistence</h3>
        <p className="text-lg leading-relaxed">Configuration data, such as your token and username, are stored strictly within the <code className="bg-white/10 px-1.5 py-0.5 rounded">localStorage</code> of your browser. This means you have ultimate control over your data—wipe it clean at any time via browser settings.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white text-3xl font-black tracking-tighter">No Third-Party Cookies</h3>
        <p className="text-lg leading-relaxed">We do not use any tracking cookies or analytics engines. Your experience is completely isolated, direct, and private from third-party observation.</p>
      </section>
    </div>
  </SupportPageLayout>
);

export const TermsPage = () => (
  <SupportPageLayout title="Terms of Engagement" description="Standard open-source terms for a modern utility.">
    <div className="space-y-12 text-text-secondary max-w-3xl">
      <section className="space-y-4">
        <h3 className="text-white text-3xl font-black tracking-tighter">MIT Open Source License</h3>
        <p className="text-lg leading-relaxed">This software is provided "as-is" without warranty of any kind. You are free to inspect the codebase and modify it to suit your needs, provided you respect the original license.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white text-3xl font-black tracking-tighter">Responsible Automation</h3>
        <p className="text-lg leading-relaxed">Users are expected to use the automation features responsibly. While we include safeguards, you are responsible for adhering to the GitHub Terms of Service and API policies at all times.</p>
      </section>
    </div>
  </SupportPageLayout>
);

export const FAQPage = () => (
  <SupportPageLayout title="FAQ" description="Technical answers to common inquiries.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { q: "Is this secure?", a: "100%. All processing is client-side. Your token never leaves your browser, and we have no server-side component to capture data." },
        { q: "Why use a token?", a: "Tokens provide scoped access to the GitHub API, allowing for secure management without sharing your primary account password." },
        { q: "What limits exist?", a: "We respect GitHub's standard rate limits—typically 5000 requests per hour for personal access tokens with authenticated scopes." },
        { q: "Can I use it on mobile?", a: "Yes, the interface is fully responsive and optimized for high-performance use on tablets and smartphones as well." }
      ].map((item, i) => (
        <div key={i} className="p-10 bg-white/[0.03] border border-white/10 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
          <h4 className="font-black text-xl text-white mb-4 tracking-tight group-hover:text-accent transition-colors">{item.q}</h4>
          <p className="text-base text-text-secondary leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </SupportPageLayout>
);

export const ContactPage = () => (
  <SupportPageLayout title="Contact Hub" description="Direct channels for feedback and collaboration.">
    <div className="max-w-2xl mx-auto space-y-6">
      {[
        { label: "Email Support", value: "arshverma.dev@gmail.com", href: "mailto:arshverma.dev@gmail.com" },
        { label: "Direct Message", value: "@TheArshVerma on X", href: "https://x.com/TheArshVerma" },
        { label: "Codebase Concerns", value: "@ArshVermaGit on GitHub", href: "https://github.com/ArshVermaGit" }
      ].map((link, i) => (
        <a key={i} href={link.href} className="flex flex-col sm:flex-row sm:items-center justify-between p-8 bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.06] hover:border-accent/30 transition-all group gap-4">
           <span className="text-base font-black text-text-secondary group-hover:text-white uppercase tracking-widest">{link.label}</span>
           <span className="text-accent font-black text-lg sm:text-right">{link.value}</span>
        </a>
      ))}
    </div>
  </SupportPageLayout>
);

export const DisclaimerPage = () => (
  <SupportPageLayout title="Disclaimer" description="Official legal standing and affiliations.">
    <div className="space-y-12 text-text-secondary max-w-3xl">
      <section className="space-y-4">
        <h3 className="text-white text-3xl font-black tracking-tighter">Non-Affiliation</h3>
        <p className="text-lg leading-relaxed">This project is an independent open-source utility and is not affiliated with, sponsored by, or endorsed by GitHub, Inc. or Microsoft Corporation in any official capacity.</p>
      </section>
      <section className="space-y-4">
        <h3 className="text-white text-3xl font-black tracking-tighter">Use at Own Risk</h3>
        <p className="text-lg leading-relaxed">While designed for maximum safety and data privacy, the author accepts no responsibility for any actions taken on your GitHub account as a result of using this professional utility.</p>
      </section>
    </div>
  </SupportPageLayout>
);

export const CookiePolicyPage = () => (
  <SupportPageLayout title="Cookie Transparency" description="Zero-tracking policy overview.">
     <div className="p-16 border-2 border-dashed border-white/10 rounded-[3rem] text-center bg-white/[0.01]">
        <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">Cookie-Free Experience</h3>
        <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">We do not employ any HTTP cookies for tracking, marketing, or persistence. All application state is stored locally on your device via standard browser storage APIs.</p>
     </div>
  </SupportPageLayout>
);

export const ChangelogPage = () => (
  <SupportPageLayout title="Changelog" description="The technical evolution of the platform.">
    <div className="space-y-16">
      <div className="relative pl-12 border-l-4 border-accent/20">
        <div className="absolute top-0 -left-[1.125rem] w-8 h-8 rounded-full bg-black border-4 border-accent shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center p-1">
          <div className="w-full h-full rounded-full bg-accent animate-pulse" />
        </div>
        <h3 className="text-3xl font-black text-white tracking-tighter mb-2">v2.0.0 - Premium Transformation</h3>
        <p className="text-sm text-accent mb-6 font-black uppercase tracking-widest">March 2026</p>
        <ul className="text-text-secondary text-lg space-y-3 list-none p-0">
          {[
            'Complete UI/UX overhaul with premium glassmorphism design',
            'Advanced animations and high-velocity feedback with Framer Motion',
            'Optimized API orchestration and intelligent rate-limiting',
            'Fully responsive 12-column grid architecture across all viewports'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-accent mt-1.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative pl-12 border-l-4 border-white/5 opacity-50">
        <div className="absolute top-0 -left-[0.625rem] w-4 h-4 rounded-full bg-white/10 border-2 border-white/20" />
        <h3 className="text-2xl font-black text-white/50 tracking-tighter mb-1">v1.2.0 - Bulk Utilities</h3>
        <p className="text-xs text-text-tertiary mb-4 font-black uppercase tracking-widest">January 2026</p>
        <p className="text-text-secondary/50 leading-relaxed">Introduced high-throughput bulk follow/unfollow capabilities with granular state management and manual interruption control.</p>
      </div>
    </div>
  </SupportPageLayout>
);

export const SitemapPage = () => (
  <SupportPageLayout title="System Map" description="A complete index of every reachable interface.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {[
         { to: "/", label: "Dashboard" },
         { to: "/features", label: "Features" },
         { to: "/how-it-works", label: "How It Works" },
         { to: "/privacy", label: "Privacy" },
         { to: "/terms", label: "Terms" },
         { to: "/contact", label: "Contact" },
         { to: "/faq", label: "FAQ" },
         { to: "/changelog", label: "Changelog" }
       ].map((link) => (
         <Link key={link.to} to={link.to} className="p-10 bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.08] hover:border-accent/40 text-center font-black text-xs uppercase tracking-[0.2em] transition-all hover:shadow-2xl hover:shadow-accent/5 flex items-center justify-center min-h-[140px]">
           {link.label}
         </Link>
       ))}
    </div>
  </SupportPageLayout>
);
