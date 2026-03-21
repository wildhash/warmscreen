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
  const { recruiterId } = useDefaultRecruiter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

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
        {notice && (
          <Card className="border-warning/20 bg-warning-soft p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold">Notice</div>
              <Badge variant="warning">Action needed</Badge>
            </div>
            <div className="mt-2 text-sm text-foreground-muted">{notice}</div>
          </Card>
        )}

        {isLoading ? (
          <LoadingState label="Loading interviews..." />
        ) : error ? (
          <EmptyState
            title="Unable to load interviews"
            description={error.message}
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
