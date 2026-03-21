'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetcher, apiPost } from '@/lib/api';
import { Plus, Search, X } from 'lucide-react';
import {
  getDecisionBadgeClass,
  getStatusBadgeClass,
  type InterviewStatus,
} from './badges';
import { safeFormatDate } from './date';

type InterviewListItem = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  scheduledAt: string;
  status: InterviewStatus;
  score?: number | null;
  decision?: string | null;
};

function getInitials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return '?';

  const parts = trimmed.split(/\s+/).slice(0, 2);
  const initials = parts
    .map((p) => p[0])
    .filter(Boolean)
    .join('')
    .toUpperCase();

  return initials || '?';
}

function getErrorMessage(error: unknown) {
  if (!error) return null;
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;

  if (typeof error === 'object') {
    const record = error as Record<string, unknown>;
    if (typeof record.details === 'string') return record.details;
    if (typeof record.message === 'string') return record.message;
  }

  return null;
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [defaultRecruiterId, setDefaultRecruiterId] = useState('default-recruiter');
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    position: '',
    scheduledAt: '',
  });

  const fetchInterviews = () => {
    setLoading(true);
    fetcher('/api/interviews')
      .then((data) => {
        setInterviews(data.interviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch interviews:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInterviews();

    // Fetch default recruiter ID
    fetcher('/api/interviews/config/default-recruiter')
      .then((data) => {
        setDefaultRecruiterId(data.recruiterId);
      })
      .catch((err) => {
        console.error('Failed to fetch default recruiter ID:', err);
      });
  }, []);

  const handleCreateInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError('');

    try {
      // Convert local datetime to ISO format
      const scheduledAtISO = formData.scheduledAt 
        ? new Date(formData.scheduledAt).toISOString()
        : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // Default to tomorrow

      // Create interview with configured recruiter ID
      const interviewData = {
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        position: formData.position,
        scheduledAt: scheduledAtISO,
        recruiterId: defaultRecruiterId,
      };

      const result = await apiPost('/api/interviews', interviewData);
      
      // Initialize LiveKit agent for the interview
      let livekitInitFailed = false;
      try {
        await apiPost('/api/interviews/livekit-agent/initialize', {
          interviewId: result.interview.id,
        });
      } catch (agentError: unknown) {
        console.error('Failed to initialize LiveKit agent:', agentError);
        const errorDetails = getErrorMessage(agentError) ?? 'Unknown error';
        // Don't fail the entire operation if agent initialization fails
        setCreateError(`Interview created successfully, but LiveKit agent initialization failed: ${errorDetails}. You can retry initialization later.`);
        livekitInitFailed = true;
      }

      if (livekitInitFailed) {
        fetchInterviews();
        return;
      }

      // Reset form and close modal
      setFormData({
        candidateName: '',
        candidateEmail: '',
        position: '',
        scheduledAt: '',
      });
      setShowCreateModal(false);
      
      // Refresh interviews list
      fetchInterviews();
    } catch (error: unknown) {
      console.error('Failed to create interview:', error);
      const errorMessage = getErrorMessage(error) ?? 'An unexpected error occurred';
      setCreateError(`Failed to create interview: ${errorMessage}. Please check your input and try again.`);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">Interviews</h1>
            <p className="page-subtitle">Create and review interview sessions</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="skeleton h-9 w-full max-w-md" />
              <div className="skeleton h-9 w-36" />
            </div>
          </div>

          <div className="card p-6 mt-3.5">
            <div className="skeleton h-4 w-40" />
            <div className="skeleton h-40 w-full mt-4" />
          </div>
        </div>
      </div>
    );
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? interviews.filter((i) => {
        const haystack = `${i.candidateName} ${i.candidateEmail} ${i.position}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : interviews;

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header flex items-start justify-between gap-4">
          <div>
            <h1 className="page-title">Interviews</h1>
            <p className="page-subtitle">Create and review interview sessions</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
            <Plus size={14} />
            Create interview
          </button>
        </div>

        <div className="card p-5 mb-3.5">
          <div className="relative max-w-md">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-with-icon"
              placeholder="Search by candidate, email, or role"
              aria-label="Search interviews"
            />
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="ws-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Decision</th>
                  <th>Scheduled</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((interview) => (
                  <tr key={interview.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar w-8 h-8 text-[11px]">
                          {getInitials(interview.candidateName)}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/interviews/${interview.id}`}
                            className="text-zinc-100 hover:text-amber-500 font-semibold"
                          >
                            {interview.candidateName}
                          </Link>
                          <div className="text-[11px] text-zinc-600 truncate">
                            {interview.candidateEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-zinc-200">{interview.position}</td>
                    <td>
                      <span className={getStatusBadgeClass(interview.status)}>{interview.status}</span>
                    </td>
                    <td className="font-mono text-zinc-200">
                      {typeof interview.score === 'number' ? interview.score.toFixed(1) : '—'}
                    </td>
                    <td>
                      {interview.decision ? (
                        <span className={getDecisionBadgeClass(interview.decision)}>
                          {interview.decision}
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="text-zinc-600 font-mono text-[11px]">
                      {safeFormatDate(interview.scheduledAt, 'MMM d, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {interviews.length === 0 && (
          <div className="text-center py-14 text-zinc-600">
            No interviews found. Create your first interview to get started.
          </div>
        )}

        {interviews.length > 0 && filtered.length === 0 && (
          <div className="text-center py-14 text-zinc-600">No interviews match your search.</div>
        )}

        {showCreateModal && (
          <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="modal-panel">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-[16px] font-bold text-zinc-100">Create interview</h2>
                  <p className="text-[11px] text-zinc-600 mt-1">
                    The interview will be created with the configured recruiter.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateError('');
                  }}
                  disabled={creating}
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              {createError && (
                <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/[0.06] px-3 py-2 text-[12px] text-rose-300">
                  {createError}
                </div>
              )}

              <form onSubmit={handleCreateInterview}>
                <div className="space-y-3.5">
                  <div>
                    <label className="text-[11px] text-zinc-500 font-medium">Candidate name</label>
                    <input
                      type="text"
                      required
                      value={formData.candidateName}
                      onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                      className="input mt-1"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500 font-medium">Candidate email</label>
                    <input
                      type="email"
                      required
                      value={formData.candidateEmail}
                      onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                      className="input mt-1"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500 font-medium">Position</label>
                    <input
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="input mt-1"
                      placeholder="Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-500 font-medium">Scheduled date and time</label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="input mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button type="submit" disabled={creating} className="btn btn-primary flex-1 justify-center">
                    {creating ? 'Creating…' : 'Create interview'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setCreateError('');
                    }}
                    disabled={creating}
                    className="btn btn-ghost flex-1 justify-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
