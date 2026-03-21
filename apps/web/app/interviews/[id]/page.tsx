'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetcher } from '@/lib/api';
import { format } from 'date-fns';
import { ArrowLeft, Play } from 'lucide-react';

type InterviewDetail = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  scheduledAt: string;
  score?: number | null;
  decision?: string | null;
  explainability?: {
    summary: string;
    strengths?: string[];
    weaknesses?: string[];
    scoringBreakdown?: Record<string, number>;
  };
  responses?: Array<{
    id: string;
    duration: number;
    transcript: string;
    tags?: string[];
    question: { content: string };
  }>;
};

function getStatusBadgeClass(status: InterviewDetail['status']) {
  switch (status) {
    case 'COMPLETED':
      return 'badge badge-completed';
    case 'IN_PROGRESS':
      return 'badge badge-in-progress';
    case 'SCHEDULED':
    default:
      return 'badge badge-scheduled';
  }
}

function getDecisionBadgeClass(decision: string) {
  if (decision.includes('HIRE')) return 'badge badge-hire';
  return 'badge badge-no-hire';
}

export default function InterviewDetailPage() {
  const params = useParams();
  const [interview, setInterview] = useState<InterviewDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetcher(`/api/interviews/${params.id}`)
        .then((data) => {
          setInterview(data.interview);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch interview:', err);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="card p-6">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-10 w-64 mt-5" />
            <div className="skeleton h-4 w-44 mt-3" />
            <div className="skeleton h-4 w-56 mt-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 mt-3.5">
            <div className="card p-6">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-24 w-full mt-4" />
            </div>
            <div className="card p-6">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-24 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="card p-8 text-center">
            <div className="text-[13px] text-zinc-600">Interview not found.</div>
            <div className="mt-5">
              <Link href="/interviews" className="btn btn-ghost">
                <ArrowLeft size={14} />
                Back to interviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const explainability = interview.explainability;
  const canStart = interview.status === 'SCHEDULED';
  const isInProgress = interview.status === 'IN_PROGRESS';

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link href="/interviews" className="btn btn-ghost">
            <ArrowLeft size={14} />
            Back
          </Link>

          {(canStart || isInProgress) && (
            <Link href={`/interviews/${params.id}/start`} className="btn btn-primary">
              <Play size={14} />
              {isInProgress ? 'Continue interview' : 'Start interview'}
            </Link>
          )}
        </div>

        <div className="card p-6 mb-3.5">
          <div className="flex items-start justify-between gap-8">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-[20px] font-bold text-zinc-100 truncate">
                  {interview.candidateName}
                </h1>
                <span className={getStatusBadgeClass(interview.status)}>{interview.status}</span>
              </div>
              <div className="text-[12px] text-zinc-600 mt-2">{interview.candidateEmail}</div>
              <div className="text-[12px] text-zinc-300 mt-1">{interview.position}</div>
              <div className="text-[11px] text-zinc-600 mt-3 font-mono">
                Scheduled: {format(new Date(interview.scheduledAt), 'MMM d, yyyy p')}
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="score-display">
                {typeof interview.score === 'number' ? interview.score.toFixed(1) : '—'}
              </div>
              {interview.decision ? (
                <div className="mt-3">
                  <span className={getDecisionBadgeClass(interview.decision)}>{interview.decision}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {explainability ? (
          <div className="card p-6 mb-3.5">
            <h2 className="font-display text-[14px] font-bold text-zinc-100">Decision explanation</h2>
            <p className="text-[12px] text-zinc-300 mt-3 leading-relaxed">{explainability.summary}</p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <div className="text-[11px] font-semibold text-emerald-300">Strengths</div>
                <ul className="mt-3 space-y-2 text-[12px] text-zinc-300 list-disc list-inside">
                  {(explainability.strengths ?? []).map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                  {(explainability.strengths ?? []).length === 0 ? (
                    <li className="text-zinc-600">None captured.</li>
                  ) : null}
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-rose-300">Areas for improvement</div>
                <ul className="mt-3 space-y-2 text-[12px] text-zinc-300 list-disc list-inside">
                  {(explainability.weaknesses ?? []).map((weakness, idx) => (
                    <li key={idx}>{weakness}</li>
                  ))}
                  {(explainability.weaknesses ?? []).length === 0 ? (
                    <li className="text-zinc-600">None captured.</li>
                  ) : null}
                </ul>
              </div>
            </div>

            {explainability.scoringBreakdown ? (
              <div className="mt-7">
                <div className="text-[11px] text-zinc-600 font-semibold">Scoring breakdown</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-3">
                  {Object.entries(explainability.scoringBreakdown).map(([key, value]) => (
                    <div key={key} className="metric-card">
                      <div className="metric-label">{key}</div>
                      <div className="metric-value">{Number(value).toFixed(1)}</div>
                      <div className="metric-sub">dimension</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="card p-6">
          <h2 className="font-display text-[14px] font-bold text-zinc-100">Interview responses</h2>

          <div className="space-y-4 mt-5">
            {(interview.responses ?? []).map((response, idx) => (
              <div key={response.id} className="card-elevated p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-zinc-100">
                      Question {idx + 1}
                    </div>
                    <div className="text-[12px] text-zinc-300 mt-2 leading-relaxed">
                      {response.question.content}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-600">{response.duration}s</div>
                </div>

                <p className="text-[12px] text-zinc-400 mt-4 leading-relaxed">{response.transcript}</p>

                {response.tags && response.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {response.tags.map((tag) => (
                      <span key={tag} className="skill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {(interview.responses ?? []).length === 0 ? (
              <div className="text-[12px] text-zinc-600">No responses yet.</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
