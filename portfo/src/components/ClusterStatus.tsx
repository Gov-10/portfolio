import React from 'react';

export default function ClusterStatus() {
  const metrics = [
    { label: "Projects Shipped", val: "KubeAid, Reliq", status: "2026" },
    { label: "GitHub Activity", val: "1900+ Contributions", status: "100% PR" },
    { label: "Current Focus", val: "Observability & Platform Eng", status: "Ongoing" },
    { label: "Hackathons", val: "6+ Finals / Top Ranks", status: "2025–26" }
  ];

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono">
      {metrics.map((m, idx) => (
        <div key={idx} className="bg-zinc-900/40 border border-zinc-800/60 p-4 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{m.label}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">{m.status}</span>
          </div>
          <p className="text-sm text-zinc-200 font-medium truncate">{m.val}</p>
        </div>
      ))}
    </div>
  );
}
