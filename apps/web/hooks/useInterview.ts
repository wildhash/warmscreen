import useSWR from 'swr';

import { fetcher } from '@/lib/api';

type InterviewResponse = {
  interview: any;
};

export function useInterview(id?: string) {
  return useSWR<InterviewResponse>(id ? `/api/interviews/${id}` : null, fetcher);
}
