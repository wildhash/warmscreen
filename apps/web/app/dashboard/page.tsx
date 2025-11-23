'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetcher } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetcher('/api/interviews'),
      fetcher('/api/agents/performance'),
      fetcher('/api/agents/patterns'),
    ])
      .then(([interviewsData, performanceData, patternsData]) => {
        setStats({
          interviews: interviewsData.interviews,
          agentPerformance: performanceData.performance,
          patterns: patternsData.patterns,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  const totalInterviews = stats?.interviews?.length || 0;
  const completedInterviews = stats?.interviews?.filter(
    (i: any) => i.status === 'COMPLETED'
  ).length || 0;
  const avgScore = stats?.interviews
    ?.filter((i: any) => i.score)
    .reduce((sum: number, i: any) => sum + i.score, 0) / completedInterviews || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Total Interviews</div>
            <div className="text-3xl font-bold text-indigo-600">{totalInterviews}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Completed</div>
            <div className="text-3xl font-bold text-green-600">{completedInterviews}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Average Score</div>
            <div className="text-3xl font-bold text-blue-600">
              {avgScore.toFixed(1)}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Active Patterns</div>
            <div className="text-3xl font-bold text-purple-600">
              {stats?.patterns?.length || 0}
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Agent Performance</h2>
          <div className="space-y-4">
            {stats?.agentPerformance?.map((agent: any) => (
              <div key={agent.agent} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold">{agent.agent}</div>
                  <div className="text-sm text-gray-600">
                    {agent.totalExecutions} executions
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Avg Score</div>
                    <div className="font-bold">{agent.avgScore.toFixed(2)}</div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${agent.avgScore * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Signal Patterns */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">High-Signal Patterns</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {stats?.patterns?.slice(0, 6).map((pattern: any) => (
              <div key={pattern.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold">{pattern.name}</div>
                  {pattern.amplified && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                      Amplified
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {pattern.description}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Strength: {(pattern.strength * 100).toFixed(0)}%
                  </span>
                  <span className="text-gray-500">
                    Occurrences: {pattern.occurrences}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
