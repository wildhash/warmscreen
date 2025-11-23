'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetcher } from '@/lib/api';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher('/api/interviews')
      .then((data) => {
        setInterviews(data.interviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch interviews:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading interviews...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Interviews</h1>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Decision
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Scheduled
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/interviews/${interview.id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        {interview.candidateName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {interview.position}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          interview.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : interview.status === 'IN_PROGRESS'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {interview.score ? interview.score.toFixed(1) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {interview.decision ? (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            interview.decision.includes('HIRE')
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {interview.decision}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(interview.scheduledAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {interviews.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No interviews found. Create your first interview to get started.
          </div>
        )}
      </div>
    </div>
  );
}
