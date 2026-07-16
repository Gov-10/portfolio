import Terminal from '@/components/Terminal';
import ClusterStatus from '@/components/ClusterStatus';
import { GitBranch, Mail, ChevronDown } from 'lucide-react';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.56V9h3.554v11.452z"/>
  </svg>
);

export default function Home() {
  return (
    <main className="relative bg-zinc-950 select-none">
      {/* ===== HERO: full-screen terminal ===== */}
      <section className="relative h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,0,0,0.6),transparent)]" />

        <div className="relative z-10 flex flex-col h-full px-4 md:px-8 py-4 md:py-6 gap-4">
          {/* Breadcrumb */}
          <div className="w-full max-w-6xl mx-auto font-mono text-sm text-zinc-500 tracking-wide shrink-0">
            production.govind.sys <span className="text-zinc-700">›</span> index <span className="text-zinc-700">›</span> render()
          </div>

          {/* Compact header */}
          <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-4 shrink-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl md:text-2xl font-mono font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                GOVIND S
                <span className="text-emerald-400 cursor-blink">_</span>
              </h1>
              <span className="text-xs font-normal text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-900/50">
                SRE / Platform Engineer
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> online
              </span>
            </div>

            <div className="flex items-center space-x-3 font-mono text-sm">
              <a href="https://github.com/Gov-10" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors px-2.5 py-1.5 rounded hover:bg-emerald-950/20">
                <GitBranch className="w-4 h-4" /> git
              </a>
              <span className="text-zinc-800">|</span>
              <a href="https://linkedin.com/in/govind-sys-1061a2314" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors px-2.5 py-1.5 rounded hover:bg-emerald-950/20">
                <LinkedinIcon className="w-4 h-4" /> ln
              </a>
              <span className="text-zinc-800">|</span>
              <a href="mailto:govindsys1008@gmail.com" className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors px-2.5 py-1.5 rounded hover:bg-emerald-950/20">
                <Mail className="w-4 h-4" /> smtp
              </a>
            </div>
          </div>

          {/* Terminal fills all remaining space */}
          <div className="w-full max-w-6xl mx-auto flex-1 min-h-0 flex">
            <Terminal />
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#status"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-zinc-600 hover:text-emerald-400 transition-colors font-mono text-[10px] tracking-widest"
        >
          MORE
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      {/* ===== BELOW THE FOLD: stats + footer ===== */}
      <section id="status" className="relative flex flex-col items-center px-4 py-16 space-y-8 border-t border-zinc-900">
        <ClusterStatus />
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          PROD-ENGINE // DESIGNED FOR HIGHEST RUNTIME AVAILABILITY
        </div>
      </section>
    </main>
  );
}
