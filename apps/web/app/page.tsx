import Link from 'next/link';
import {
  Brain,
  ChevronRight,
  Eye,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Volume2,
} from 'lucide-react';

const FEATURES = [
  {
    Icon: Brain,
    label: '7-agent swarm',
    desc: 'Analyzer, Verifier, Planner, Conductor, Tagger, Scorer, Narrator — all in parallel reflexion loops.',
    accent: 'text-amber-500',
  },
  {
    Icon: RefreshCw,
    label: 'Reflexion loops',
    desc: 'Automatic iterative self-correction when confidence drops below target thresholds.',
    accent: 'text-sky-400',
  },
  {
    Icon: Volume2,
    label: 'Voice + STT',
    desc: 'LiveKit audio sessions with Deepgram transcription and real-time transcript capture.',
    accent: 'text-violet-400',
  },
  {
    Icon: Eye,
    label: 'Proctoring',
    desc: 'Attention signals and integrity checks to keep interviews consistent and auditable.',
    accent: 'text-emerald-400',
  },
  {
    Icon: TrendingUp,
    label: 'Self-evolving',
    desc: "Q's Database learns from outcomes and compounds the question selection signal.",
    accent: 'text-rose-400',
  },
  {
    Icon: ShieldCheck,
    label: 'Explainability',
    desc: 'Decision narratives, scoring breakdowns, and observability hooks for every session.',
    accent: 'text-amber-500',
  },
];

const STATS = [
  { label: 'Agent consensus rate', value: '94.2%' },
  { label: 'Avg reflexion loops', value: '1.8×' },
  { label: 'Time to decision', value: '4.2 min' },
  { label: 'Model accuracy delta', value: '+23%' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-start gap-16">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.06] text-amber-500 text-[11px] font-medium mb-8 animate-fade-up opacity-0-init delay-100">
              <span className="status-dot live" />
              WarmScreen v2 preview
            </div>

            <h1 className="font-display text-[56px] font-extrabold text-zinc-50 leading-[1.05] tracking-tight mb-5 animate-fade-up opacity-0-init delay-150">
              The AI recruiter
              <br />
              that gets smarter
              <br />
              <span className="text-gradient-amber">after every hire.</span>
            </h1>

            <p className="text-zinc-500 text-lg leading-relaxed max-w-[560px] mb-9 animate-fade-up opacity-0-init delay-200">
              Seven specialized agents run reflexion loops on every response. Voice sessions, proctoring, and a self-evolving question database that compounds interview intelligence.
            </p>

            <div className="flex items-center gap-3 animate-fade-up opacity-0-init delay-250">
              <Link href="/interviews" className="btn btn-primary">
                View interviews
                <ChevronRight size={13} />
              </Link>
              <Link href="/dashboard" className="btn btn-ghost">
                Open dashboard
              </Link>
            </div>
          </div>

          <div className="hidden lg:block flex-shrink-0 animate-fade-up opacity-0-init delay-200">
            <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const angle1 = ((i * 360) / 7 - 90) * (Math.PI / 180);
                const angle2 = (((i + 2) * 360) / 7 - 90) * (Math.PI / 180);
                const radius = 82;

                return (
                  <line
                    key={i}
                    x1={110 + radius * Math.cos(angle1)}
                    y1={110 + radius * Math.sin(angle1)}
                    x2={110 + radius * Math.cos(angle2)}
                    y2={110 + radius * Math.sin(angle2)}
                    stroke="rgba(245,158,11,0.10)"
                    strokeWidth="1"
                  />
                );
              })}

              <circle
                cx="110"
                cy="110"
                r="22"
                fill="rgba(245,158,11,.08)"
                stroke="rgba(245,158,11,.3)"
                strokeWidth="1"
              />
              <text
                x="110"
                y="106"
                textAnchor="middle"
                fill="#f59e0b"
                fontSize="8"
                fontFamily="monospace"
              >
                COND
              </text>
              <text
                x="110"
                y="117"
                textAnchor="middle"
                fill="rgba(245,158,11,.45)"
                fontSize="7"
                fontFamily="monospace"
              >
                UCTOR
              </text>

              {['Analyz', 'Verify', 'Planner', 'Tagger', 'Scorer', 'Narrat'].map((name, i) => {
                const angle = ((i * 360) / 6 - 90) * (Math.PI / 180);
                const colors = ['#f59e0b', '#38bdf8', '#a78bfa', '#34d399', '#38bdf8', '#a78bfa'];

                return (
                  <g key={name}>
                    <circle
                      cx={110 + 82 * Math.cos(angle)}
                      cy={110 + 82 * Math.sin(angle)}
                      r="14"
                      fill="#18181b"
                      stroke="rgba(63,63,70,.9)"
                      strokeWidth="1"
                    />
                    <text
                      x={110 + 82 * Math.cos(angle)}
                      y={110 + 82 * Math.sin(angle) + 3}
                      textAnchor="middle"
                      fill={colors[i]}
                      fontSize="6"
                      fontFamily="monospace"
                    >
                      {name}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="font-mono text-[10px] text-zinc-700 text-center mt-1">7-agent topology</p>
          </div>
        </div>
      </section>

      <div className="border-y border-zinc-800/60 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-800">
          {STATS.map(({ label, value }) => (
            <div key={label} className="px-6 sm:px-8 first:pl-0 last:pr-0">
              <div className="font-mono text-2xl font-medium text-zinc-100">{value}</div>
              <div className="text-zinc-600 text-[11px] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-[30px] font-bold text-zinc-50 tracking-tight mb-2">
          Built for deep signal, not checkbox hiring
        </h2>
        <p className="text-zinc-500 text-[15px] leading-relaxed mb-10 max-w-xl">
          Questions improve, models refine, patterns amplify. WarmScreen compounds interview intelligence with every session.
        </p>

        <div className="grid md:grid-cols-3 gap-3.5">
          {FEATURES.map(({ Icon, label, desc, accent }, i) => (
            <div
              key={label}
              className="hover-amber-glow card p-6 transition-all duration-200 animate-fade-up opacity-0-init"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-[9px] bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className={accent} />
                </div>
                <span className="font-display text-[13px] font-bold text-zinc-100">{label}</span>
              </div>
              <p className="text-zinc-500 text-[12.5px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
