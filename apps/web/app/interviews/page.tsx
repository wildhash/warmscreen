'use client';

import { useState } from 'react';
import Link from 'next/link';

import { CreateInterviewModal } from '@/components/interviews/CreateInterviewModal';
import { InterviewsTable } from '@/components/interviews/InterviewsTable';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';

import { useDefaultRecruiter } from '@/hooks/useDefaultRecruiter';
import { useInterviews } from '@/hooks/useInterviews';

export default function InterviewsPage() {
  const { interviews, isLoading, error, mutate } = useInterviews();
  const { recruiterId, error: recruiterError } = useDefaultRecruiter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const configNotice = recruiterError
    ? 'Using fallback recruiter configuration because the default recruiter could not be loaded. Interview creation may fail until this is fixed.'
    : null;

  return (
    <AppShell>
      <PageHeader
        title="Interviews"
        backHref="/"
        backLabel="← Back to Home"
        actions={
          <Button type="button" onClick={() => setShowCreateModal(true)}>
            Create interview
          </Button>
        }
      />

      <div className="mt-8 space-y-6">
        {configNotice && (
          <Card className="border-warning/20 bg-warning-soft p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold">Configuration</div>
              <Badge variant="warning">Fallback</Badge>
            </div>
            <div className="mt-2 text-sm text-foreground-muted">{configNotice}</div>
          </Card>
        )}

        {notice && (
          <Card className="border-warning/20 bg-warning-soft p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold">Notice</div>
              <div className="flex items-center gap-2">
                <Badge variant="warning">Action needed</Badge>
                <button
                  type="button"
                  onClick={() => setNotice(null)}
                  className="text-xs font-semibold text-foreground-muted hover:text-foreground"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-foreground-muted">{notice}</div>
          </Card>
        )}

        {isLoading ? (
          <LoadingState label="Loading interviews..." />
        ) : error ? (
          <EmptyState
            title="Unable to load interviews"
            description={error.message || 'Something went wrong. Please try again.'}
            action={
              <Link
                href="/"
                className="text-sm font-semibold text-primary hover:text-primary-strong"
              >
                Back to home
              </Link>
            }
          />
        ) : interviews.length === 0 ? (
          <EmptyState
            title="No interviews yet"
            description="Create your first interview to get started."
            action={
              <Button type="button" onClick={() => setShowCreateModal(true)}>
                Create interview
              </Button>
            }
          />
        ) : (
          <InterviewsTable interviews={interviews} />
        )}
      </div>

      <CreateInterviewModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        recruiterId={recruiterId}
        onNotice={(message) => setNotice(message)}
        onCreated={() => mutate()}
      />
    </AppShell>
  );
}
