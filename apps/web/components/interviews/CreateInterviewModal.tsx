'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';

import { apiPost } from '@/lib/api';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export type CreateInterviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recruiterId: string;
  onCreated: () => Promise<unknown> | void;
  onNotice?: (message: string) => void;
};

type FormState = {
  candidateName: string;
  candidateEmail: string;
  position: string;
  scheduledAt: string;
};

const emptyForm: FormState = {
  candidateName: '',
  candidateEmail: '',
  position: '',
  scheduledAt: '',
};

export function CreateInterviewModal({
  open,
  onOpenChange,
  recruiterId,
  onCreated,
  onNotice,
}: CreateInterviewModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      Boolean(form.candidateName.trim()) &&
      Boolean(form.candidateEmail.trim()) &&
      Boolean(form.position.trim()) &&
      Boolean(form.scheduledAt.trim())
    );
  }, [form.candidateEmail, form.candidateName, form.position, form.scheduledAt]);

  const close = () => {
    if (creating) return;
    setError(null);
    onOpenChange(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setCreating(true);
    setError(null);

    try {
      const scheduledAtISO = new Date(form.scheduledAt).toISOString();

      const result = await apiPost('/api/interviews', {
        candidateName: form.candidateName,
        candidateEmail: form.candidateEmail,
        position: form.position,
        scheduledAt: scheduledAtISO,
        recruiterId,
      });

      try {
        await apiPost('/api/interviews/livekit-agent/initialize', {
          interviewId: result.interview.id,
        });
      } catch (agentError: any) {
        const errorDetails = agentError.details || agentError.message || 'Unknown error';
        onNotice?.(
          `Interview created, but LiveKit agent initialization failed: ${errorDetails}. You can retry later.`
        );
      }

      setForm(emptyForm);
      onOpenChange(false);
      await onCreated();
    } catch (createError: any) {
      const errorDetails =
        createError.details || createError.message || 'An unexpected error occurred';
      setError(`Failed to create interview: ${errorDetails}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) close();
        else onOpenChange(true);
      }}
      title="Create interview"
      description="Schedule a candidate session and initialize the agent stack."
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={close} disabled={creating}>
            Cancel
          </Button>
          <Button type="submit" form="create-interview-form" disabled={!canSubmit || creating}>
            {creating ? 'Creating...' : 'Create interview'}
          </Button>
        </div>
      }
    >
      {error && (
        <div className="mb-4 rounded-[var(--radius-sm)] border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      <form id="create-interview-form" onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold" htmlFor="candidateName">
            Candidate name
          </label>
          <div className="mt-1">
            <Input
              id="candidateName"
              value={form.candidateName}
              onChange={(e) => setForm((prev) => ({ ...prev, candidateName: e.target.value }))}
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold" htmlFor="candidateEmail">
            Candidate email
          </label>
          <div className="mt-1">
            <Input
              id="candidateEmail"
              type="email"
              value={form.candidateEmail}
              onChange={(e) => setForm((prev) => ({ ...prev, candidateEmail: e.target.value }))}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold" htmlFor="position">
            Position
          </label>
          <div className="mt-1">
            <Input
              id="position"
              value={form.position}
              onChange={(e) => setForm((prev) => ({ ...prev, position: e.target.value }))}
              placeholder="Software Engineer"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold" htmlFor="scheduledAt">
            Scheduled date & time
          </label>
          <div className="mt-1">
            <Input
              id="scheduledAt"
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(e) => setForm((prev) => ({ ...prev, scheduledAt: e.target.value }))}
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
