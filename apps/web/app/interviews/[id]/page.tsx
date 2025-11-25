'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetcher } from '@/lib/api';

export default function InterviewDetailPage() {
  const params = useParams();
  const [interview, setInterview] = useState<any>(null);
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
    return <div className="p-8">Loading interview...</div>;
  }

  if (!interview) {
    return <div className="p-8">Interview not found</div>;
  }

  const explainability = interview.explainability;
  const canStart = interview.status === 'SCHEDULED';
  const isInProgress = interview.status === 'IN_PROGRESS';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <Link
            href="/interviews"
            className="text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Interviews
          </Link>
          
          {(canStart || isInProgress) && (
            <Link
              href={`/interviews/${params.id}/start`}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {isInProgress ? 'Continue Interview' : 'Start Interview'}
            </Link>
          )}
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{interview.candidateName}</h1>
              <p className="text-gray-600">{interview.candidateEmail}</p>
              <p className="text-lg font-semibold mt-2">{interview.position}</p>
              <div className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    interview.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-800'
                      : interview.status === 'IN_PROGRESS'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {interview.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {interview.score ? interview.score.toFixed(1) : '-'}
              </div>
              {interview.decision && (
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    interview.decision.includes('HIRE')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {interview.decision}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Explainability */}
        {explainability && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Decision Explanation</h2>
            <p className="text-gray-700 mb-6">{explainability.summary}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">
                  Strengths
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {explainability.strengths?.map((strength: string, i: number) => (
                    <li key={i} className="text-gray-700">{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">
                  Areas for Improvement
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {explainability.weaknesses?.map((weakness: string, i: number) => (
                    <li key={i} className="text-gray-700">{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>

            {explainability.scoringBreakdown && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Scoring Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(explainability.scoringBreakdown).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded">
                      <div className="text-sm text-gray-600 capitalize">{key}</div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {(value as number).toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Responses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Interview Responses</h2>
          <div className="space-y-6">
            {interview.responses?.map((response: any, i: number) => (
              <div key={response.id} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">
                    Question {i + 1}: {response.question.content}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {response.duration}s
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{response.transcript}</p>
                <div className="flex gap-2 flex-wrap">
                  {response.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
