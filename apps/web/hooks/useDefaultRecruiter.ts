import useSWR from 'swr';

import { fetcher } from '@/lib/api';

type DefaultRecruiterResponse = {
  recruiterId: string;
};

export function useDefaultRecruiter() {
  const swr = useSWR<DefaultRecruiterResponse>('/api/interviews/config/default-recruiter', fetcher);
  const error = swr.error instanceof Error ? swr.error : undefined;

  return {
    recruiterId: swr.data?.recruiterId ?? 'default-recruiter',
    isLoading: swr.isLoading,
    error,
  };
}
