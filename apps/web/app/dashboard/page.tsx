'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format, startOfDay, subDays } from 'date-fns';

type Interview = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  scheduledAt: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  score?: number | null;
};

type DashboardStats = {
  interviews: Interview[];
  agentPerformance: Array<{
    agent: string;
    totalExecutions: number;
    avgScore: number;
  }>;
  patterns: Array<{
    id: string;
    name: string;
    description: string;
    strength: number;
    occurrences: number;
    amplified?: boolean;
  }>;
};

function buildTrend(interviews: Interview[], days: number) {
  const now = new Date();
  const buckets = Array.from({ length: days }, (_, idx) => {
    const date = startOfDay(subDays(now, days - 1 - idx));
    return {
      date,
      label: format(date, 'MMM d'),
      completed: 0,
      avgScore: null as number | null,
    };
  });

  const byDay = new Map<number, { count: number; scoreSum: number }>();
  for (const interview of interviews) {
    if (!interview.scheduledAt) continue;
    if (interview.status !== 'COMPLETED') continue;

    const dayKey = startOfDay(new Date(interview.scheduledAt)).getTime();
    const prev = byDay.get(dayKey) || { count: 0, scoreSum: 0 };
    const score = typeof interview.score === 'number' ? interview.score : null;
    byDay.set(dayKey, {
      count: prev.count + 1,
      scoreSum: prev.scoreSum + (score ?? 0),
    });
  }

  for (const bucket of buckets) {
    const dayKey = bucket.date.getTime();
    const stats = byDay.get(dayKey);
    if (!stats) continue;

    bucket.completed = stats.count;
    bucket.avgScore = stats.count > 0 ? Number((stats.scoreSum / stats.count).toFixed(2)) : null;
  }

  return buckets;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetcher('/api/interviews'),
      fetcher('/api/agents/performance'),
      fetcher('/api/agents/patterns'),
    ])
      .then(([interviewsData, performanceData, patternsData]) => {
        setStats({
          interviews: interviewsData.interviews,
          agentPerformance: performanceData.performance,
          patterns: patternsData.patterns,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Agent performance and learning signals</p>
          </div>

          <div className="grid md:grid-cols-4 gap-3.5 mb-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="metric-card">
                <div className="skeleton h-3 w-28" />
                <div className="skeleton h-8 w-20 mt-4" />
                <div className="skeleton h-3 w-16 mt-3" />
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-3.5">
            <div className="card p-6">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-52 w-full mt-5" />
            </div>
            <div className="card p-6">
              <div className="skeleton h-4 w-40" />
              <div className="space-y-4 mt-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="skeleton h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <div className="skeleton h-3 w-36" />
                      <div className="skeleton h-3 w-20 mt-2" />
                    </div>
                    <div className="skeleton h-3 w-12" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const interviews = stats?.interviews ?? [];
  const totalInterviews = interviews.length;
  const completedInterviews = interviews.filter((i) => i.status === 'COMPLETED').length;
  const completedWithScore = interviews.filter(
    (i) => i.status === 'COMPLETED' && typeof i.score === 'number'
  );
  const avgScore =
    completedWithScore.length > 0
      ? completedWithScore.reduce((sum, i) => sum + (i.score ?? 0), 0) / completedWithScore.length
      : null;
  const trend = buildTrend(interviews, 14);

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Agent performance and learning signals</p>
        </div>

        <div className="grid md:grid-cols-4 gap-3.5 mb-6">
          <div className="metric-card">
            <div className="metric-label">Total interviews</div>
            <div className="metric-value">{totalInterviews}</div>
            <div className="metric-sub">All-time</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Completed</div>
            <div className="metric-value">{completedInterviews}</div>
            <div className="metric-sub">Status: COMPLETED</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Average score</div>
            <div className="metric-value">{avgScore === null ? '—' : avgScore.toFixed(1)}</div>
            <div className="metric-sub">Across completed interviews</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Active patterns</div>
            <div className="metric-value">{stats?.patterns?.length ?? 0}</div>
            <div className="metric-sub">High-signal tags</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-3.5 mb-6">
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-[14px] font-bold text-zinc-100">Completed interviews</h2>
                <p className="text-[11px] text-zinc-600 mt-1">Last 14 days (by scheduled date)</p>
              </div>
              <div className="font-mono text-[11px] text-zinc-600">count</div>
            </div>

            <div className="mt-5 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="completedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(63,63,70,0.35)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: '#71717a' }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#71717a' }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === 'completed') return [value, 'Completed'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => label}
                    contentStyle={{ color: '#fafafa' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#f59e0b"
                    fill="url(#completedFill)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-6">
            <div>
              <h2 className="font-display text-[14px] font-bold text-zinc-100">Agent performance</h2>
              <p className="text-[11px] text-zinc-600 mt-1">Average score and execution counts</p>
            </div>

            <div className="space-y-4 mt-5">
              {(stats?.agentPerformance ?? []).map((agent) => {
                const width = Math.max(0, Math.min(1, agent.avgScore)) * 100;
                return (
                  <div key={agent.agent} className="flex items-center gap-4">
                    <div className="avatar w-8 h-8 text-[11px]">{agent.agent.slice(0, 2).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[12px] font-medium text-zinc-100 truncate">{agent.agent}</div>
                        <div className="font-mono text-[11px] text-zinc-500">{agent.avgScore.toFixed(2)}</div>
                      </div>
                      <div className="text-[11px] text-zinc-600 mt-1">{agent.totalExecutions} executions</div>
                      <div className="agent-bar-track mt-2">
                        <div
                          className="agent-bar-fill"
                          style={{ width: `${width}%`, background: 'linear-gradient(90deg, #d97706, #f59e0b)' }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {(stats?.agentPerformance ?? []).length === 0 && (
                <div className="text-[12px] text-zinc-600">No agent performance data yet.</div>
              )}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div>
            <h2 className="font-display text-[14px] font-bold text-zinc-100">High-signal patterns</h2>
            <p className="text-[11px] text-zinc-600 mt-1">Most active amplified behaviors</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 mt-5">
            {(stats?.patterns ?? []).slice(0, 6).map((pattern) => (
              <div key={pattern.id} className="card-elevated p-4 hover-amber-glow">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-zinc-100 truncate">{pattern.name}</div>
                    <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">{pattern.description}</p>
                  </div>
                  {pattern.amplified ? <span className="amplified-badge">Amplified</span> : null}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="text-[10px] text-zinc-600 whitespace-nowrap">Strength</div>
                  <div className="strength-track">
                    <div
                      className="strength-fill"
                      style={{ width: `${Math.max(0, Math.min(1, pattern.strength)) * 100}%` }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-zinc-600 whitespace-nowrap">
                    {(pattern.strength * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="text-[10px] text-zinc-600 mt-3">Occurrences: {pattern.occurrences}</div>
              </div>
            ))}

            {(stats?.patterns ?? []).length === 0 && (
              <div className="text-[12px] text-zinc-600">No patterns detected yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
