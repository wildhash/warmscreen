'use client';

import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Section } from '@/components/ui/Section';
import { StatCard } from '@/components/ui/StatCard';
import { useDashboardStats } from '@/hooks/useDashboardStats';

export default function DashboardPage() {
  const { stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <AppShell>
        <PageHeader title="Dashboard" backHref="/" backLabel="← Back to Home" />
        <div className="mt-8">
          <LoadingState label="Loading dashboard..." />
        </div>
      </AppShell>
    );
  }

  if (error || !stats) {
    return (
      <AppShell>
        <PageHeader title="Dashboard" backHref="/" backLabel="← Back to Home" />
        <div className="mt-8">
          <EmptyState
            title="Unable to load dashboard"
            description={error?.message || 'Please try again.'}
            action={
              <Link
                href="/interviews"
                className="text-sm font-semibold text-primary hover:text-primary-strong"
              >
                Go to interviews
              </Link>
            }
          />
        </div>
      </AppShell>
    );
  }

  const totalInterviews = stats.interviews.length;
  const completedInterviews = stats.interviews.filter((i) => i.status === 'COMPLETED').length;
  const scoredInterviews = stats.interviews.filter((i) => typeof i.score === 'number');
  const avgScore =
    scoredInterviews.reduce((sum, i) => sum + (i.score || 0), 0) / (scoredInterviews.length || 1);

  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        backHref="/"
        backLabel="← Back to Home"
        actions={
          <Link
            href="/interviews"
            className="text-sm font-semibold text-primary hover:text-primary-strong"
          >
            View interviews
          </Link>
        }
      />

      <div className="mt-8 space-y-8">
        <Section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Interviews" value={totalInterviews} tone="primary" />
            <StatCard label="Completed" value={completedInterviews} tone="success" />
            <StatCard label="Average Score" value={avgScore.toFixed(1)} tone="primary" />
            <StatCard label="Active Patterns" value={stats.patterns.length} tone="warning" />
          </div>
        </Section>

        <Section
          title="Agent Performance"
          description="Execution volume and average score per agent."
        >
          <Card className="p-6">
            <div className="space-y-5">
              {stats.agentPerformance.map((agent) => (
                <div
                  key={agent.agent}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="font-semibold">{agent.agent}</div>
                    <div className="text-sm text-foreground-muted">
                      {agent.totalExecutions} executions
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-foreground-muted">Avg Score</div>
                      <div className="font-bold">{agent.avgScore.toFixed(2)}</div>
                    </div>
                    <ProgressBar value={agent.avgScore * 100} className="w-40" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Section
          title="High-signal Patterns"
          description="Recent patterns the system is amplifying."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {stats.patterns.slice(0, 6).map((pattern) => (
              <Card key={pattern.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold">{pattern.name}</div>
                  {pattern.amplified && <Badge variant="warning">Amplified</Badge>}
                </div>
                {pattern.description && (
                  <div className="mt-2 text-sm text-foreground-muted">{pattern.description}</div>
                )}
                <div className="mt-4 flex items-center justify-between text-sm text-foreground-muted">
                  <span>Strength: {(pattern.strength * 100).toFixed(0)}%</span>
                  <span>Occurrences: {pattern.occurrences}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
