import useSWR from 'swr';

import { fetcher } from '@/lib/api';

export type InterviewSummary = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | string;
  score?: number | null;
  decision?: string | null;
  scheduledAt: string;
};

type InterviewsResponse = {
  interviews: InterviewSummary[];
};

export function useInterviews() {
  const swr = useSWR<InterviewsResponse>('/api/interviews', fetcher);
  const error = swr.error instanceof Error ? swr.error : undefined;

  return {
    interviews: swr.data?.interviews ?? [],
    isLoading: swr.isLoading,
    error,
    mutate: swr.mutate,
  };
}
