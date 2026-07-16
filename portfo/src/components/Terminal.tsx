'use client';

import { useState, useRef, useEffect } from 'react';

type HistoryEntry = {
  type: 'input' | 'output';
  content: string | React.ReactNode;
};

const PROMPT = 'govind@production.sys:~$';

const BOOT_SEQUENCE = [
  'Initializing kernel modules...',
  'Mounting /dev/govind...',
  'Establishing secure shell session...',
  'Loading cluster context: production.govind.sys',
  'Connection established.',
];

export default function Terminal() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setBootLines(BOOT_SEQUENCE);
      setBooted(true);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setBootLines((prev) => [...prev, BOOT_SEQUENCE[i]]);
      i++;
      if (i >= BOOT_SEQUENCE.length) {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 350);
      }
    }, 220);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (booted) {
      setHistory([
        { type: 'output', content: <Banner /> },
        { type: 'output', content: "Type 'help' to see available commands." },
      ]);
    }
  }, [booted]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootLines]);

  const focusInput = () => inputRef.current?.focus();

  const commands: Record<string, () => string | React.ReactNode> = {
    help: () => (
      <div className="space-y-1">
        {[
          ['whoami', 'display current user identity'],
          ['about', 'print bio / role summary'],
          ['education', 'show academic background'],
          ['skills', 'list technical stack'],
          ['projects', 'list deployed projects'],
          ['experience', 'show work history'],
          ['achievements', 'list awards / recognitions'],
          ['contact', 'display contact endpoints'],
          ['resume', 'download resume'],
          ['neofetch', 'show system/profile summary'],
          ['sudo hire-me', 'request elevated privileges'],
          ['clear', 'clear terminal buffer'],
        ].map(([cmd, desc]) => (
          <div key={cmd}>
            <span className="text-emerald-400">{cmd.padEnd(16)}</span>
            <span className="text-zinc-500">{desc}</span>
          </div>
        ))}
      </div>
    ),
    whoami: () => 'govind-s (uid=1000) groups=sre,platform-eng,backend,sudo',
    about: () =>
      'B.Tech ECE student at IIIT Nagpur (2024–2028), a backend developer with strong inclination towards SRE and platform Engineering. I build air-gapped, observability-first infrastructure — FastAPI microservices, Kubernetes/Helm deployments, and platforms that forecast failure before it happens.',
    education: () => (
      <div className="space-y-2">
        <div>
          <p className="text-emerald-400">Indian Institute of Information Technology, Nagpur</p>
          <p className="text-zinc-300">B.Tech, Electronics &amp; Communication Engineering</p>
          <p className="text-zinc-500">Aug 2024 – July 2028</p>
        </div>
        <div>
          <p className="text-emerald-400">Nano Junior College, Hyderabad</p>
          <p className="text-zinc-300">Class XII, BIE Telangana</p>
          <p className="text-zinc-500">May 2023</p>
        </div>
      </div>
    ),
    skills: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-zinc-300">
        <div>
          <p className="text-emerald-400 mb-1">languages</p>
          <p>Python, Go, JavaScript, SQL</p>
        </div>
        <div>
          <p className="text-emerald-400 mb-1">frameworks</p>
          <p>FastAPI, Django Ninja, Next.js</p>
        </div>
        <div>
          <p className="text-emerald-400 mb-1">devops</p>
          <p>Docker, Kubernetes, Helm, Terraform</p>
          <p>Git, GitHub Actions</p>
        </div>
        <div>
          <p className="text-emerald-400 mb-1">observability</p>
          <p>Prometheus, Grafana, OpenTelemetry, Jaeger</p>
          <p>Elasticsearch, Fluent Bit, Kibana, Loki</p>
        </div>
        <div>
          <p className="text-emerald-400 mb-1">databases</p>
          <p>PostgreSQL, Redis, Qdrant</p>
        </div>
        <div>
          <p className="text-emerald-400 mb-1">cloud</p>
          <p>AWS (EC2, EKS, Lambda, Cognito, SES, S3, API GW)</p>
          <p>GCP (Cloud Run, GKE, Pub/Sub), Cloudflare Workers</p>
        </div>
        <div>
          <p className="text-emerald-400 mb-1">messaging / gateway</p>
          <p>Kafka, Redis Pub/Sub, Kong, Istio, Envoy</p>
        </div>
        <div>
          <p className="text-emerald-400 mb-1">other</p>
          <p>LangGraph, Temporal, aiobreaker, Tenacity</p>
          <p>PyTest, Postman, cURL, Distributed Systems</p>
        </div>
      </div>
    ),
    projects: () => (
      <div className="space-y-4">
        <div>
          <p className="text-emerald-400">01. KubeAid</p>
          <p className="text-zinc-500 text-sm mb-1">
            FastAPI · Next.js · Kong · Kafka · PostgreSQL · Temporal · Helm
          </p>
          <p>
            Air-gapped, workflow-driven automation engine for SREs to execute operational
            playbook templates. Packaged as a Helm chart for air-gapped deployments.
          </p>
          <p className="text-zinc-500">github.com/Gov-10/kubeaid</p>
        </div>
        <div>
          <p className="text-emerald-400">02. Reliq</p>
          <p className="text-zinc-500 text-sm mb-1">
            FastAPI · PostgreSQL · Qdrant · Prometheus · Kafka · OpenTelemetry · Go · Next.js
          </p>
          <p>
            Air-gapped operational intelligence platform that forecasts service degradation,
            computes blast radius via dependency graphs, and assists operators with AI-powered
            incident analysis. Core data-routing gateway written in Go, orchestrating Kafka,
            Qdrant, and local Ollama inference over thread-safe pipelines. Uses phi-3-mini as a
            local SLM.
          </p>
          <p className="text-zinc-500">github.com/Gov-10/reliq</p>
        </div>
        <p className="text-zinc-500 text-sm">run 'git' link in header for full source</p>
      </div>
    ),
    experience: () => (
      <div className="space-y-3 text-zinc-300">
        <div>
          <p className="text-emerald-400">Backend &amp; Cloud Operations Lead — Kazilen, IIIT Nagpur</p>
          <p className="text-zinc-500 text-sm">Sep 2025 – Present</p>
          <p>Architected FastAPI microservices; implemented the three pillars of observability
            (metrics, logs, traces) using OpenTelemetry and Grafana.</p>
        </div>
        <div>
          <p className="text-emerald-400">Backend Developer — Vyom+, IIIT Nagpur</p>
          <p className="text-zinc-500 text-sm">June 2026 – Present</p>
          <p>Backend &amp; cloud architecture for automated GST filing, with WhatsApp bot support.</p>
        </div>
        <div>
          <p className="text-emerald-400">Project Admin — Social Winter of Code 2026</p>
          <p className="text-zinc-500 text-sm">Jan 2026 – Mar 2026</p>
          <p>Contributor coordination and repository administration.</p>
        </div>
        <div>
          <p className="text-emerald-400">Open Source Contributor — GSSoC, OSCI, Hacktoberfest</p>
          <p className="text-zinc-500 text-sm">Aug 2025 – Oct 2025</p>
          <p>REST API optimization and frontend enhancements across multiple projects.</p>
        </div>
        <div>
          <p className="text-emerald-400">Frontend Intern — OwlFish Solutions</p>
          <p className="text-zinc-500 text-sm">July 2025 – Sept 2025</p>
          <p>Built internal dashboards using Next.js.</p>
        </div>
      </div>
    ),
    achievements: () => (
      <div className="space-y-1 text-zinc-300">
        <p>→ Finalist, India Innovates'26, Bharat Mandapam, New Delhi</p>
        <p>→ Finalist, AXIS'25 Web Reshape Hackathon (VNIT Nagpur) &amp; Innovortex DTU'25</p>
        <p>→ Top 12, Technex'26 IIT BHU Hack It Out</p>
        <p>→ Finalist, HackNation Global AI Hackathon @ Masters' Union</p>
        <p>→ Rank 1, EY Techathon 6.0 — First Round</p>
        <p>→ Shortlisted, Citadel Singapore SDE Intern 2026 Online Assessment</p>
        <p>→ Zonal Rank 32, International Mathematics Olympiad 2021</p>
        <p>→ Bronze Medalist, Interstate Lawn Tennis, ICSE School Games 2019</p>
        <p>→ Backend &amp; DevOps Team Lead, Kazilen</p>
        <p>→ Co-Lead, Web &amp; App Team, E-Summit IIIT Nagpur</p>
        <p>→ 1900+ GitHub contributions, 100% PR acceptance rate, 3 profile badges</p>
      </div>
    ),
    contact: () => (
      <div className="space-y-1">
        <p>phone: +91-9502808699</p>
        <p>email: govindsys1008@gmail.com</p>
        <p>github: github.com/Gov-10</p>
        <p>linkedin: linkedin.com/in/govind-sys-1061a2314</p>
      </div>
    ),
    resume: () => {
      window.open('/resume.pdf', '_blank');
      return 'downloading resume.pdf ...';
    },
    neofetch: () => (
      <div className="flex gap-6">
        <pre className="text-emerald-400 leading-tight text-xs">
{`   ___
  /   \\
 | o o |
  \\_-_/
`}
        </pre>
        <div className="space-y-1">
          <p><span className="text-emerald-400">user</span>@production.sys</p>
          <p><span className="text-emerald-400">role</span> Backend &amp; Cloud Ops Lead</p>
          <p><span className="text-emerald-400">node</span> IIIT Nagpur</p>
          <p><span className="text-emerald-400">stack</span> FastAPI / Go / K8s / OTel</p>
          <p><span className="text-emerald-400">shell</span> zsh 5.9</p>
        </div>
      </div>
    ),
    'sudo hire-me': () =>
      '[sudo] password accepted. permissions elevated. → reach out via contact.',
    date: () => new Date().toString(),
    echo: () => '',
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    const newEntries: HistoryEntry[] = [{ type: 'input', content: trimmed }];

    if (trimmed === '') {
      setHistory((h) => [...h, ...newEntries]);
      return;
    }
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const lower = trimmed.toLowerCase();
    if (lower.startsWith('echo ')) {
      newEntries.push({ type: 'output', content: trimmed.slice(5) });
    } else if (commands[lower]) {
      newEntries.push({ type: 'output', content: commands[lower]() });
    } else {
      newEntries.push({
        type: 'output',
        content: `command not found: ${trimmed} — type 'help' for a list of commands`,
      });
    }
    setHistory((h) => [...h, ...newEntries]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setCommandLog((log) => (input.trim() ? [...log, input] : log));
      setLogIndex(null);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandLog.length === 0) return;
      const nextIndex = logIndex === null ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(nextIndex);
      setInput(commandLog[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (logIndex === null) return;
      const nextIndex = logIndex + 1;
      if (nextIndex >= commandLog.length) {
        setLogIndex(null);
        setInput('');
      } else {
        setLogIndex(nextIndex);
        setInput(commandLog[nextIndex]);
      }
    }
  };

  return (
    <div
      onClick={focusInput}
      className="scanlines relative w-full bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden font-mono text-base flex flex-col"
        style={{
        boxShadow:
          '0 0 0 1px rgba(16,185,129,0.08), 0 25px 70px -25px rgba(16,185,129,0.25), 0 0 140px -50px rgba(16,185,129,0.2)',
      }}
    >
      {/* Title bar */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-zinc-400 text-sm ml-2">govind@production.sys — zsh</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 p-5 flex-1 min-h-0 overflow-y-auto custom-scrollbar text-zinc-300">
        {!booted ? (
          <div className="space-y-1.5 text-zinc-500">
            {bootLines.map((line, i) => (
              <p key={i}>
                <span className="text-emerald-500">[ ok ]</span> {line}
              </p>
            ))}
            <span className="cursor-blink text-emerald-400">▋</span>
          </div>
        ) : (
          <>
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.type === 'input' ? (
                  <div className="flex gap-2">
                    <span className="text-emerald-400 shrink-0">{PROMPT}</span>
                    <span className="text-zinc-100">{entry.content}</span>
                  </div>
                ) : (
                  <div className="text-zinc-400 whitespace-pre-wrap">{entry.content}</div>
                )}
              </div>
            ))}

            <div className="flex gap-2 items-center">
              <span className="text-emerald-400 shrink-0">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                className="flex-1 bg-transparent outline-none text-zinc-100 caret-emerald-400 text-base"
              />
            </div>
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <pre className="text-emerald-400 text-xs sm:text-sm leading-tight">
{`  ____                 _           _
 / ___| _____   ___ _ __(_)_ __   __| |
| |  _ / _ \\ \\ / / | '_ \\ | '_ \\ / _\` |
| |_| | (_) \\ V /| | | | | | | | (_| |
 \\____|\\___/ \\_/ |_|_| |_|_| |_|\\__,_|
`}
    </pre>
  );
}
