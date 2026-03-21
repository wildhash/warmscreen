import useSWR from 'swr';

import { fetcher } from '@/lib/api';

export type Interview = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | string;
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

type InterviewResponse = {
  interview: Interview;
};

export function useInterview(id?: string) {
  const swr = useSWR<InterviewResponse>(id ? `/api/interviews/${id}` : null, fetcher);
  const error = swr.error instanceof Error ? swr.error : undefined;

  return {
    ...swr,
    error,
  };
}
