import useSWR from 'swr';

import { fetcher } from '@/lib/api';

type AgentPerformanceRow = {
  agent: string;
  totalExecutions: number;
  avgScore: number;
};

type PatternRow = {
  id: string;
  name: string;
  description?: string | null;
  strength: number;
  occurrences: number;
  amplified?: boolean;
};

type DashboardStats = {
  interviews: Array<{ status: string; score?: number | null }>;
  agentPerformance: AgentPerformanceRow[];
  patterns: PatternRow[];
};

export function useDashboardStats() {
  const swr = useSWR<DashboardStats>('dashboard-stats', async () => {
    const [interviewsData, performanceData, patternsData] = await Promise.all([
      fetcher('/api/interviews'),
      fetcher('/api/agents/performance'),
      fetcher('/api/agents/patterns'),
    ]);

    return {
      interviews: interviewsData.interviews,
      agentPerformance: performanceData.performance,
      patterns: patternsData.patterns,
    };
  });
  const error = swr.error instanceof Error ? swr.error : undefined;

  return {
    stats: swr.data,
    isLoading: swr.isLoading,
    error,
  };
}
