'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { DecisionBadge } from '@/components/interviews/DecisionBadge';
import { StatusBadge } from '@/components/interviews/StatusBadge';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { Section } from '@/components/ui/Section';
import { useInterview } from '@/hooks/useInterview';

export default function InterviewDetailPage() {
  const params = useParams<{ id: string }>();
  const interviewId = typeof params.id === 'string' ? params.id : undefined;
  const { data, isLoading, error } = useInterview(interviewId);

  if (isLoading) {
    return (
      <AppShell>
        <PageHeader title="Interview" backHref="/interviews" backLabel="← Back to Interviews" />
        <div className="mt-8">
          <LoadingState label="Loading interview..." />
        </div>
      </AppShell>
    );
  }

  const interview = data?.interview;
  if (error || !interview) {
    return (
      <AppShell>
        <PageHeader title="Interview" backHref="/interviews" backLabel="← Back to Interviews" />
        <div className="mt-8">
          <EmptyState
            title="Interview not found"
            description={error?.message || 'This interview may have been deleted.'}
            action={
              <Link
                href="/interviews"
                className="text-sm font-semibold text-primary hover:text-primary-strong"
              >
                Back to interviews
              </Link>
            }
          />
        </div>
      </AppShell>
    );
  }

  const explainability = interview.explainability;
  const canStart = interview.status === 'SCHEDULED';
  const isInProgress = interview.status === 'IN_PROGRESS';

  return (
    <AppShell>
      <PageHeader
        title={interview.candidateName}
        description={interview.position}
        backHref="/interviews"
        backLabel="← Back to Interviews"
        actions={
          (canStart || isInProgress) && (
            <ButtonLink href={`/interviews/${interviewId}/start`}>
              {isInProgress ? 'Continue interview' : 'Start interview'}
            </ButtonLink>
          )
        }
      />

      <div className="mt-8 space-y-6">
        <Card className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm text-foreground-muted">{interview.candidateEmail}</div>
              <div className="mt-3">
                <StatusBadge status={interview.status} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">
                {typeof interview.score === 'number' ? interview.score.toFixed(1) : '-'}
              </div>
              <div className="mt-2">
                {interview.decision ? <DecisionBadge decision={interview.decision} /> : null}
              </div>
            </div>
          </div>
        </Card>

        {explainability && (
          <Section title="Decision explanation">
            <Card className="p-6">
              <p className="text-sm text-foreground-muted">{explainability.summary}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-base font-semibold text-success">Strengths</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
                    {explainability.strengths?.map((strength: string, i: number) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-danger">Areas for improvement</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
                    {explainability.weaknesses?.map((weakness: string, i: number) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {explainability.scoringBreakdown && (
                <div className="mt-8">
                  <h3 className="text-base font-semibold">Scoring breakdown</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(explainability.scoringBreakdown).map(([key, value]) => (
                      <Card key={key} className="bg-muted/40 p-4 shadow-none">
                        <div className="text-xs font-semibold text-foreground-muted capitalize">
                          {key}
                        </div>
                        <div className="mt-2 text-2xl font-bold text-primary">
                          {(value as number).toFixed(1)}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </Section>
        )}

        <Section title="Interview responses">
          <Card className="p-6">
            <div className="space-y-6">
              {interview.responses?.map((response: any, i: number) => (
                <div
                  key={response.id}
                  className="border-b border-border pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-base font-semibold">
                      Question {i + 1}: {response.question.content}
                    </h3>
                    <span className="text-xs text-foreground-muted">{response.duration}s</span>
                  </div>
                  <p className="mt-3 text-sm text-foreground-muted">{response.transcript}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {response.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-[var(--radius-sm)] bg-primary-soft px-2 py-1 text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>
      </div>
    </AppShell>
  );
}
